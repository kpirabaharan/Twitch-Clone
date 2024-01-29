interface CommunityFormProps {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
  isFollowersOnly: boolean;
  isDelayed: boolean;
  isFollowing: boolean;
}

export const CommunityForm = ({
  onSubmit,
  value,
  onChange,
  isHidden,
  isFollowersOnly,
  isDelayed,
  isFollowing,
}: CommunityFormProps) => {
  return <div>CommunityForm</div>;
};
