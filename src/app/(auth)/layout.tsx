import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { TwitchCloneLogo } from './_components/logo';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  if (userId) {
    redirect('/');
  }

  return (
    <div className='flex min-h-full w-full flex-col items-center justify-center py-12'>
      <TwitchCloneLogo />
      {children}
    </div>
  );
};

export default AuthLayout;
