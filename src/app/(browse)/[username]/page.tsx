import { notFound } from 'next/navigation';

import { isBlockedByUser } from '@/lib/block-service';
import { getChatByStreamId } from '@/lib/chat-service';
import { isFollowingUser } from '@/lib/follow-service';
import { getStreamByUserId } from '@/lib/stream-service';
import { getUserByUsername } from '@/lib/user-service';

import { StreamPlayer } from '@/components/stream-player';

interface UserPageParams {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserPageParams) => {
  const user = await getUserByUsername(params.username);
  const stream = await getStreamByUserId(user.id);
  const chatMessages = await getChatByStreamId(stream.id);

  const isFollowing = await isFollowingUser(user.id);
  const isBlockedBy = await isBlockedByUser(user.id);

  if (isBlockedBy) {
    notFound();
  }

  return (
    <div className='relative h-full overflow-x-hidden'>
      <StreamPlayer
        user={user}
        stream={stream}
        chatMessages={chatMessages}
        isFollowing={isFollowing}
      />
    </div>
  );
};

export default UserPage;
