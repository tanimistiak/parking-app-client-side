import React, { useState } from "react";
import { motion } from "framer-motion";
import zone from "../../../assets/section-3/zone.png";
import time from "../../../assets/section-3/hour.png";
import startParking from "../../../assets/section-3/parking.png";
import machine from "../../../assets/section-3/machine.png";
import hour from "../../../assets/section-3/time.png";
import car from "../../../assets/section-3/car.png";
const HomepageSection3 = () => {
  const [scaledIndex, setScaledIndex] = useState(0);
  const getOpacity = (index) => {
    return scaledIndex === index ? 1 : 0;
  };

  const handleMouseEnter = (index) => {
    setScaledIndex(index);
  };

  const handleMouseLeave = () => {
    setScaledIndex(null);
  };

  const getScale = (index) => {
    return scaledIndex === index ? 2 : 1;
  };
  const slideArray = [
    <div className="flex flex-col justify-center items-center">
      {" "}
      <p className="text-3xl">1</p>
      <p className="text-3xl mt-5 font-bold">Select Zone</p>
      <p>
        <img src={zone} alt="parking" />
      </p>
    </div>,
    <div className="flex flex-col justify-center items-center">
      {" "}
      <p className="text-3xl">2</p>{" "}
      <p className="text-3xl mt-5 font-bold">Select Time</p>
      <p>
        <img src={time} alt="parking" />
      </p>
    </div>,
    <div className="flex flex-col justify-center items-center">
      {" "}
      <p className="text-3xl">3</p>
      <p className="text-3xl mt-5 font-bold">Pay and Park</p>
      <p>
        <img src={startParking} alt="parking" />
      </p>
    </div>,
  ];
  const insideArray = [
    <div className="flex flex-col justify-center items-center">
      <p>
        <img className="w-48" src={machine} alt="parking" />
      </p>
    </div>,
    <div className="flex flex-col justify-center items-center">
      <p>
        <img className="w-48" src={hour} alt="parking" />
      </p>
    </div>,
    <div className="flex flex-col justify-center items-center">
      <p>
        <img className="w-48" src={car} alt="parking" />
      </p>
    </div>,
  ];
  return (
    <section className="flex p-8">
      {/* Left Div */}
      <div className="flex-1">
        <h2 className="text-4xl font-bold">Left Div</h2>
        <p>Your content goes here.</p>
      </div>

      {/* Right Div with Child Divs */}
      <div className="flex-1 flex justify-end">
        {slideArray.map((number, index) => (
          <motion.div
            key={index}
            className="hover-div text-center flex flex-col justify-center"
            whileHover={{
              width: `250px`,

              backgroundColor: "bisque",

              //   scaleX: 2,
            }}
            whileTap={{ scaleX: getScale(index) }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            style={{
              height: "400px",
              width: "150px",
              backgroundColor: "lightcyan",
              marginRight: index < 3 ? "10px" : "0", // Apply margin to the first three divs
              transformOrigin: "right center",
            }}
          >
            <p className={`${getOpacity(index) == 1 ? "w-28" : "w-full"}`}>
              {number}
            </p>
            <motion.div
              className="inside-content"
              style={{
                display: getOpacity(index) == 1 ? "block" : "none",
                // position: "absolute",
                /* top: "50%",
                left: "50%", */
                // transform: "translate(-50%, -50%)",
              }}
            >
              {insideArray[index]}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HomepageSection3;
