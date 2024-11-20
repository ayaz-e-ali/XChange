'use server'
import { getCurrentUser, hashPW } from "@/lib/auth";
import { prisma } from "@/prisma/db";
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

        if (userName == 'Admin')
            return { error: 'لا يمكن تعديل مستخدم الادمن' }


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
        return { message: 'تمت العملية بنجاح' }
    } catch (e) {
        console.error(e)
        return { error: 'Failed to sign you up' }
    }
}

export const deleteUser = async (userId, userName) => {
    try {
        const user = await getCurrentUser()

        if (userName == 'Admin')
            return { error: 'لا يمكن حذف مستخدم الادمن' }

        if (+user.id === +userId)
            return { error: "لا يمكنك حذف المستخدم الحالي" }

        await prisma.user.delete({
            where: { id: userId }
        })

        revalidatePath('/dashboard/users')
        return { message: "تم الحذف بنجاح" }
    } catch (e) {
        console.error(e)
        return { error: `لا يمكن حذف المستخدم لانه يمتلك عمليات باسمه ` }
    }
}

export const getUsers = async () => {
    const users = await prisma.user.findMany();
    return users
}