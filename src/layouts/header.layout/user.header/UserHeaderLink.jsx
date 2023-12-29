import { Link, useParams } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { PATHS } from "../../../config";
export const UserHeaderLink = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);

  const lengthOfBasket = useSelector((state) => state.cart.length);
  const { resultType } = useParams();

  return (
    <ul className="flex items-center justify-center gap-8 text-[#ffd255] text-base">
      <li>
        <Link
          to={
            isLogin ? `${PATHS.PANELADMIN}/${PATHS.PANELORDERS}` : PATHS.LOGIN
          }
        >
          <RiAdminFill className="w-9 h-9" />
        </Link>
      </li>
      <li className="flex items-center">
        {resultType !== "success" && (
          <Link to="basket" className="relative flex">
            <MdShoppingCart className="w-9 h-9" />
            <span className="absolute -right-1 -top-2 rounded-full  bg-red-600 py-1 px-2 m-0 text-white text-sm  leading-tight text-center flex items-center justify-center">
              <span className="self-center">{lengthOfBasket}</span>
            </span>
          </Link>
        )}
      </li>
    </ul>
  );
};
