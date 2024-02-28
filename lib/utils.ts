import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date): string => {
  const now = new Date();
  const timeDiff = now.getTime() - createdAt.getTime();

  // define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  // calculate time intervals
  if (timeDiff < minute) {
    const seconds = Math.floor(timeDiff / 1000);
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
  } else if (timeDiff < hour) {
    const minutes = Math.floor(timeDiff / minute);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (timeDiff < day) {
    const hours = Math.floor(timeDiff / hour);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (timeDiff < week) {
    const days = Math.floor(timeDiff / day);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (timeDiff < month) {
    const weeks = Math.floor(timeDiff / week);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (timeDiff < year) {
    const months = Math.floor(timeDiff / month);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(timeDiff / year);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
};

// function that takes in a big number and returns a string of that number with the extention of M for million and K for thousand
// example: 1000 => 1K, 1000000 => 1M
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
};
