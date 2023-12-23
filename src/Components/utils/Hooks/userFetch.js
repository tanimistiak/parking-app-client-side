/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import React, { useEffect, useState } from "react";

const userFetch = (id) => {
  const [name, setName] = useState(null);
  // console.log(id);
  const userId = id;
  // console.log(userId);
  
  return { name, setName };
};

export default userFetch;
