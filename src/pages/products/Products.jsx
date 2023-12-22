import { MainSideBar } from "../../components/user/category.sidebar";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import { api } from "../../api/http";
import { GetCategoryId } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { PRODUCTS_URL, PRODUCT_URL } from "../../config";
import { Card } from "../../components/user/card/Card";

export const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");

  const {
    isPending: isProductsPending,
    error: productsError,
    data: productsData,
  } = useQuery({
    queryKey: ["products", categoryId],
    queryFn: () =>
      api
        .get(
          `${PRODUCTS_URL}?limit=500&${
            categoryId !== "category=all" ? `category=${categoryId} ` : ""
          }`
        )
        .then((res) => res.data),
    keepPreviousData: true,
    staleTime: 60000,
  });

  if (isProductsPending) return "Loading...";
  if (productsError) return productsError.message;

  return (
    <div className="flex gap-32 pt-24">
      <MainSideBar />
      <Outlet />
      <div className="flex flex-col items-center gap-y-10 mr-96">
        <div className="text-2xl font-bold mt-10 px-10 self-start ">
          <GetCategoryId categoryId={categoryId} />
        </div>
        <div className="grid grid-cols-2 gap-y-10 gap-x-16">
          {productsData?.data?.products?.map((product, index) => (
            <Link
              to={`/${PRODUCT_URL}${product._id}`}
              key={product.id || index}
            >
              <Card
                name={product.name}
                price={product.price}
                // rate={product.rate}
                image={product.images[0]}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Products;
