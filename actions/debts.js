'use server';

import { prisma } from "@/prisma/db";
import { revalidatePath } from "next/cache";

export const addDebt = async (prevState, formData) => {
    const name = formData.get("Name")
    const amount = +formData.get("Amount")
    const currencyId = +formData.get("CurrencyId")
    const forUs = formData.get("forUs") == "forUs"

    try {
        await prisma.debts.create({
            data: {
                name,
                amount,
                currencyId,
                forUs
            }
        })
        revalidatePath('/dashboard/debts');
        return { message: 'تم الاضافة بنجاح' };
    } catch (e) {
        console.error(e);
        return { message: 'Failed to add debt', error: true };
    }
}

export const deleteDebts = async (debtId) => {
    try {
        await prisma.debts.delete({
            where: {
                id: debtId
            }
        })

        revalidatePath('/dashboard/debts')
        return { message: "تم الحذف بنجاح" }
    } catch (e) {
        console.error(e)
        return { message: 'Failed to Delete Debt', error: true };
    }
}

export const getDebts = async () => {
    const debts = await prisma.debts.findMany({
        include: {
            currency: true
        },
        orderBy: { createDate: "desc" },
    })
    return debts
}