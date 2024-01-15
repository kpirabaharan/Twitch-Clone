import { notFound } from 'next/navigation';

import { isFollowingUser } from '@/lib/follow-service';
import { getUserByUsername } from '@/lib/user-service';
import { Actions } from './_components/actions';

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
      <Actions userId={user.id} isFollowing={isFollowing} />
    </div>
  );
};

export default UserPage;
