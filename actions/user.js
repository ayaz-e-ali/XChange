'use server'
import { getCurrentUser, hashPW } from "@/lib/auth";
import { prisma } from "@/prisma/db";
import { revalidatePath } from "next/cache";

export const AddUser = async (prevState, formData) => {
    try {
        const hashedPW = await hashPW(formData.get("password"))

        await prisma.user.create({
            data: {
                password: hashedPW,
                userName: formData.get("userName"),
                isAdmin: !!(formData.get("isAdmin")) ?? false
            }
        })

        revalidatePath('/dashboard/users')
    } catch (e) {
        console.error(e)
        return { message: 'Failed to sign you up' }
    }
}

export const deleteUser = async (userId) => {
    try {
        const user = await getCurrentUser()
        if (+user.id === +userId)
            return { message: "لا يمكنك حذف هذا المستخدم" }

        await prisma.user.delete({
            where: { id: userId }
        })
        revalidatePath('/dashboard/users')
    } catch (error) {
        console.error(e)
        return { message: `Failed to sign you up ERROR:${e.message}` }
    }
}