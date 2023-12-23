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
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.config";

const UserRequireAuth = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  let location = useLocation();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/user-login" state={{ from: location }} replace />;
  }
  return children;
};

export default UserRequireAuth;
