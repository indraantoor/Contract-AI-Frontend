'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '../shared/UserButton';

const navItems: { name: string; href: string; requiresAuth?: boolean }[] = [
  { name: 'Pricing', href: '/pricing', requiresAuth: false },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-[5000] w-full border-b bg-black px-4 backdrop-blur">
      <div className="flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link
            href={'/'}
            className="mr-6 flex items-center space-x-2 text-lg font-bold text-white"
          >
            Contract AI
          </Link>
          <nav className="flex items-center space-x-7 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-white transition-colors hover:underline',
                  pathname === item.href ? 'font-semibold' : 'font-normal'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <UserButton />
      </div>
    </header>
  );
}
