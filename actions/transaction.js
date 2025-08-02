'use server';

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/prisma/db";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

export const addTransaction = async (prevState, formData) => {
    try {
        const user = await getCurrentUser();

        const t = await getTranslations("Messages");


        if (!user.isAdmin) {
            return { message: t('transaction-permissionDenied'), error: true };
        }

        const incomingAmount = +formData.get("incomingAmount");
        const outgoingAmount = +formData.get("outgoingAmount");
        const incomingCurrencyId = +formData.get("incomingCurrencyId");
        const outgoingCurrencyId = +formData.get("outgoingCurrencyId");
        const exchangeRate = +formData.get("exchangeRate");
        const name = formData.get("name");
        const note = formData.get("note");

        if (incomingCurrencyId === outgoingCurrencyId) {
            return { message: t('transaction-currencyMismatch'), error: true };
        }

        // Define a tolerance for floating-point calculations
        const tolerance = 0.0001;
        const isValidIncoming = Math.abs(outgoingAmount * exchangeRate - incomingAmount) <= tolerance;
        const isValidOutgoing = Math.abs(incomingAmount * exchangeRate - outgoingAmount) <= tolerance;

        if (!isValidIncoming && !isValidOutgoing) {
            return {
                message: t('transaction-accountInvalid'),
                error: true,
            };
        }

        const transactionResult = await prisma.$transaction(async (prisma) => {
            // Check stock availability for outgoing currency
            const outgoingStock = await prisma.stock.findUnique({
                where: { currencyId: outgoingCurrencyId },
            });

            if (!outgoingStock || outgoingStock.amount < outgoingAmount) {
                throw new Error(t('transaction-stockInsufficient')); // Throw error instead of returning
            }

            // Deduct outgoing amount from stock
            await prisma.stock.update({
                where: { currencyId: outgoingCurrencyId },
                data: { amount: { decrement: outgoingAmount } },
            });

            // Add incoming amount to stock (or create stock if it doesn't exist)
            const incomingStock = await prisma.stock.findUnique({
                where: { currencyId: incomingCurrencyId },
            });

            if (incomingStock) {
                await prisma.stock.update({
                    where: { currencyId: incomingCurrencyId },
                    data: { amount: { increment: incomingAmount } },
                });
            } else {
                await prisma.stock.create({
                    data: { amount: incomingAmount, currencyId: incomingCurrencyId },
                });
            }

            // Create the transaction record
            return prisma.transaction.create({
                data: {
                    incomingAmount,
                    outgoingAmount,
                    exchangeRate: {
                        create: { exchangeRate, incomingCurrencyId, outgoingCurrencyId }
                    },
                    note,
                    name,
                    user: {
                        connect: { id: user.id },
                    },
                },
            });
        });

        return { message: t('transaction-success'), transaction: transactionResult };
    } catch (e) {
        console.error("Error adding transaction:", e);
        return { message: `${t('transaction-addError')} ${e.message}`, error: true };
    }
};


export const deleteTransaction = async (transactionId) => {
    try {
        const user = await getCurrentUser();
        if (!user.isAdmin)
            return { message: t('transaction-Delete-permissionDenied') };

        const transaction = await prisma.transaction.delete({
            where: { transactionId }
        });

        await prisma.exchangeRate.delete({
            where: { rateId: transaction.exchangeRateId }
        });

        revalidatePath('/dashboard/search');
    } catch (e) {
        console.error(e);
        return { message: `${t('transaction-DeleteError')} ERROR:${e.message}` };
    }
};

export const getTransaction = async (dateStart, dateFinish, name) => {
    const start = dateStart ? new Date(dateStart) : null;

    let finish;
    if (dateFinish) {
        finish = new Date(dateFinish);
        finish.setDate(finish.getDate() + 1);
    }

    let dateFilter = {};
    if (start && finish) {
        // Case 1: Both start and finish dates are provided
        dateFilter = {
            gte: start,
            lte: finish,
        };
    } else if (start) {
        // Case 2: Only start date is provided
        dateFilter = { gte: start };
    } else if (finish) {
        // Case 3: Only finish date is provided
        dateFilter = { lte: finish };
    }
    const where = { createDate: dateFilter };
    if (name) where.name = { contains: name };

    const transactions = await prisma.transaction.findMany({
        include: {
            exchangeRate: {
                select: {
                    exchangeRate: true,
                    incomingCurrency: true,
                    outgoingCurrency: true
                }
            },
            user: {
                select: { userName: true }
            }
        },
        where,
        orderBy: { createDate: "desc" },
    });

    const stats = await getStatistics(where);

    return { transactions, stats };
};

const getStatistics = async (where) => {
    // Step 1: Aggregate incoming and outgoing amounts
    const incomingStatistics = await prisma.transaction.groupBy({
        by: ['exchangeRateId'],
        _sum: { incomingAmount: true },
        where
    });

    const outgoingStatistics = await prisma.transaction.groupBy({
        by: ['exchangeRateId'],
        _sum: { outgoingAmount: true },
        where
    });

    // Step 2: Fetch the related currency details using the exchangeRateId
    const exchangeRates = await prisma.exchangeRate.findMany({
        where: {
            rateId: {
                in: [...new Set([...incomingStatistics, ...outgoingStatistics].map(stat => stat.exchangeRateId))]
            },
        },
        select: {
            rateId: true,
            incomingCurrency: {
                select: { name: true },
            },
            outgoingCurrency: {
                select: { name: true },
            },
        },
    });

    // Step 3: Combine the results by currency name and calculate the difference
    const statistics = {};

    incomingStatistics.forEach(stat => {
        const rate = exchangeRates.find(rate => rate.rateId === stat.exchangeRateId);
        if (rate) {
            const currencyName = rate.incomingCurrency.name;
            if (!statistics[currencyName]) {
                statistics[currencyName] = { incomingAmount: 0, outgoingAmount: 0, difference: 0 };
            }
            statistics[currencyName].incomingAmount += stat._sum.incomingAmount || 0;
            statistics[currencyName].difference += stat._sum.incomingAmount || 0; // Add to difference
        }
    });

    outgoingStatistics.forEach(stat => {
        const rate = exchangeRates.find(rate => rate.rateId === stat.exchangeRateId);
        if (rate) {
            const currencyName = rate.outgoingCurrency.name;
            if (!statistics[currencyName]) {
                statistics[currencyName] = { incomingAmount: 0, outgoingAmount: 0, difference: 0 };
            }
            statistics[currencyName].outgoingAmount += stat._sum.outgoingAmount || 0;
            statistics[currencyName].difference -= stat._sum.outgoingAmount || 0; // Subtract from difference
        }
    });

    return statistics;
};


export const updateTransaction = async ({ id, name, exchangeRate, outgoingAmount, incomingAmount, note }) => {
    try {

        await prisma.transaction.update({
            data: {
                name,
                exchangeRate: {
                    update: {
                        exchangeRate: +exchangeRate
                    }
                },
                incomingAmount: +incomingAmount,
                outgoingAmount: +outgoingAmount,
                note
            },
            where: {
                transactionId: +id
            }
        });

        revalidatePath('/dashboard/search');
        return { message: t('transaction-updated') };
    } catch (e) {
        console.error(e);
        return { message: t('transaction-updateError'), error: true };
    }
};