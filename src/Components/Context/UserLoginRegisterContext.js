/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import React, { createContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const UserLoginRegisterContext = createContext({});
export function UserLoginRegisterContextProvider({ children }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [email, setEmail] = useState(null);
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState(null);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(true);
  const imageUrlRef = useRef();
  const [imageLoading, setImageLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "";
  console.log(id, email, name);

  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get("/api/v1/publicUsers/userprofile", { withCredentials: true })
        .then((res) => {
          console.log(res);
          setEmail(res.data.email);
          setId(res.data._id);
          // setImage(res.data.image);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    };
    fetchUser();
  }, []);

  return (
    <UserLoginRegisterContext.Provider
      value={{
        setEmail,
        setPassword,
        setId,
        id,
        email,
        loading,
        image,
        setImage,
        imageLoading,
        setImageLoading,
        imageUrlRef,
      }}
    >
      {children}
    </UserLoginRegisterContext.Provider>
  );
}
