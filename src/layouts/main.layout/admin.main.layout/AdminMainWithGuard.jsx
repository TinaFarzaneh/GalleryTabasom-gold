import { Outlet } from "react-router-dom";
import { PanelHeader } from "../../header.layout";
import { WithGuard } from "../../../components";

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

export const AdminMainWithGuard = WithGuard(AdminMainLayout);
