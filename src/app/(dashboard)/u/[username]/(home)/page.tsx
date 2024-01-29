import { getSelf } from '@/lib/auth-service';
import { getSelfStream } from '@/lib/stream-service';

import { PageTitle } from '../_components/page-title';
import { StreamInfo } from './_components/stream-info';

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
    <div className='p-6'>
      <div className='mb-4'>
        <PageTitle title={'Recommended For You'} />
      </div>
      <StreamInfo title={stream.title} category={stream.category} />
    </div>
  );
};

export default CreatorPage;
