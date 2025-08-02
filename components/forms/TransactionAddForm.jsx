'use client';

import { useFormState } from 'react-dom';
import { Input } from '../ui/input';
import Submit from '../ui/SubmitButton';
import { addTransaction } from '@/actions/transaction';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

const initState = { message: null };

export default function TransactionsAddForm({ currencies }) {
    let [formState, action] = useFormState(addTransaction, initState);
    const formRef = useRef();
    const { toast } = useToast();
    const t = useTranslations('DashBoard');

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
                    title: "تحويلات",
                    description: formState.message,
                });
                resetForm(formRef, ["exchangeRate", "outgoingCurrencyId", "incomingCurrencyId"]);
            }
            formState.message = null;
        }
    }, [formState, formState.message, toast]);

    return (
        <form ref={formRef} action={action} className="p-3 flex flex-col gap-4 items-end">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div className="grid w-full gap-2 ar:child:text-right">
                    <Label>{t('outAmount')}</Label>
                    <Input tabIndex="2" className="font-bold child:p-2 text-xl" required name="outgoingAmount" type="number" />
                </div>
                <div className="grid w-full gap-2 ar:child:text-right">
                    <Label>{t('inAmount')}</Label>
                    <Input tabIndex="1" className="font-bold child:p-2 text-xl" required name="incomingAmount" type="number" />
                </div>
                <div className="grid w-full gap-2 ar:child:text-right">
                    <Label>{t('outCurrency')}</Label>
                    <Select name="outgoingCurrencyId" defaultValue='2' >
                        <SelectTrigger tabIndex="4" className="w-full">
                            <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent className="ar:child:text-right">
                            {currencies.map(currency =>
                                <SelectItem key={currency.currencyId} value={currency.currencyId.toString()}>{currency.name}</SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid w-full gap-2 ar:child:text-right">
                    <Label>{t('inCurrency')}</Label>
                    <Select name="incomingCurrencyId" defaultValue='1'>
                        <SelectTrigger tabIndex="3" className="w-full">
                            <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent className="ar:child:text-right">
                            {currencies.map(currency =>
                                <SelectItem key={currency.currencyId} value={currency.currencyId.toString()}>{currency.name}</SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid w-full gap-2 ar:child:text-right">
                    <Label>{t('name')}</Label>
                    <Input tabIndex="6" className="font-bold child:p-2 text-xl" size="lg" name="name" type="text" />
                </div>
                <div className="grid w-full gap-2 ar:child:text-right">
                    <Label>{t('exchangeRate')}</Label>
                    <Input tabIndex="5" className="font-bold child:p-2 text-xl" required size="lg" name="exchangeRate" type="number" />
                </div>
            </div>
            <div className="grid w-full gap-2 ar:child:text-right">
                <Label>{t('notes')}</Label>
                <Textarea tabIndex="7" size="lg" name="note" type="text" />
            </div>

            <Submit tabIndex="8" label={t('add')} />
        </form>
    );
}


const resetForm = (formRef, fieldsToKeep = []) => {
    const elements = formRef.current.elements;
    for (let element of elements) {
        if (element.name && !fieldsToKeep.includes(element.name)) {
            element.value = ""; // Reset value for all fields not in the `fieldsToKeep` array
        }
    }
};