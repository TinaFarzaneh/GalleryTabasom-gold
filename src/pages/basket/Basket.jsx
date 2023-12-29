import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  DeleteModal,
  MainPagination,
  Maintable,
} from "../../components";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { removeProductFromCart } from "../../features";
import { CHECKOUT_URL, HOME_URL } from "../../config";
import "react-toastify/dist/ReactToastify.css";
import { RiDeleteBin5Line } from "react-icons/ri";

const Basket = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const lengthOfBasket = cartState.length;
  const navigate = useNavigate();

  const [selectedProductForDelete, setSelectedProductForDelete] = useState([]);
  console.log(selectedProductForDelete);

  const [showToast, setShowToast] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState({
    add: false,
    delete: false,
  });

  const perPage = 4;
  const handlePageChange = (page) => setCurrentPage(page);
  const totalPages = Math.ceil(lengthOfBasket / perPage);

  const dataPaginated = [...cartState].slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  //delete
  const handleShowDeleteModal = (productId, productName) => {
    setShowModal((showModal) => ({ ...showModal, delete: true }));
    setSelectedProductForDelete([productId, productName]);
  };

  const handleDelete = () => {
    dispatch(removeProductFromCart(selectedProductForDelete[0]));
    setShowModal((showModal) => ({ ...showModal, delete: false }));
    toast.success("کالا با موفقیت حذف شد", {
      autoClose: 3000,
    });
    setShowToast(true);
    setSelectedProductForDelete(null);

    if (lengthOfBasket === (currentPage - 1) * perPage + 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const calcSum = () => {
    const getSum = (total, order) => {
      return total + order.count * order.product.price;
    };

    let result = cartState.reduce(getSum, 0);
    return result.toLocaleString();
  };

  const handleNavigateToCheckout = () => {
    navigate(`${HOME_URL}${CHECKOUT_URL}`);
  };
  // add ...
  // const handleShowAddModal = () => {
  //   // setShowModal((showModal) => ({ ...showModal, add: true }));
  // };

  const columns = [
    {
      id: 1,
      title: "نام کالا",
      width: "w-[40%]",
    },
    {
      id: 2,
      title: "قیمت",
      width: "w-[20%]",
    },
    {
      id: 3,
      title: "تعداد",
      width: "w-[20%]",
    },
    {
      id: 4,
      title: "",
      width: "w-[20%]",
    },
  ];

  return (
    <div className="w-4/5 mx-auto container py-3 px-20 mt-32 mr-14 flex flex-col gap-y-2">
      <div className="flex items-center justify-between mb-2 ml-4">
        <h1 className="mr-8 text-2xl text-[#fdd255] font-bold">سبد خرید</h1>
      </div>
      {/* <div className="h-[20rem]"> */}
      <Maintable columns={columns}>
        {Array.isArray(dataPaginated) &&
          dataPaginated.map((order) => (
            <tr
              key={order.product._id}
              className="border-b hover:bg-[#73907292]"
            >
              <td className="whitespace-nowrap px-6 py-4">
                {order.product.name}
              </td>
              <td className="whitespace-nowrap pr-10 pl-6 py-4">
                {order.product.price.toLocaleString()}
              </td>
              <td className="whitespace-nowrap pr-10 pl-6 py-4">
                {order.count}
              </td>
              <td className="whitespace-nowrap px-6 py-4 flex items-center gap-2">
                <RiDeleteBin5Line
                  onClick={() =>
                    handleShowDeleteModal(order.product._id, order.product.name)
                  }
                  className="w-6 h-6 cursor-pointer text-red-500"
                />
                {/* <Button
                  maincolor="bg-green-500"
                  title="افزودن تعداد"
                  onClick={() => handleShowAddModal()}
                /> */}
              </td>
            </tr>
          ))}
      </Maintable>
      {/* </div> */}
      <div className="flex items-center justify-between w-3/5 mx-auto mt-3">
        <div className="flex items-center font-semibold bg-[#73907292] p-2 rounded-3xl  text-[#ffd255]  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          جمع کل : <span className="mr-2"> {calcSum()} تومان </span>
        </div>
        <Button
          maincolor="bg-green-500"
          title="نهایی کردن سبد خرید"
          onClick={handleNavigateToCheckout}
        />
      </div>

      {showToast && <ToastContainer />}

      <MainPagination
        perPage={perPage}
        total={lengthOfBasket}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {showModal.delete && (
        <DeleteModal
          label="حذف سفارش"
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

      {showModal.add && (
        <></>
        // <AddEditModal
        //   onAdd={(formDate) => handleAdd(formDate)}
        //   onClose={() =>
        //     setShowModal((showModal) => ({
        //       ...showModal,
        //       add: false,
        //     }))
        //   }
        // />
      )}
    </div>
  );
};

export default Basket;
