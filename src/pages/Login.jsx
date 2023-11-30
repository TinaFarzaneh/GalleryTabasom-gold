import { Link } from "react-router-dom";
import React from "react";

const Login = () => {
  return (
    <>
      <div>Login</div>
      <button>ورود</button>
      <div>
        <Link to="/">بازگشت به سایت</Link>
      </div>
    </>
  );
};

export default Login;
