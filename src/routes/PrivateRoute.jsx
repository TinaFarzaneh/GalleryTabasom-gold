import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = (prop) => {
  const isLogined = true;

  return isLogined ? <>{prop.children}</> : <Navigate to="/login" />;
};
