import React from "react";

export const Previous = ({ currentPage, onPrevPage }) => {
  return (
    <li>
      <a
        className={`${
          currentPage === 1 ? "text-neutral-400" : "bg-transparent"
        } px-3 py-1.5 text-base cursor-pointer duration-300 relative block`}
        aria-label="Previous"
        onClick={onPrevPage}
      >
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
  );
};
