export const CounterOfProduct = ({
  counterProduct,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="flex flex-col items-center justify-center border-2 border-green-500 rounded-full ml-10 p-1">
      <span
        className="select-none cursor-pointer text-green-500 w-6 flex items-center justify-center text-lg"
        onClick={onIncrement}
      >
        +
      </span>
      <span className="w-6 text-[#ffd255] flex items-center justify-center text-lg">
        {counterProduct}
      </span>
      <span
        className="select-none font-bold text-2xl cursor-pointer text-[#ff4141] w-6 flex items-center justify-center "
        onClick={onDecrement}
      >
        -
      </span>
    </div>
  );
};
