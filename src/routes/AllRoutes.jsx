import { createBrowserRouter } from "react-router-dom";

import { PATHS } from "../config";

import { UserHeader, PanelHeader } from "../layouts";
import { PrivateRoute } from "./PrivateRoute";

import Home from "../pages/Home";
import Products from "../pages/Products";
import Product from "../pages/Product";
import Basket from "../pages/Basket";
import CheckOut from "../pages/CheckOut";
import Login from "../pages/Login";
import PanelProducts from "../pages/PanelProducts";
import PanelQuantity from "../pages/PanelQuantity";
import PanelOrders from "../pages/PanelOrders";
import NotFound from "../pages/NotFound";

export const AllRouters = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <UserHeader />,
    children: [
      {
        path: PATHS.HOME,
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
        element: <Product />,
      },

      {
        path: PATHS.CHECKOUT,
        element: <CheckOut />,
      },
    ],
  },
  {
    path: PATHS.PANELADMIN,
    element: (
      <PrivateRoute>
        <PanelHeader />
      </PrivateRoute>
    ),
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
        path: PATHS.PANELPRODUCTS,
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
