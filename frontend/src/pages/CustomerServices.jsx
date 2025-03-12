import React, { useState } from "react";
import axios from "axios";
import CustomerNavbar from "../components/CustomerNavbar";
import images from "../constant/ServiceImages";
import { useNavigate } from "react-router-dom";


const services = [
  {
    name: "Cleaning",
    description: "Professional cleaning services.",
    image: images[0],
  },
  {
    name: "Plumbing",
    description: "Expert plumbing solutions.",
    image: images[1],
  },
  {
    name: "Electric Work",
    description: "Certified electrical services.",
    image: images[2],
  },
  {
    name: "Gardening",
    description: "Lawn care and landscaping.",
    image: images[3],
  },
];

const CustomerServices = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [providers, setProviders] = useState([]);
  const navigate = useNavigate();


  const fetchProviders = async (serviceType) => {
    setSelectedService(serviceType);
    try {
      const response = await axios.get(
        `http://localhost:8081/api/service-providers/${serviceType}`
      );
      setProviders(response.data);
    } catch (error) {
      console.error("Error fetching providers:", error);
    }
  };

  const handleBookNow = (provider, serviceType) => {
    navigate("/booking", { state: { provider, serviceType } });
  };

  return (
    <>
      <CustomerNavbar />
      <div className="container mt-4">
        <h2 className="text-center mb-4">Available Services</h2>
        <div className="row">
          {services.map((service, index) => (
            <div key={index} className="col-md-3">
              <div className="card shadow-sm">
                <img src={service.image} className="card-img-top" alt={service.name} />
                <div className="card-body text-center">
                  <h5 className="card-title">{service.name}</h5>
                  <p className="card-text">{service.description}</p>
                  <button className="btn btn-primary" onClick={() => fetchProviders(service.name)}>
                    Click Here
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedService && (
          <div className="mt-5">
            <h3>Service Providers for {selectedService}</h3>
            <div className="row">
              {providers.map((provider) => (
                <div key={provider.id} className="col-md-4">
                  <div className="card shadow-sm">
                    
                    <div className="card-body text-center">
                      <h5 className="card-title">{provider.name}</h5>
                      <p>📞 {provider.mobile}</p>
                      <p>💼 {provider.experience} Years Experience</p>
                      <p>💲 {provider.visitingCharges} INR</p>
                      <button className="btn btn-success" onClick={() => handleBookNow(provider, selectedService)}>
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div> 
    </>
  );
};

export default CustomerServices;
