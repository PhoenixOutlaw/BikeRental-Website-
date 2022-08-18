import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Breadcrumb, Layout, Menu } from "antd";
const { Content, Footer } = Layout;

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
