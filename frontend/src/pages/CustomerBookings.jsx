import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomerNavbar from "../components/CustomerNavbar";
import { useNavigate } from "react-router-dom";

const CustomerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const customerId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!customerId || !token) {
      alert("You are not logged in. Redirecting to login...");
      navigate("/login"); // Redirect to login if customer ID is not found
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/bookings/customer/${customerId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);

        // Handle token expiration
        if (error.response && error.response.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.clear();
          navigate("/login");
        }
      }
    };

    fetchBookings();
  }, [customerId, token, navigate]);

  return (
    <>
      <CustomerNavbar />
      <div className="container mt-4">
        <h2 className="text-center">My Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-center">No bookings found.</p>
        ) : (
          <div className="row">
            {bookings.map((booking) => (
              <div key={booking.id} className="col-md-6">
                <div className="card shadow-sm mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{booking.serviceType}</h5>
                    <p>📍 {booking.address}, {booking.city}, {booking.state}</p>
                    <p>📅 {booking.date} | ⏰ {booking.timeSlot}</p>
                    {booking.provider ? (
                      <>
                        <p>👤 Provider: {booking.provider.name}</p>
                        <p>Status: <strong>{booking.status}</strong></p>
                      </>
                    ) : (
                      <p>👤 Provider: Not Assigned</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerBookings;
