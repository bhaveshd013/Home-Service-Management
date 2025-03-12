import React from "react";
import images from "../constant/ServiceImages";

const services = [
  { 
    name: "Cleaning", 
    description: "Professional home and office cleaning services.", 
    image: images[0]
  },
  { 
    name: "Plumbing", 
    description: "Expert plumbing services for repairs and installations.", 
    image: images[3]
  },
  { 
    name: "Electric Work", 
    description: "Certified electricians for all electrical needs.", 
    image: images[1]
  },
  { 
    name: "Gardening", 
    description: "Lawn care, landscaping, and gardening services.", 
    image: images[2]
  }
];
const ServiceCard = ({ service }) => {
  return (
    <>
      {services.map((service, i) => (
        <div className="col-md-3" key={i} data-aos="zoom-out-up" data-aos-duration="1500">
          <div className="card shadow-lg border-0">
            <img src={service.image} className="card-img-top" alt={`${service.name}`} />
            <div className="card-body text-center">
              <h5 className="card-title">{service.name}</h5>
              <p className="card-text">{service.description}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ServiceCard;
