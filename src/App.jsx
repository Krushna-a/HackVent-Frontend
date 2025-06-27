import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Events from "./pages/Events";
import Hackathons from "./pages/Hackathons";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Hackathon from "./pages/Hackathon";
import HostHack from "./pages/HostHack";
import Profile from "./pages/Profile";
import AuthForm from "./pages/AuthForm";
import Protected from "./pages/Protected";
import RegisterHack from "./pages/RegisterHack";
import { HackContext } from "../context/HackContext";

const App = () => {
  const {ToastContainer, toast} = useContext(HackContext)
  return (
    <div className="bg-[#E8EAEB]">
      <Navbar></Navbar>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/events" element={<Events />}></Route>
        <Route path="/hackathons" element={<Hackathons />}></Route>
        <Route path="/aboutus" element={<AboutUs />}></Route>
        <Route path="/contactus" element={<ContactUs />}></Route>
        <Route path="/hackathons/:hackId" element={<Hackathon />}></Route>
        <Route path="/newHack" element={<HostHack />}></Route>
        <Route path="/user/:mode" element={<AuthForm />}></Route>
        <Route path="/user/profile" element={<Profile />}></Route>
        <Route path="/protected" element={<Protected />}></Route>
        <Route
          path="/hackathons/:hackId/register"
          element={<RegisterHack />}
        ></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
};

export default App;
