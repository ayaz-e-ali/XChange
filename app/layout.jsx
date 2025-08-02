import React from 'react'
import "./globals.css";
import { Toaster } from '@/components/ui/toaster';
import ApplyTheme from '@/components/nav/ApplyTheme';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { cn } from '@/lib/utils';


export const metadata = {
  title: "XChange",
  description: "created by mohammed al-ali",
};

export default async function BaseLayout({ children }) {

  const locale = await getLocale();

  return (
    <html lang={locale} >
      <body className={cn(locale, "antialiased")} >
        <NextIntlClientProvider>
          <ApplyTheme />
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}


export function getDirection(locale) {
  return locale === 'ar' ? 'rtl' : 'ltr';
}