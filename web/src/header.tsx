import React, { memo } from "react";
import { FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";
import Favicon32x32 from "./assets/favicon-32x32.png";

const Header = () => {
  return (
    <nav className="container mx-auto p-4 flex flex-row">
      <Link to="/" className="font-bold truncate">
        <img alt="logo" src={Favicon32x32} className="w-6 h-6 inline rounded" />
        <span className="align-middle"> Genshin Schedule</span>
      </Link>

      <div className="flex-1" />

      <Link to="/customize" className="text-sm flex-shrink-0">
        <FaCog className="inline" />
        <span className="align-middle"> Customize</span>
      </Link>
    </nav>
  );
};

export default memo(Header);
