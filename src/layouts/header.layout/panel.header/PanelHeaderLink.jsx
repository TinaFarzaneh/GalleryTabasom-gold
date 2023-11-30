import { Link } from "react-router-dom";

export const PanelHeaderLink = () => {
  return (
    <>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link to="/paneladmin">کالاها</Link>
          </li>
          <li>
            <Link to="panelQuantity">موجودی و قیمت</Link>
          </li>
          <li>
            <Link to="panelOrders">سفارش ها</Link>
          </li>
        </ul>
      </nav>
      <Link to="/">بازگشت به سایت</Link>
    </>
  );
};
