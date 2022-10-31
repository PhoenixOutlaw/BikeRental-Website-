import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="padding-lr-m padding-top-s">
        <Outlet />
      </div>
    </div>
  );
};
