import { useQuery } from "@tanstack/react-query";
import { CATEGORIES_URL } from "../../config";
import { api } from "../../api/http";

export const GetCategories = () => {
  const {
    isPending: isCategoryPending,
    error: categoryError,
    data: categoryData,
  } = useQuery({
    queryKey: ["categoryData"],
    queryFn: () => api.get(`${CATEGORIES_URL}`).then((res) => res.data),
  });

  if (isCategoryPending) return "Loading...";
  if (categoryError) return categoryError.message;

  return categoryData.data.categories.map((category) => ({
    key: category._id,
    name: category.name,
    id: category._id,
  }));
};
