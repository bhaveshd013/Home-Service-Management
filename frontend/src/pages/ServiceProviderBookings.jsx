import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceProviderNavbar from "../components/ServiceProviderNavbar";

const ServiceProviderBookings = () => {
  const [bookings, setBookings] = useState([]);
  const providerId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
 // const bookingId = localStorage.getItem("id");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    console.log("Fetching bookings with token:", token);
    try {
      const response = await axios.get(`http://localhost:8081/api/bookings/provider/${providerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Bookings fetched:", response.data);
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
  

  const handleAcceptRequest = async (bookingId) => {
    try {
      await axios.put(
        `http://localhost:8081/api/bookings/provider/${providerId}/accept/${bookingId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Request accepted successfully!");
      setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: "Accepted and Pending" } : b)));
    } catch (error) {
      console.error("Error accepting request:", error);
      alert("Failed to accept the request.");
    }
  };
  
  const handleRejectRequest = async (bookingId) => {
    try {
      await axios.put(
        `http://localhost:8081/api/bookings/provider/${providerId}/reject/${bookingId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Request rejected.");
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (error) {
      console.error("Error rejecting request:", error);
      alert("Failed to reject the request.");
    }
  };
  
  const handleCompleteRequest = async (bookingId) => {
    try {
      await axios.put(
        `http://localhost:8081/api/bookings/provider/${providerId}/complete/${bookingId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Booking marked as completed!");
      setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: "Completed" } : b)));
    } catch (error) {
      console.error("Error completing booking:", error);
      alert("Failed to mark as completed.");
    }
  };
  

  return (
    <>
      <ServiceProviderNavbar />
      <div className="container mt-4">
        <h2 className="text-center">My Bookings</h2>
        {bookings.length === 0 ? (
  <p className="text-center">No bookings found.</p>
) : (
  <div className="list-group">
    {bookings.map((booking) => (
      <div key={booking.id} className="list-group-item">
        <h5>Service: {booking.serviceType}</h5>
        <p>Customer: {booking.customer.name}</p>
        <p>Mobile: {booking.customer.mobile}</p>
        <p>Location: {booking.address}, {booking.city}, {booking.state}</p>
        <p>Date & Time: {booking.date} | {booking.timeSlot}</p>
        <p>Status: <strong>{booking.status}</strong></p>

        {/* Show Accept & Reject only if status is "Pending" */}
        {booking.status === "Pending" && (
          <div className="btn-group">
            <button className="btn btn-success" onClick={() => handleAcceptRequest(booking.id)}>
              Accept
            </button>
            <button className="btn btn-danger" onClick={() => handleRejectRequest(booking.id)}>
              Reject
            </button>
          </div>
        )}

        {/* Show "Mark Complete" only if status is "Accepted and Pending" */}
        {booking.status === "Accepted and Pending" && (
          <button className="btn btn-primary mt-2" onClick={() => handleCompleteRequest(booking.id)}>
            Mark Complete
          </button>
        )}
      </div>
    ))}
  </div>
)}

      </div>
    </>
  );
};

export default ServiceProviderBookings;
