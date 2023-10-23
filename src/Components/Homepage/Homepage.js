import React from "react";
import parkingFetch from "../utils/Hooks/useParking";
import AllParking from "../AllParking/AllParking";

const Homepage = () => {
  return (
    <div className="container m-auto">
      <AllParking></AllParking>
    </div>
  );
};

export default Homepage;
