import { GetSubcategories } from "../../../services";

export const SideBar = ({ categoryId }) => {
  const arrayOfSubcategory = [...GetSubcategories()] || [];

  const result = arrayOfSubcategory.filter(
    (subcategory) => subcategory.category === categoryId
  );

  return (
    <>
      {result.map((subcategory) => (
        <li className="pr-6 pb-2 text-[#5fc65a]">{subcategory.name}</li>
      ))}
    </>
  );
};
