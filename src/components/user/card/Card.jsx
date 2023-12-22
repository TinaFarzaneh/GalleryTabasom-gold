export const Card = ({ image, name, price }) => {
  return (
    <div className="flex items-center justify-between p-3 gap-5 rounded-3xl bg-[#739072] shadow-lg">
      <img
        className="w-32 h-32 rounded-3xl object-cover"
        src={`http://localhost:8000/images/products/images/${image}`}
        alt="product-img"
      />
      <div className="flex flex-col w-72 justify-start p-6">
        <h5 className="text-2xl font-bold text-[#ffd255] mb-2  whitespace-nowrap truncate drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {name}
        </h5>
        <p className="mb-4 text-base text-[#81f77b]">
          {price.toLocaleString()} تومان
        </p>
        {/* <p className="text-xs "> */}
        {/* <RateSvg rate={rate} /> */}
        {/* </p> */}
      </div>
    </div>
  );
};
