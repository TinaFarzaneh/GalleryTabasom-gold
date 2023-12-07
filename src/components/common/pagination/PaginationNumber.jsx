export const PaginationNumber = ({
  page,
  label,
  currentPage,
  onPageChange,
}) => {
  return (
    <li
      key={page}
      className={`${
        currentPage === page
          ? "text-[#ffd255] w-8 h-8 bg-[#739072]"
          : "bg-transparent"
      } relative rounded-full px-3 py-1 duration-300 cursor-pointer`}
    >
      <a onClick={() => onPageChange(page)} aria-label={`Page ${label}`}>
        {label}
      </a>
    </li>
  );
};
