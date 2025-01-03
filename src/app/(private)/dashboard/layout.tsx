import { ProtectedLayout } from '@/components/dashboard/ProtectedLayout';
import DashboardLayout from '@/components/dashboard/Sidebar';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ProtectedLayout>
      <DashboardLayout>
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-white">
          {children}
        </main>
      </DashboardLayout>
    </ProtectedLayout>
  );
}
