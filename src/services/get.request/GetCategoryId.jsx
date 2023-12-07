import { useQuery } from "@tanstack/react-query";
import axios from "../../api/http";
import { CATEGORIES_URL } from "../../config";

export const GetCategoryId = ({ categoryId }) => {
  const {
    isPending: isCategoryPending,
    error: categoryError,
    data: categoryData,
  } = useQuery({
    queryKey: ["panelCategoryData", categoryId],
    queryFn: () =>
      axios.get(`${CATEGORIES_URL}/${categoryId}`).then((res) => res.data),
  });

  if (isCategoryPending) return "Loading...";

  if (categoryError) return categoryError.message;

  return <>{categoryData.data.category.name}</>;
};
