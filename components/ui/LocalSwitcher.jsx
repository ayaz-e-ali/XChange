'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LocaleSwitcher() {
    const router = useRouter();
    const locale = useLocale();

    const switchLocale = (newLocale) => {
        // Set cookie for future requests
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
        // Refresh the page to apply changes
        router.refresh();
    };

    return (
        <div className="flex gap-2">
            <button
                onClick={() => switchLocale('en')}
                className={locale === 'en' ? 'font-bold' : ''}
            >
                English
            </button>
            <button
                onClick={() => switchLocale('ar')}
                className={locale === 'ar' ? 'font-bold' : ''}>
                العربية
            </button>
        </div>
    );
}