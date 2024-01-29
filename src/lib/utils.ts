import { clsx, type ClassValue } from 'clsx';
import stc from 'string-to-color';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stringToColor = (str: string) => {
  const scaleValue = (value: number, min: number, max: number) => {
    return Math.floor((value / 100) * (max - min) + min);
  };

  const color = stc(str);

  var r = parseInt(color.substring(1, 3), 16);
  var g = parseInt(color.substring(3, 5), 16);
  var b = parseInt(color.substring(5, 7), 16);

  if (r < 100) {
    r = scaleValue(r, 100, 255);
  }
  if (g < 100) {
    g = scaleValue(g, 100, 255);
  }
  if (b < 100) {
    b = scaleValue(b, 100, 255);
  }

  const newColor = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;

  return newColor; // Change the threshold value as per your preference
};
