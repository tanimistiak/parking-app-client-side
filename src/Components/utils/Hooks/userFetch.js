/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import React, { useEffect, useState } from "react";

const userFetch = (id) => {
  const [name, setName] = useState(null);
  // console.log(id);
  const userId = id;
  // console.log(userId);
  useEffect(() => {
    const userFetch = async (userId) => {
      console.log(userId);
      await axios
        .get(`/api/v1/user/all-owners/${userId}`)
        .then((res) => setName(res.data))
        .catch((err) => console.log(err));
    };
    userFetch(userId);
  }, []);
  return { name, setName };
};

export default userFetch;
