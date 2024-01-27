import { IngressClient, RoomServiceClient } from 'livekit-server-sdk';

const roomServiceClient = new RoomServiceClient(
  process.env.LIVEKIT_API_URL,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_SECRET_KEY,
);

const ingressClient = new IngressClient(
  process.env.LIVEKIT_API_URL,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_SECRET_KEY,
);

const resetIngress = async (hostIdentity: string) => {
  const rooms = await roomServiceClient.listRooms([hostIdentity]);

  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });

  for (const room of rooms) {
    await roomServiceClient.deleteRoom(room.name);
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
};

export { ingressClient, resetIngress };
