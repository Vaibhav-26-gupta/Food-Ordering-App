import React from "react";
import AdminNavbar from "../Components/AdminNavbar";
import Footer from "../Components/Footer";
import Sidebar from "./Sidebar";

const Orders = () => {
  return (
    <>
      <div>
        <AdminNavbar />
      </div>
      <div>
        <Sidebar></Sidebar>
      </div>
      <Footer />
    </>
  );
};

export default Orders;
