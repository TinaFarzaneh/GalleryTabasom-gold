import React from "react";
import { LoginForm } from "../../components";
import { useSelector } from "react-redux";

const Login = () => {
  const shouldNavigate = useSelector((state) => state.auth.isLogin);

  return (
    <>
      <LoginForm shouldNavigate={shouldNavigate} />
    </>
  );
};

export default Login;
