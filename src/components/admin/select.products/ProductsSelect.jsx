import { GetCategories } from "../../../services";

export const ProductsSelect = ({ onCategoryChange, data }) => {
  const arrayOfCategory = [...GetCategories()] || [];

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    onCategoryChange(categoryId);
  };

  return (
    <label>
      <select
        value={data}
        className="bg-transparent cursor-pointer outline-0"
        name="selectedCategory"
        onChange={handleCategoryChange}
      >
        <option value="all" className="bg-[#739072]">
          تمام گروه بندی ها
        </option>
        {arrayOfCategory.map((category, index) => (
          <option
            className="bg-[#739072]"
            key={category.id || index}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>
    </label>
  );
};
