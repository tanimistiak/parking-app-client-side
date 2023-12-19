import React from "react";

import HomepageSection1 from "./HomepageSection1/HomepageSection1";
import HomepageSection2 from "./HomepageSection2/HomepageSection2";
import HomepageSection3 from "./HomepageSection3/HomepageSection3";

const Homepage = () => {
  return (
    <div className="container m-auto">
      <HomepageSection1 />
      <HomepageSection2 />
      <HomepageSection3 />
    </div>
  );
};

export default Homepage;
