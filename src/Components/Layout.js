import React from "react";
import Header from "../Page/Header";
import Sidebar from "../Page/Sidebar";
import Footer from "../Page/Footer";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
