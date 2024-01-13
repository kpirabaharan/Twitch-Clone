import { UserButton } from '@clerk/nextjs';

const HomePage = () => {
  return (
    <div className='flex w-full justify-end p-4'>
      <UserButton afterSignOutUrl='/' />
    </div>
  );
};

export default HomePage;
