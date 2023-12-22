import { IoHome } from "react-icons/io5";
import gallerylogo from "../../../assets/images/gallerylogo.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { PATHS } from "../../../config";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../features";

export const LoginForm = (shouldNavigate = true) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("نام کاربری الزامی است"),
      password: Yup.string().required("رمز عبور الزامی است"),
    }),

    onSubmit: () => {
      dispatch(loginUser(formik.values));
      if (shouldNavigate) {
        navigate(`${PATHS.PANELADMIN}/${PATHS.PANELORDERS}`);
      }
    },
  });

  return (
    <section className="h-screen background">
      <div className="h-full px-6 mx-auto">
        <div className="gap-10 flex h-full flex-wrap items-center pr-16 justify-start lg:justify-aruond">
          <div className="md:w-8/12 lg:ml-6 lg:w-4/12 px-8">
            <form onSubmit={formik.handleSubmit}>
              <NavLink to="/">
                <img
                  src={gallerylogo}
                  alt="logo"
                  className="w-[100px] h-[100px] mr-44 cursor-pointer"
                />
              </NavLink>
              <h4 className="mb-12 mt-1 pb-1 text-3xl font-extrabold text-center text-[#ffd255]">
                ورود به پنل مدیریت گالری تبسم
              </h4>
              <div className="mb-6">
                <label
                  htmlFor="username"
                  className="block text-lg font-bold text-[#ffd255] mb-1"
                >
                  نام کاربری :
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="نام کاربری"
                  name="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  className={`lg:bg-transparent mt-1 p-2 w-full border rounded-md font-semibold ${
                    formik.touched.username && formik.errors.username
                      ? "border-red-600 focus:outline-none focus:border-red-600"
                      : "focus:outline-none focus:border-[#618264]"
                  }`}
                />
                <div className="text-red-600 text-xs mt-1 h-4">
                  {formik.touched.username && formik.errors.username
                    ? formik.errors.username
                    : null}
                </div>
              </div>
              <div className="mb-12">
                <label
                  htmlFor="password"
                  className="block text-lg font-bold text-[#ffd255] mb-1"
                >
                  رمز عبور :
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="رمز عبور"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={`lg:bg-transparent mt-1 p-2 w-full border rounded-md font-semibold ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-600 focus:outline-none focus:border-red-600"
                      : "focus:outline-none focus:border-[#618264]"
                  }`}
                />
                <div className="text-red-600 text-xs mt-1 h-3">
                  {formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : null}
                </div>
              </div>
              <button
                onSubmit={formik.handleSubmit}
                type="submit"
                className="w-full rounded text-white bg-green-500 px-6 pb-2 pt-2.5 text-lg border-[#ffd255]"
              >
                ورود
              </button>
              <NavLink
                to="/"
                className="flex items-center justify-center mt-6 gap-2 text-[#ffd255]"
              >
                <IoHome className="w-6 h-6" />
                <p className="font-bold">بازگشت به سایت</p>
              </NavLink>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
