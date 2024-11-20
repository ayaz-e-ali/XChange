'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"
import { Textarea } from "../ui/textarea"
import { useState } from "react"
import { updateTransaction } from "@/actions/transaction"

export function TransactionDialog({ children, transaction, revalidate }) {

    const [name, setName] = useState(transaction.name)
    const [exchangeRate, setExchangeRate] = useState(transaction.exchangeRate.exchangeRate)
    const [outgoingAmount, setOutgoingAmount] = useState(transaction.outgoingAmount)
    const [incomingAmount, setIncomingAmount] = useState(transaction.incomingAmount)
    const [note, setNote] = useState(transaction.note)

    const onClickHandler = async (e) => {
        updateTransaction({
            id: transaction.transactionId,
            name,
            exchangeRate,
            incomingAmount,
            note,
            outgoingAmount
        })
        revalidate()
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>تفاصيل العملية <span className="text-xs font-thin">عند تعديل العملية اضغط على حفظ </span> </AlertDialogTitle>
                    <AlertDialogDescription>الرقم : {transaction.transactionId}</AlertDialogDescription>
                    <AlertDialogDescription>الاسم : <DialogInput value={name} onChange={(e) => setName(e.target.value)} />
                    </AlertDialogDescription>
                    <AlertDialogDescription>اسم المستخدم : {transaction.user.userName}</AlertDialogDescription>
                    <AlertDialogDescription>تاريخ الاضافة : {transaction.createDate.toLocaleString('ar-EG')}</AlertDialogDescription>
                    <AlertDialogDescription>سعر الصرف : <DialogInput type="number" value={exchangeRate} onChange={(e) => setExchangeRate(e.target.value)} /></AlertDialogDescription>
                    <AlertDialogDescription>القيمة الصادرة : <DialogInput type="number" value={outgoingAmount} onChange={(e) => setOutgoingAmount(e.target.value)} /> {transaction.exchangeRate.outgoingCurrency.name}</AlertDialogDescription>
                    <AlertDialogDescription>القيمة الواردة : <DialogInput type="number" value={incomingAmount} onChange={(e) => setIncomingAmount(e.target.value)} /> {transaction.exchangeRate.incomingCurrency.name}</AlertDialogDescription>
                    <AlertDialogDescription className='w-full'>ملاحظات : <Textarea value={note} onChange={(e) => setNote(e.target.value)} /> </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>تمام</AlertDialogCancel>
                    <AlertDialogAction onClick={onClickHandler}>حفظ</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

function DialogInput({ type = 'text', value, name, className, onChange }) {
    return <input type={type} name={name} value={value} onChange={onChange} className={cn("rounded-md border border-input bg-background px-2 py-1 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className)} />
}