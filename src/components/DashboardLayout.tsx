
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto bg-white m-0 md:m-4 md:rounded-design-lg md:shadow-design transition-all">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
