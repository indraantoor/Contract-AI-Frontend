'use client';

import { Loader2, LockIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useModalStore } from '@/store/zustand';
import Link from 'next/link';

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex items-center justify-center">
          <Loader2 className="mr-2 size-4 animate-spin" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <AuthCard />
      </div>
    );
  }

  return <>{children}</>;
}

export default function AuthCard() {
  const { openModal } = useModalStore();

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <div className="flex flex-col sm:flex-row">
        <div className="flex items-center justify-center bg-primary/10 p-4 sm:w-1/4">
          <LockIcon className="size-16 text-primary" />
        </div>
        <div className="p-4 sm:w-3/4">
          <CardHeader className="space-y-1 px-0 pb-2">
            <CardTitle className="text-2xl font-bold">
              Authentication required
            </CardTitle>
            <CardDescription>
              You need to be logged in to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 py-2">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                onClick={() => openModal('connectAccountModal')}
                className="flex-1"
                variant={'outline'}
              >
                Continue with Google
              </Button>
              <Link href={'/'} className="flex-1">
                <Button className="w-full">Back to Home</Button>
              </Link>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
