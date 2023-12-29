import { createBrowserRouter } from "react-router-dom";
import { AdminMainWithGuard, ShopMain } from "../layouts";
import { lazy } from "react";
import { PATHS } from "../config";
import { Loadable } from "../components";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Basket from "../pages/basket/Basket";
import CheckOut from "../pages/checkout/CheckOut";
import Products from "../pages/products/Products";
import NotFound from "../pages/notfound/NotFound";
import SingleProduct from "../pages/singleproduct/SingleProduct";
import ResultPayment from "../pages/result.payment/ResultPayment.jsx";

const PanelProducts = Loadable(
  lazy(() => import("../pages/panelproducts/PanelProducts"))
);
const PanelQuantity = Loadable(
  lazy(() => import("../pages/panelquantity/PanelQuantity"))
);
const PanelOrders = Loadable(
  lazy(() => import("../pages/panelorders/PanelOrders"))
);

export const AllRouters = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <ShopMain />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: PATHS.BASKET,
        element: <Basket />,
      },
      {
        path: PATHS.PRODUCTS,
        element: <Products />,
      },
      {
        path: PATHS.PRODUCT,
        element: <SingleProduct />,
      },

      {
        path: PATHS.CHECKOUT,
        element: <CheckOut />,
      },
      {
        path: PATHS.RESULTPAYMENT,
        element: <ResultPayment />,
      },
    ],
  },
  {
    path: PATHS.PANELADMIN,
    element: <AdminMainWithGuard />,
    children: [
      {
        path: PATHS.PANELORDERS,
        element: <PanelOrders />,
      },
      {
        path: PATHS.PANELQUANTITY,
        element: <PanelQuantity />,
      },
      {
        index: true,
        element: <PanelProducts />,
      },
    ],
  },
  {
    path: PATHS.NOTFOUND,
    element: <NotFound />,
  },
  {
    path: PATHS.LOGIN,
    element: <Login />,
  },
]);
