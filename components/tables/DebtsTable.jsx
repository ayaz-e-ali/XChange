'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Button } from "../ui/button";
import { deleteDebts } from "@/actions/debts";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";
import { DebtsDialog } from "../dialogs/DebtsDialog";

export default function DebtsTable({ debts, revalidate }) {
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

    const handleDeleteButton = async (e, id) => {
        await deleteDebts(id);
        revalidate();
    };

    const toggleSortOrder = () => {
        setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const sortedDebts = [...debts].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.forUs === b.forUs ? 0 : a.forUs ? -1 : 1;
        } else {
            return a.forUs === b.forUs ? 0 : a.forUs ? 1 : -1;
        }
    });

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-right"></TableHead>
                    <TableHead className="text-right"></TableHead>
                    <TableHead className="text-right">تاريخ الاضافة</TableHead>
                    <TableHead className="text-right cursor-pointer" onClick={toggleSortOrder}>
                        الملكية {sortOrder === 'asc' ? '↑' : '↓'}
                    </TableHead>
                    <TableHead className="text-right">المبلغ</TableHead>
                    <TableHead className="text-right">االاسم</TableHead>
                    <TableHead className="text-right">الرقم</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {sortedDebts[0] && sortedDebts.map((debt) => (
                    <DebtsDialog key={debt.id} debt={debt} revalidate={revalidate}>
                        <TableRow >
                            <TableCell className="text-right w-8 font-medium">
                                <Button size="xs" onClick={(e) => handleDeleteButton(e, debt.id)} variant='destructive'>حذف </Button>
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
                    </DebtsDialog>

                ))}
            </TableBody>
        </Table>
    );
}