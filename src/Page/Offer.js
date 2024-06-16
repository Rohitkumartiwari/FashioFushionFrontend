import React, { useState, useEffect } from "react";
import { useCartContext } from "../MyContext";
import { MdContentCopy } from "react-icons/md";
import axios from "axios";
const Offer = () => {
  const [data, setData] = useState();
  const [offer, setOffer] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/get-coupon")
      .then((res) => setOffer(res?.data))
      .catch((err) => console.log(err));
  }, []);
 
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="terms_wrapper py-3">
        <div className="container">
          <h4 className="text-center my-3">OFFERS</h4>
          <div className="row ">
            {offer?.map((item) => {
              return (
                <div className="col-md-3 mb-4">
                  <div className="offer_wrapper">
                    {/* <div className="text-center">
                      <img src={item?.image} width="120" height={130} />
                    </div> */}
                    <div className="d-flex  justify-content-center my-3">
                      <button className="copy_section text-danger">
                        {item?.code}
                        <span className="copy_btn ps-">
                          <MdContentCopy color="text-danger cursor-pointer " />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Offer;
