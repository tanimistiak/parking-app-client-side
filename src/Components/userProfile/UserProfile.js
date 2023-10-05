import React, { useContext } from "react";
// import { LoginRegisterContext } from "../Context/LoginRegisterContext";

import OwnerProfileDashboardHeader from "../OwnerProfileDashboardHeader/OwnerProfileDashboardHeader";
// import UserLoginRegister from "../UserLoginRegister/UserLoginRegister";
import { UserLoginRegisterContext } from "../Context/UserLoginRegisterContext";
import UserProfileDashboardHeader from "../UserProfileDashboardHeader/UserProfileDashboardHeader";

const UserProfile = () => {
  const { email } = useContext(UserLoginRegisterContext);
  const indexOfEmail = email.indexOf("@");
  console.log(indexOfEmail);
  const userName = email?.slice(0, indexOfEmail);

  return (
    <>
      <UserProfileDashboardHeader></UserProfileDashboardHeader>
      <p>Hi {userName} How are you today?</p>
    </>
  );
};

export default UserProfile;
