import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "../components/Common/Footer";
import RegistrationForm from "../components/Common/Auth/Register/RegistrationForm";
import AuthNavbar from "../components/Common/Auth/Navbar";
import { Login } from "../components/Common/Auth/Login/Login";
// import { PasswordRe } from "../components/Common/Auth/Reset/PasswordRe";
// import { ForgetPassword } from "../components/Common/Auth/Navbar/Forgetpassword";

export default function Auth() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      {/* <Sidebar isOpen={isOpen} toggle={toggle} /> */}
      <AuthNavbar toggle={toggle} />

      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/reset" element={<PasswordRe />} /> */}
        {/* <Route path="/forgetPassword/:id/:token" element={<ForgetPassword />} /> */}
      </Routes>

      <Footer />
    </>
  );
}
