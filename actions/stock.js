'use server';

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/prisma/db";

export const AddToStock = async (amount, currencyId) => {
    try {
        const user = await getCurrentUser();

        if (!user.isAdmin) {
            return { message: "لا يسمح للمستخدمين بالتعديل على المخزون، راجع الادمن", error: true };
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

            return { message: "تم تحديث المخزون بنجاح" };
        } else {
            // Create new stock entry
            await prisma.stock.create({
                data: {
                    amount,
                    currencyId,
                },
            });

            return { message: "تم إضافة المخزون بنجاح" };
        }
    } catch (e) {
        return { message: e.message };
    }
};

export const SubtractFromStock = async (amount, currencyId) => {
    try {
        const user = await getCurrentUser();

        if (!user.isAdmin) {
            return { message: "لا يسمح للمستخدمين بتغيير المخزون، راجع الادمن" , error: true};
        }

        // Check if stock for the given currency exists
        const existingStock = await prisma.stock.findUnique({
            where: { currencyId },
        });

        if (!existingStock) {
            return { message: "المخزون غير موجود لهذه العملة" , error: true};
        }

        if (existingStock.amount < amount) {
            return { message: "المخزون غير كافٍ لهذه العملية" , error: true};
        }

        // Subtract the amount from stock
        await prisma.stock.update({
            where: { currencyId },
            data: {
                amount: { decrement: amount }, // Decrement stock amount
            },
        });

        return { message: "تم خصم المخزون بنجاح" };
    } catch (e) {
        return { message: e.message };
    }
};