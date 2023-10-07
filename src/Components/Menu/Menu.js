import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserLoginRegisterContext } from "../Context/UserLoginRegisterContext";
import axios from "axios";

const Menu = () => {
  const { image, setImage, imageLoading, email, imageUrlRef } = useContext(
    UserLoginRegisterContext
  );

  useEffect(() => {
    const imageFetch = async (email) => {
      if (email) {
        await axios
          .get(`api/v1/publicUsers/retrieveimage/${email}`, {
            responseType: "arraybuffer",
          })
          .then((res) => {
            console.log(res);
            const imageBlob = new Blob([res.data], { type: "image/jpeg" });
            imageUrlRef.current = URL.createObjectURL(imageBlob);
            setImage(imageUrlRef.current);
            console.log(imageUrlRef.current);
          })
          .catch((err) => console.log(err));
      }
    };
    imageFetch(email);
  }, [email]);
  return (
    <div className="w-screen bg-black p-5">
      <menu className="container w-full  text-white m-auto flex justify-between items-start">
        <div className="logo">
          <p>Parking Space</p>
        </div>
        <div className="nav-menu">
          <ul className="flex gap-5 items-center">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/loginregister">
              <li>Owner Login</li>
            </Link>
            <Link to="/ownerprofile">
              <li>Owner Profile</li>
            </Link>

            {email ? (
              <li>
                <img
                  className="w-10 rounded-full"
                  src={image}
                  alt=""
                  srcSet=""
                />
              </li>
            ) : (
              <Link to="/userloginregister">
                <li>User Login</li>
              </Link>
            )}
          </ul>
        </div>
      </menu>
    </div>
  );
};

export default Menu;
