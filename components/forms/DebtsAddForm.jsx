'use client'
import { useFormState } from 'react-dom'
import React from 'react'
import { Input } from '../ui/input'
import { Label } from '@radix-ui/react-label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import Submit from '../ui/SubmitButton'
import { addDebt } from '@/actions/debts'
import { useToast } from '@/hooks/use-toast'
import { useEffect } from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

const initState = { message: null }

export default function DebtsAddForm({ currencies, revalidate }) {
  const [formState, action] = useFormState(addDebt, initState)

  const { toast } = useToast()

  useEffect(() => {
    if (formState.message) {
      if (formState.error)
        toast({
          title: "خطأ",
          description: formState.message,
          variant: "destructive"
        });
      else
        toast({
          title: "ديون",
          description: formState.message,
        });
      formState.message = null
    }
    revalidate()
  }, [formState.message])

  return (
    <form action={action} className="p-3 flex flex-col gap-4 items-end">
      <div className="grid w-full gap-2 child:text-right">
        <Label>الاسم</Label>
        <Input tabIndex="1" className="" name="Name" type="text" />
      </div>
      <div className="grid w-full gap-2 child:text-right">
        <Label>القيمة</Label>
        <Input tabIndex="2" className="font-bold text-xl" required name="Amount" type="number" />
      </div>
      <div className="grid w-full gap-2 child:text-right">
        <Label>العملة</Label>
        <Select name="CurrencyId" defaultValue={"1"}>
          <SelectTrigger tabIndex="3" className="w-full">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent className="child:text-right">
            {currencies.map(currency =>
              <SelectItem key={currency.currencyId} value={currency.currencyId.toString()}>{currency.name}</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
      <RadioGroup className="flex gap-8" name="forUs" defaultValue="forUs">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="forUs" id="forUs" />
          <Label htmlFor="forUs">لنا</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="forThem" id="forThem" />
          <Label htmlFor="forThem">لهم</Label>
        </div>
      </RadioGroup>
      <Submit label={"اضافة"} />
    </form>
  )
}
