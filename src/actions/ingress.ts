'use server';

import { eq } from 'drizzle-orm';
import {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressVideoEncodingPreset,
  type CreateIngressOptions,
} from 'livekit-server-sdk';
import { TrackSource } from 'livekit-server-sdk/dist/proto/livekit_models';
import { revalidatePath } from 'next/cache';

import { db } from '@/db';
import { stream } from '@/db/schema';
import { getSelf } from '@/lib/auth-service';
import { ingressClient, resetIngress } from '@/lib/ingress-service';

export const createIngress = async (ingressType: IngressInput) => {
  try {
    const self = await getSelf();

    if (!self) {
      throw new Error('Unauthorized');
    }

    // Reset Existing Ingress
    await resetIngress(self.id);

    // Create Ingress
    const options: CreateIngressOptions = {
      name: self.username,
      roomName: self.id,
      participantName: self.username,
      participantIdentity: self.id,
    };

    if (ingressType === IngressInput.WHIP_INPUT) {
      options.bypassTranscoding = true;
    } else {
      options.video = {
        source: TrackSource.CAMERA,
        preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
      };
      options.audio = {
        source: TrackSource.MICROPHONE,
        preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
      };
    }

    const ingress = await ingressClient.createIngress(ingressType, options);

    if (!ingress || !ingress.url || !ingress.streamKey) {
      throw new Error('Failed to create ingress');
    }

    await db
      .update(stream)
      .set({
        ingressId: ingress.ingressId,
        serverUrl: ingress.url,
        streamKey: ingress.streamKey,
      })
      .where(eq(stream.streamerId, self.id))
      .execute();

    revalidatePath(`/u/${self.username}/keys`);
  } catch (err: any) {
    console.log(err.message);
    throw new Error(err.message);
  }
};
