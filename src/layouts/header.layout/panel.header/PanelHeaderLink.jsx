import { NavLink } from "react-router-dom";
import { IoArrowUndo } from "react-icons/io5";

export const PanelHeaderLink = () => {
  return (
    <>
      <nav className="flex justify-center items-center gap-5 w-[100%] h-[100%]">
        <ul className="flex gap-4">
          <li className="navbarchild headernavbar">
            <NavLink to="/paneladmin" className="navbarspan">
              کالاها
            </NavLink>
          </li>
          <li className="navbarchild headernavbar">
            <NavLink
              to="panelQuantity"
              className="navbarspan whitespace-nowrap"
            >
              موجودی و قیمت
            </NavLink>
          </li>
          <li className="navbarchild headernavbar">
            <NavLink to="panelOrders" className="navbarspan">
              سفارش ها
            </NavLink>
          </li>
        </ul>
      </nav>
      <NavLink to="/">
        <IoArrowUndo className="w-8 h-8" />
      </NavLink>
    </>
  );
};
