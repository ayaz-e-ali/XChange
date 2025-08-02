'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Check, X } from "lucide-react"
import { Button } from "../ui/button"
import { deleteUser } from "@/actions/user"
import { useLocale, useTranslations } from "next-intl"

export default function UsersTable({ users, onClick, revalidate }) {
    const t = useTranslations('Users');
    const locale = useLocale()

    const handleDeleteButton = async (e, user) => {
        e.stopPropagation();
        await deleteUser(user.id, user.userName);
        revalidate()
    }

    return (
        <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
                <TableRow>
                    <TableHead className="text-right"></TableHead>
                    <TableHead className="text-right">{t('dateAdded')}</TableHead>
                    <TableHead className="text-right">{t('admin')}</TableHead>
                    <TableHead className="text-right">{t('userName')}</TableHead>
                    <TableHead className="text-right">{t('id')}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users[0] && users.map((user) => (
                    <TableRow key={user.id} onClick={() => onClick(user)}>
                        <TableCell className="text-right font-medium">
                            <Button size="xs" onClick={(e) => handleDeleteButton(e, user)} variant='destructive'>{t('delete')}</Button>
                        </TableCell>
                        <TableCell className="text-right font-medium">{user.createdAt.toLocaleString(locale == 'en' ? 'en' : 'ar-EG', { hour12: true, year: '2-digit', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</TableCell>
                        <TableCell className="flex place-self-end font-medium">
                            {user.isAdmin ? <Check color="green" /> : <X color="red" />}
                        </TableCell>
                        <TableCell className="text-right font-medium">{user.userName}</TableCell>
                        <TableCell className="text-right font-medium">{user.id}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}