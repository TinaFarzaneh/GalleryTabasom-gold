import { UserHeaderLink } from "./UserHeaderLink";

export const UserHeader = () => {
  return (
    <>
      <header className="flex items-center justify-around">
        <div>گالری تبسم</div>
        <UserHeaderLink />
      </header>
    </>
  );
};
