import React, { useState, useEffect } from "react";
import img1 from "../images/emptyOrder.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
const Order = () => {
  const [product, setProduct] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    axios
      .get(`http://localhost:4000/order-list/${user?._id}`)
      .then((res) => setProduct(res?.data))
      .catch((err) => console.log(err));
  }, [user?._id]);

  return (
    <>
      <div className="container py-3">
       
        {product?.length > 0 ? (
          <>
             <h5>All orders</h5>
            {product?.map((item) => {
              return (
                <div className="order_wrapper mb-2" key={item?.id}>
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <img src={item?.image} height={100} width={100} />
                    </div>
                    <div className="col-md-8">
                      <h6>{item?.title}</h6>
                      {/* <p className="mb-0">{item?.description}</p> */}
                      <p>{item?.price} </p>
                    </div>
                    <div className="col-md-2">
                      <Link
                        to={`/category/${item?.category}/${item?._id}`}
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        <button className="add_to_cart">Buy It Again</button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
            <>
              <div className="d-flex justify-content-center">
            <img src={img1} alt="img not found" width="300" height="250" />
          </div><div className="d-flex justify-content-center my-2">
            <Link to="/">
              <button className="add_to_cart">Continue Shopping</button>
            </Link>
          </div></>
          
        )}
      </div>
    </>
  );
};

export default Order;
