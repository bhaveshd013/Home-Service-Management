import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const BookingPage = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { provider, serviceType } = location.state || {};

  const [bookingDetails, setBookingDetails] = useState({
    state: "",
    city: "",
    address: "",
    date: "",
    timeSlot: "",
  });

  useEffect(() => {
    if (!provider || !serviceType) {
      alert("Invalid booking details. Redirecting...");
      navigate("/customer/services");
    }
  }, [provider, serviceType, navigate]);

  const handleInputChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const customerId = localStorage.getItem("userId");  // ✅ Fetch customerId
    console.log("customerId: " + customerId);
    const token = localStorage.getItem("token");  // ✅ Fetch JWT token
  
    // ✅ Extract provider and serviceType from the location state
    const { provider, serviceType } = location.state || {};
  
    console.log("Customer ID:", customerId); // 🛑 Debugging step
    console.log("Provider:", provider); // 🛑 Debugging step
    console.log("Service Type:", serviceType); // 🛑 Debugging step
  
    // ❌ If values are missing, stop execution
    if (!customerId) {
      alert("Customer ID not found. Please login again.");
      return;
    }
    if (!provider || !provider.id) {
      alert("Service provider details missing.");
      return;
    }
    if (!token) {
      alert("Authentication token missing. Please login first.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:8081/api/bookings/create",
        {
          customer: { id: parseInt(customerId) },  // ✅ Ensure integer
          provider: { id: provider.id },  // ✅ Ensure providerId is correct
          serviceType,  
          state: bookingDetails.state,
          city: bookingDetails.city,
          address: bookingDetails.address,
          date: bookingDetails.date,
          timeSlot: bookingDetails.timeSlot,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // ✅ Correct Auth header
            "Content-Type": "application/json",
          },
        }
      );
  
      alert("Booking successful!");
      navigate("/customer/bookings");
    } catch (error) {
      console.error("Booking failed:", error.response?.data || error.message);
      alert("Booking failed. Please try again.");
    }
  };

  

  return (
    <div className="container mt-5">
      <h2>Book Service with {provider.name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>State</label>
          <input type="text" className="form-control" name="state" value={bookingDetails.state} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label>City</label>
          <input type="text" className="form-control" name="city" value={bookingDetails.city} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label>Address</label>
          <input type="text" className="form-control" name="address" value={bookingDetails.address} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label>Date</label>
          <input type="date" className="form-control" name="date" value={bookingDetails.date} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label>Time Slot</label>
          <select className="form-control" name="timeSlot" value={bookingDetails.timeSlot} onChange={handleInputChange} required>
            <option value="">Select Time Slot</option>
            <option>9:00 AM - 11:00 AM</option>
            <option>12:00 PM - 2:00 PM</option>
            <option>3:00 PM - 5:00 PM</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Confirm Booking</button>
        <button type="button" className="btn btn-danger ms-2" onClick={() => navigate("/customer/services")}>Cancel</button>
      </form>
    </div>
  );
};

export default BookingPage;
