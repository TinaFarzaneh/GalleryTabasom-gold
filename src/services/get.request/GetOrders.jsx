import { useQuery } from "@tanstack/react-query";
import { ORDERS_URL } from "../../config";
import { api } from "../../api/http";

export const GetOrders = (
  currentPage = 1,
  perPage = 2,
  delivered = false,
  sortDirection
) => {
  const {
    isPending: isOrdersPending,
    error: ordersError,
    data: ordersData,
  } = useQuery({
    queryKey: ["panelOrdersData", currentPage, delivered, sortDirection],
    queryFn: () =>
      api
        .get(
          sortDirection === "up"
            ? `${ORDERS_URL}?page=${currentPage}&limit=${perPage}&deliveryStatus=${delivered}&sort=-createdAt`
            : `${ORDERS_URL}?page=${currentPage}&limit=${perPage}&deliveryStatus=${delivered}&sort=createdAt`
        )
        .then((res) => res.data),
    keepPreviousData: true,
    staleTime: 60000,
  });

  if (isOrdersPending) return "Loading...";
  if (ordersError) return ordersError.message;

  const { orders } = ordersData.data;
  const { total } = ordersData;
  const totalPages = Math.ceil(total / perPage);

  return [orders, totalPages, total];
};
