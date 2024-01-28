import { Actions } from './actions';
import { TwitchCloneLogo } from './logo';

export const Navbar = () => {
  return (
    <div
      className='fixed top-0 z-50 flex h-14 w-full items-center justify-between
      border-b bg-card px-2 shadow-sm lg:px-4'
    >
      <div className='w-[111px] lg:w-fit'>
        <TwitchCloneLogo />
      </div>
      <h1 className='text-xl font-bold text-muted-foreground lg:text-2xl'>
        Creator Dashboard
      </h1>
      <Actions />
    </div>
  );
};
