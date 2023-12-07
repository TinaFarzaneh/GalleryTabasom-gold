import { Previous } from "./Previous";
import { PaginationNumber } from "./PaginationNumber";
import { Next } from "./Next";
export const MainPagination = ({ totalPages, currentPage, onPageChange }) => {
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
  console.log("paginate");
  const createArray = () => {
    let newArray = [];
    for (let i = 1; i <= totalPages; i++) {
      newArray.push(i);
    }
    return newArray;
  };
  createArray();
  console.log(totalPages);
  console.log(createArray());
  return (
    <>
      <nav>
        <ul className="list-style-none flex justify-center items-center">
          <Previous currentPage={currentPage} onPrevPage={handlePrevClick} />
          {createArray().map((page) => (
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
