import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/api/auth/forgot-password", { email });
      setMessage("A reset link has been sent to your email.");
    } catch (err) {
      setMessage("Error: Unable to send reset link.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Forgot Password</h2>
      <p className="text-center">Enter your email to reset your password.</p>
      {message && <p className="text-center text-success">{message}</p>}
      <form onSubmit={handleSubmit} className="col-md-4 mx-auto shadow p-4">
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
