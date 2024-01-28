import { MaximizeIcon, MinimizeIcon } from 'lucide-react';

import { Hint } from '../../hint';

interface FullScreenControlProps {
  isFullScreen: boolean;
  onClick: () => void;
}

export const FullScreenControl = ({
  isFullScreen,
  onClick,
}: FullScreenControlProps) => {
  const Icon = isFullScreen ? MinimizeIcon : MaximizeIcon;
  const label = isFullScreen ? 'Exit Full Screen (esc)' : 'Full Screen (f)';

  return (
    <div className='inline-flex items-center justify-center'>
      <Hint label={label} asChild>
        <button onClick={onClick} className='group/item p-1.5 text-white'>
          <Icon className='group-hover/item:scale-110' size={20} />
        </button>
      </Hint>
    </div>
  );
};
