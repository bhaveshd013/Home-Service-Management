import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalCustomers: 0,
    totalServiceProviders: 0,
    totalServices: 0
  });
  const [bookings, setBookings] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard"); // ✅ Track active section

  useEffect(() => {
    console.log("Active Tab Changed:", activeTab); // ✅ Debug log
    if (activeTab === "dashboard") {
      fetchDashboardStats();
    } else if (activeTab === "bookings") {
      fetchBookings();
    } else if (activeTab === "serviceProviders") {
      fetchServiceProviders();
    } else if (activeTab === "customers") {
      fetchCustomers();
    }
  }, [activeTab]); // ✅ Runs when activeTab changes
  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/admin/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      setError("Failed to load dashboard statistics.");
    }
  };

  const fetchBookings = async () => {
    try {
      setError(null);
      const response = await axios.get("http://localhost:8081/api/admin/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to fetch bookings.");
    }
  };

  const fetchServiceProviders = async () => {
    try {
      setError(null);
      const response = await axios.get("http://localhost:8081/api/admin/service-providers");
      setServiceProviders(response.data);
    } catch (error) {
      console.error("Error fetching service providers:", error);
      setError("Failed to fetch service providers.");
    }
  };

  const fetchCustomers = async () => {
    try {
      setError(null);
      const response = await axios.get("http://localhost:8081/api/admin/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setError("Failed to fetch customers.");
    }
  };
  

  const deleteServiceProvider = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to remove this provider?")) return;
      await axios.delete(`http://localhost:8081/api/admin/service-providers/${id}`);
      alert("Service provider removed successfully!");
      fetchServiceProviders(); // Refresh service provider list
    } catch (error) {
      console.error("Error deleting service provider:", error);
      setError("Failed to remove service provider.");
    }
  };

  const deleteCustomer = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to remove this customer?")) return;
      await axios.delete(`http://localhost:8081/api/admin/customers/${id}`);
      alert("Customer removed successfully!");
      fetchCustomers(); // Refresh customer list
    } catch (error) {
      console.error("Error deleting customer:", error);
      setError("Failed to remove customer.");
    }
  };

  return (
    <div>
      <AdminNavbar setActiveTab={setActiveTab} /> {/* ✅ Pass setActiveTab to Navbar */}
      <div className="container mt-4">
        <h1 className="text-center">Admin Dashboard</h1>

        {/* Show errors if any */}
        {error && <p className="text-danger text-center">{error}</p>}

        {/* ✅ User Bookings Section */}
        {activeTab === "bookings" && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">User Bookings</h2>
            {bookings.length === 0 ? (
              <p>No bookings found.</p>
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Provider</th>
                    <th>Service</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Address</th>
                    <th>Date</th>
                    <th>Time Slot</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.customer.name || "N/A"}</td>
                      <td>{booking.provider.name || "N/A"}</td>
                      <td>{booking.serviceType || "N/A"}</td>
                      <td>{booking.state || "N/A"}</td>
                      <td>{booking.city || "N/A"}</td>
                      <td>{booking.address || "N/A"}</td>
                      <td>{booking.date || "N/A"}</td>
                      <td>{booking.timeSlot || "N/A"}</td>
                      <td>{booking.status || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ✅ Service Providers Section */}
        {activeTab === "serviceProviders" && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Service Providers</h2>
            {serviceProviders.length === 0 ? (
              <p>No service providers found.</p>
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Service Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceProviders.map((provider) => (
                    <tr key={provider.id}>
                      <td>{provider.id}</td>
                      <td>{provider.name}</td>
                      <td>{provider.email}</td>
                      <td>{provider.mobile? provider.mobile : "Not Available"}</td>  
                      <td>{provider.serviceType}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => deleteServiceProvider(provider.id)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ✅ Customers Section */}
        {activeTab === "customers" && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Customer List</h2>
            {customers.length === 0 ? (
              <p>No customers found.</p>
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.id}</td>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.mobile || "N/A"}</td>  
                      <td>
                        <button className="btn btn-danger" onClick={() => deleteCustomer(customer.id)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        {activeTab === "dashboard" && (
          <div className="row text-center my-4">
            <div className="col-md-3">
              <div className="card p-3 shadow">
                <h5>Total Bookings</h5>
                <p>{stats.totalBookings}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 shadow">
                <h5>Total Customers</h5>
                <p>{stats.totalCustomers}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 shadow">
                <h5>Total Service Providers</h5>
                <p>{stats.totalServiceProviders}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 shadow">
                <h5>Total Services</h5>
                <p>{stats.totalServices}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "bookings" && (
          <div>
            <h2>User Bookings</h2>
            {/* Render bookings table */}
          </div>
        )}

        {activeTab === "serviceProviders" && (
          <div>
            <h2>Service Providers</h2>
            {/* Render service providers table */}
          </div>
        )}

        {activeTab === "customers" && (
          <div>
            <h2>Customer List</h2>
            {/* Render customers table */}
          </div>
        )}
      </div>
    </div>
  );
};
      

export default AdminDashboard;