import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../api/http";
import { PRODUCTS_URL } from "../../config";
import { MainPagination, Maintable, SectionTable } from "../../components";

const PanelQuantity = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => setCurrentPage(page);

  const perPage = 4;

  const columns = [
    {
      id: 1,
      title: "کالا",
    },
    {
      id: 2,
      title: "قیمت",
    },
    {
      id: 3,
      title: "موجودی",
    },
  ];

  const {
    isPending: isQuantityPending,
    error: quantityError,
    data: quantityData,
  } = useQuery({
    queryKey: ["panelQuantityData", currentPage],
    queryFn: () =>
      axios
        .get(`${PRODUCTS_URL}?page=${currentPage}&limit=${perPage}`)
        .then((res) => res.data),
    keepPreviousData: true,
    staleTime: 60000,
  });

  if (isQuantityPending) return "Loading...";

  if (quantityError) return quantityError.message;

  const { products } = quantityData.data;
  return (
    <div className="mt-20">
      <SectionTable
        tableTitle="مدیریت موجودی و قیمت ها"
        maincolor="bg-success"
        title="ذخیره"
      />
      <Maintable columns={columns}>
        {products.map((product) => (
          <tr key={product._id} className="border-b hover:bg-[#D0E7D2]">
            <td className="whitespace-nowrap px-6 py-4">{product.name}</td>
            <td className="whitespace-nowrap px-6 py-4">
              {product.price.toLocaleString()} تومان
            </td>
            <td className="whitespace-nowrap pr-10 pl-6 py-4">
              {product.quantity}
            </td>
          </tr>
        ))}
      </Maintable>
      {quantityData.total >= perPage && (
        <MainPagination
          totalPages={quantityData.total_pages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
export default PanelQuantity;
