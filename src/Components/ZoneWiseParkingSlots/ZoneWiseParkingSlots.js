import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AllParking from "../AllParking/AllParking";

const ZoneWiseParkingSlots = () => {
  const { zoneName } = useParams();
  const [parking, setParking] = useState();
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    axios
      .get("/api/v1/parking")
      .then((data) => setParking(data.data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    const filtered = parking?.filter((parking) => parking.zoneName == zoneName);
    setFiltered(filtered);
  }, [parking]);
  return <div>{filtered && <AllParking filtered={filtered}></AllParking>}</div>;
};

export default ZoneWiseParkingSlots;
