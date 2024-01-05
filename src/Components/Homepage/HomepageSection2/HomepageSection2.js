import React from "react";
import video from "../../../assets/section-2/ParkWhiz- Find and Book Parking Anywhere.mp4";
const HomepageSection2 = () => {
  const arrowVariants = {
    hover: { x: 5, transition: { duration: 0.3 } },
  };

  return (
    <section className="flex justify-center my-10">
      <div className="inner">
        <div className=" flex items-center justify-center">
          <video muted loop autoPlay>
            <source type="video/mp4" src={video}></source>
          </video>

          <div>
            <span className="text-5xl font-bold text-blue-400 block">
              DISCOVER
            </span>{" "}
            <span className="text-5xl font-bold text-gray-400 block uppercase ml-10">
              Amazing
            </span>{" "}
            <span className="text-5xl font-bold text-gray-400 block uppercase">
              Spaces
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageSection2;
