import { useState } from 'react';

/**
 *
 * @param items 페이지네이션을 적용할 배열
 * @param itemsPerPage 한 페이지당 보여줄 아이템의 개수
 * @returns currentItmes(현재 페이지의 아이템 배열),
 * currentPage(현재 페이지), goToPage(페이지 변경 함수)
 */

export function usePaginate<T>(items: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentItems,
    currentPage,
    goToPage,
  };
}
