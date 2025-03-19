'use client';

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { AddToStock, SubtractFromStock } from "@/actions/stock";
import { cn } from "@/lib/utils";
import { set } from "zod";

export function ManageStockDialog({ children, revalidate, currencies }) {
    const [amount, setAmount] = useState(0);
    const [currency, setCurrency] = useState("1");
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);

    const data = currencies.map((currency) => ({
        name: currency.name,
        value: currency.Stock[0]?.amount || 0,
    }));

    const handleAdd = async () => {
        const { message, error } = await AddToStock(+amount, +currency);
        setMessage(message);
        setError(error);
        revalidate();
    };

    const handleSubtract = async () => {
        const { message, error } = await SubtractFromStock(+amount, +currency);
        setMessage(message);
        setError(error);
        revalidate();
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className="child:mx-auto min-w-max">
                <AlertDialogHeader >
                    <AlertDialogTitle>ادارة الخزينة</AlertDialogTitle>
                    <div className="grid grid-cols-2 items-center gap-10">
                        <AlertDialogDescription>
                            <div className="space-y-2 ">
                                <h4 className="text-lg">الخزينة</h4>
                                {data.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between border-b ">
                                        <div className="flex items-center p-1 gap-2">
                                            <span className="text-md">{item.name}</span>
                                        </div>
                                        <div className="font-semibold">
                                            {item.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AlertDialogDescription>

                        <div className="flex flex-col gap-3 w-full items-center">
                            <AlertDialogDescription className='flex gap-2 items-center w-full'>
                                القيمة: <Input tabIndex="2" className="flex-1 px-2 py-1 text-sm" required value={amount} onChange={(e) => setAmount(e.target.value)} type="number" />
                            </AlertDialogDescription>
                            <AlertDialogDescription className='flex gap-2 items-center w-full'>
                                العملة: <CurrencySelector currencies={currencies} onChange={(value) => setCurrency(value)} />
                            </AlertDialogDescription>
                            <div className="flex gap-2">
                                <AlertDialogDescription>
                                    <Button onClick={handleAdd}>اضافة</Button>
                                </AlertDialogDescription>
                                <AlertDialogDescription>
                                    <Button onClick={handleSubtract} variant='destructive'>سحب</Button>
                                </AlertDialogDescription>
                            </div>
                            {message && <p className={cn('text-right text-sm', error && 'text-red-600')}>{message}</p>}
                        </div>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>خروج</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

function CurrencySelector({ currencies, value, onChange }) {
    return (
        <Select name="outgoingCurrencyId" defaultValue='1' onValueChange={onChange}>
            <SelectTrigger className=" px-2 py-1 text-sm" >
                <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent className="child:text-right">
                {currencies.map(currency =>
                    <SelectItem key={currency.currencyId} value={currency.currencyId.toString()}>{currency.name}</SelectItem>
                )}
            </SelectContent>
        </Select>
    );
}