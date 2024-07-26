import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaCommentAlt,
  FaShoppingBag,
  FaHome,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/",
      name: "Home",
      icon: <FaHome />,
    },
    {
      path: "/admin",
      name: "Dashboard",
      icon: <FaTh />,
    },

    {
      path: "/admin/orders",
      name: "Orders",
      icon: <FaCommentAlt />,
    },
    {
      path: "/admin/products",
      name: "Products",
      icon: <FaShoppingBag />,
    },
  ];
  return (
    <div className="container1-fluid p-0 d-flex">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar1">
        <div className="top_section1">
          <h4 style={{ display: isOpen ? "block" : "none" }} className="logo1">
            Welcome Admin
          </h4>
          <div
            style={{ marginLeft: isOpen ? "50px" : "0px" }}
            className="bars1"
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link1"
            activeclassName="active1"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text1"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main style={{ height: "calc(100vh-166px)" }}>{children}</main>
    </div>
  );
};

export default Sidebar;
