'use server'

import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/prisma/db"
import { getTranslations } from "next-intl/server"
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
        const t = await getTranslations("Messages");

        if (!user.isAdmin) {
            return { message: t('appName-permissionDenied') }
        }

        const marketName = formData.get("appName")

        const app = await prisma.app.update({
            data: { marketName: marketName },
            where: { id: 1 }
        })

        revalidatePath('/dashboard')

        return { message: t('appName-updated') }
    } catch (error) {
        console.log(error);
        return { message: t('appName-updateError'), error: true }
    }
}