import { UserButton } from '@clerk/nextjs';

import { TwitchCloneLogo } from './logo';
import { Search } from './search';

export const Navbar = () => {
  return (
    <div
      className='fixed top-0 z-50 grid h-14 w-full grid-cols-7 items-center
     bg-[#252731] px-2 shadow-sm lg:px-4'
    >
      <div className='col-span-2'>
        <TwitchCloneLogo />
      </div>
      <div className='col-span-3 mx-auto w-4/5'>
        <Search />
      </div>
      <div className='col-span-2 flex justify-end'>
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  );
};
