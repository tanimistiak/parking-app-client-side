import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.config";
import axios from "axios";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [ownerDetails, setOwnerDetails] = useState();
  const [userDetails, setUserDetails] = useState();
  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(`/api/v1/owner/all-owners/${user?.email}`)
        .then((data) => setOwnerDetails(data.data))
        .catch((err) => console.log(err));
      /* await axios
        .get(`/api/v1/owner/all-owners/${user?.email}`)
        .then((data) => setOwnerDetails(data.data))
        .catch((err) => console.log(err)); */
    };

    fetch();
  }, [user]);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const menuVariants = {
    open: {
      top: "85px",
      height: "30vh",
      opacity: 1,
      transition: { duration: 0.3 },
    },
    closed: { top: 0, height: 0, opacity: 0 },
  };
  const menuItemVariants = {
    hover: {
      scale: 1.1,
    },
  };
  const crossVariants = {
    open: { rotate: 45, transition: { duration: 0.3 } },
    closed: { rotate: 0, transition: { duration: 0.3 } },
  };
  const lineVariants = {
    initial: { width: 0 },
    hover: { width: "100%", transition: { duration: 0.3 } },
  };

  return (
    <header className="bg-white text-black py-7 border-b-4 border-gray-700">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Section - Logo */}
        <div className="flex items-center">
          <img src="/path/to/logo.png" alt="Logo" className="mr-4" />
        </div>

        {/* Middle Section - Menu Items */}
        <nav className="flex flex-grow justify-center">
          <motion.div
            variants={menuItemVariants}
            whileHover="hover"
            className="relative mx-4 cursor-pointer"
          >
            <Link
              to="/"
              className="text-black hover:bg-green-500 hover:text-white px-4 py-2 rounded-full"
            >
              Park Now
            </Link>
            <motion.div
              variants={lineVariants}
              initial="initial"
              whileHover="hover"
              className="bg-green-500 h-1 absolute bottom-0 left-0"
            />
          </motion.div>

          <motion.div
            variants={menuItemVariants}
            whileHover="hover"
            className="relative mx-4 cursor-pointer"
          >
            <Link
              to="/owner-login"
              className="text-black hover:bg-green-500 hover:text-white px-4 py-2 rounded-full"
            >
              Parking Space Create
            </Link>
            <motion.div
              variants={lineVariants}
              initial="initial"
              whileHover="hover"
              className="bg-green-500 h-1 absolute bottom-0 left-0"
            />
          </motion.div>

          <motion.div
            variants={menuItemVariants}
            whileHover="hover"
            className="relative mx-4 cursor-pointer"
          >
            <Link
              to="/user-login"
              className="text-black hover:bg-green-500 hover:text-white px-4 py-2 rounded-full"
            >
              User Dashboard
            </Link>
            <motion.div
              variants={lineVariants}
              initial="initial"
              whileHover="hover"
              className="bg-green-500 h-1 absolute bottom-0 left-0"
            />
          </motion.div>
        </nav>

        {/* Right Section - Hamburger Menu */}
        <div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            onClick={toggleMenu}
            className="cursor-pointer"
          >
            <motion.span
              variants={crossVariants}
              animate={isMenuOpen ? "open" : "closed"}
              className="text-black text-3xl block"
            >
              {isMenuOpen ? "✕" : "☰"}
            </motion.span>
          </motion.div>
        </div>

        {/* motion div */}
        <motion.div
          variants={menuVariants}
          initial="closed"
          animate={isMenuOpen ? "open" : "closed"}
          className="bg-green-500 text-white overflow-hidden transition-all absolute top-0 left-0 right-0 bottom-0 z-50"
        >
          <div className="container mx-auto py-4">
            {/* Your mega menu content goes here */}
            <p>Mega Menu Content</p>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
