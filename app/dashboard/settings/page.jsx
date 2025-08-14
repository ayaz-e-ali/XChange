'use client';
import { getCurrencies } from '@/actions/currency';
import AppNameChangeForm from '@/components/forms/AppNameChangeForm';
import CurrencyAddForm from '@/components/forms/currencyaddform';
import StockManageForm from '@/components/forms/StockManageForm';
import LocaleSwitcher from '@/components/ui/LocalSwitcher';
import ThemeToggle from '@/components/ui/themeToggle';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const [currencies, setCurrencies] = useState([]);

  const t = useTranslations('Settings');

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
        <p>{t('theme')}</p>
        <ThemeToggle />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 ">
        <p>{t('language')}</p>
        <LocaleSwitcher />
      </div>
      <StockManageForm currencies={currencies} revalidate={revalidate} />
    </div>
  );
}