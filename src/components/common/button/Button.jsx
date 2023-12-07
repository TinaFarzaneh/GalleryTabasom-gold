export const Button = ({ title, maincolor }) => {
  return (
    <div>
      <button
        type="button"
        className={`inline-block rounded-full ${maincolor} px-6 py-2 font-bold text-base ease-in-out text-[#ffd255] focus:outline-none focus:ring-0`}
      >
        {title}
      </button>
    </div>
  );
};
