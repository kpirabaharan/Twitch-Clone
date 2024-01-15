import { getFollowing } from '@/lib/follow-service';
import { getRecommended } from '@/lib/recommended-service';

import { Skeleton } from '@/components/ui/skeleton';
import { Following } from './following';
import { Recommended } from './recommended';
import { Toggle } from './toggle';
import { Wrapper } from './wrapper';

export const revalidate = 0;

export const Sidebar = async () => {
  const following = await getFollowing();
  const recommended = await getRecommended();

  return (
    <Wrapper>
      <Toggle />
      <Following data={following} />
      <Recommended data={recommended} />
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <ul className='flex w-[50px] flex-col items-center gap-y-2 border-r bg-[#1f1f23] pt-2 shadow-sm'>
      {[...Array(10)].map((_, index) => (
        <Skeleton key={index} className='h-8 w-8 rounded-full' />
      ))}
    </ul>
  );
};
