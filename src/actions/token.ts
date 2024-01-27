'use server';

import generate from 'boring-name-generator';
import { AccessToken } from 'livekit-server-sdk';
import { v4 } from 'uuid';

import { getSelf } from '@/lib/auth-service';
import { isBlockedByUser } from '@/lib/block-service';
import { getUserById } from '@/lib/user-service';

export const createViewerToken = async (hostId: string) => {
  try {
    // Get or create self
    var self;
    self = await getSelf();
    if (!self) {
      const id = v4();
      const username = generate().dashed;

      console.log(`Created Guest ${username}`);

      self = {
        id,
        username,
      };
    }

    // Get host
    const host = await getUserById(hostId);
    if (!host) {
      throw new Error('Host not found');
    }

    // Check if blocked (T/F)
    const isBlocked = await isBlockedByUser(host.id);
    if (isBlocked) {
      throw new Error('Host blocked you');
    }

    const isHost = self.id === host.id;

    // Create token
    const at = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_SECRET_KEY,
      { identity: isHost ? `host-${self.id}` : self.id, name: self.username },
    );
    at.addGrant({
      room: host.id,
      roomJoin: true,
      canPublish: false,
      canPublishData: true,
    });

    return at.toJwt();
  } catch (err: any) {
    console.log(err.message);
    throw new Error(err.message);
  }
};
