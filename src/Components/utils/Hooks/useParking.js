/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import React, { useEffect, useState } from "react";

const parkingFetch = () => {
  const [parking, setParking] = useState(null);
  // console.log(id);
  // console.log(userId);
  useEffect(() => {
    const parkingFetch = async () => {
      await axios
        .get("/api/v1/parking")
        .then((res) => setParking(res.data))
        .catch((err) => console.log(err));
    };
    parkingFetch();
  }, []);
  return { parking, setParking };
};

export default parkingFetch;
