const months3 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Convert date to readable format
 * @param date YYYY-MM-DD HH:MM:SS format
 */
export function getReadableDate(date: string, shortMonth = false) {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString('default', { month: shortMonth ? 'short' : 'long' });
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
 * Get time string
 * @param date Date to check
 */
export function getTime(date: Date | string) {
  let hours = 0;
  let minutes = 0;

  if (typeof date === 'string') {
    const s = date.split(':');
    hours = parseInt(s[0]);
    minutes = parseInt(s[1]);
  }

  const ampm = hours >= 12 ? 'PM' : 'AM';

  return `${hours === 0 ? 12 : (hours > 12 ? hours - 12 : hours)}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
}

/**
 * Get human readable date
 * @param date1 Date 1
 * @param date2 Date 2
 */
export function getHumanDate(date1: Date, date2?: Date | undefined) {
  const day1 = date1.getDate();
  const month1 = getMonthName(date1.getMonth() + 1);
  const year1 = date1.getFullYear();

  if (date2) {
    const day2 = date2.getDate();
    const month2 = getMonthName(date2.getMonth() + 1);
    const year2 = date2.getFullYear();

    if (month1 === month2 && year1 === year2 && day1 === day2) {
      return `${month1} ${day1}, ${year1}`;
    }

    return `${month1} ${day1}, ${year1} - ${month2} ${day2}, ${year2}`;
  }

  return `${month1} ${day1}, ${year1}`;
}

/**
 * Convert date to YYYY-MM-DD format
 * @param date Date
 */
export function toISODate(date: Date) {
  const year = date.getFullYear();
  const month = n(date.getMonth() + 1);
  const day = n(date.getDate());

  return `${year}-${month}-${day}`;
}

/**
 * Convert date to HH:MM:SS format
 * @param date Date
 */
export function toISOTime(date: Date) {
  const hours = n(date.getHours());
  const minutes = n(date.getMinutes());

  return `${hours}:${minutes}:00`;
}

/**
 * Get month name
 */
export function getMonthName(month: number) {
  return months3[month - 1];
}

/**
 * Compare two dates if they are the same
 * @param date1 Date
 * @param date2 Date
 */
export function isSameDate(date1: Date, date2: Date) {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
}

/**
 * Normalize number
 * @param value Number to normalize
 */
function n(value: number) {
  return value < 10 ? '0' + value : value;
}
