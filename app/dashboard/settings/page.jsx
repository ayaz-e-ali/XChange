'use client';
import { getCurrencies } from '@/actions/currency';
import AppNameChangeForm from '@/components/forms/AppNameChangeForm';
import CurrencyAddForm from '@/components/forms/currencyAddForm';
import StockManageForm from '@/components/forms/StockManageForm';
import ThemeToggle from '@/components/ui/themeToggle';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    (async () => {
      await revalidate();
    })();
  }, []);

  const revalidate = async () => {
    const data = await getCurrencies();
    setCurrencies(data);
  };


  return (
    <div className="flex items-center justify-center h-full gap-10 child:w-56 child:h-60 child:bg-sidebar child:p-5 child:rounded-3xl child:flex child:items-center child:justify-center">
      <AppNameChangeForm />
      <CurrencyAddForm />
      <div className="flex flex-col items-center justify-center gap-4 ">
        <p>الثيم الداكن و المضيئ</p>
        <ThemeToggle />
      </div>
      <StockManageForm currencies={currencies} revalidate={revalidate} />
    </div>
  );
}