import React, { useContext } from "react";
import { LoginRegisterContext } from "../Context/LoginRegisterContext";

import OwnerProfileDashboardHeader from "../OwnerProfileDashboardHeader/OwnerProfileDashboardHeader";

const OwnerProfile = () => {
  const { email } = useContext(LoginRegisterContext);
  const indexOfEmail = email.indexOf("@");
  console.log(indexOfEmail);
  const userName = email?.slice(0, indexOfEmail);

  return (
    <>
      <OwnerProfileDashboardHeader></OwnerProfileDashboardHeader>
      <p>Hi {userName} How are you today?</p>
    </>
  );
};

export default OwnerProfile;
