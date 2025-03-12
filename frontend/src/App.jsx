import { useState } from "react";
import "./App.css";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import AOS from "aos";
import "aos/dist/aos.css";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerServices from "./pages/CustomerServices";
import ServiceProviderDashboard from "./pages/ServiceProviderDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import BookingPage from "./pages/BookingPage";
import CustomerBookings from "./pages/CustomerBookings";
import ServiceProviderBookings from "./pages/ServiceProviderBookings";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route path="/login" element={
              <>
                <Navbar />
                <Login />
              </>
            }
          />
          <Route path="/register" element={
              <>
                <Navbar />
                <Signup />
              </>
            }
          />

          
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/customer-services" element={<CustomerServices />} />
          <Route path="/service-provider-dashboard" element={<ServiceProviderDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/book-service/:providerId" element={<BookingPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/customer/bookings" element={<CustomerBookings />} />
        <Route path="/service-provider/bookings" element={<ServiceProviderBookings />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />




        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
