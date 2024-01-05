import React from "react";
import bgImage from "../../../assets/homepage-image/home-header-3.mp4";

const HomepageSection1 = () => {
  return (
    <section className="p-0 m-0">
      <div className="relative m-0 p-0 w-screen">
        <video className="w-screen" autoPlay loop muted>
          <source type="video/mp4" src={bgImage}></source>
        </video>
        <div className="lot-simpler absolute left-[35%] top-[50%] ">
          <h3 className="text-4xl uppercase font-bold">
            Parking Just Got a lot simpler
          </h3>
          <p className="text-center text-2xl my-2">
            Book the Best Spaces & Save Up to 50%
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomepageSection1;
