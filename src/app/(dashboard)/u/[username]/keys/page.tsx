import { getSelfStream } from '@/lib/stream-service';

import { PageTitle } from '../_components/page-title';
import { ConnectModal } from './_components/connect-modal';
import { KeyCard } from './_components/key-card';
import { UrlCard } from './_components/url-card';

const KeysPage = async () => {
  const stream = await getSelfStream();

  if (!stream) {
    throw new Error('Stream not found');
  }

  return (
    <>
      <div className='mb-4 flex items-center justify-between'>
        <PageTitle title={'Keys & URLs'} />
        <ConnectModal />
      </div>
      <div className='flex flex-col gap-y-4'>
        <UrlCard url={stream.serverUrl} />
        <KeyCard data={stream.streamKey} />
      </div>
    </>
  );
};

export default KeysPage;
