'use client';
import { getTransaction } from '@/actions/transaction';
import TransactionsTable from '@/components/tables/TransactionsTable';
import { Input } from '@/components/ui/input';
import Submit from '@/components/ui/SubmitButton';
import { Label } from '@radix-ui/react-label';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({});

  const [start, setStart] = useState(formatDate(new Date()));
  const [finish, setFinish] = useState(formatDate(new Date()));

  const [name, setName] = useState('');

  const t = useTranslations('Search');

  const onClickHandler = async () => {
    const data = await getTransaction(start, finish, name);
    setTransactions(data.transactions);
    setStats(data.stats)
  };

  useEffect(() => {
    (async () => {
      await revalidate()
    })();
  }, []);

  const revalidate = async () => {
    const data = await getTransaction(start, finish);
    setTransactions(data.transactions);
    setStats(data.stats)
  }

  return (
    <div className="grid grid-cols-4 h-full">
      <div className="col-span-3 pr-4">
        <TransactionsTable transactions={transactions} revalidate={revalidate} />
      </div>
      <div className="col-span-1 border-l-8">
        <div className="p-3 flex flex-col gap-4 items-end">
          <h3 className="ar:text-right w-full text-lg">{t('search')}</h3>
          <div className="flex items-center ar:flex-row-reverse w-full gap-2 ar:child:text-right text-sm relative">
            <Label>{t('from')}</Label>
            <Input value={start} onChange={(e) => setStart(e.target.value)} className="font-bold child:p-2 cursor-pointer" size="lg" type="date" />
            <X className='absolute ar:right-10 en:right-2 top-2 cursor-pointer' onClick={() => { setStart(""); }} />
          </div>
          <div className="flex items-center ar:flex-row-reverse w-full gap-2 ar:child:text-right text-sm relative">
            <Label>{t('to')}</Label>
            <Input value={finish} onChange={(e) => setFinish(e.target.value)} className="font-bold child:p-2 cursor-pointer" size="lg" type="date" />
            <X className='absolute ar:right-10 en:right-2 top-2 cursor-pointer' onClick={() => { setFinish(""); }} />
          </div>
          <div className="flex items-center ar:flex-row-reverse w-full gap-2 ar:child:text-right text-sm relative">
            <Label>{t('name')}</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="font-bold child:p-2 pr-12" size="lg" />
            <X className='absolute ar:right-10 en:right-2 top-2 cursor-pointer ' onClick={() => { setName(""); }} />
          </div>
          <Submit label={t('filter')} onClick={onClickHandler} />
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 bg-sidebar border-sidebar-border border-t fixed bottom-0 left-56 h-40 w-[calc(100%-14rem)] ar:text-right">
        {
          Object.keys(stats).map((key, idx) => (
            <div className="bg-sidebar-accent px-4 py-2 m-4 rounded-md space-y-1" key={idx}>
              <h2> : {key}</h2>
              <p>{t('totalIncoming')} : {stats[key].incomingAmount}</p>
              <p>{t('totalOutgoing')} : {stats[key].outgoingAmount}</p>
              <p>{t('netAmount')} : {stats[key].difference}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};