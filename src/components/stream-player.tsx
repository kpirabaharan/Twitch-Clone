'use client';

import { Stream, User } from '@/db/types';
import { useViewerToken } from '@/hooks/use-viewer-token';

interface StreamPlayerProps {
  user: User;
  stream: Stream;
  isFollowing: boolean;
}

export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  const { identity, name, viewerToken } = useViewerToken(user.id);

  if (!viewerToken || !identity || !name) {
    return (
      <div>
        <h1>Cannot Watch the Stream!</h1>
      </div>
    );
  }

  console.log({ viewerToken, identity, name });

  return (
    <div>
      <h1>Allowed to Watch the Stream!</h1>
    </div>
  );
};
