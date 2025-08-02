'use server'
import { getCurrentUser, hashPW } from "@/lib/auth";
import { prisma } from "@/prisma/db";
import { getTranslations } from "next-intl/server";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * 
 * @param {*} prevState 
 * @param {FormData} formData 
 * @returns 
 */
export const AddUser = async (prevState, formData) => {
    try {
        const id = +formData.get("id") ?? 0
        const userName = formData.get("userName")
        const password = formData.get("password")
        const isAdmin = !!formData.get("isAdmin") ?? false

        const t = await getTranslations("Messages");

        if (userName == 'Admin')
            return { error: t('user-adminEditDenied') }


        const hashedPW = await hashPW(password)

        await prisma.user.upsert({
            where: {
                id: id,
                userName: userName
            },
            create: {
                userName: userName,
                password: hashedPW,
                isAdmin: isAdmin
            },
            update: {
                password: hashedPW,
                isAdmin: isAdmin
            }
        })

        revalidatePath('/dashboard/users')
        return { message: t('user-success') }
    } catch (e) {
        console.error(e)
        return { error: t('user-signupError') }
    }
}

export const deleteUser = async (userId, userName) => {
    try {
        const user = await getCurrentUser()

        if (userName == 'Admin')
            return { error: t('user-adminDeleteDenied') }

        if (+user.id === +userId)
            return { error: t('user-selfDeleteDenied') }

        await prisma.user.delete({
            where: { id: userId }
        })

        revalidatePath('/dashboard/users')
        return { message: t('user-Deleted') }
    } catch (e) {
        console.error(e)
        return { error: t('user-hasTransactions') }
    }
}

export const getUsers = async () => {
    const users = await prisma.user.findMany();
    return users
}