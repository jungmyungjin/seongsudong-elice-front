import React, { useState, useEffect } from 'react';
import './pagination.scss';

interface PaginationProps {
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) => {
  const [visiblePageStart, setVisiblePageStart] = useState(0);
  const pageNumbers = [];
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // currentPage를 기준으로 visiblePageStart를 조절합니다.
  useEffect(() => {
    if (currentPage < visiblePageStart || currentPage >= visiblePageStart + 5) {
      setVisiblePageStart(Math.max(0, currentPage - 3));
    }
  }, [currentPage]);

  const visiblePageNumbers = pageNumbers.slice(visiblePageStart, visiblePageStart + 5);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  return (
    <nav className="pagination">
      <button onClick={handlePrevClick} disabled={currentPage === 1}>{"<"}</button>
      <ul className="pagination-list">
        {visiblePageNumbers.map(number => (
          <li
            key={number}
            className={number === currentPage ? 'active' : ''}
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
      </ul>
      <button onClick={handleNextClick} disabled={currentPage === totalPages}>{">"}</button>
    </nav>
  );
};

export default Pagination;
