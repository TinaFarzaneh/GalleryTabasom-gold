import { useNavigate, useParams } from "react-router-dom";
import fail from "../../assets/images/fail.webp";
import success from "../../assets/images/success.webp";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { api } from "../../api/http";
import { ORDERS_URL, PATHS } from "../../config";
import { clearCart } from "../../features";

const ResultPayment = () => {
  const { resultType } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.cart);

  const userId = "656ccb5c2c9a484cde00dc20";
  //مریم گلریز

  // *************AddMutation*************//
  const addOrder = useMutation({
    mutationFn: (order) => api.post(`${ORDERS_URL}`, order),
    onMutate: () => {
      console.log("onMutate");
    },
    onError: async (error) => {
      console.log("error", error);
    },
    onSuccess: async () => {
      console.log("با موفقیت ثبت شد");
    },
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleAdd();
      navigate(PATHS.HOME);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [addOrder]);

  let products = [];
  products = cartState.map((product) => ({
    count: product.count,
    product: product.product._id,
  }));

  const order = {
    user: userId,
    products: products,
    deliveryStatus: false,
  };

  const handleAdd = () => {
    if (resultType === "success") {
      addOrder.mutate(order);
      dispatch(clearCart());
    }
  };

  return (
    <div className="mt-32 mx-auto w-8/12">
      {resultType === "success" ? (
        <div className="flex flex-col items-center justify-between w-full">
          <div className="flae flex-col flex-1 items-center justify-center">
            <h4 className="text-green-500 flex-1 text-3xl whitespace-nowrap mb-10">
              باتشکر از پرداخت شما سفارش شما ثبت شده و جهت هماهنگی ارسال با شما
              تماس گرفته خواهد شد
            </h4>
            {/* <p className="text-center w-full text-xl mt-5"> 🤩 🌿 </p> */}
          </div>
          <img
            src={success}
            alt="success-img"
            width={500}
            className="rounded-2xl"
          />
        </div>
      ) : resultType === "fail" ? (
        <div className="flex flex-col items-center justify-between w-full">
          <div className="flae flex-col flex-1 items-center justify-center">
            <h4 className="text-red-500 flex-1 text-3xl whitespace-nowrap mb-10">
              🚫 پرداخت موفقیت آمیز نبود سفارش شما در انتظار پرداخت است🚫
            </h4>
          </div>
          <img src={fail} alt="fail-img" width={500} className="rounded-2xl" />
        </div>
      ) : (
        <>
          <h4>نتیجه پرداخت ناشناخته است!</h4>
        </>
      )}
    </div>
  );
};
export default ResultPayment;
