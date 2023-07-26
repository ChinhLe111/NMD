import { Pagination } from '@model';

export function emptyPagination(): Pagination<any> {
  return {
    content: [],
    numberOfElements: 0,
    page: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
  };
}

export const getSizePageByHeight = (height = 40, minusNumber = 3) =>
  Math.floor(
    (document.body.getBoundingClientRect().height -
      document.getElementsByTagName('tbody')[0].getBoundingClientRect().top) /
      height,
  ) - minusNumber;
