import { notFound } from 'next/navigation';

import { isFollowingUser } from '@/lib/follow-service';
import { getUserByUsername } from '@/lib/user-service';
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

  return (
    <div className='flex h-full flex-col items-center justify-center gap-y-4'>
      <p>Username: {user.username}</p>
      <p>User ID: {user.id}</p>
      <p>Is Following: {isFollowing.toString()}</p>
      <FollowButton userId={user.id} isFollowing={isFollowing} />
    </div>
  );
};

export default UserPage;
