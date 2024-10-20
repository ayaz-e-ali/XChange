import { Roboto } from 'next/font/google';
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/appSideBar';
import Navbar from '@/components/nav/navbar';

const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata = {
  title: "XChange",
  description: "created by mohammed al-ali",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <SidebarProvider>
          <AppSidebar />
          <Navbar />
          <main className='container mt-16'>
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
