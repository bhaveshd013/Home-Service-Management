import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    mobile: "",
    email: "",
    gender: "",
    state: "",
    city: "",
    username: "",
    password: "",
    role: "CUSTOMER", // Default role
    serviceType: "",
    experience: "",
    visitingCharges: "",
  });

  const [showProviderFields, setShowProviderFields] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Ensure role is always uppercase
    if (name === "role") {
        value = value.toUpperCase().replace(" ", "_"); // Convert "Service Provider" -> "SERVICE_PROVIDER"
        setShowProviderFields(value === "SERVICE_PROVIDER"); // Keep logic for extra fields
    }

    setUser((prevUser) => ({
        ...prevUser,
        [name]: value
    }));
};


const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Submitting user data:", user); // ✅ Log data before sending

    try {
        const response = await axios.post("http://localhost:8081/api/auth/signup", user, {
            headers: { "Content-Type": "application/json" }
        });
        alert("Signup successful!");
        navigate("/login");
    } catch (err) {
        console.error("Signup error:", err.response?.data || err.message);
        setError(err.response?.data || "Signup failed.");
    }
};

  return (
    <div className="container mt-5">
      <h2 className="text-center">Signup</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="col-md-6 mx-auto shadow p-4">
        {/* Basic Fields */}
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Mobile Number</label>
          <input type="text" name="mobile" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Gender</label>
          <select name="gender" className="form-control" onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label>State</label>
          <input type="text" name="state" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>City</label>
          <input type="text" name="city" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Username</label>
          <input type="text" name="username" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>

        {/* Role Selection */}
        <div className="mb-3">
          <label>Role</label>
          <select name="role" className="form-control" onChange={handleChange} required>
            <option value="CUSTOMER">Customer</option>
            <option value="SERVICE PROVIDER">Service Provider</option>
          </select>
        </div>

        {/* Additional Fields for Service Provider */}
        {showProviderFields && (
          <>
            <div className="mb-3">
              <label>Service Provided</label>
              <select name="serviceType" className="form-control" onChange={handleChange} required>
                <option value="">Select Service</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electric Work">Electric Work</option>
                <option value="Gardening">Gardening</option>
                <option value="Painting">Painting</option>
                <option value="AC Repair">AC Repair</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Experience (Years)</label>
              <input type="number" name="experience" className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Visiting Charges (₹)</label>
              <input type="number" name="visitingCharges" className="form-control" onChange={handleChange} required />
            </div>
            
          </>
        )}

        <button type="submit" className="btn btn-primary w-100">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
