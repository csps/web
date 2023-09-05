/**
 * Convert date to readable format
 * @param date YYYY-MM-DD HH:MM:SS format
 */
export function getReadableDate(date: string) {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString('default', { month: 'long' });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const time = dateObj.toLocaleString('default', { hour: 'numeric', minute: 'numeric', hour12: true });
  return `${month} ${day}, ${year} at ${time}`;
}

/**
 * Convert date to month and year format
 * @param date YYYY-MM-DD HH:MM:SS format
 */
export function getMonthYear(date: string) {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString('default', { month: 'long' });
  const year = dateObj.getFullYear();
  return `${month} ${year}`;
}