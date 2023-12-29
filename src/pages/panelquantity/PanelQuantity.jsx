import { api } from "../../api/http";
import { useEffect, useState } from "react";
import { PRODUCTS_URL } from "../../config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { MainPagination, Maintable, SectionTable } from "../../components";

const PanelQuantity = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editedValues, setEditedValues] = useState({});

  const [showToast, setShowToast] = useState(false);

  const handlePageChange = (page) => setCurrentPage(page);
  const perPage = 4;

  const columns = [
    {
      id: 1,
      title: "کالا",
    },
    {
      id: 2,
      title: "قیمت (تومان)",
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
      api
        .get(`${PRODUCTS_URL}?page=${currentPage}&limit=${perPage}`)
        .then((res) => res.data),
    keepPreviousData: true,
    staleTime: 60000,
  });

  // ******************EDITMUTATION**********************//

  const editProduct = useMutation({
    mutationFn: (editedRows) => {
      const editrow = editedRows.map((singlerow) => {
        const { id, ...updates } = singlerow;
        return api.patch(`${PRODUCTS_URL}/${id}`, updates);
      });
      return Promise.all(editrow);
    },
    onSuccess: async () => {
      await QueryClient.invalidateQueries({ queryKey: ["panelQuantityData"] });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const handleSave = async () => {
    try {
      const editedRows = Object.entries(editedValues)
        .filter(([values]) => Object.keys(values).length > 0)
        .map(([productId, values]) => ({ id: productId, ...values }));
      console.log(Object.entries(editedValues));

      await editProduct.mutateAsync(editedRows);
      setEditedValues({});
      setShowToast(true);
    } catch (error) {
      console.error("Error during save:", error);
    }
  };

  const onChangeInput = (event, productId) => {
    const { name, value } = event.target;
    setEditedValues((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], [name]: value },
    }));
  };

  // ******************ESCAPECLICK**************
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        setEditedValues({});
        setShowToast(false);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  // *******************************************
  if (isQuantityPending) return "Loading...";
  if (quantityError) return quantityError.message;

  const { products } = quantityData.data;

  return (
    <div className="mt-20">
      <SectionTable
        tableTitle="مدیریت موجودی و قیمت ها"
        maincolor="bg-success"
        title="ذخیره"
        condition={Object.keys(editedValues).length !== 0}
        onClick={() => handleSave()}
      />
      <Maintable columns={columns}>
        {products.map((product) => (
          <tr key={product._id} className="border-b hover:bg-[#73907292]">
            <td className="whitespace-nowrap px-6 py-5">{product.name}</td>

            <td className="whitespace-nowrap px-6">
              <input
                onChange={(e) => onChangeInput(e, product._id)}
                value={
                  editedValues[product._id]?.price
                    ? editedValues[product._id].price
                    : product.price
                }
                type="number"
                name="price"
                className="bg-transparent"
              />
            </td>
            <td className="whitespace-nowrap pr-10 pl-6">
              <input
                onChange={(e) => onChangeInput(e, product._id)}
                value={editedValues[product._id]?.quantity || product.quantity}
                type="number"
                className="bg-transparent"
                name="quantity"
              />
            </td>
          </tr>
        ))}
      </Maintable>
      {showToast && <ToastContainer />}

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
