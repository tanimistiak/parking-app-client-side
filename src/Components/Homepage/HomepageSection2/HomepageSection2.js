import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const HomepageSection2 = () => {
  const arrowVariants = {
    hover: { x: 5, transition: { duration: 0.3 } },
  };

  return (
    <Link to="/login-register">
      <motion.section
        className="container w-[80%] mx-auto flex items-center justify-between bg-green-600 p-8 cursor-pointer rounded-2xl my-5"
        whileHover="hover"
      >
        {/* Left Text */}
        <div className="w-[70%]">
          <h2 className="text-4xl font-bold">Are you a parking provider?</h2>
          <p>
            Whether you've got a garage to fill, you're managing parking for a
            big event, or you're managing a large fleet, ParkMobile solutions
            can help
          </p>
        </div>

        {/* Right Arrow */}
        <motion.div
          variants={arrowVariants}
          className="bg-white p-5 rounded-2xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.div>
      </motion.section>
    </Link>
  );
};

export default HomepageSection2;
