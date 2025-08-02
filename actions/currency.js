'use server';
import { prisma } from "@/prisma/db";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

export const addCurrency = async (prevState, formData) => {
    try {
        const t = await getTranslations("Messages");

        const name = formData.get("name");
        const code = formData.get("code");

        await prisma.currency.create({
            data: {
                name: name,
                code: code
            }
        });
        revalidatePath('/dashboard');
        return { message: t('currency-added') };
    } catch (e) {
        console.error(e);
        return { error: t('currency-addError'), error: true };
    }
};


export const getCurrencies = async () => {
    const currencies = await prisma.currency.findMany({ include: { Stock: true } });
    return currencies;
};