import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/api/auth/login", user);

      const { token, role, userId} = response.data; // Get role from response
      console.log(response.data);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role); // Save role in local storage
      localStorage.setItem("userId", userId);
      

      // Redirect based on role
      if (role === "CUSTOMER") {
        navigate("/customer-dashboard");
      } else if (role === "SERVICE_PROVIDER") {
        navigate("/service-provider-dashboard");
      } else if (role === "ADMIN") {
        navigate("/admin-dashboard");
      }
    } catch (err) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="col-md-4 mx-auto shadow p-4">
        <div className="mb-3">
          <label>Username</label>
          <input type="text" name="username" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>
        <div className="text-end mb-3">
          <Link to="/forgot-password" className="text-primary">Forgot Password?</Link>
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default Login;
