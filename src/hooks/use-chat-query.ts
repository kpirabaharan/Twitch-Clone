import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import qs from 'query-string';

import { useSocket } from '@/providers/socket-provider';

interface ChatQueryProps {
  apiUrl: string;
  streamId: string;
}

export const useChatQuery = ({ apiUrl, streamId }: ChatQueryProps) => {
  const { isConnected } = useSocket();

  const fetchMessages = async ({ pageParam = undefined }) => {
    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: { streamId, cursor: pageParam },
      },
      { skipNull: true },
    );

    const res = await axios.get(url);

    return res.data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      initialPageParam: undefined,
      queryKey: [streamId],
      queryFn: fetchMessages,
      getNextPageParam: lastPage => lastPage?.nextCursor,
      // refetchInterval: isConnected ? false : 1000,
      refetchInterval: 1000,
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};
