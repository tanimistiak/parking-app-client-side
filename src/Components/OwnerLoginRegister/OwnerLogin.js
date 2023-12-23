import React, { useEffect, useState } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom"; // for routing to register page
import HeroImage from "./HeroImage"; // your static image component
import LoginImage from "../../assets/owner-login/photo.jpg";
import axios from "axios";
import auth from "../../firebase.config";

const OwnerLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userEmailCheck, setUserEmailCheck] = useState(false);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [loggedUser] = useAuthState(auth);
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    console.log(loggedUser);
    axios.get(`/api/v1/owner/all-owners/${loggedUser?.email}`).then((data) => {
      
      if (data.data.length > 0) {
        navigate("/owner-profile");
      }
    });
  }, [loggedUser]);
  useEffect(() => {
    if (error) {
      setErrorMessage("Some error happened");
    }
  }, [error]);

  useEffect(() => {
    const fetchPublicUser = async () => {
      await axios
        .get(`/api/v1/user/all-users/${username}`)
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
    fetchPublicUser();
  }, [username]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signInWithEmailAndPassword(username, password);
    if (response?.user?.email) {
      navigate("/owner-profile");
    }
    // Handle login logic here
  };
  const [errorMessage, setErrorMessage] = useState();

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex gap-20 p-10 min-h-screen items-center justify-center bg-gray-100">
      <div className="p-10 bg-white rounded-lg shadow-md sm:w-96">
        <h2 className="text-2xl font-bold mb-5 text-center">Owner Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-md font-medium text-gray-700 mb-2"
              for="username"
            >
              Owner Email
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
              Owner Password
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
              This account not associated with an owner
            </button>
          ) : (
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
            >
              Log In
            </button>
          )}
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          Don't have an owner account?
          <Link to="/owner-register" className="underline ml-1">
            Register here
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

export default OwnerLogin;
