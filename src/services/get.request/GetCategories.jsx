import { useQuery } from "@tanstack/react-query";
import { CATEGORIES_URL } from "../../config";
import axios from "../../api/http";

export const GetCategories = () => {
  const {
    isPending: isCategoryPending,
    error: categoryError,
    data: categoryData,
  } = useQuery({
    queryKey: ["categoryData"],
    queryFn: () => axios.get(`${CATEGORIES_URL}`).then((res) => res.data),
  });

  if (isCategoryPending) return "Loading...";
  if (categoryError) return categoryError.message;
  console.log(categoryData);

  return categoryData.data.categories.map((category) => ({
    key: category._id,
    name: category.name,
    id: category._id,
  }));
};
