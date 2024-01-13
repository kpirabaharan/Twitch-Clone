import { Button } from '@/components/ui/button';
import { UserButton, currentUser } from '@clerk/nextjs';
import { ClapperboardIcon } from 'lucide-react';
import Link from 'next/link';

export const Actions = async () => {
  const user = await currentUser();

  return (
    <div className='flex flex-row items-center justify-end gap-x-2'>
      <Button variant={'outline'} size={'sm'} asChild>
        <Link href={`/u/${user?.username}`}>
          <ClapperboardIcon className='h-5 w-5' />
          <span className='hidden lg:ml-2 lg:block'>Dashboard</span>
        </Link>
      </Button>
      <UserButton afterSignOutUrl='/' />
    </div>
  );
};
