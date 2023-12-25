import axios from "axios";
import { useEffect, useState } from "react";
import UserLogin from "../UserLoginRegister/UserLogin";
import UserProfileDashboardHeader from "../UserProfileDashboardHeader/UserProfileDashboardHeader";
import auth from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import AllParking from "../AllParking/AllParking";
import ParkingAvailablityCheckHeader from "../UserProfileDashboardHeader/ParkingAvailablityCheckHeader";

const UserProfile = () => {
  const [user, loading, error] = useAuthState(auth);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    axios.get(`/api/v1/user/all-users/${user?.email}`).then((data) => {
      setAllUsers(data.data);
    });
  }, []);

  return (
    <>
      {!allUsers.length ? (
        <UserLogin></UserLogin>
      ) : (
        <div>
          <UserProfileDashboardHeader></UserProfileDashboardHeader>
          <ParkingAvailablityCheckHeader></ParkingAvailablityCheckHeader>
          {/* Additional content based on allUsers data... */}
          <div className=" flex justify-center">
            <AllParking />
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
