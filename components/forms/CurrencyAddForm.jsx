
'use client'

import { addCurrency } from "@/actions/currency"
import { Input } from "../ui/input"
import Submit from "../ui/SubmitButton"
import { useFormState } from 'react-dom'
import { useRef, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

const initState = { message: null }

export default function CurrencyAddForm() {
    const [formState, action] = useFormState(addCurrency, initState)

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


    return (
        <form action={action} ref={formRef} className="flex flex-col gap-2 items-center justify-center">
            <h3 className="text-right">أضافة عملة</h3>
            <Input className="w-full text-right" required size="lg" name="name" type="text" placeholder="الاسم : دولار" />
            <Input className="w-full text-right" required size="lg" name="code" type="text" placeholder="الكود : USD" />
            <Submit label={'حفظ'} className="" />
            {formState?.message && <p className="text-right">{formState.message}</p>}
        </form>
    )
}
