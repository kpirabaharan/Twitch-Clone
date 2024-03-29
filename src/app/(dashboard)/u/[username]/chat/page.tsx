import { getSelfStream } from '@/lib/stream-service';

import { ToggleCard } from '@/app/(dashboard)/u/[username]/chat/_components/toggle-card';
import { PageTitle } from '../_components/page-title';

const ChatPage = async () => {
  const stream = await getSelfStream();

  if (!stream) {
    throw new Error('Stream not found');
  }

  return (
    <div className='p-6'>
      <div className='mb-4'>
        <PageTitle title={'Chat Settings'} />
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
        <ToggleCard
          field={'isChatRefreshed'}
          label={'Refresh Chat on New Stream'}
          value={stream.isChatRefreshed}
        />
      </div>
    </div>
  );
};

export default ChatPage;
