import axios from "axios";
import React, { useEffect, useState } from "react";

const useIp = () => {
  const [ip, setIp] = useState(null);
  useEffect(() => {
    const fetchIp = async () => {
      await axios
        .get("/")
        .then((res) => setIp(res.data.ip))
        .catch((err) => console.log(err));
    };
    fetchIp();
  }, []);
  return { ip, setIp };
};

export default useIp;
