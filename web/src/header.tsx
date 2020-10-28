import React, { memo } from "react";
import { FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="container mx-auto p-4 flex flex-row">
      <Link to="/" className="font-bold truncate">
        <img
          alt="logo"
          src="/favicon-32x32.png"
          className="w-6 h-6 inline rounded"
        />

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
