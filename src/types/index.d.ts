import { Server as NetServer, Socket } from 'net';
import { NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';

export type StreamProperties =
  | 'isChatEnabled'
  | 'isChatDelayed'
  | 'isChatFollowersOnly'
  | 'isChatRefreshed';

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & { server: NetServer & { io: SocketIOServer } };
};
