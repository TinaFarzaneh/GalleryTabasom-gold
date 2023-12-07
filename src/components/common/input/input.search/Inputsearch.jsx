import { IoSearch } from "react-icons/io5";

export default function Inputsearch() {
  return (
    <>
      <div className="flex items-center bg-white px-3 rounded">
        <IoSearch className="w-5 h-5" />
        <input
          type="search"
          className="outline-0 w-96 py-2 input cursor-pointer"
          id="inputSearch"
          placeholder="محصول موردنظر خود را سرچ کنید"
        />
      </div>
    </>
  );
}
