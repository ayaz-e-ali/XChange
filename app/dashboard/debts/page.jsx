'use client';
import { getCurrencies } from '@/actions/currency';
import { getDebts } from '@/actions/debts';
import DebtsAddForm from '@/components/forms/DebtsAddForm';
import DebtsTable from '@/components/tables/DebtsTable';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useEffect, useState } from 'react';

export default function Page() {
  const [debts, setDebts] = useState([]);
  const [stats, setStat] = useState({});
  const [currencies, setCurrencies] = useState([]);

  const t = useTranslations('Debts');

  useEffect(() => {
    (async () => {
      await revalidate();
    })();
  }, []);

  const revalidate = async () => {
    const debtsData = await getDebts();
    const currenciesData = await getCurrencies();
    setDebts(debtsData.debts);
    setStat(debtsData.stats);
    setCurrencies(currenciesData);
  };

  return (
    <div className="grid grid-cols-4 h-full">
      <div className="col-span-3 mr-8">
        <DebtsTable debts={debts} revalidate={revalidate} />
      </div>
      <div className="col-span-1 border-l-8">
        <DebtsAddForm currencies={currencies} revalidate={revalidate} />
      </div>
      <div className="flex items-center justify-center gap-4 bg-sidebar border-sidebar-border border-t fixed bottom-0 left-56 h-40 w-[calc(100%-14rem)] ar:text-right">
        {
          Object.keys(stats).map((key, idx) => (
            <div className="bg-sidebar-accent px-4 py-2 m-4 rounded-md space-y-1" key={idx}>
              <h2> : {key}</h2>
              <p>{t('totalForUs')} : {stats[key].debtsForUs}</p>
              <p>{t('totalForThem')} : {stats[key].debtsForThem}</p>
              <p>{t('difference')} : {stats[key].balance}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}
