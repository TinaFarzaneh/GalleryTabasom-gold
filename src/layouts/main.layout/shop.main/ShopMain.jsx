import { Outlet } from "react-router-dom";
import { UserHeader } from "../../header.layout";

export const ShopMain = () => {
  return (
    <>
      <UserHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};
