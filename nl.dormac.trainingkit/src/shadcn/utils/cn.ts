import { ClassValue, clsx } from './clsx';
import { twMerge } from './tw-merge';

export function cn(...inputs: ClassValue[]) {
  // @ts-expect-error Allow me to do this
  return twMerge(clsx(...inputs));
}
