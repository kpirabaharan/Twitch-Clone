import { Variants } from 'framer-motion';
import { Volume1, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

import { MotionDiv } from '@/components/framer/motion-div';
import { Slider } from '@/components/ui/slider';

interface VolumeControlProps {
  onToggle: () => void;
  onVolumeChange: (volume: number) => void;
  volume: number;
}

const variants: Variants = {
  open: {
    width: 150,
    transition: {
      duration: 0.5,
    },
  },
  closed: {
    width: 32,
    transition: {
      duration: 0.5,
    },
  },
};

export const VolumeControl = ({
  onToggle,
  onVolumeChange,
  volume,
}: VolumeControlProps) => {
  const [isShowVolumeBar, setIsShowVolumeBar] = useState(false);

  let Volume;
  switch (true) {
    case volume === 0:
      Volume = VolumeX;
      break;
    case volume < 50:
      Volume = Volume1;
      break;
    default:
      Volume = Volume2;
      break;
  }

  const handleChange = (volume: number[]) => {
    onVolumeChange(volume[0]);
  };

  return (
    <MotionDiv
      className='flex w-full flex-row items-center gap-x-2 overflow-hidden'
      initial='closed'
      animate={isShowVolumeBar ? 'open' : 'closed'}
      exit={isShowVolumeBar ? 'open' : 'closed'}
      variants={variants}
      onMouseEnter={() => setIsShowVolumeBar(true)}
      onMouseLeave={() => setIsShowVolumeBar(false)}
    >
      <button className='group/item p-1.5 text-white' onClick={onToggle}>
        <Volume className='shrink-0 group-hover/item:scale-110' size={20} />
      </button>
      <Slider
        className='h-2 w-24 shrink-0 cursor-pointer'
        value={[volume]}
        onValueChange={handleChange}
        max={100}
        step={1}
      />
    </MotionDiv>
  );
};
