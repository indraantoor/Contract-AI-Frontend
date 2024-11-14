'use client';

import UserContracts from '@/components/dashboard/UserContracts';

export default function Dashboard() {
  return (
    <div className="flex w-full flex-col items-center justify-center px-8">
      <UserContracts />
    </div>
  );
}
