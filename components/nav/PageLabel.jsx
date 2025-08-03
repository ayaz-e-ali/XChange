'use client'

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import LocaleSwitcher from '../ui/LocalSwitcher';

export default function PageLabel() {
    const pathname = usePathname()
    const t = useTranslations('Nav');

    const items = [
        {
            title: t('users'),
            url: "/dashboard/users",
        },
        {
            title: t('dashboard'),
            url: "/dashboard",
        },
        {
            title: t('search'),
            url: "/dashboard/search",
        },
        {
            title: t("debts"),
            url: "/dashboard/debts",
        },
        {
            title: t("settings"),
            url: "/dashboard/settings",
        },
    ];

    const { title } = items.filter(item => item.url == pathname)[0]

    return <div className='md:flex hidden justify-center items-center gap-8 '>
        <p className='flex flex-col items-center hover:text-primary text-primary/70 transition-colors gap-1'>
            <span className='text-xl font-bold flex gap-4'>
                {title}
            </span>
        </p>
    </div>;
}
