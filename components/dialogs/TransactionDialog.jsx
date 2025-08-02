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
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { updateTransaction } from "@/actions/transaction";
import DialogInput from "../ui/DialogInput";
import { useLocale, useTranslations } from "next-intl";

export function TransactionDialog({ children, transaction, revalidate }) {

    const [name, setName] = useState(transaction.name);
    const [exchangeRate, setExchangeRate] = useState(transaction.exchangeRate.exchangeRate);
    const [outgoingAmount, setOutgoingAmount] = useState(transaction.outgoingAmount);
    const [incomingAmount, setIncomingAmount] = useState(transaction.incomingAmount);
    const [note, setNote] = useState(transaction.note);

    const t = useTranslations('EditTransaction');

    const onClickHandler = async (e) => {
        await updateTransaction({
            id: transaction.transactionId,
            name,
            exchangeRate,
            incomingAmount,
            note,
            outgoingAmount
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
                    <AlertDialogTitle>{t('details')} <span className="text-xs font-thin">{t('pressSave')}</span> </AlertDialogTitle>
                    <AlertDialogDescription>{t('id')} : {transaction.transactionId}</AlertDialogDescription>
                    <AlertDialogDescription>{t('name')} : <DialogInput value={name} onChange={(e) => setName(e.target.value)} />
                    </AlertDialogDescription>
                    <AlertDialogDescription>{t('userName')} : {transaction.user.userName}</AlertDialogDescription>
                    <AlertDialogDescription>{t('dateAdded')} : {transaction.createDate.toLocaleString('ar-EG')}</AlertDialogDescription>
                    <AlertDialogDescription>{t('exchangeRate')} : <DialogInput type="number" value={exchangeRate} onChange={(e) => setExchangeRate(e.target.value)} /></AlertDialogDescription>
                    <AlertDialogDescription>{t('inAmount')} : <DialogInput type="number" value={outgoingAmount} onChange={(e) => setOutgoingAmount(e.target.value)} /> {transaction.exchangeRate.outgoingCurrency.name}</AlertDialogDescription>
                    <AlertDialogDescription>{t('outAmount')} : <DialogInput type="number" value={incomingAmount} onChange={(e) => setIncomingAmount(e.target.value)} /> {transaction.exchangeRate.incomingCurrency.name}</AlertDialogDescription>
                    <AlertDialogDescription className='w-full'>{t('notes')} : <Textarea value={note} onChange={(e) => setNote(e.target.value)} /> </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel> {t('cancel')}</AlertDialogCancel>
                    <AlertDialogAction onClick={onClickHandler}>{t('save')}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
