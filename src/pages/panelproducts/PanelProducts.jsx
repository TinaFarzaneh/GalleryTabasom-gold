import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/http";
import { PRODUCTS_URL } from "../../config";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import {
  MainPagination,
  Maintable,
  SectionTable,
  ProductsSelect,
  DeleteModal,
  AddEditModal,
} from "../../components";
import { GetCategoryId, GetSubcategoryId } from "../../services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PanelProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showModal, setShowModal] = useState({
    add: false,
    delete: false,
    edit: false,
  });
  const [selectedProductForDelete, setSelectedProductForDelete] = useState([]);
  const [selectedProductForEdit, setSelectedProductForEdit] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const queryClient = useQueryClient();
  const perPage = 4;
  // *****************GETPRODUCT*****************//
  const {
    isPending: isProductsPending,
    error: productsError,
    data: productsData,
  } = useQuery({
    queryKey: ["panelProductsData", currentPage, selectedCategory],
    queryFn: () =>
      api
        .get(
          `${PRODUCTS_URL}?page=${currentPage}&sort=-createdAt&limit=${perPage}${
            selectedCategory !== "all" ? `&category=${selectedCategory} ` : ""
          }`
        )
        .then((res) => res.data),
    keepPreviousData: true,
    staleTime: 60000,
  });
  // *********************************************
  const handlePageChange = (page) => setCurrentPage(page);
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  //************ADDPRODUCT USEMUTATION**********//
  const addProduct = useMutation({
    mutationFn: (product) =>
      api.post(`${PRODUCTS_URL}`, product, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onMutate: () => {
      setShowModal((prevModal) => ({ ...prevModal }));
    },
    onError: async (error) => {
      console.log("error:", error);
      await queryClient.invalidateQueries({ queryKey: ["panelProductsData"] });
      toast.error("کالایی اضافه نشد", {
        autoClose: 3000,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["panelProductsData"] });
      toast.success("کالا با موفقیت اضافه شد", {
        autoClose: 3000,
      });
    },
    onSettled: () => {
      setShowModal((showModal) => ({ ...showModal }));
    },
  });
  // ***************DELETEPRODUCTS USEMUTATION************//
  const mutation = useMutation({
    mutationFn: (id) => api.delete(`${PRODUCTS_URL}/${id}`),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["panelProductsData"] });
      toast.success("کالا با موفقیت حذف شد", {
        autoClose: 3000,
      });
    },
    onError: async () => {
      toast.error("کالا حذف نشد", {
        autoClose: 3000,
      });
    },
  });
  // *******************EDITUSEMUTATION***************//
  const editProduct = useMutation({
    mutationFn: (product) => {
      return api.patch(`${PRODUCTS_URL}/${selectedProductForEdit.id}`, product);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["panelProductsData"] });
      setSelectedProductForEdit(null);
      toast.success("کالای موردنظر ویرایش شد", {
        autoClose: 3000,
      });
    },
    onError: (error) => {
      console.log("error edit:", error);
      toast.error("کالای موردنظر ویرایش نشد", {
        autoClose: 3000,
      });
    },
  });
  // ********************HANDLEDELET & DLETEMODAL****************//
  const handleDelete = (id) => {
    mutation.mutate(id);
    setShowModal((showModal) => ({ ...showModal, delete: false }));
    setShowToast(true);
    setSelectedProductForDelete(null);

    if (productsData.total === (currentPage - 1) * perPage + 1) {
      handlePageChange(currentPage - 1);
    }
  };

  if (mutation.isLoading) {
    return <span>Deleting...</span>;
  }
  // *********DELETEMODAL************//
  const handleShowDeleteModal = (productId, productName) => {
    setShowModal((showModal) => ({ ...showModal, delete: true }));

    setSelectedProductForDelete([productId, productName]);
  };
  // **********ADDMODAL**************//
  const handleShowAddModal = () => {
    setShowModal((showModal) => ({ ...showModal, add: true }));
  };
  //**************HANDLEEDIT & SHOWEDITMODAL***********//
  const handleShowEditModal = (productId, productForEdit) => {
    setShowModal((showModal) => ({ ...showModal, edit: true }));
    setSelectedProductForEdit({ id: productId, data: { ...productForEdit } });
  };
  // ***********HANDLEEDIT*******************//
  const handleEdit = (product) => {
    editProduct.mutate(product);
    setShowModal((showModal) => ({ ...showModal, edit: false }));
    setShowToast(true);
  };
  // **********HANDLESAVE***********//
  const handleAdd = (formData) => {
    addProduct.mutate(formData);
  };
  // ******************************/
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

  if (isProductsPending) return "Loading...";
  if (productsError) return productsError.message;
  const { products } = productsData.data;

  return (
    <div className="mt-20">
      <SectionTable
        tableTitle="مدیریت کالاها"
        maincolor="bg-success"
        title="افزودن کالا"
        onClick={handleShowAddModal}
      />
      <Maintable columns={columns}>
        {products.map((product) => (
          <tr key={product._id} className="border-b hover:bg-[#73907292]">
            <td className="px-6">
              <div>
                <img
                  src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
                  alt="thumbnailImage"
                  className="rounded-lg w-16 h-9"
                />
              </div>
            </td>
            <td className="px-6 py-5">{product.name}</td>
            <td className="pr-10 pl-6 ">
              <GetCategoryId categoryId={product.category} />
              / <GetSubcategoryId subcategoryId={product.subcategory} />
            </td>
            <td className="px-6 py-4 text-center flex gap-5">
              <CiEdit
                className="w-6 h-6 cursor-pointer text-green-500"
                onClick={() => handleShowEditModal(product._id, product)}
              />
              <RiDeleteBin5Line
                className="w-6 h-6 cursor-pointer text-red-500"
                onClick={() => handleShowDeleteModal(product._id, product.name)}
              />
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
      {showModal.delete && (
        <DeleteModal
          productName={selectedProductForDelete[1]}
          onDelete={() => handleDelete(selectedProductForDelete[0])}
          onClose={() =>
            setShowModal((showModal) => ({
              ...showModal,
              delete: false,
            }))
          }
        />
      )}
      {showToast && <ToastContainer />}
      {showModal.add && (
        <AddEditModal
          onAdd={(formDate) => handleAdd(formDate)}
          onClose={() =>
            setShowModal((showModal) => ({
              ...showModal,
              add: false,
            }))
          }
        />
      )}
      {showModal.edit && (
        <AddEditModal
          product={selectedProductForEdit.data}
          onEdit={(formData) => handleEdit(formData)}
          onClose={() =>
            setShowModal((showModal) => ({
              ...showModal,
              edit: false,
            }))
          }
        />
      )}
    </div>
  );
};

export default PanelProducts;
