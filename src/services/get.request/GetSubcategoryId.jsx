import { useQuery } from "@tanstack/react-query";
import axios from "../../api/http";
import { SUBCATEGORIES_URL } from "../../config";

export const GetSubcategoryId = ({ subcategoryId }) => {
  const {
    isPending: isSubcategoryPending,
    error: subcategoryError,
    data: subcategoryData,
  } = useQuery({
    queryKey: ["panelCategoryData", subcategoryId],
    queryFn: () =>
      axios
        .get(`${SUBCATEGORIES_URL}/${subcategoryId}`)
        .then((res) => res.data),
  });

  if (isSubcategoryPending) return "Loading...";

  if (subcategoryError) return subcategoryError.message;

  return <>{subcategoryData.data.subcategory.name}</>;
};
