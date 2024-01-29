import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const stringToColor = (str: string) => {
  let hash = 0;
  let i;
  let chr;
  let len;

  if (str.length === 0) return hash.toString();

  for (i = 0, len = str.length; i < len; i++) {
    chr = str.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash = ((hash << 5) - hash) + chr;
    // eslint-disable-next-line no-bitwise
    hash |= 0; // Convert to 32bit integer
  }

  return hash.toString();
}
