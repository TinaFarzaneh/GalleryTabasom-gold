import React from "react";

export const Next = ({ currentPage, totalPages, onNextPage }) => {
  return (
    <li>
      <a
        className={`${
          currentPage === totalPages ? "text-neutral-400" : "bg-transparent"
        } px-3 py-1.5 text-base cursor-pointer duration-300 relative block`}
        aria-label="Next"
        onClick={onNextPage}
      >
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  );
};
