import { Actions } from './actions';
import { TwitchCloneLogo } from './logo';

export const Navbar = () => {
  return (
    <div
      className='fixed top-0 z-50 flex h-14 w-full items-center justify-between
     bg-[#252731] px-2 shadow-sm lg:px-4'
    >
      <TwitchCloneLogo />
      <h1 className='text-xl font-bold lg:text-2xl'>Creator Dashboard</h1>
      <Actions />
    </div>
  );
};
