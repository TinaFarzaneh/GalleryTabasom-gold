import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
export const UserHeaderLink = () => {
  return (
    <ul className="flex items-center justify-center gap-8 text-[#ffd255] text-base">
      <li>
        <Link to="login">
          <RiAdminFill className="w-8 h-8" />
        </Link>
      </li>
      <li className="flex items-center">
        <Link to="basket">
          <MdShoppingCart className="w-8 h-8" />
        </Link>
      </li>
    </ul>
  );
};
