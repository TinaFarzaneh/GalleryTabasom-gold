import { PanelHeaderLink } from "./PanelHeaderLink";
import gallerylogo from "../../../assets/images/gallerylogo.png";
import "../../../assets/styles/App.css";
import { NavLink } from "react-router-dom";
export const PanelHeader = () => {
  return (
    <>
      <header className="bg-[#739072] px-7 shadow-md">
        <div className="flex items-center justify-between py-2 px-10 rounded-md">
          <NavLink
            className="flex text-xl font-bold cursor-pointer gap-2"
            to="/"
          >
            <img
              src={gallerylogo}
              alt="gallerylogo"
              className="w-[40px] h-[40px]"
            />
            <p className="whitespace-nowrap drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              پنل مدیریت گالری تبسم
            </p>
          </NavLink>
          <PanelHeaderLink />
        </div>
      </header>
    </>
  );
};
