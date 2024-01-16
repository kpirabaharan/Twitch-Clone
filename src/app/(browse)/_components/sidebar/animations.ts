import { Variants } from 'framer-motion';

export const sideBarVariants: Variants = {
  open: {
    x: 0,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    x: -180,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
};

export const sideBarChannel: Variants = {
  open: {
    width: 240,
    x: 0,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    width: 60,
    x: 180,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
};

export const mainVariants: Variants = {
  open: {
    marginLeft: 240,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    marginLeft: 60,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
};
