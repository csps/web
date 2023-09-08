const months3 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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

/**
 * Get month category
 * @param data Array of data
 * @param date Date to check
 * @param i Index of data
 */
export function getMonthCategory(data: any[], date: string, i: number) {
  const value = getMonthYear(date);

  if (i === 0) {
    return value;
  }

  const prev = data[i - 1];

  if (getMonthYear(prev.date_stamp) !== value) {
    return value;
  }
    
  return "";
}

/**
 * Get month name
 */
export function getMonthName(month: number) {
  return months3[month - 1];
}