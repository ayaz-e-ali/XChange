'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { Button } from "../ui/button";
import { deleteTransaction } from "@/actions/transaction";
import { TransactionDialog } from "../dialogs/TransactionDialog";
import { useLocale, useTranslations } from "next-intl";

/**
 * 
 * @param {{transactions : {createDate:Date}}} param0 
 * @returns 
 */
export default function TransactionsTable({ transactions, revalidate }) {
    const t = useTranslations('Search');
    const locale = useLocale();

    const handleDeleteButton = async (e, transaction) => {
        e.stopPropagation();
        await deleteTransaction(transaction.transactionId);
        revalidate();
    };

    return (
        <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
                <TableRow>
                    <TableHead className="text-right"></TableHead>
                    <TableHead className="text-right">{t('notes')}</TableHead>
                    <TableHead className="text-right">{t('dateAdded')}</TableHead>
                    <TableHead className="text-right">{t('exchangeRate')}</TableHead>
                    <TableHead className="text-right">{t('outAmount')}</TableHead>
                    <TableHead className="text-right">{t('inAmount')}</TableHead>
                    <TableHead className="text-right">{t('name')}</TableHead>
                    <TableHead className="text-right">{t('id')}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((transaction) => (
                    <TransactionDialog revalidate={revalidate} key={transaction.transactionId} transaction={transaction}>
                        <TableRow >
                            <TableCell className="text-right w-8 font-medium">
                                <Button size="xs" onClick={(e) => handleDeleteButton(e, transaction)} variant='destructive'>{t('delete')}</Button>
                            </TableCell>
                            <TableCell dir={"rtl"} className="text-right font-medium max-w-72 line-clamp-1 leading-8">{transaction.note}</TableCell>
                            <TableCell className="text-right font-medium">{transaction.createDate.toLocaleString(locale == 'en' ? 'en' : 'ar-EG', { hour12: true, year: '2-digit', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })} </TableCell>
                            <TableCell className="text-right font-medium">{formatCurrency(transaction.exchangeRate.exchangeRate)}</TableCell>
                            <TableCell className="text-right font-medium">{formatCurrency(transaction.outgoingAmount)} {transaction.exchangeRate.outgoingCurrency.code}</TableCell>
                            <TableCell className="text-right font-medium">{formatCurrency(transaction.incomingAmount)} {transaction.exchangeRate.incomingCurrency.code}</TableCell>
                            <TableCell className="text-right font-medium">{transaction.name}</TableCell>
                            <TableCell className="text-right font-medium">{transaction.transactionId}</TableCell>
                        </TableRow>
                    </TransactionDialog>
                ))}
            </TableBody>
        </Table>
    );
}