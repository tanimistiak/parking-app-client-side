import logo from "./logo.svg";
import "./App.css";
import Homepage from "./Components/Homepage/Homepage";
import Menu from "./Components/Menu/Menu";
import { Route, Routes } from "react-router-dom";
import LoginRegister from "./Components/OwnerLoginRegister/OwnerRegister";
import {
  LoginRegisterContext,
  LoginRegisterContextProvider,
} from "./Components/Context/LoginRegisterContext";
import axios from "axios";
import OwnerProfile from "./Components/OwnerProfile/OwnerProfile";
import OwnerProfileUpdate from "./Components/OwnerProfileUpdate/OwnerProfileUpdate";
import RequireAuth from "./Components/utils/RequireAuth/OwnerRequireAuth";
import { useContext, useEffect, useState } from "react";
import CreateParking from "./Components/CreateParking/CreateParking";
import ParkingList from "./Components/ParkingList/ParkingList";
import { UserLoginRegisterContextProvider } from "./Components/Context/UserLoginRegisterContext";
import UserRequireAuth from "./Components/utils/RequireAuth/UserRequireAuth";
import UserLoginRegister from "./Components/UserLoginRegister/UserLogin";
import UserProfile from "./Components/userProfile/UserProfile";
import UserProfileUpdate from "./Components/UserProfileUpdate/UserProfileUpdate";
import SingleParking from "./Components/SingleParking/SingleParking";
import BookParking from "./Components/BookParking/BookParking";
import OwnerRegister from "./Components/OwnerLoginRegister/OwnerRegister";
import OwnerLogin from "./Components/OwnerLoginRegister/OwnerLogin";
import OwnerRequireAuth from "./Components/utils/RequireAuth/OwnerRequireAuth";
import UserLogin from "./Components/UserLoginRegister/UserLogin";
import UserRegister from "./Components/UserLoginRegister/UserRegister";
import TotalAvailableParkingSlots from "./Components/TotalAvailableParkingSlots/TotalAvailableParkingSlots";
import LocationBasedSearch from "./Components/LocationBasedSearch/LocationBasedSearch";
import BookingType from "./Components/BookingType/BookingType";
import ZoneWiseParkingSlots from "./Components/ZoneWiseParkingSlots/ZoneWiseParkingSlots";

function App() {
  axios.defaults.baseURL = "http://localhost:8080/";

  return (
    <div>
      <Menu></Menu>

      <Routes>
        <Route
          path="/"
          element={
            <LoginRegisterContextProvider>
              <Homepage />
            </LoginRegisterContextProvider>
          }
        ></Route>
        <Route
          path="/total-available-parking"
          element={<TotalAvailableParkingSlots></TotalAvailableParkingSlots>}
        ></Route>
        <Route
          path="/location-based-search"
          element={<LocationBasedSearch></LocationBasedSearch>}
        ></Route>
        <Route
          path="/booking-types"
          element={<BookingType></BookingType>}
        ></Route>
        <Route path="/owner-login" element={<OwnerLogin></OwnerLogin>}></Route>
        <Route
          path="/owner-register"
          element={<OwnerRegister></OwnerRegister>}
        ></Route>
        <Route
          path="/owner-profile"
          element={
            <OwnerRequireAuth>
              <OwnerProfile></OwnerProfile>
            </OwnerRequireAuth>
          }
        ></Route>
        <Route
          path="/ownerprofileupdate"
          element={
            <LoginRegisterContextProvider>
              <RequireAuth>
                <OwnerProfileUpdate></OwnerProfileUpdate>
              </RequireAuth>
            </LoginRegisterContextProvider>
          }
        ></Route>
        <Route
          path="/createparking"
          element={
            <LoginRegisterContextProvider>
              <RequireAuth>
                <CreateParking />
              </RequireAuth>
            </LoginRegisterContextProvider>
          }
        ></Route>
        <Route
          path="/parkinglist"
          element={
            <LoginRegisterContextProvider>
              <RequireAuth>
                <ParkingList></ParkingList>
              </RequireAuth>
            </LoginRegisterContextProvider>
          }
        ></Route>
        <Route path="/user-login" element={<UserLogin></UserLogin>}></Route>
        <Route
          path="/user-register"
          element={<UserRegister></UserRegister>}
        ></Route>
        <Route
          path="/user-profile"
          element={
            <UserRequireAuth>
              <UserProfile></UserProfile>
            </UserRequireAuth>
          }
        ></Route>
        <Route
          path="/userprofileupdate"
          element={
            <UserLoginRegisterContextProvider>
              <UserRequireAuth>
                <UserProfileUpdate></UserProfileUpdate>
              </UserRequireAuth>
            </UserLoginRegisterContextProvider>
          }
        ></Route>

        {/* parking route */}
        <Route
          path="/zone-wise-parking/:zoneName"
          element={<ZoneWiseParkingSlots />}
        ></Route>
        <Route path="/view-parking/:id" element={<SingleParking />}></Route>
        <Route
          path="/view-parking/book/:id"
          element={
            <UserLoginRegisterContextProvider>
              <BookParking />
            </UserLoginRegisterContextProvider>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
