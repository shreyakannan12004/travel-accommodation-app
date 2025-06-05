import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import HotelList from "./components/HotelList";
import StickyCard from "./components/StickyCard";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HotelDetails from "./components/HotelDetails"; // <-- new component you'll create

const App = () => {
  return (
    <>
      <Header />
      <Navbar />
      
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HotelList />
              <StickyCard />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/hotels/:id" element={<HotelDetails />} /> {/* New Route */}
      </Routes>
    </>
  );
};

export default App;
