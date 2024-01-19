import { notFound } from 'next/navigation';

import { isBlockedByUser, isBlockingUser } from '@/lib/block-service';
import { isFollowingUser } from '@/lib/follow-service';
import { getUserByUsername } from '@/lib/user-service';

import { BlockButton } from './_components/block-button';
import { FollowButton } from './_components/follow-button';

interface UserPageParams {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserPageParams) => {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocking = await isBlockingUser(user.id);
  const isBlockedBy = await isBlockedByUser(user.id);

  // if (isBlockedBy) {
  //   notFound();
  // }

  return (
    <div className='flex h-full flex-col items-center justify-center gap-y-4'>
      <p>Username: {user.username}</p>
      <p>User ID: {user.id}</p>
      <p>Is Following: {isFollowing.toString()}</p>
      <p>Is Blocking: {isBlocking.toString()}</p>
      <p>Is Blocked By: {isBlockedBy.toString()}</p>
      <FollowButton userId={user.id} isFollowing={isFollowing} />
      <BlockButton userId={user.id} isBlocking={isBlocking} />
    </div>
  );
};

export default UserPage;
