import { Variants } from 'framer-motion';

export const sideBarVariants: Variants = {
  open: {
    width: 240,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    width: 50,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
};

export const toggleDivVariants: Variants = {
  open: {
    x: 0,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    x: -90,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
};
