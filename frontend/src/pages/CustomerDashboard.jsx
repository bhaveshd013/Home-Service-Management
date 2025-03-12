import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomerNavbar from "../components/CustomerNavbar";
import StarRatings from "../components/StarRatings";

const CustomerDashboard = () => {
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, amountSpent: 0 });
  const [upcomingServices, setUpcomingServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [newReview, setNewReview] = useState({ providerId: "", rating: 0, reviewText: "" });

  const customerId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDashboardData();
    fetchReviews();
    fetchServiceProviders();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/bookings/customer/${customerId}/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(response.data);
      setUpcomingServices(response.data.upcomingServices);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/reviews/customer/${customerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const fetchServiceProviders = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/reviews/service-providers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServiceProviders(response.data);
    } catch (error) {
      console.error("Error fetching service providers:", error);
    }
  };

  const submitReview = async () => {
    if (!newReview.providerId) {
      alert("Please select a service provider.");
      return;
    }
  
    try {
      const reviewData = {
        customer: { id: parseInt(customerId) },  // ✅ Convert to integer
        provider: { id: parseInt(newReview.providerId) },  // ✅ Convert to integer
        rating: newReview.rating,
        comment: newReview.reviewText.trim() // ✅ Ensure comment is included
      };
  
      const response = await axios.post(
        "http://localhost:8081/api/reviews/add",
        reviewData,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );
  
      alert("Review submitted successfully!");
      fetchReviews(); // Refresh reviews
      setNewReview({ providerId: "", rating: 0, reviewText: "" }); // Reset form
    } catch (error) {
      console.error("Error submitting review:", error.response?.data || error.message);
      alert("Failed to submit review. Please try again.");
    }
  };
  
  

  return (
    <>
      <CustomerNavbar />
      <div className="container mt-4">
        <h2 className="text-center">Customer Dashboard</h2>

        {/* Stats Section */}
        <div className="row text-center my-4">
          <div className="col-md-3"><div className="card p-3 shadow"><h5>Total Bookings</h5><p>{stats.total}</p></div></div>
          <div className="col-md-3"><div className="card p-3 shadow"><h5>Completed</h5><p>{stats.completed}</p></div></div>
          <div className="col-md-3"><div className="card p-3 shadow"><h5>Pending</h5><p>{stats.pending}</p></div></div>
          <div className="col-md-3"><div className="card p-3 shadow"><h5>Amount Spent</h5><p>₹{stats.amountSpent}</p></div></div>
        </div>

        {/* Upcoming Services */}
        <h4>Upcoming Services</h4>
        <ul className="list-group">
          {upcomingServices.length === 0 ? (
            <li className="list-group-item">No upcoming services.</li>
          ) : (
            upcomingServices.map((service, index) => (
              <li key={index} className="list-group-item">
                📅 {service.date} | ⏰ {service.timeSlot} - {service.serviceType} with {service.provider.name}
              </li>
            ))
          )}
        </ul>

        {/* My Reviews Section */}
<h4 className="mt-4">My Reviews</h4>
{reviews.length === 0 ? (
  <p>No reviews yet.</p>
) : (
  reviews.map((review, index) => (
    <div key={index} className="card p-3 my-2 shadow">
      <h5>👤 {review.provider.name}</h5> {/* ✅ Show provider name */}
      <StarRatings rating={review.rating} editable={false} />
      <p>📝 <strong>Review:</strong> {review.comment}</p> {/* ✅ Show review text */}
      <p>📅 <strong>Date:</strong> {new Date(review.timestamp).toLocaleDateString()}</p> {/* ✅ Show date */}
    </div>
  ))
)}


        {/* Submit Review */}
        <h4 className="mt-4">Give a Review</h4>
        <div className="card p-3 shadow">
          <label>Service Provider:</label>
          <select
            className="form-control"
            value={newReview.providerId}
            onChange={(e) => setNewReview({ ...newReview, providerId: e.target.value })}
          >
            <option value="">Select Service Provider</option>
            {serviceProviders.map((provider) => (
              <option key={provider.id} value={provider.id}>{provider.name}</option>
            ))}
          </select>
          
          <label className="mt-2">Rating:</label>
          <StarRatings rating={newReview.rating} onRatingChange={(rating) => setNewReview({ ...newReview, rating })} />
          
          <label className="mt-2">Review:</label>
          <textarea
            className="form-control"
            value={newReview.reviewText}
            onChange={(e) => setNewReview({ ...newReview, reviewText: e.target.value })}
          ></textarea>
          
          <button className="btn btn-primary mt-2" onClick={submitReview}>Submit Review</button>
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;
