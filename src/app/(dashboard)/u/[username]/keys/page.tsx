import { getSelfStream } from '@/lib/stream-service';

import { Button } from '@/components/ui/button';
import { PageTitle } from '../_components/page-title';
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
        <Button variant={'default'}>Generate</Button>
      </div>
      <div className='flex flex-col gap-y-4'>
        <UrlCard url={stream.serverUrl} />
        <KeyCard data={stream.streamKey} />
      </div>
    </>
  );
};

export default KeysPage;
