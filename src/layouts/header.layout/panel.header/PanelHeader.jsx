import { PanelHeaderLink } from "./PanelHeaderLink";

export const PanelHeader = () => {
  return (
    <>
      <header className="flex justify-around items-center">
        <h1>پنل مدیریت فروشگاه</h1>
        <PanelHeaderLink />
      </header>
    </>
  );
};
