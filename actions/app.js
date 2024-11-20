'use server'

import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/prisma/db"
import { revalidatePath } from "next/cache"

export const getApp = async () => {
    try {
        const app = await prisma.app.findFirst()
        return app
    } catch (error) {
        return {}
    }
}

export const updateMarketName = async (prevState, formData) => {
    try {
        const user = await getCurrentUser()

        if (!user.isAdmin) {
            return { message: "لا يسمح للمستخدمين تغير اسم المحل , راجع الادمن" }
        }

        const marketName = formData.get("appName")

        const app = await prisma.app.update({
            data: { marketName: marketName },
            where: { id: 1 }
        })

        revalidatePath('/dashboard')

        return { message: "تم تعديل اسم المحل بنجاح" }
    } catch (error) {
        console.log(error);
        return { message: "خطا في تعديل  اسم المحل", error: true }
    }
}