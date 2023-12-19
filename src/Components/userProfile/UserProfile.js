import React, { useContext, useEffect } from "react";
// import { LoginRegisterContext } from "../Context/LoginRegisterContext";

import OwnerProfileDashboardHeader from "../OwnerProfileDashboardHeader/OwnerProfileDashboardHeader";
// import UserLoginRegister from "../UserLoginRegister/UserLoginRegister";
import { UserLoginRegisterContext } from "../Context/UserLoginRegisterContext";
import UserProfileDashboardHeader from "../UserProfileDashboardHeader/UserProfileDashboardHeader";

const UserProfile = () => {
  const { email, location, setLocation, setEmail, setId } = useContext(
    UserLoginRegisterContext
  );
  const indexOfEmail = email.indexOf("@");
  console.log(indexOfEmail);
  const userName = email?.slice(0, indexOfEmail);
  useEffect(() => {
    const user = localStorage.getItem("user");
    setEmail(JSON.parse(user).email);
    setId(JSON.parse(user).id);
  }, [localStorage.getItem("user")]);
  useEffect(() => {
    if ("geolocation" in navigator) {
      // Get the user's current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Extract latitude and longitude from the position object
          const { latitude, longitude } = position.coords;
          console.log(latitude, longitude);
          setLocation({ latitude, longitude });
        },
        (error) => {
          // setError(error.message);
          console.log(error.message);
        }
      );
    } else {
      console.log("not available");
    }
  }, []);
  return (
    <>
      <UserProfileDashboardHeader></UserProfileDashboardHeader>
      <p>Hi {userName} How are you today?</p>
    </>
  );
};

export default UserProfile;
