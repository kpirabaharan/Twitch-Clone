import { getSelfStream } from '@/lib/stream-service';

import { ToggleCard } from '@/components/toggle-card';

const ChatPage = async () => {
  const stream = await getSelfStream();

  if (!stream) {
    throw new Error('Stream not found');
  }

  return (
    <div className='p-6'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>Chat Settings</h1>
      </div>
      <div className='flex flex-col gap-y-4'>
        <ToggleCard
          field={'isChatEnabled'}
          label={'Enable Chat'}
          value={stream.isChatEnabled}
        />
        <ToggleCard
          field={'isChatDelayed'}
          label={'Delay Chat'}
          value={stream.isChatDelayed}
        />
        <ToggleCard
          field={'isChatFollowersOnly'}
          label={'Follower Only Chat'}
          value={stream.isChatFollowersOnly}
        />
      </div>
    </div>
  );
};

export default ChatPage;
