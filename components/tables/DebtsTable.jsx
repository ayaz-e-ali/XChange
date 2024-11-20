'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Button } from "../ui/button"
import { deleteDebts } from "@/actions/debts"
import { formatCurrency } from "@/lib/utils"

export default function DebtsTable({ debts, revalidate }) {

    const handleDeleteButton = async (e, id) => {
        await deleteDebts(id);
        revalidate()
    }

    return (
        <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
                <TableRow>
                    <TableHead className="text-right"></TableHead>
                    <TableHead className="text-right">تاريخ الاضافة</TableHead>
                    <TableHead className="text-right">الملكية</TableHead>
                    <TableHead className="text-right">المبلغ</TableHead>
                    <TableHead className="text-right">االاسم</TableHead>
                    <TableHead className="text-right">الرقم</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {debts[0] && debts.map((debt) => (
                    <TableRow key={debt.id}>
                        <TableCell className="text-right font-medium">
                            <Button size="xs" onClick={(e) => handleDeleteButton(e, debt.id)} variant='destructive'>حذف الدين</Button>
                        </TableCell>
                        <TableCell className="text-right font-medium">{debt.createDate.toDateString()}</TableCell>
                        <TableCell className="text-right font-medium">
                            {debt.forUs ? "لنا" : "لهم"}
                        </TableCell>
                        <TableCell className="flex place-self-end font-medium">
                            {formatCurrency(debt.amount)} {debt.currency.code}
                        </TableCell>
                        <TableCell className="text-right font-medium">{debt.name}</TableCell>
                        <TableCell className="text-right font-medium">{debt.id}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}