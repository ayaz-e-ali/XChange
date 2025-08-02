'use server'
import { cookies } from 'next/headers'
import { signin, hashPW } from '@/lib/auth'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { COOKIE_NAME } from '@/lib/constants'
import { getTranslations } from 'next-intl/server'

const authSchema = z.object({
    userName: z.string(),
    password: z.string(),
})

export const signinUser = async (prevState, formData) => {
    const t = await getTranslations("Messages");

    const data = authSchema.parse({
        userName: formData.get('userName'),
        password: formData.get('password'),
    })

    try {
        const { token, error } = await signin(data)
        if (error) return { message: error }

        cookies().set(COOKIE_NAME, token)
    } catch (e) {
        console.error(e)
        return { message: `${t('auth-signinFailed')} , ERROR:${e}` }
    }
    redirect('/dashboard')
}


export const signOutUser = async () => {
    cookies().delete(COOKIE_NAME)
    redirect("/signin")
}