import React, { useContext } from "react";
import {
  LoginRegisterContext,
  LoginRegisterContextProvider,
} from "../../Context/LoginRegisterContext";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { email } = useContext(LoginRegisterContext);
  console.log(email);

  let location = useLocation();
  if (!email) {
    return <Navigate to="/loginregister" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
