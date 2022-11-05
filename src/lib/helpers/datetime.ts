import dayjs from 'dayjs';

/**
 * Get gassed seconds from unix timestamp
 */
export const getPassedSecondsFromTS = (unixTimestamp: number): number => {
  const now  = dayjs();
  const last = dayjs.unix(unixTimestamp);
  const seconds = now.diff(last, "seconds", true);
  return seconds;
}
