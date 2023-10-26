import logo from "./logo.svg";
import "./App.css";
import Homepage from "./Components/Homepage/Homepage";
import Menu from "./Components/Menu/Menu";
import { Route, Routes } from "react-router-dom";
import LoginRegister from "./Components/Login/LoginRegister";
import {
  LoginRegisterContext,
  LoginRegisterContextProvider,
} from "./Components/Context/LoginRegisterContext";
import axios from "axios";
import OwnerProfile from "./Components/OwnerProfile/OwnerProfile";
import OwnerProfileUpdate from "./Components/OwnerProfileUpdate/OwnerProfileUpdate";
import RequireAuth from "./Components/utils/RequireAuth/RequireAuth";
import { useContext, useEffect, useState } from "react";
import CreateParking from "./Components/CreateParking/CreateParking";
import ParkingList from "./Components/ParkingList/ParkingList";
import { UserLoginRegisterContextProvider } from "./Components/Context/UserLoginRegisterContext";
import UserRequireAuth from "./Components/utils/RequireAuth/UserRequireAuth";
import UserLoginRegister from "./Components/UserLoginRegister/UserLoginRegister";
import UserProfile from "./Components/userProfile/UserProfile";
import UserProfileUpdate from "./Components/UserProfileUpdate/UserProfileUpdate";
import SingleParking from "./Components/SingleParking/SingleParking";

function App() {
  axios.defaults.baseURL = "https://parking-app-server-side.onrender.com/";

  return (
    <div>
      <UserLoginRegisterContextProvider>
        <Menu></Menu>
      </UserLoginRegisterContextProvider>

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
          path="/loginregister"
          element={
            <LoginRegisterContextProvider>
              <LoginRegister></LoginRegister>
            </LoginRegisterContextProvider>
          }
        ></Route>
        <Route
          path="/ownerprofile"
          element={
            <LoginRegisterContextProvider>
              <RequireAuth>
                <OwnerProfile></OwnerProfile>
              </RequireAuth>
            </LoginRegisterContextProvider>
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
        <Route
          path="/userloginregister"
          element={
            <UserLoginRegisterContextProvider>
              <UserLoginRegister></UserLoginRegister>
            </UserLoginRegisterContextProvider>
          }
        ></Route>
        <Route
          path="/userprofile"
          element={
            <UserLoginRegisterContextProvider>
              <UserRequireAuth>
                <UserProfile></UserProfile>
              </UserRequireAuth>
            </UserLoginRegisterContextProvider>
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
        <Route path="/view-parking/:id" element={<SingleParking />}></Route>
      </Routes>
    </div>
  );
}

export default App;
