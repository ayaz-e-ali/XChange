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
import { useTranslations } from "next-intl";

export function DebtsDialog({ children, debt, revalidate }) {
    const [name, setName] = useState(debt.name);
    const [amount, setAmount] = useState(debt.amount);

    const t = useTranslations('EditDebts');

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
                    <AlertDialogTitle>{t('details')} <span className="text-xs font-thin">{t('pressSave')} </span> </AlertDialogTitle>
                    <AlertDialogDescription>{t('id')} : {debt.id}</AlertDialogDescription>
                    <AlertDialogDescription>{t('name')} : <DialogInput value={name} onChange={(e) => setName(e.target.value)} />
                    </AlertDialogDescription>
                    <AlertDialogDescription>{t('dateAdded')} : {debt.createDate.toLocaleString('ar-EG')}</AlertDialogDescription>
                    <AlertDialogDescription>{t('amount')} : <DialogInput type="number" value={amount} onChange={(e) => setAmount(e.target.value)} /> {debt.currency.name}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel> {t('cancel')}</AlertDialogCancel>
                    <AlertDialogAction onClick={onClickHandler}>{t('save')}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

