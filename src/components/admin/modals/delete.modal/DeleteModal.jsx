import { Button } from "../../../common";
import { WrapperModals } from "../wrapper.modal";
import { CgDanger } from "react-icons/cg";

export const DeleteModal = ({
  onDelete,
  onClose,
  selectedProduct,
  productName,
}) => {
  const handleDelete = (event) => {
    event.preventDefault();
    onDelete(selectedProduct);
    onClose();
  };
  return (
    <WrapperModals>
      <div
        dir="rtl"
        onSubmit={handleDelete}
        className=" px-24 py-10  bg-[#465845] rounded-3xl overflow-hidden transform transition-all my-8 align-middle  inline-block drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)]"
      >
        <div className="flex flex-col gap-7 mb-10">
          <CgDanger className="text-red-600 text-3xl text-center self-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)]" />
          <p className="text-lg  font-bold text-[#ffd255] text-right drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)]">
            حذف کالا <span className="text-red-500"> {productName} ؟</span>
          </p>
        </div>
        <div className="flex items-center justify-center gap-5">
          <Button maincolor="bg-red-500" title="حذف" onClick={handleDelete} />
          <Button maincolor="bg-green-500" title="انصراف" onClick={onClose} />
        </div>
      </div>
    </WrapperModals>
  );
};
