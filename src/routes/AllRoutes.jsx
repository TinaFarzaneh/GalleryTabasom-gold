import { createBrowserRouter } from "react-router-dom";

import { PATHS } from "../config";

import { AdminMainLayout, ShopMain } from "../layouts";
import { PrivateRoute } from "./PrivateRoute";

import Home from "../pages/home/Home";
import Products from "../pages/products/Products";
import Product from "../pages/product/Product";
import Basket from "../pages/basket/Basket";
import CheckOut from "../pages/checkout/CheckOut";
import Login from "../pages/login/Login";
import PanelProducts from "../pages/panelproducts/PanelProducts";
import PanelQuantity from "../pages/panelquantity/PanelQuantity";
import PanelOrders from "../pages/panelorders/PanelOrders";
import NotFound from "../pages/notfound/NotFound";

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
        <AdminMainLayout />
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
