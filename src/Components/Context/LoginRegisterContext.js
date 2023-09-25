/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const LoginRegisterContext = createContext({});
export function LoginRegisterContextProvider({ children }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [id, setId] = useState(null);

  console.log(id, email);

  useEffect(() => {
    const fetchOwner = async () => {
      await axios
        .get("/api/v1/user/ownerprofile", { withCredentials: true })
        .then((res) => {
          setEmail(res.data.email);
          setId(res.data._id);
        })
        .catch((err) => console.log(err));
    };
    fetchOwner();
  }, []);
  return (
    <LoginRegisterContext.Provider
      value={{ setEmail, setPassword, setId, id, email }}
    >
      {children}
    </LoginRegisterContext.Provider>
  );
}
