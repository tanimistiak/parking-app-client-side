/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import React, { createContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const UserLoginRegisterContext = createContext({});
export function UserLoginRegisterContextProvider({ children }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [email, setEmail] = useState(null);
  const [image, setImage] = useState(null);

  const [id, setId] = useState(null);

  const [loading, setLoading] = useState(true);
  const imageUrlRef = useRef();
  const [location, setLocation] = useState(null);
  const [login, setLogin] = useState(false);
  console.log(id, email);

  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get("/api/v1/publicUsers/userprofile", { withCredentials: true })
        .then((res) => {
          console.log(res);
          setEmail(res.data.email);
          setId(res.data._id);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    };
    fetchUser();
  }, [id, email]);

  return (
    <UserLoginRegisterContext.Provider
      value={{
        setEmail,
        setId,
        id,
        email,
        loading,
        image,
        setImage,
        imageUrlRef,
        location,
        setLogin,
        login,
        setLocation,
      }}
    >
      {children}
    </UserLoginRegisterContext.Provider>
  );
}
