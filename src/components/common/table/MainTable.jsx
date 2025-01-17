import { THead } from "./Thead";
export const Maintable = ({ children, columns, className = "px-40" }) => {
  return (
    <div className="sm:px-6 lg:px-8 ">
      <div className={`flex flex-col mt-6 ${className}`}>
        <div className="overflow-x-auto ">
          <div className="inline-block min-w-full py-2">
            <div className="overflow-hidden border-2 border-[#739072] rounded-3xl">
              <table className="min-w-full text-sm font-light text-start table">
                <THead columns={columns} />
                <tbody className="text-[#ffd255]">{children}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
