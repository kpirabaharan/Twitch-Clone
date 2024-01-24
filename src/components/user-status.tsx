interface UserStatusProps {
  isLive?: boolean;
  showFull?: boolean;
  numViewers?: number;
}

export const UserStatus = ({
  isLive,
  showFull = false,
  numViewers = 420,
}: UserStatusProps) => {
  return isLive ? (
    <p className='whitespace-nowrap text-xs text-muted-foreground'>
      <span className='mr-1 inline-flex h-2 w-2 rounded-full bg-red-500' />
      {showFull && <span>Live | </span>}
      <span>{numViewers}</span>
      {showFull && <span> viewers</span>}
    </p>
  ) : (
    <p className='text-xs text-muted-foreground'>Offline</p>
  );
};
