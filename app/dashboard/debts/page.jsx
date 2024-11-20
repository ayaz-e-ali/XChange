'use client'
import { getCurrencies } from '@/actions/currency';
import { getDebts } from '@/actions/debts';
import DebtsAddForm from '@/components/forms/DebtsAddForm'
import DebtsTable from '@/components/tables/DebtsTable';
import React from 'react'
import { useEffect, useState } from 'react';

export default function Page() {

  const [debts, setDebts] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    (async () => {
      await revalidate()
    })();
  }, []);

  const revalidate = async () => {
    const debtsData = await getDebts()
    const currenciesData = await getCurrencies()
    setDebts(debtsData)
    setCurrencies(currenciesData)
  }

  return (
    <div className="grid grid-cols-4 h-full">
      <div className="col-span-3 mr-8">
        <DebtsTable debts={debts} revalidate={revalidate} />
      </div>
      <div className="col-span-1 border-l-8">
        <DebtsAddForm currencies={currencies} revalidate={revalidate} />
      </div>
    </div>
  )
}
