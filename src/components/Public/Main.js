import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Global/PublicHeader";
import Login from "../../Forms/Login";
import Signup from "../../Forms/Signup";
import PublicMain from "./PublicMain";
import AboutUs from "../Global/Aboutus";
import ContactUs from "../Global/Contactus";
import Footer from "../Global/PublicFooter";

export default function Main() {
  return (
    <main style={{ padding: '20px', width: '100%' }}>
      <Header />
      <Routes>
        <Route path="/" element={<PublicMain />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer />
    </main>
  );
}
