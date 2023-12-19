import React from "react";
import bgImage from "../../../assets/homepage-image/home-1.png";
const HomepageSection1 = () => {
  return (
    <section
      className="relative h-[500px] my-5 bg-cover bg-center flex items-center rounded-[80px]"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay Effect */}
      <div className="absolute inset-0 bg-black opacity-50 rounded-[80px]"></div>

      {/* Content Container */}
      <div className="container mx-auto text-white text-left relative z-10 ">
        <div className="rounded-lg p-8">
          <h2 className="text-4xl font-bold mb-4">Park. Pay. Go.</h2>
          <p className="text-lg mb-8 pr-[1000px]">
            When you're on the go, the free ParkMobile app makes it easy to find
            and pay for parking without running back to feed the meter. And for
            added convenience, you can reserve spots ahead of time.
          </p>

          {/* Search Input and Button */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search for parking..."
              className="p-2 rounded-l-lg border-none bg-white text-gray-800 w-full"
            />
            <button className="bg-green-500 text-white p-2 rounded-r-lg">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageSection1;
