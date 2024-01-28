import { getSelf } from '@/lib/auth-service';
import { getSelfStream } from '@/lib/stream-service';

import { StreamPlayer } from '@/components/stream-player';

interface StreamPageProps {
  params: {
    username: string;
  };
}

const StreamPage = async ({ params }: StreamPageProps) => {
  const user = await getSelf();
  const stream = await getSelfStream();

  if (!user || !stream) {
    throw new Error('Unauthorized');
  }

  return (
    <div className='h-full relative'>
      <StreamPlayer user={user} stream={stream} isFollowing />
    </div>
  );
};

export default StreamPage;
