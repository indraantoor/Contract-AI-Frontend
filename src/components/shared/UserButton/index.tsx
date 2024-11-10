import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdownMenu';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { logout } from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icons } from '../icons';

function googleSignIn(): Promise<void> {
  return new Promise((resolve) => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    resolve();
  });
}

export function UserButton() {
  const { user } = useCurrentUser();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    window.location.reload();
    setInterval(() => router.push('/'), 1000);
  }

  return (
    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
      {user ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 rounded-full">
                <Avatar className="size-8">
                  <AvatarImage src={user?.profilePicture || ''} />
                  <AvatarFallback>
                    {user?.displayName?.charAt(0) || ''}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem className="flex flex-col items-start gap-0">
                <div className="text-sm font-bold">{user?.displayName}</div>
                <div className="text-xs text-muted-foreground">
                  {user?.email}
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={'/dashboard'}>
                  <Icons.dashboard />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={'/dashboard/settings'}>
                  <Icons.settings />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <Icons.logout />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Button onClick={googleSignIn}>Sign In</Button>
        </>
      )}
    </div>
  );
}
