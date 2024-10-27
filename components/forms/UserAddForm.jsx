'use client'
import { useFormState } from 'react-dom'
import { Input } from '../ui/input'
import Submit from '../ui/SubmitButton'
import { Checkbox } from '../ui/checkbox'
import { AddUser } from '@/actions/user'

const initState = { message: null }

export default function UserAddForm() {
    const [formState, action] = useFormState(AddUser, initState)

    return (
        <form action={action} className="p-3 flex flex-col gap-4 items-end">
            <h3 className="text-right">بيانات المستخدم</h3>
            <Input required size="lg" name="userName" type="text" placeholder="اسم المستخدم" />
            <Input name="password" required size="lg" type="text" placeholder="كلمة السر" />
            <div className="flex items-center space-x-2">
                <label
                    htmlFor="isAdmin"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    هل المستخدم ادمن
                </label>
                <Checkbox id="isAdmin" name="isAdmin" />
            </div>
            <Submit label={'اضافة'} />
            {formState?.message && <p>{formState.message}</p>}
        </form>
    )
}
