import { Link } from "react-router-dom";
import { PRODUCTS_URL } from "../../../config";
import { GetCategories } from "../../../services";
import { SideBar } from "./SideBar";

export const MainSideBar = () => {
  const arrayOfCategory = [...GetCategories()] || [];

  return (
    <div className="w-[20%] max-h-full pr-14 cursor-pointer border-l-2 border-[#739072] fixed">
      {arrayOfCategory.map((category, index) => (
        <div className="my-6" key={category.id || index}>
          <Link to={`/${PRODUCTS_URL}?category=${category.id}`}>
            <h3 className="text-lg text-[#ffd255] mb-1">{category.name}</h3>
          </Link>
          <ul>
            <SideBar categoryId={category.id} />
          </ul>
        </div>
      ))}
    </div>
  );
};
