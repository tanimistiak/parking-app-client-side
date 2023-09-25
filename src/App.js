import logo from "./logo.svg";
import "./App.css";
import Homepage from "./Components/Homepage/Homepage";
import Menu from "./Components/Menu/Menu";
import { Route, Routes } from "react-router-dom";
import LoginRegister from "./Components/Login/LoginRegister";
import { LoginRegisterContextProvider } from "./Components/Context/LoginRegisterContext";
import axios from "axios";
import OwnerProfile from "./Components/OwnerProfile/OwnerProfile";
import OwnerProfileUpdate from "./Components/OwnerProfileUpdate/OwnerProfileUpdate";
import RequireAuth from "./Components/utils/RequireAuth/RequireAuth";

function App() {
  axios.defaults.baseURL = "http://localhost:8080/";
  return (
    <>
      <Menu></Menu>

      <Routes>
        <Route path="/" element={<Homepage />}></Route>
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
            <RequireAuth>
              <OwnerProfileUpdate></OwnerProfileUpdate>
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
