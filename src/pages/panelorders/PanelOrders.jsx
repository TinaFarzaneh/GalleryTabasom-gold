import { useQuery } from "@tanstack/react-query";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useState } from "react";
import axios from "../../api/http";
import { ORDERS_URL } from "../../config";
import {
  MainPagination,
  Maintable,
  RadioInput,
  SectionTable,
} from "../../components";
import jalaliMoment from "jalali-moment";
import { GetUserById } from "../../services";

const PanelOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [delivered, setDelivered] = useState(false);
  const [sortDirection, setSortDirection] = useState("up");

  const perPage = 4;
  const handlePageChange = (page) => setCurrentPage(page);

  const {
    isPending: isOrdersPending,
    error: ordersError,
    data: ordersData,
  } = useQuery({
    queryKey: ["panelOrdersData", currentPage, delivered, sortDirection],
    queryFn: () =>
      axios
        .get(
          sortDirection === "up"
            ? `${ORDERS_URL}?page=${currentPage}&limit=${perPage}&deliveryStatus=${delivered}&sort=-createdAt`
            : `${ORDERS_URL}?page=${currentPage}&limit=${perPage}&deliveryStatus=${delivered}&sort=createdAt`
        )
        .then((res) => res.data),
    keepPreviousData: true,
    staleTime: 60000,
  });
  console.log(ordersData);
  if (isOrdersPending) return "Loading...";
  if (ordersError) return ordersError.message;

  const { orders } = ordersData.data;
  const { total } = ordersData;

  const handleDeliveredFilter = () => {
    setDelivered(true);
    setCurrentPage(1);
  };

  const handlePendingFilter = () => {
    setDelivered(false);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(total / perPage);

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
  console.log(ordersData);
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
        {orders.map((order) => (
          <tr key={order._id} className="border-b hover:bg-[#D0E7D2]">
            <td className="whitespace-nowrap px-6 py-4">
              <GetUserById userId={order.user} />
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              {order.totalPrice.toLocaleString()} تومان
            </td>
            <td className="whitespace-nowrap pr-10 pl-6 py-4">
              {jalaliMoment(order.createdAt, "YYYY-MM-DD").format(
                "jYYYY/jMM/jDD"
              )}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-center cursor-pointer">
              بررسی سفارش
            </td>
          </tr>
        ))}
      </Maintable>
      {ordersData.total_pages > 1 && (
        <MainPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          perPage={perPage}
        />
      )}
    </div>
  );
};
export default PanelOrders;
