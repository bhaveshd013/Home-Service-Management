import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceProviderNavbar from "../components/ServiceProviderNavbar";

const ServiceProviderDashboard = () => {
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const providerId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDashboardStats();
    fetchAcceptedRequests();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/bookings/provider/${providerId}/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  const fetchAcceptedRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/bookings/provider/${providerId}/accepted`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAcceptedRequests(response.data);
    } catch (error) {
      console.error("Error fetching accepted requests:", error);
    }
  };

  return (
    <>
      <ServiceProviderNavbar />
      <div className="container mt-4">
        <h2 className="text-center">Service Provider Dashboard</h2>
        <div className="row text-center my-4">
          <div className="col-md-4"><div className="card p-3 shadow"><h5>Total Requests</h5><p>{stats.total}</p></div></div>
          <div className="col-md-4"><div className="card p-3 shadow"><h5>Completed</h5><p>{stats.completed}</p></div></div>
          <div className="col-md-4"><div className="card p-3 shadow"><h5>Pending</h5><p>{stats.pending}</p></div></div>
        </div>
        <h4>Accepted Requests</h4>
        {acceptedRequests.length === 0 ? (
          <p className="text-center">No accepted requests.</p>
        ) : (
          <div className="list-group">
            {acceptedRequests.map((request) => (
              <div key={request.id} className="list-group-item">
                <h5>Service: {request.serviceType}</h5>
                <p>Customer: {request.customer.name}</p>
                <p>Location: {request.address}, {request.city}, {request.state}</p>
                <p>Mobile: {request.customer.mobile}</p>
                <p>Date & Time: {request.date} | {request.timeSlot}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ServiceProviderDashboard;
