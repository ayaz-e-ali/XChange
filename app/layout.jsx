import React from 'react'
import "./globals.css";

// TODO: add a local font

export const metadata = {
  title: "XChange",
  description: "created by mohammed al-ali",
};

export default function BaseLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  )
}
