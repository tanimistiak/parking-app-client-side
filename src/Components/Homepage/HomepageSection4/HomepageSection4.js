import React, { useState } from "react";
import image from "../../../assets/section-4/how-it-works-drive-arrive-park-white@2x.png";
const HomepageSection4 = () => {
  return (
    <section className="w-[80%] mx-auto my-20">
      <div className=" flex items-end w-[100%] justify-center">
        <div className="image w-[40%]">
          <img src={image} alt="" />
        </div>
        <div className="text ">
          <div className="heading ml-36">
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

export default HomepageSection4;
