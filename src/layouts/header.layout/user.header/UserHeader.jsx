import { UserHeaderLink } from "./UserHeaderLink";
import logo from "../../../assets/images/gallerylogo.png";
import Inputsearch from "../../../components/common/input/input.search/Inputsearch";
import { NavLink } from "react-router-dom";
export const UserHeader = () => {
  return (
    <>
      <header className="fixed w-full top-0 z-50 bg-[#739072] px-7 shadow-md">
        <div className="flex justify-between items-center py-2 px-10 rounded-md">
          <div className="flex items-center justify-between	text-xl font-bold gap-2 cursor-pointer">
            <NavLink to="/">
              <img src={logo} className="w-[80px] h-[80px] rounded-[50%]" />
            </NavLink>
            <p className="text-[#ffd255] text-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              گالری تبسم
            </p>
          </div>
          <Inputsearch />
          <UserHeaderLink />
        </div>
      </header>
    </>
  );
};
