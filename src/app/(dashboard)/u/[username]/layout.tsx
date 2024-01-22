import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { getSelfByUsername } from '@/lib/user-service';

import { Container } from './(home)/_components/container';
import { Navbar } from './(home)/_components/navbar';
import { Sidebar } from './(home)/_components/sidebar';

interface CreatorLayoutProps extends PropsWithChildren {
  params: { username: string };
}

const CreatorLayout = async ({ params, children }: CreatorLayoutProps) => {
  const self = await getSelfByUsername(params.username);

  if (!self) {
    return redirect('/');
  }

  return (
    <>
      <Navbar />
      <div className='flex h-full pt-14'>
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default CreatorLayout;