'use client'

import { usePathname } from "next/navigation";

const items = [
    {
        title: "المستخدمون",
        url: "/dashboard/users",
    },
    {
        title: "ايداع",
        url: "/dashboard",
    },
    {
        title: "عمليات الايداع",
        url: "/dashboard/search",
    },
    {
        title: "الديون",
        url: "/dashboard/debts",
    },
    {
        title: "الاعدادات",
        url: "/dashboard/settings",
    },
];

export default function PageLabel() {

    const pathname = usePathname()
    const { title } = items.filter(item => item.url == pathname)[0]

    return <div className='md:flex hidden justify-center items-center gap-8 '>
        <p className='flex flex-col items-center hover:text-primary text-primary/70 transition-colors gap-1'>
            <span className='text-xl font-bold'>
                {title}
            </span>
        </p>
    </div>;
}
