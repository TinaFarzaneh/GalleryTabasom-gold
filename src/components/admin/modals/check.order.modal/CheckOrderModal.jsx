import { Button, Maintable } from "../../../common";
import { WrapperModals } from "../wrapper.modal";
import { RxCross2 } from "react-icons/rx";
import jalaliMoment from "jalali-moment";

export const CheckOrderModal = ({
  onClose,
  delivered,
  data,
  onEditDeliveryStatus,
}) => {
  const columns = [
    {
      id: 1,
      title: "نام کالا",
      width: "w-[60%]",
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
  ];
  return (
    <WrapperModals>
      <form
        dir="rtl"
        className="inline-block px-6 py-10 align-bottom bg-[#354535]  rounded-lg text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle"
      >
        <div className="flex justify-between items-center mb-3 text-[#abd6a9]">
          <h3 className="text-lg leading-6 font-bold text-right">
            نمایش سفارش ها
          </h3>
          <RxCross2
            onClick={onClose}
            className="cursor-pointer h-8 w-8 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)] "
          />
        </div>
        <div className="flex flex-col gap-2 items-start justify-center w-11/12 mx-auto ">
          <div className="flex items-center">
            <span>نام مشتری : </span>
            <p className="flex items-center">
              {" "}
              {data?.data?.order?.user?.firstname}{" "}
              {data?.data?.order?.user?.lastname}
            </p>
          </div>
          <div className="flex items-center">
            <span> تلفن : </span>
            <p className="">{data?.data?.order.user.phoneNumber}</p>
          </div>

          <div className="flex items-center">
            <span>زمان سفارش : </span>
            <p className="">
              {jalaliMoment(
                data?.data?.order.user.createdAt,
                "YYYY-MM-DD"
              ).format("jYYYY/jMM/jDD")}
            </p>
          </div>
          <div className="flex items-center">
            <span>آدرس : </span>
            <p className="">{data?.data?.order.user.address}</p>
          </div>
          <Maintable className="px-10 w-[30rem]" columns={columns}>
            {Array.isArray(data?.data?.order.products) &&
              data?.data?.order.products.map((row) => (
                <tr
                  key={row._id}
                  className={`hover:bg-[#73907292]">  text-[#ffd255]
              `}
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    {row.product?.name}
                  </td>
                  <td className="whitespace-nowrap pr-10 pl-6 py-4">
                    {row.product?.price.toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap pr-10 pl-6 py-4">
                    {row.count}
                  </td>
                </tr>
              ))}
          </Maintable>
        </div>
        <div className="flex items-center justify-center">
          {!delivered ? (
            <Button
              maincolor="bg-green-500"
              title="تحویل شد"
              type="submit"
              className="text-lg"
              onClick={onEditDeliveryStatus}
            />
          ) : (
            <span className="text-[#abd6a9] text-lg">
              زمان تحویل :
              {jalaliMoment(data.data.order.deliveryDate, "YYYY-MM-DD").format(
                "jYYYY/jMM/jDD"
              )}
            </span>
          )}
        </div>
      </form>
    </WrapperModals>
  );
};
