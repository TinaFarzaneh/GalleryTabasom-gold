import { useQuery } from "@tanstack/react-query";
import { SUBCATEGORIES_URL } from "../../config";
import axios from "../../api/http";

export const GetSubcategories = () => {
  const {
    isPending: isSubcategoryPending,
    error: subcategoryError,
    data: subcategoryData,
  } = useQuery({
    queryKey: ["subcategoryData"],
    queryFn: () => axios.get(`${SUBCATEGORIES_URL}`).then((res) => res.data),
  });

  if (isSubcategoryPending) return "Loading...";
  if (subcategoryError) return subcategoryError.message;
  console.log(subcategoryData);

  return subcategoryData.data.categories.map((category) => ({
    key: category._id,
    name: category.name,
    id: category._id,
  }));
};
