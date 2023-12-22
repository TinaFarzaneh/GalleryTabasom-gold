import { useQuery } from "@tanstack/react-query";
import { SUBCATEGORIES_URL } from "../../config";
import { api } from "../../api/http";

export const GetSubcategories = () => {
  const {
    isPending: isSubcategoryPending,
    error: subcategoryError,
    data: subcategoryData,
  } = useQuery({
    queryKey: ["subcategoryData"],
    queryFn: () => api.get(`${SUBCATEGORIES_URL}`).then((res) => res.data),
  });

  if (isSubcategoryPending) return "Loading...";
  if (subcategoryError) return subcategoryError.message;

  return subcategoryData.data.subcategories.map((subcategory) => ({
    key: subcategory._id,
    name: subcategory.name,
    id: subcategory._id,
    category: subcategory.category,
  }));
};
