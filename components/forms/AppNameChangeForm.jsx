'use client'

import { Input } from "../ui/input"
import Submit from "../ui/SubmitButton"
import { useFormState } from 'react-dom'
import { useRef, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { getApp, updateMarketName } from "@/actions/app"
import { useTranslations } from "next-intl"

const initState = { message: null }

export default function AppNameChangeForm() {
    const [formState, action] = useFormState(updateMarketName, initState)
    const [appName, setAppName] = useState()

    const t = useTranslations('Settings')

    const formRef = useRef();
    const { toast } = useToast()

    useEffect(() => {
        if (formState.message) {
            if (formState.error)
                toast({
                    title: "خطأ",
                    description: formState.message,
                    variant: "destructive"
                });
            else {

                toast({
                    title: "اعدادات",
                    description: formState.message,
                });
                formRef.current.reset();
            }
            formState.message = null
        }
    }, [formState, formState.message, toast])

    useEffect(() => {
        (async () => {
            const app = await getApp()
            setAppName(app.marketName)
        })();
    }, []);

    return (
        <form action={action} ref={formRef} className="flex flex-col gap-2 items-center justify-center">
            <h3 className="text-right">{t('companyName')}</h3>
            <Input value={appName} onChange={(e) => setAppName(e.target.value)} className="w-full text-right" required name="appName" type="text" placeholder={t('companyName')} />
            <Submit label={t('save')} />
        </form>
    )
}
