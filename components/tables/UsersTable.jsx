'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Check, X } from "lucide-react"
import { Button } from "../ui/button"
import { deleteUser } from "@/actions/user"

export default function UsersTable({ users }) {

    return (
        <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
                <TableRow>
                    <TableHead className="text-right"></TableHead>
                    <TableHead className="text-right">تاريخ الاضافة</TableHead>
                    <TableHead className="text-right">ادمن</TableHead>
                    <TableHead className="text-right">اسم المستخدم</TableHead>
                    <TableHead className="text-right">الرقم</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="text-right font-medium">
                            <Button onClick={() => { deleteUser(user.id) }} variant='destructive'>حذف المستخدم</Button>
                        </TableCell>
                        <TableCell className="text-right font-medium">{user.createdAt.toDateString()}</TableCell>
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