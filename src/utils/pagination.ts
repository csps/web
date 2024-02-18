import type { PaginationRequest } from "~/types/request";
import { tb64 } from "./string";

const getRange = (start: number, end: number) => {
  return Array.from(Array(end - start + 1), (_, i) => start + i);
}

/**
 * Pagination algorithm
 * @author jorrit91
 * @param {number} currentPage
 * @param {number} pageCount
 */
export const pagination = (currentPage: number, pageCount: number): (string|number)[] => {
  let delta: number
  if (pageCount <= 7) {
    // delta === 7: [1 2 3 4 5 6 7]
    delta = 7
  } else {
    // delta === 2: [1 ... 4 5 6 ... 10]
    // delta === 4: [1 2 3 4 5 ... 10]
    delta = currentPage > 4 && currentPage < pageCount - 3 ? 2 : 4
  }

  const range = {
    start: Math.round(currentPage - delta / 2),
    end: Math.round(currentPage + delta / 2)
  }

  if (range.start - 1 === 1 || range.end + 1 === pageCount) {
    range.start += 1
    range.end += 1
  }

  let pages: any =
    currentPage > delta
      ? getRange(Math.min(range.start, pageCount - delta), Math.min(range.end, pageCount))
      : getRange(1, Math.min(pageCount, delta + 1))

  const withDots = (value: number, pair: any[]) => (pages.length + 1 !== pageCount ? pair : [value])

  if (pages[0] !== 1) {
    pages = withDots(1, [1, '...']).concat(pages)
  }

  if (pages[pages.length - 1] < pageCount) {
    pages = pages.concat(withDots(pageCount, ['...', pageCount]))
  }

  return pages;
}

/**
 * Create pagination
 * @param pagination 
 */
export function createPagination(pagination: PaginationRequest) {
  const out: Record<string, string> = {};

  if (pagination.page) {
    out.page = pagination.page.toString();
  }

  if (pagination.limit) {
    out.limit = pagination.limit.toString();
  }

  if (pagination.sort) {
    out.sort = tb64(`${pagination.sort.key}:${pagination.sort.type}`);
  } 

  if (pagination.search) {
    out.search = tb64(JSON.stringify(pagination.search));
  }

  if (pagination.filterColumns) {
    out.filterColumns = tb64(JSON.stringify(pagination.filterColumns));
  }

  if (pagination.filter) {
    out.filter = pagination.filter.toString();
  }

  if (pagination.filterLogic) {
    out.filterLogic = pagination.filterLogic.toString();
  }

  return out;
}