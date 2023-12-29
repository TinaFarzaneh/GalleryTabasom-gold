import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/http";
import { PRODUCTS_URL } from "../../config";

export const GetAllProducts = (
  currentPage = 1,
  perPage = 2,
  selectedCategory
) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["panelProductsData", currentPage, selectedCategory],
    queryFn: () =>
      api
        .get(
          `${PRODUCTS_URL}?page=${currentPage}&limit=${perPage}${
            selectedCategory !== "all" ? `&category=${selectedCategory}` : ""
          }`
        )
        .then((res) => res.data),
    keepPreviousData: true,
    staleTime: 30000,
  });

  if (isPending) return "loading...";

  if (error) return "An error has occurred: " + error.message;

  const { products } = data.data;
  const { total, total_pages } = data;

  return [products, total, total_pages];
};
