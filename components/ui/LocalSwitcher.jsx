'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Button } from './button';

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
            <Button
                variant="secondary"
                onClick={() => switchLocale('en')}
                className={locale === 'en' ? 'font-bold' : ''}
            >
                English
            </Button>
            <Button
                variant="secondary"
                onClick={() => switchLocale('ar')}
                className={locale === 'ar' ? 'font-bold' : ''}>
                العربية
            </Button>
        </div>
    );
}