import React, { useContext } from "react";
import {
  LoginRegisterContext,
  LoginRegisterContextProvider,
} from "../../Context/LoginRegisterContext";
import {
  Navigate,
  unstable_HistoryRouter,
  useLocation,
} from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { email, loading } = useContext(LoginRegisterContext);

  console.log(email);
  console.log(children.props);

  let location = useLocation();
  console.log(loading);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!email) {
    return <Navigate to="/loginregister" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
