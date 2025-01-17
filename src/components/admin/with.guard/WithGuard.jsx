import { useSelector } from "react-redux";
import Login from "../../../pages/login/Login";

export const WithGuard = (Component) => {
  const WithGuardWrapper = (props) => {
    const isLogin = useSelector((state) => state.auth.isLogin);
    // const isLogin = true;
    return isLogin ? (
      <Component {...props} />
    ) : (
      <Login shouldNavigate={false} />
    );
  };

  return WithGuardWrapper;
};
