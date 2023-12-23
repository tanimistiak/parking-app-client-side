import React from "react";
import LoginImage from "../../assets/owner-login/photo.jpg";
const HeroImage = () => {
  return (
    <div>
      <img
        src={LoginImage}
        alt="Login background"
        className="w-48  object-cover fixed top-0 left-0"
      />
    </div>
  );
};

export default HeroImage;
