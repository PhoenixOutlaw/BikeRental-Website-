import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../redux/features/login/loginSlice";

const links = [
  {
    link: "Home",
    to: "/",
  },
  {
    link: "dashboard",
    to: "/dashboard",
    role: "admin",
  },
];

export const Navbar = () => {
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  return (
    <div className="navbar d-flex justify-sb padding-lr-m padding-top-s padding-bottom-s">
      <div className="d-flex gutter-s">
        {links.map((link, i) => {
          if (link.link === "dashboard" && user.role !== "admin") {
            return null;
          }
          return (
            <NavLink to={link.to} key={i} className="btn">
              {link.link}
            </NavLink>
          );
        })}
      </div>
      <button className="btn" onClick={() =>dispatch(signout())}>Logout</button>
    </div>
  );
};
