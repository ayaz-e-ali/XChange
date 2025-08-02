'use client'
import { useFormState } from 'react-dom'
import { Input } from '../ui/input'
import Submit from '../ui/SubmitButton'
import { AddUser } from '@/actions/user'
import { useToast } from '@/hooks/use-toast'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useTranslations } from 'next-intl'

const initState = { message: null }

export default function UserAddForm({ user, revalidate }) {
    const [formState, action] = useFormState(AddUser, initState)
    const [id, setId] = useState(0);
    const [username, setUsername] = useState("");
    const [isAdmin, setIsAdmin] = useState("");

    const { toast } = useToast()

    const t = useTranslations('Users');

    useEffect(() => {
        if (formState.message) {
            if (formState.error)
                toast({
                    title: "خطأ",
                    description: formState.message,
                    variant: "destructive"
                });
            else
                toast({
                    title: "مستخدمين",
                    description: formState.message,
                });
            formState.message = null
        }

        revalidate()

    }, [formState.message])

    useEffect(() => {
        setId(user ? user.id : 0)
        setUsername(user ? user.userName : "")
        setIsAdmin(user ? user.isAdmin : false)
    }, [user])

    const handleNewUserClick = () => {
        setId(0)
        setUsername("")
        setIsAdmin(false)
    }

    return (
        <form action={action} className="p-3 flex flex-col gap-4 items-end">
            <h3 className="ar:text-right w-full">{t('usersData')}</h3>
            <Input className="hidden" name="id" type="number" defaultValue={id} />
            <Input className="ar:text-right" required size="lg" name="userName" type="text" placeholder={t('userName')} value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input className="ar:text-right" name="password" size="lg" type="text" placeholder={t('password')} />
            <div className="flex w-full en:flex-row-reverse justify-end items-center gap-2">
                <label
                    htmlFor="isAdmin"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {t('isAdmin')}
                </label>
                <Input type="checkbox" id="isAdmin" name="isAdmin" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} className="peer h-4 w-4 shrink-0 rounded-sm border border-neutral-900 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-neutral-50 dark:border-neutral-800 dark:border-neutral-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 dark:data-[state=checked]:bg-neutral-50 dark:data-[state=checked]:text-neutral-900" />
            </div>
            <div className="flex gap-4">
                <Button type="button" onClick={handleNewUserClick}>{t('new')}</Button>
                <Submit label={t('save')} />
            </div>
            {formState?.message && <p>{formState.message}</p>}
        </form>
    )
}
