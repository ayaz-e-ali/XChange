'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"
import { Button } from "../ui/button"
import { deleteTransaction } from "@/actions/transaction"
import { TransactionDialog } from "../dialogs/TransactionDialog"

export default function TransactionsTable({ transactions, revalidate }) {

    const handleDeleteButton = async (e, transaction) => {
        e.stopPropagation();
        await deleteTransaction(transaction.transactionId);
        revalidate()
    }

    return (
        <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
                <TableRow>
                    <TableHead className="text-right"></TableHead>
                    <TableHead className="text-right">ملاحظات</TableHead>
                    <TableHead className="text-right">تاريخ الاضافة</TableHead>
                    <TableHead className="text-right">سعر الصرف</TableHead>
                    <TableHead className="text-right">القيمة الصادرة</TableHead>
                    <TableHead className="text-right">القيمة الواردة</TableHead>
                    <TableHead className="text-right">الاسم</TableHead>
                    <TableHead className="text-right">الرقم</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((transaction) => (
                    <TransactionDialog revalidate={revalidate} key={transaction.transactionId} transaction={transaction}>
                        <TableRow >
                            <TableCell className="text-right w-8 font-medium">
                                <Button size="xs" onClick={(e) => handleDeleteButton(e, transaction)} variant='destructive'>حذف</Button>
                            </TableCell>
                            <TableCell dir={"rtl"} className="text-right font-medium max-w-72 line-clamp-1 leading-8">{transaction.note}</TableCell>
                            <TableCell className="text-right font-medium">{transaction.createDate.toLocaleDateString('ar-EG')}</TableCell>
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
    )
}