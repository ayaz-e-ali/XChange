'use server';

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/prisma/db";
import { getTranslations } from "next-intl/server";

export const AddToStock = async (amount, currencyId) => {
    try {
        const user = await getCurrentUser();
        const t = await getTranslations("Messages");

        if (!user.isAdmin) {
            return { message: t('stock-Edit-permissionDenied'), error: true };
        }

        // Check if stock for the given currency already exists
        const existingStock = await prisma.stock.findUnique({
            where: { currencyId },
        });

        if (existingStock) {
            // Update existing stock amount
            await prisma.stock.update({
                where: { currencyId },
                data: {
                    amount: { increment: amount }, // Increments stock amount
                },
            });

            return { message: t('stock-updated') };
        } else {
            // Create new stock entry
            await prisma.stock.create({
                data: {
                    amount,
                    currencyId,
                },
            });

            return { message: t('stock-Edit-permissionDenied') };
        }
    } catch (e) {
        return { message: e.message };
    }
};

export const SubtractFromStock = async (amount, currencyId) => {
    try {
        const user = await getCurrentUser();

        if (!user.isAdmin) {
            return { message: t('stock-change-permissionDenied') , error: true};
        }

        // Check if stock for the given currency exists
        const existingStock = await prisma.stock.findUnique({
            where: { currencyId },
        });

        if (!existingStock) {
            return { message: t('stock-notFound')  , error: true};
        }

        if (existingStock.amount < amount) {
            return { message: t('stock-notEnough') , error: true};
        }

        // Subtract the amount from stock
        await prisma.stock.update({
            where: { currencyId },
            data: {
                amount: { decrement: amount }, // Decrement stock amount
            },
        });

        return { message: t('stock-Deducted') };
    } catch (e) {
        return { message: e.message };
    }
};