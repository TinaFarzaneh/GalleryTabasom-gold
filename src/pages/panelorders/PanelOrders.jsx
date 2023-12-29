import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useState } from "react";
import { api } from "../../api/http";
import { ORDERS_URL } from "../../config";
import { TbCheckupList } from "react-icons/tb";
import {
  Button,
  CheckOrderModal,
  MainPagination,
  Maintable,
  RadioInput,
  SectionTable,
  Spinner,
} from "../../components";
import jalaliMoment from "jalali-moment";
import { GetOrders, GetUserById } from "../../services";

const PanelOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [delivered, setDelivered] = useState(false);
  const [sortDirection, setSortDirection] = useState("up");

  const perPage = 4;
  // **********************
  const [showModal, setShowModal] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const [orderId, setOrderId] = useState("");

  const queryClient = useQueryClient();

  // ***********GetRequestForOrders***********
  const [orders, totalPages, total] = GetOrders(
    currentPage,
    perPage,
    delivered
    // sortDirection
  );

  const handlePageChange = (page) => setCurrentPage(page);

  // *******************GetOrder*******************
  const { isPending, error, data } = useQuery({
    queryKey: ["orderData", orderId],
    queryFn: () => api.get(`${ORDERS_URL}/${orderId}`).then((res) => res.data),
  });
  // *****************EditOrder && Mutation*********************

  const editOrder = useMutation({
    mutationFn: () => {
      return api.patch(`${ORDERS_URL}/${orderId}`, {
        deliveryStatus: true,
      });
    },
    onMutate: () => {
      setSpinner(true);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orderData"] });
      setOrderId(null);
    },
    onError: (error) => {
      console.log("error", error);
    },
    onSettled: () => {
      setSpinner(false);
    },
  });

  const handleDeliveredFilter = () => {
    setDelivered(true);
    setCurrentPage(1);
  };

  const handlePendingFilter = () => {
    setDelivered(false);
    setCurrentPage(1);
  };

  const handleShowCheckOrderModal = (id) => {
    setOrderId(id);
    setShowModal(true);
  };

  const handleDeliveryStatus = () => {
    editOrder.mutate();
  };

  if (isPending) return <Spinner />;
  if (error) return error.message;

  const columns = [
    {
      id: 1,
      title: "نام کاربر",
    },
    {
      id: 2,
      title: "مجموع مبلغ",
    },
    {
      id: 3,
      title: "زمان ثبت سفارش",
      icon:
        sortDirection === "up" ? (
          <IoMdArrowDropdown
            className="text-3xl"
            onClick={() => setSortDirection("down")}
          />
        ) : (
          <IoMdArrowDropup
            className="text-3xl"
            onClick={() => setSortDirection("up")}
          />
        ),
    },
    {
      id: 4,
      title: "",
    },
  ];
  return (
    <div className="mt-20">
      <div className="flex items-center justify-between">
        <SectionTable tableTitle="مدیریت سفارش ها" />
        <div className="flex gap-4 items-center ml-12">
          <RadioInput
            checked={delivered}
            id="delivered"
            onFilter={handleDeliveredFilter}
          >
            سفارش های تحویل شده
          </RadioInput>
          <RadioInput
            checked={!delivered}
            id="pending"
            onFilter={handlePendingFilter}
          >
            سفارش های در انتظار ارسال
          </RadioInput>
        </div>
      </div>
      <Maintable columns={columns}>
        {Array.isArray(orders) &&
          orders.map((order) => (
            <tr key={order._id} className="border-b hover:bg-[#73907292]">
              <td className="whitespace-nowrap px-6 py-5">
                <GetUserById userId={order.user} />
              </td>
              <td className="whitespace-nowrap px-6">
                {order.totalPrice.toLocaleString()} تومان
              </td>
              <td className="whitespace-nowrap pr-10 pl-6">
                {jalaliMoment(order.createdAt, "YYYY-MM-DD").format(
                  "jYYYY/jMM/jDD"
                )}
              </td>
              <td className="whitespace-nowrap px-6 text-center cursor-pointer flex items-center">
                <Button
                  onClick={() => handleShowCheckOrderModal(order._id)}
                  title={"بررسی سفارش"}
                  className="border"
                />
                <TbCheckupList className="text-xl" />
              </td>
            </tr>
          ))}
      </Maintable>
      {total.total_pages > 1 && (
        <MainPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          perPage={perPage}
          total={total}
        />
      )}
      {showModal && (
        <CheckOrderModal
          delivered={delivered}
          data={data}
          // onChangeDeliveredStatus={setDelivered(true)}
          onEditDeliveryStatus={handleDeliveryStatus}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
export default PanelOrders;
