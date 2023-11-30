import { Outlet } from "react-router-dom";
import { PanelHeader } from "../../header.layout";

export const AdminMainLayout = () => {
  return (
    <>
      <PanelHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};
