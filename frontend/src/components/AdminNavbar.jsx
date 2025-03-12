import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = ({ setActiveTab }) => {
    const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <button className="navbar-brand fw-bold btn btn-link text-light" onClick={() => setActiveTab("dashboard")}>
          Admin Panel
        </button>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="adminNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="nav-link btn btn-link text-light" onClick={() => setActiveTab("dashboard")}>
                Dashboard
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link text-light" onClick={() => setActiveTab("bookings")}>
                User Bookings
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link text-light" onClick={() => setActiveTab("serviceProviders")}>
                Service Providers
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link text-light" onClick={() => setActiveTab("customers")}>
                Customer List
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;