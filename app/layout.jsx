import React from 'react'
import "./globals.css";
import { Toaster } from '@/components/ui/toaster';
import ApplyTheme from '@/components/nav/ApplyTheme';

// TODO: add a local font

export const metadata = {
  title: "XChange",
  description: "created by mohammed al-ali",
};

export default function BaseLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ApplyTheme />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
