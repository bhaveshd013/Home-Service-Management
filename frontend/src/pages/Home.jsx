import React, { useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import Aos from 'aos';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import plumbing from '../assets/plumbing.jpg';
import gardening from '../assets/gardening.jpg';
import cleaning from '../assets/cleaning.jpg';


const Home = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
    
      {/* Carousel Section with Hero Overlay */}
      <div id="carouselExampleControls" className="carousel slide position-relative" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" style={{ height: '500px', objectFit: 'cover' }} src={plumbing} alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" style={{ height: '500px', objectFit: 'cover' }} src={gardening} alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" style={{ height: '500px', objectFit: 'cover' }} src={cleaning} alt="Third slide" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
        
        {/* Hero Section Overlay */}
        <div className="hero-overlay position-absolute top-50 start-50 translate-middle text-center text-white" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '10px' }}>
          <h1>Reliable Home Services at Your Doorstep</h1>
          <p>From cleaning to plumbing, we provide top-quality home services to make your life easier.</p>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Our Services</h2>
        <div className="row">
          <ServiceCard />
        </div>
      </div>

      {/* About Us Section */}
      <section className="about-us text-center mt-5">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <p>We connect you with trusted professionals to handle your home services efficiently and affordably.</p>
          <p>24/7 support | Verified professionals | Quick & Reliable</p>
        </div>
      </section>
    </>
  );
};

export default Home;