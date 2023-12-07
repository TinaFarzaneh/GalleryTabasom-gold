import { useQuery } from "@tanstack/react-query";
import axios from "../../api/http";
import { PRODUCTS_URL } from "../../config";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import {
  MainPagination,
  Maintable,
  SectionTable,
  ProductsSelect,
} from "../../components";
import { GetCategoryId, GetSubcategoryId } from "../../services";
const PanelProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const perPage = 4;
  const handlePageChange = (page) => setCurrentPage(page);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };
  const columns = [
    {
      id: 1,
      title: "تصویر",
    },
    {
      id: 2,
      title: "نام کالا",
    },
    {
      id: 3,
      title: (
        <ProductsSelect
          onCategoryChange={handleCategoryChange}
          data={selectedCategory}
        />
      ),
    },
    {
      id: 4,
      title: "",
    },
  ];

  const {
    isPending: isProductsPending,
    error: productsError,
    data: productsData,
  } = useQuery({
    queryKey: ["panelProductsData", currentPage, selectedCategory],
    queryFn: () =>
      axios
        .get(
          `${PRODUCTS_URL}?page=${currentPage}&limit=${perPage}${
            selectedCategory !== "all" ? `&category=${selectedCategory} ` : ""
          }`
        )
        .then((res) => res.data),
    keepPreviousData: true,
    staleTime: 60000,
  });

  if (isProductsPending) return "Loading...";
  if (productsError) return productsError.message;
  const { products } = productsData.data;
  console.log(productsData);

  return (
    <div className="mt-20">
      <SectionTable
        tableTitle="مدیریت کالاها"
        maincolor="bg-success"
        title="افزودن کالا"
      />
      <Maintable columns={columns}>
        {products.map((product) => (
          <tr key={product._id} className="border-b hover:bg-[#D0E7D2]">
            <td className="px-5 py-2 ">
              <div>
                <img
                  src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
                  className="rounded-lg w-16 h-9"
                />
              </div>
            </td>
            <td className="px-6 py-4">{product.name}</td>
            <td className="py-4 pr-10 pl-6 ">
              <GetCategoryId categoryId={product.category} />
              / <GetSubcategoryId subcategoryId={product.subcategory} />
            </td>
            <td className="px-6 py-4 text-center flex gap-5">
              <CiEdit className="w-6 h-6 cursor-pointer text-green-500" />
              <RiDeleteBin5Line className="w-6 h-6 cursor-pointer text-red-500" />
            </td>
          </tr>
        ))}
      </Maintable>
      {productsData.total >= perPage && (
        <MainPagination
          totalPages={productsData.total_pages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default PanelProducts;
