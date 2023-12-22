import { useState, useEffect } from "react";
import { Previous } from "./Previous";
import { PaginationNumber } from "./PaginationNumber";
import { Next } from "./Next";

export const MainPagination = ({ totalPages, currentPage, onPageChange }) => {
  const itemsPerPage = 3;
  const [displayedPages, setDisplayedPages] = useState([]);

  useEffect(() => {
    updateDisplayedPages();
  }, [currentPage, totalPages]);

  const updateDisplayedPages = () => {
    const newStart = Math.max(currentPage - Math.floor(itemsPerPage / 2), 1);
    const newDisplayedPages = Array.from(
      { length: Math.min(itemsPerPage, totalPages - newStart + 1) },
      (_, index) => newStart + index
    );
    setDisplayedPages(newDisplayedPages);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <nav>
        <ul className="list-style-none flex justify-center items-center">
          <Previous currentPage={currentPage} onPrevPage={handlePrevClick} />
          {displayedPages.map((page) => (
            <PaginationNumber
              key={page}
              page={page}
              label={page}
              onPageChange={onPageChange}
              currentPage={currentPage}
            />
          ))}
          <Next
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={handleNextClick}
          />
        </ul>
      </nav>
    </>
  );
};
