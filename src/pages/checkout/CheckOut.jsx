import { Button, Calender, TextArea, TextInput } from "../../components";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { saveDate } from "../../features";
import { useDispatch } from "react-redux";

const CheckOut = ({ onAdd }) => {
  const [date, setDate] = useState();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().trim().required("پر کردن این فیلد الزامی می باشد *"),
    lastName: Yup.string().trim().required("پر کردن این فیلد الزامی می باشد *"),
    address: Yup.string().trim().required("پر کردن این فیلد الزامی می باشد *"),
    phone: Yup.string()
      .trim()
      .matches(/^09[0|1|2|3][0-9]{8}$/, "شماره همراه معتبر وارد کنید *")
      .required("پر کردن این فیلد الزامی می باشد *"),
    // deliveryDate: Yup.date().required("پر کردن این فیلد الزامی می باشد *"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      address: "",
      phone: "",
      // deliveryDate: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // onAdd(values);
      formik.resetForm();
      handlePayment();
    },
  });

  const handlePayment = () => {
    window.location.assign(`http://localhost:3001`);
  };

  const handleCalenderChange = (value) => {
    formik.setFieldValue("deliveryDate", value);

    if (formik.errors.deliveryDate) {
      formik.setFieldError("deliveryDate", "");
    }
  };

  const handleChangeDate = (e) => {
    setDate(e.target.value);
    dispatch(saveDate(date));
  };

  return (
    <div className="flex flex-col w-4/5 mt-32 mr-10 gap-5">
      <h3 className="text-2xl leading-6 font-bold text-right text-[#ffd255] mb-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        نهایی کردن سبد خرید
      </h3>
      <div className="flex px-20 items-center gap-32   mx-aut0  w-[80%]">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-center justify-between flex-1"
        >
          <TextInput
            condition={formik.touched.name && formik.errors.name}
            onChange={formik.handleChange}
            error={formik.errors.name}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            id="name"
            name="name"
            type="text"
            label="نام"
            className="text-[#ffd255]"
            // className={`${
            //   formik.touched.name && formik.errors.name
            //     ? "border-red-500 focus:outline-none focus:border-red-500"
            //     : "focus:outline-none focus:border-blue-500"
            // }`}
          />
          <TextInput
            condition={formik.touched.lastName && formik.errors.lastName}
            error={formik.errors.lastName}
            onChange={formik.handleChange}
            value={formik.values.lastName}
            onBlur={formik.handleBlur}
            id="lastName"
            type="text"
            name="lastName"
            label=" نام خانوادگی "
            // className={`${
            //   formik.touched.lastName && formik.errors.lastName
            //     ? "border-red-500 focus:outline-none focus:border-red-500"
            //     : "focus:outline-none focus:border-blue-500"
            // }`}
          />
          <TextInput
            condition={formik.touched.phone && formik.errors.phone}
            error={formik.errors.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            label="تلفن همراه "
            name="phone"
            id="phone"
            type="text"
            // className={`${
            //   formik.touched.phone && formik.errors.phone
            //     ? "border-red-500 focus:outline-none focus:border-red-500"
            //     : "focus:outline-none focus:border-blue-500"
            // }`}
          />

          <div className="mb-4 w-full text-right">
            <label className="text-[#ffd255] mb-2 flex items-center gap-4">
              تاریخ تحویل :
              {formik.touched.deliveryDate && formik.errors.deliveryDate ? (
                <div className="text-xs text-red-500 font-semibold">
                  {formik.errors.deliveryDate}
                </div>
              ) : null}
            </label>

            <Calender
              // onChange={handleCalenderChange}
              // value={formik.values.deliveryDate}
              onChange={(e) => handleChangeDate()}
              value={date}
              inputClass={`custom-input ${
                formik.touched.deliveryDate && formik.errors.deliveryDate
                  ? "border-red-500 focus:outline-none focus:border-red-500"
                  : "focus:outline-none focus:border-blue-500"
              }`}
              // className={`${
              //   formik.touched.deliveryDate && formik.errors.deliveryDate
              //     ? "custom-input .error"
              //     : ""
              // }`}
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              // value={formik.values.deliveryDate}
            />
          </div>

          <TextArea
            condition={formik.touched.address && formik.errors.address}
            error={formik.errors.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            id="address"
            rows={3}
            label="آدرس"
            name="address"
            // className={`${
            //   formik.touched.address && formik.errors.address
            //     ? "border-red-500 focus:outline-none focus:border-red-500"
            //     : "focus:outline-none focus:border-blue-500"
            // }`}
          />
        </form>
        <div className="flex flex-col items-center">
          <Button
            onClick={formik.handleSubmit}
            maincolor="bg-green-500"
            title="پرداخت"
          />
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
