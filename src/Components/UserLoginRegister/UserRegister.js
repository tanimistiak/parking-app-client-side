import React, { useEffect, useState } from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom"; // for routing to register page

import LoginImage from "../../assets/owner-login/photo.jpg";
import axios from "axios";
import auth from "../../firebase.config";

const OwnerRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userEmailCheck, setUserEmailCheck] = useState(false);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [loggedUser] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      setErrorMessage(error?.customData?._tokenResponse?.error?.message);
    }
  }, [error]);
  useEffect(() => {
    const fetchOwner = async () => {
      await axios
        .get(`/api/v1/owner/all-owners/${username}`)
        .then((data) => {
          if (data.data.length > 0) {
            setUserEmailCheck(true);
          } else {
            setUserEmailCheck(false);
          }
        })
        .catch((err) => console.log(err));
      console.log(username);
    };
    fetchOwner();
  }, [username]);
  //handle owner register
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createUserWithEmailAndPassword(username, password);
    console.log(response);
    if (response?.user?.email) {
      await axios
        .post("/api/v1/user/register", { email: response?.user?.email })
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
      navigate("/user-profile");
    }
  };
  const [errorMessage, setErrorMessage] = useState();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (loggedUser) {
    navigate("/user-profile");
  }
  return (
    <div className="flex gap-20 min-h-screen items-center justify-center bg-gray-100 p-10">
      <div className="p-10 bg-white rounded-lg shadow-md sm:w-96">
        <h2 className="text-2xl font-bold mb-5 text-center">User Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-md font-medium text-gray-700 mb-2"
              for="username"
            >
              User Email
            </label>
            <input
              className="px-4 py-2 w-full border rounded-md border-gray-300 focus:border-blue-500 focus:outline-none"
              type="text"
              id="username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-md font-medium text-gray-700 mb-2"
              for="password"
            >
              User Password
            </label>
            <input
              className="px-4 w-full py-2 border rounded-md border-gray-300 focus:border-blue-500 focus:outline-none"
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500">{errorMessage}</p>}
          {userEmailCheck ? (
            <button
              disabled
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
            >
              This account is already associated to an owner
            </button>
          ) : (
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
            >
              Register
            </button>
          )}
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an owner account?
          <Link to="/user-login" className="underline ml-1">
            Login here
          </Link>
        </p>
      </div>
      <div className="image">
        {" "}
        <img src={LoginImage} alt="Login background" className="w-96  " />
      </div>
    </div>
  );
};

export default OwnerRegister;
