/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const LoginRegisterContext = createContext({});
export function LoginRegisterContextProvider({ children }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "";
  console.log(id, email, name);

  useEffect(() => {
    const fetchOwner = async () => {
      await axios
        .get("/api/v1/user/ownerprofile", { withCredentials: true })
        .then((res) => {
          setEmail(res.data.email);
          setId(res.data._id);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    };
    fetchOwner();
  }, []);

  return (
    <LoginRegisterContext.Provider
      value={{ setEmail, setPassword, setId, id, email, loading }}
    >
      {children}
    </LoginRegisterContext.Provider>
  );
}
