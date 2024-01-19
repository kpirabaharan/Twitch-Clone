import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { LogOutIcon } from 'lucide-react';
import Link from 'next/link';

export const Actions = async () => {
  return (
    <div className='flex flex-row items-center justify-end gap-x-2'>
      <Button size={'sm'} variant={'outline'} asChild>
        <Link href={'/'}>
          <LogOutIcon className='h-5 w-5' />
          Exit
        </Link>
      </Button>
      <UserButton afterSignOutUrl='/' />
    </div>
  );
};
