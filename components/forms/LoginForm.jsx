'use client'
import { useFormState } from 'react-dom'
import { signinUser } from '@/actions/auth'
import { Input } from '../ui/input'
import Submit from '../ui/SubmitButton'
import { useTranslations } from 'next-intl'

const initState = { message: null }

export default function LoginForm() {
    const [formState, action] = useFormState(signinUser, initState)
    const t = useTranslations('Auth');

    return (
        <form action={action} className="bg-sidebar border border-default-100 shadow-lg rounded-md p-4 flex flex-col gap-2 ">
            <h3 className="my-4 ar:text-right">{t('login')}</h3>
            <Input required size="lg" name="userName" type="text" />
            <Input name="password" required size="lg" type="password" />
            <Submit label={t('register')} className="mt-2 w-min" />
            {formState?.message && <p className="ar:text-right text-red-600">{formState.message}</p>}
        </form>
    )
}
