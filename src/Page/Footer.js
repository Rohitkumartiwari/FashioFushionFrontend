import React from "react";
import bannerImage from "../images/8662727.jpg";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className=" text-center">
      <p className="my-2">Made in India, for the World 🌍</p>
      <div className="bg-dark text-light py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <img
                src={bannerImage}
                alt="img not found"
                width={130}
                height={80}
              />
            </div>
            <div className="col-md-3 text-start">
              <h5> ONLINE SHOPPING</h5>
              <p>Men</p>
              <p>Women</p>
              <p>Jewelery</p>
              <p>Electronics</p>
            </div>
            <div className="col-md-3 text-start">
              <h5> CUSTOMER POLICIES</h5>
              <p>Contact Us</p>
              <Link to="/faq" style={{ color: "white" }}>
                <p>FAQ</p>
              </Link>
              <Link to="/terms-and-conditions" style={{ color: "white" }}>
                {" "}
                <p>T&C</p>
              </Link>

              <Link to="/offer" style={{ color: "white" }}>
                {" "}
                <p>Offer</p>
              </Link>
            </div>
            <div className="col-md-3">
              <p>100% ORIGINAL guarantee for all products at fashion.com</p>
              <p>Return within 14days of receiving your order</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
