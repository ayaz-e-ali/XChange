'use server';

import { prisma } from "@/prisma/db";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

export const addDebt = async (prevState, formData) => {
    const name = formData.get("Name");
    const amount = +formData.get("Amount");
    const currencyId = +formData.get("CurrencyId");
    const forUs = formData.get("forUs") == "forUs";

    const t = await getTranslations("Messages");

    try {
        await prisma.debts.create({
            data: {
                name,
                amount,
                currencyId,
                forUs
            }
        });
        revalidatePath('/dashboard/debts');
        return { message: t('debts-added') };
    } catch (e) {
        console.error(e);
        return { message: t('debts-addError'), error: true };
    }
};

export const deleteDebts = async (debtId) => {
    try {
        await prisma.debts.delete({
            where: {
                id: debtId
            }
        });

        revalidatePath('/dashboard/debts');
        return { message: t('debts-Deleted') };
    } catch (e) {
        console.error(e);
        return { message: t('debts-DeleteError'), error: true };
    }
};

export const getDebts = async () => {
    const debts = await prisma.debts.findMany({
        include: {
            currency: true
        },
        orderBy: { createDate: "desc" },
    });

    const stats = await getStatistics();

    return { debts, stats };
};

export const getStatistics = async () => {
    // Step 1: Aggregate debts on us and debts on them
    const debtsForUsStatistics = await prisma.debts.groupBy({
        by: ["currencyId"],
        _sum: { amount: true },
        where: { forUs: true },
    });

    const debtsForThemStatistics = await prisma.debts.groupBy({
        by: ["currencyId"],
        _sum: { amount: true },
        where: { forUs: false },
    });

    // Step 2: Fetch the related currency details
    const currencyDetails = await prisma.currency.findMany({
        where: {
            currencyId: {
                in: [...new Set([...debtsForUsStatistics, ...debtsForThemStatistics].map(stat => stat.currencyId))],
            },
        },
        select: {
            currencyId: true,
            name: true,
        },
    });

    // Step 3: Combine the results by currency name
    const statistics = {};

    debtsForUsStatistics.forEach(stat => {
        const currency = currencyDetails.find(c => c.currencyId === stat.currencyId);
        if (currency) {
            const currencyName = currency.name;
            if (!statistics[currencyName]) {
                statistics[currencyName] = { debtsForUs: 0, debtsForThem: 0, balance: 0 };
            }
            statistics[currencyName].debtsForUs += stat._sum.amount || 0;
            statistics[currencyName].balance += stat._sum.amount || 0;
        }
    });

    debtsForThemStatistics.forEach(stat => {
        const currency = currencyDetails.find(c => c.currencyId === stat.currencyId);
        if (currency) {
            const currencyName = currency.name;
            if (!statistics[currencyName]) {
                statistics[currencyName] = { debtsForUs: 0, debtsForThem: 0, balance: 0 };
            }
            statistics[currencyName].debtsForThem += stat._sum.amount || 0;
            statistics[currencyName].balance -= stat._sum.amount || 0;
        }
    });

    return statistics;
};

export const updateDebt = async ({ id, name, amount }) => {
    try {
        await prisma.debts.update({
            where: { id },
            data: {
                name,
                amount: +amount
            }
        });

        revalidatePath('/dashboard/debts');
        return { message: t('debts-updated') };
    } catch (e) {
        console.error(e);
        return { message: t('debts-updateError'), error: true };
    }
};