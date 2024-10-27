import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/appSideBar';
import Navbar from '@/components/nav/navbar';
import { getCurrentUser } from '@/lib/auth';

export default async function DashboardLayout({ children }) {
  const user = await getCurrentUser()

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <Navbar />
      <main className='container mt-16'>
        {children}
      </main>
    </SidebarProvider>
  );
}
