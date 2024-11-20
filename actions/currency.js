'use server'
import { prisma } from "@/prisma/db"
import { revalidatePath } from "next/cache"

export const addCurrency = async (prevState, formData) => {
    try {
        const name = formData.get("name")
        const code = formData.get("code")

        await prisma.currency.create({
            data: {
                name: name,
                code: code
            }
        })
        revalidatePath('/dashboard');
        return { message: 'تم اضافة عملة بنجاح' };
    } catch (e) {
        console.error(e);
        return { error: 'Failed to add currency', error: true };
    }
}


export const getCurrencies = async () => {
    const currencies = await prisma.currency.findMany()
    return currencies
}