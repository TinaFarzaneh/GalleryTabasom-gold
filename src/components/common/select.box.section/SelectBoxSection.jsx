import { useState } from "react";
import { GetCategories, GetSubcategories } from "../../../services";
import { IoIosArrowDown } from "react-icons/io";

export const SelectBoxSection = ({
  value,
  onChange,
  name,
  defaultOption,
  label,
  className,
  array,
  onBlur,
  condition,
  error,
}) => {
  const [selectedCategory, setSelectedCategory] = useState();

  const arrayOfCategory = [...GetCategories()] || [];
  const arrayOfSubcategory = [...GetSubcategories()] || [];

  return (
    <div className="mb-4 w-full text-right">
      <label className="block text-[#abd6a9] text-sm font-bold mb-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)] ">
        <div className="flex items-center gap-4">
          {label}
          {condition ? (
            <div className="text-xs text-red-500">{error}</div>
          ) : null}
        </div>
      </label>
      <div className="relative">
        <IoIosArrowDown className="absolute  top-3 right-3 cursor-pointer" />
        <select
          name={name}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          className={`${className} shadow bg-transparent appearance-none border border-[#abd6a9] rounded w-full py-2 pr-8 pl-3 text-[#e4d4a7] leading-tight   outline-none  cursor-pointer`}
        >
          <option className="bg-[#739072] p-4 cursor-pointer">
            {defaultOption}
          </option>
          {array?.map((item, index) => (
            <option
              className="bg-[#739072] p-4 cursor-pointer"
              key={item.id || index}
              value={item.id}
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
