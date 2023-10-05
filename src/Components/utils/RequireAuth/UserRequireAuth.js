import React, { useContext } from "react";
import { LoginRegisterContextProvider } from "../../Context/LoginRegisterContext";
import {
  Navigate,
  unstable_HistoryRouter,
  useLocation,
} from "react-router-dom";
import { UserLoginRegisterContext } from "../../Context/UserLoginRegisterContext";

const UserRequireAuth = ({ children }) => {
  const { email, loading } = useContext(UserLoginRegisterContext);

  console.log(email);
  console.log(children.props);

  let location = useLocation();
  console.log(loading);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!email) {
    return (
      <Navigate to="/userloginregister" state={{ from: location }} replace />
    );
  }
  return children;
};

export default UserRequireAuth;
