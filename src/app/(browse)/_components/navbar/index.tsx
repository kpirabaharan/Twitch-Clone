import { Actions } from './actions';
import { TwitchCloneLogo } from './logo';
import { Search } from './search';

export const Navbar = () => {
  return (
    <div
      className='fixed top-0 z-50 grid h-14 w-full grid-cols-5 items-center 
      border-b bg-card px-2 shadow-sm lg:grid-cols-7 lg:px-4'
    >
      <div className='col-span-1 lg:col-span-2'>
        <TwitchCloneLogo />
      </div>
      <div className='col-span-3 mx-auto w-4/5'>
        <Search />
      </div>
      <div className='col-span-1 lg:col-span-2'>
        <Actions />
      </div>
    </div>
  );
};
