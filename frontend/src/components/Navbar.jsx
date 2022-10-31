import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../redux/features/login/loginSlice";
import { Avatar, Dropdown, Menu, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

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
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <Link to="/profile" className="btn ">Profile</Link>,
        },
        {
          key: "2",
          label: <button onClick={()=>dispatch(signout())} className="btn ">Logout</button>,
        },
      ]}
    />
  );
  
  return (
    <div className="navbar d-flex justify-sb padding-lr-m padding-top-s padding-bottom-s">
      <div className="d-flex gutter-s align-center">
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
      <Dropdown overlay={menu}>
        <Space>
          <Avatar size={45} src={user?.image?`http://localhost:5000/${user?.image}`:null} icon={<UserOutlined />} />
        </Space>
      </Dropdown>
    </div>
  );
};

