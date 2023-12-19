import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { LoginRegisterContext } from "../Context/LoginRegisterContext.js";

import { useLocation, useNavigate } from "react-router-dom";
import { UserLoginRegisterContext } from "../Context/UserLoginRegisterContext.js";
import ProgressBar from "@ramonak/react-progress-bar";

const UserLoginRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("login");
  const [file, setFile] = useState();
  const [progress, setProgress] = useState();

  const {
    setEmail: setLoggedEmail,
    setId,
    id,
    email: loggedEmail,
    image: loadedImage,
    setImage,
    imageLoading,
    setImageLoading,
    setLogin,
    login,
  } = useContext(UserLoginRegisterContext);
  let from = location.state?.from?.pathname || "";

  const handleEmail = (ev) => {
    setEmail(ev.target.value);
  };
  const handlePass = (ev) => {
    setPassword(ev.target.value);
    console.log(password);
  };
  const handleFile = (ev) => {
    setFile(ev.target.files[0]);
    console.log(imageLoading);
    if (imageLoading) {
      return <p>Loading...</p>;
    }

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    setImageLoading(false);

    console.log(file);
  };
  const handleRegister = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);
    formData.append("password", password);
    console.log(formData.get("file"));
    await axios
      .post("api/v1/publicUsers/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (data) => {
          setProgress(Math.round((100 * data.loaded) / data.total));
          console.log(progress);
        },

        withCredentials: true,
      })

      .then((responses) => {
        console.log(responses);
        setLoggedEmail(responses.data?.email);
        setId(responses.data?.id);

        navigate(from, { replace: true });
      })
      .catch((err) => console.log(err));
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    await setLogin(!login);
    await axios
      .post(
        "api/v1/publicUsers/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        setLoggedEmail(res.data?.email);
        setId(res.data?.id);
        if (res.data?.email && res.data?.id) {
          const user = {
            email: res.data?.email,
            id: res.data?.id,
          };
          localStorage.setItem("user", JSON.stringify(user));
        }
        setLogin(!login);
        navigate(from, { replace: true });
      })
      .catch((err) => console.log(err))
      .finally(() => setLogin(!login));
  };
  if (loggedEmail) {
    navigate("/userprofile");
    // console.log(image);
  }
  return (
    <div>
      <section className="form">
        {status === "login" ? (
          <h1 className="text-center text-3xl">Login</h1>
        ) : (
          <h1 className="text-center text-3xl">Register</h1>
        )}

        <div className="form flex justify-center">
          {/* register form */}
          {status === "register" && (
            <form onSubmit={handleRegister} encType="multipart/form-data">
              <input
                onChange={handleEmail}
                type="email"
                className="border-black border-2 mt-5 w-72 p-3"
                placeholder="Enter your email"
                name="email"
                id="email"
              />
              <br />

              <input
                onChange={handlePass}
                type="password"
                className="border-black border-2 mt-5 w-72 p-3"
                placeholder="Enter your password"
                name="password"
                id="password"
              />
              <br />
              {status === "register" && (
                <div>
                  <input
                    onChange={handleFile}
                    type="file"
                    className="border-black border-2 mt-5 w-72 p-3"
                    // required={true}
                    name="file"
                    id="file"
                    accept=".jpg"
                  />
                  {progress && <ProgressBar completed={progress}></ProgressBar>}
                </div>
              )}
              <br />
              <div className="button flex justify-center bg-blue-600 mt-5 p-3">
                <button className="">Register</button>
              </div>
            </form>
          )}

          {/* login form */}

          {status === "login" && (
            <form onSubmit={handleLogin}>
              <input
                onChange={handleEmail}
                type="email"
                className="border-black border-2 mt-5 w-72 p-3"
                placeholder="Enter your email"
                name="email"
                id="email"
              />
              <br />

              <input
                onChange={handlePass}
                type="password"
                className="border-black border-2 mt-5 w-72 p-3"
                placeholder="Enter your password"
                name="password"
                id="password"
              />
              <br />
              <div className="button flex justify-center bg-blue-600 mt-5 p-3">
                <button className="">Login</button>
              </div>
            </form>
          )}
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

export default UserLoginRegister;
