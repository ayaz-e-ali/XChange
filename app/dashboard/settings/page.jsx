import AppNameChangeForm from '@/components/forms/AppNameChangeForm'
import CurrencyAddForm from '@/components/forms/currencyAddForm'
import ThemeToggle from '@/components/ui/themeToggle'
import React from 'react'

export default function page() {

  return (
    <div className="flex items-center justify-center h-full gap-10 child:w-56 child:h-60 child:bg-sidebar child:p-5 child:rounded-3xl child:flex child:items-center child:justify-center">
      <AppNameChangeForm />
      <CurrencyAddForm />
      <div className="flex flex-col items-center justify-center gap-4 ">
        <p>الثيم الداكن و المضيئ</p>
        <ThemeToggle />
      </div>
    </div>
  )
}