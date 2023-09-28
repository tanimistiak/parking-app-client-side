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
import { useContext } from "react";
import CreateParking from "./Components/CreateParking/CreateParking";

function App() {
  axios.defaults.baseURL = "https://parking-app-server-side.onrender.com/";

  return (
    <>
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
      </Routes>
    </>
  );
}

export default App;
