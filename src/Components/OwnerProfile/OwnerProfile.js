import React, { useContext, useEffect, useRef, useState } from "react";
import { LoginRegisterContext } from "../Context/LoginRegisterContext";

import OwnerProfileDashboardHeader from "../OwnerProfileDashboardHeader/OwnerProfileDashboardHeader";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.config";
import axios from "axios";
import OwnerLogin from "../OwnerLoginRegister/OwnerLogin";
import { useNavigate } from "react-router-dom";

const OwnerProfile = () => {
  const [user, loading, error] = useAuthState(auth);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    axios.get(`/api/v1/owner/all-owners/${user?.email}`).then((data) => {
      setAllUsers(data.data);
    });
  }, []);

  return (
    <>
      {allUsers.length > 0 ? (
        <div>
          <OwnerProfileDashboardHeader></OwnerProfileDashboardHeader>
          <p>Hi {user?.email} How are you today?</p>
        </div>
      ) : (
        <div>
          <OwnerLogin></OwnerLogin>
        </div>
      )}
    </>
  );
};

export default OwnerProfile;
