import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="w-screen bg-black p-5">
      <menu className="container w-full  text-white m-auto flex justify-between">
        <div className="logo">
          <p>Parking Space</p>
        </div>
        <div className="nav-menu">
          <ul className="flex gap-5">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/loginregister">
              <li>Login/Register</li>
            </Link>
            <li>Rent</li>
          </ul>
        </div>
      </menu>
    </div>
  );
};

export default Menu;
