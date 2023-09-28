import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { LoginRegisterContext } from "../Context/LoginRegisterContext.js";
import OwnerProfile from "../OwnerProfile/OwnerProfile.js";
import { useLocation, useNavigate } from "react-router-dom";
const LoginRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("login");

  const {
    setEmail: setLoggedEmail,
    setId,
    id,
    email: loggedEmail,
  } = useContext(LoginRegisterContext);
  let from = location.state?.from?.pathname || "";

  const handleEmail = (ev) => {
    setEmail(ev.target.value);
  };
  const handlePass = (ev) => {
    setPassword(ev.target.value);
    console.log(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post(
        status === "register" ? "api/v1/user/register" : "api/v1/user/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setLoggedEmail(res.data.email);
        setId(res.data.id);
        navigate(from, { replace: true });
      })
      .catch((err) => console.log(err));
  };
  if (loggedEmail) {
    navigate("/ownerprofile");
  }
  console.log(loggedEmail);

  return (
    <div>
      <section className="form">
        {status === "login" ? (
          <h1 className="text-center text-3xl">Login</h1>
        ) : (
          <h1 className="text-center text-3xl">Register</h1>
        )}

        <div className="form flex justify-center">
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleEmail}
              type="email"
              className="border-black border-2 mt-5 w-72 p-3"
              placeholder="Enter your email"
            />
            <br />
            <input
              onChange={handlePass}
              type="password"
              className="border-black border-2 mt-5 w-72 p-3"
              placeholder="Enter your password"
            />
            <br />
            <div className="button flex justify-center bg-blue-600 mt-5 p-3">
              {status === "login" ? (
                <button className="">Login</button>
              ) : (
                <button className="">Register</button>
              )}
            </div>
          </form>
        </div>

        {status === "login" ? (
          <div className="not-member gap-2 flex justify-center mt-2 items-center">
            <p>Not a member?</p>
            <button
              onClick={() => setStatus("register")}
              className="p-2 bg-blue-600"
            >
              Register
            </button>
          </div>
        ) : (
          <div className="not-member gap-2 flex justify-center mt-2 items-center">
            <p>Already a member?</p>
            <button
              onClick={() => setStatus("login")}
              className="p-2 bg-blue-600"
            >
              Login
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default LoginRegister;
