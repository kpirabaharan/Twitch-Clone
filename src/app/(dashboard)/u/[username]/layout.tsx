import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { getSelfByUsername } from '@/lib/user-service';
import { Navbar } from './(home)/_components/navbar';

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
      <div>{children}</div>
    </>
  );
};

export default CreatorLayout;
