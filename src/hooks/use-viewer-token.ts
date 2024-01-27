import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { createViewerToken } from '@/actions/token';

export const useViewerToken = (hostId: string) => {
  const [viewerToken, setViewerToken] = useState('');
  const [name, setName] = useState('');
  const [identity, setIdentity] = useState('');

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostId);
        setViewerToken(viewerToken);

        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };

        const name = decodedToken.name;
        const identity = decodedToken.jti;
        if (name) {
          setName(name);
        }
        if (identity) {
          setIdentity(identity);
        }
      } catch (err: any) {
        console.log(err.message);
        toast.error(err.message);
      }
    };
    createToken();
  }, [hostId]);

  return { viewerToken, name, identity };
};
