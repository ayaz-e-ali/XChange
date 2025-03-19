'use client';

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
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { updateDebt } from "@/actions/debts";
import DialogInput from "../ui/DialogInput";

export function DebtsDialog({ children, debt, revalidate }) {
    const [name, setName] = useState(debt.name);
    const [amount, setAmount] = useState(debt.amount);

    const onClickHandler = async (e) => {
        await updateDebt({
            id: debt.id,
            amount,
            name
        });
        revalidate();
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>تفاصيل الدين <span className="text-xs font-thin">عند تعديل العملية اضغط على حفظ </span> </AlertDialogTitle>
                    <AlertDialogDescription>الرقم : {debt.id}</AlertDialogDescription>
                    <AlertDialogDescription>الاسم : <DialogInput value={name} onChange={(e) => setName(e.target.value)} />
                    </AlertDialogDescription>
                    <AlertDialogDescription>تاريخ الاضافة : {debt.createDate.toLocaleString('ar-EG')}</AlertDialogDescription>
                    <AlertDialogDescription>القيمة : <DialogInput type="number" value={amount} onChange={(e) => setAmount(e.target.value)} /> {debt.currency.name}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel> الغاء</AlertDialogCancel>
                    <AlertDialogAction onClick={onClickHandler}>حفظ</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

