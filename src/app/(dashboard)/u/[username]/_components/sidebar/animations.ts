import { Variants } from 'framer-motion';

export const sideBarVariants: Variants = {
  open: {
    translateX: 0,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    translateX: -180,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
};

export const navItemVariants: Variants = {
  open: {
    translateX: 0,
    width: 240,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    translateX: 180,
    width: 60,
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
