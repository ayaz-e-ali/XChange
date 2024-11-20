'use client';
import { getTransaction } from '@/actions/transaction';
import TransactionsTable from '@/components/tables/TransactionsTable';
import { Input } from '@/components/ui/input';
import Submit from '@/components/ui/SubmitButton';
import { Label } from '@radix-ui/react-label';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({});

  const [start, setStart] = useState(formatDate(new Date()));
  const [finish, setFinish] = useState(formatDate(new Date()));

  const [name, setName] = useState('');

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
          <h3 className="text-right text-lg">بحث</h3>
          <div className="flex items-center flex-row-reverse w-full gap-2 child:text-right text-sm relative">
            <Label>من</Label>
            <Input value={start} onChange={(e) => setStart(e.target.value)} className="font-bold child:p-2 cursor-pointer" size="lg" type="date" />
            <X className='absolute right-10 top-2 cursor-pointer' onClick={() => { setStart(""); }} />
          </div>
          <div className="flex items-center flex-row-reverse w-full gap-2 child:text-right text-sm relative">
            <Label>الى</Label>
            <Input value={finish} onChange={(e) => setFinish(e.target.value)} className="font-bold child:p-2 cursor-pointer" size="lg" type="date" />
            <X className='absolute right-10 top-2 cursor-pointer' onClick={() => { setFinish(""); }} />
          </div>
          <div className="flex items-center flex-row-reverse w-full gap-2 child:text-right text-sm relative">
            <Label>الاسم</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="font-bold child:p-2 pr-12" size="lg" />
            <X className='absolute right-10 top-2 cursor-pointer ' onClick={() => { setName(""); }} />
          </div>
          <Submit label={'فرز'} onClick={onClickHandler} />
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 bg-sidebar border-sidebar-border border-t fixed bottom-0 left-56 h-40 w-[calc(100%-14rem)] text-right">
        {
          Object.keys(stats).map((key, idx) => (
            <div className="bg-sidebar-accent px-4 py-2 m-4 rounded-md space-y-1" key={idx}>
              <h2> : {key}</h2>
              <p>اجمالي المبلغ الوارد : {stats[key].incomingAmount}</p>
              <p>اجمالي المبلغ الصادر : {stats[key].outgoingAmount}</p>
              <p>الفرق : {stats[key].difference}</p>
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