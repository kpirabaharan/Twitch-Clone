import { StreamPlayer } from '@/components/stream-player';
import { getSelf } from '@/lib/auth-service';
import { getSelfStream } from '@/lib/stream-service';

interface CreatorPageProps {
  params: {
    username: string;
  };
}

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const user = await getSelf();
  const stream = await getSelfStream();

  if (!user || !stream) {
    throw new Error('Unauthorized');
  }

  return (
    <div className='h-full'>
      <StreamPlayer user={user} stream={stream} isFollowing />
    </div>
  );
};

export default CreatorPage;
