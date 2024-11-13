'use client';

import { cn } from '@/lib/utils';
import { FileText, Home, LayoutDashboard, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ElementType } from 'react';

export const Sidebar = () => {
  return (
    <aside className="hidden min-h-screen w-[280px] border-r border-gray-200 bg-white text-black lg:block">
      {SidebarContent()}
    </aside>
  );
};

const SidebarContent = () => {
  const pathname = usePathname();

  const sidebarItems = [
    {
      icon: Home,
      label: 'Home',
      href: '/',
    },
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      icon: FileText,
      label: 'Results',
      href: '/dashboard/results',
    },
    {
      icon: Settings,
      label: 'Settings',
      href: '/dashboard/settings',
    },
  ];

  return (
    <div className="flex h-full flex-col bg-white text-black">
      <nav className="flex-grow p-6">
        <ul role="list" className="flex flex-grow flex-col">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {sidebarItems.map((item) => (
                <Navlink key={item.label} path={pathname} link={item} />
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const Navlink = ({
  path,
  link,
}: {
  path: string;
  link: {
    icon: ElementType;
    label: string;
    href: string;
    target?: string;
  };
}) => {
  return (
    <li key={link.label}>
      <Link
        href={link.href}
        target={link.target}
        className={cn(
          'group flex h-9 items-center gap-x-3 rounded-md px-3 text-sm font-semibold leading-5 text-black',
          path === link.href ? 'bg-gray-200' : 'hover:bg-gray-200'
        )}
      >
        <link.icon className="size-4 shrink-0" />
        {link.label}
      </Link>
    </li>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  );
}
