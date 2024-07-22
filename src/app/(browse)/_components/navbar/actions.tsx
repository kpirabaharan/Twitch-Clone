import { SignInButton, UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { ClapperboardIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { SocketStatus } from './socket-status';

export const Actions = async () => {
  const user = await currentUser();

  return (
    <div className='flex flex-row items-center justify-end gap-x-2'>
      <SocketStatus />
      {!!user && (
        <Button variant={'outline'} size={'sm'} asChild>
          <Link href={`/u/${user.username}`}>
            <ClapperboardIcon className='h-5 w-5' />
            <span className='hidden lg:ml-2 lg:block'>Dashboard</span>
          </Link>
        </Button>
      )}
      {!user && (
        <SignInButton>
          <Button size={'sm'} variant={'tertiary'}>
            Log In
          </Button>
        </SignInButton>
      )}
      {!!user && <UserButton />}
    </div>
  );
};
