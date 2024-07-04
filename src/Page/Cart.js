import React, { useState, useEffect } from "react";
import img1 from "../images/empty_cart.jpg";
import img2 from "../images/portrait-fashionable-woman-oversized-sweater-removebg-preview.png";
import img3 from "../images/firstorder20off.jpg";
import { Link } from "react-router-dom";
import { useCartContext } from "../MyContext";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
const Cart = () => {
  const [carts, setCarts] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [pricee, setPrice] = useState();
  const [detail, setDetail] = useState();
  const [modal, setModal] = useState(false);
  const [type, setType] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [couponName, setCouponName] = useState("");
  const [offer, setOffer] = useState([]);
  const [isCartAdded, setIsCartAdded] = useState(false);
  const [isCartDelete, setIsCartDelete] = useState(false);
  const {
    
    update,setUpdate
  } = useCartContext();
  const toggle = () => setModal(!modal);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    fetch(`http://localhost:4000/cart-list/${user?._id}`)
      .then((res) => res.json())
      .then((data) => setCarts(data))
      .catch((err) => console.log(err));
  }, [isCartAdded, isCartDelete]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/get-coupon")
      .then((res) => setOffer(res?.data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/order-list/${user?._id}`)
      .then((res) => setOrderList(res?.data))
      .catch((err) => console.log(err));
  }, [user?._id]);
  useEffect(() => {
    const price = carts.reduce(
      (acc, item) => acc + item?.items?.price * item?.items?.quantity,
      0
    );
    setPrice(price.toFixed(2));
  }, [carts]);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/user/${user?._id}`)
      .then((res) => setDetail(res?.data))
      .catch((err) => console.log(err));
  }, [user?._id]);
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const totalPriceInPaisa = Math.round(pricee * 100);

  const productIds = (carts ? carts : [])?.map((item) => item?.items?._id);

  const cb = (response) => {
    const updatedPaymentStatus = "success";
    axios
      .post("http://localhost:4000/update-payment", {
        paymentId: response?.razorpay_payment_id,
        amount: totalPriceInPaisa / 100,
        userId: user?._id,
        productIds: productIds,
        status: updatedPaymentStatus,
      })
      .then((res) => {
        localStorage.removeItem("cart");
        // setCarts("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePayment = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      console.error("Failed to load Razorpay script");
      return;
    }
    console.log("Razorpay script loaded successfully");
    // Further Razorpay initialization logic can be added here
    const razorpay = new window.Razorpay({
      key: "rzp_test_8ZUsi9cuzJxop1", // Replace with your Razorpay key
      amount: totalPriceInPaisa, // Example amount (in paisa)
      currency: "INR",
      name: "Fashion Cart",
      description: "Test Payment",
      image: img2,

      handler: function (response) {
        alert("Payment successful");
        if (response?.razorpay_payment_id) {
          setPaymentStatus("success");
          console.log("Calling cb function with response:", response);
          cb(response);
        } else {
          console.log("Payment ID not found in response:", response);
        }
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "1234567890",
      },
    });
    razorpay.open();
    razorpay.on("payment.failed", function (response) {
      setPaymentStatus("failed");
      alert(response.error.code, "1");
      alert(response.error.description, "2");
    });
  };

  const addItem = async (item, type) => {
    if (item?.items?.quantity == 1 && type == 2) {
      axios
        .delete(
          `http://localhost:4000/cart-delete/${item?.items?._id}/${user?._id}`
        )
        .then((res) => {setIsCartDelete(!isCartDelete);setUpdate(!update)})
        .catch((err) => console.log(err));
    }
    axios
      .post(
        `http://localhost:4000/cart-update/${item?.items?._id}/${item?.userId}`,
        { type },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setIsCartAdded(!isCartAdded);
        setUpdate(!update)
      })
      .catch((error) => {
        console.error("Error updating cart item:", error);
      });
  };

  const TotalItem = (Array.isArray(carts) ? carts : []).reduce(
    (acc, item) => acc + item?.items?.quantity,
    0
  );
  const filterCoupon = () => {
    const isCouponValid = offer.find((item) => item?.code == couponName);

    if (isCouponValid) {
      setPrice(pricee - (pricee * 20) / 100);
      setModal(!modal);
    }
  };
  return (
    <>
      <div className="container py-2 ">
        <div className="d-flex justify-content-center mb-3">
          <img src={img3} className="" height={259} width={800} />
        </div>
        {carts?.length > 0 ? (
          <div className="row">
            <div className={`col-md-9`}>
              <div className="cart_wrapper">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Image</th>
                      <th scope="col">Title</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                      {/* <th scope="col">Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {(carts?.length > 0 ? carts : [])?.map((item, index) => {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>
                            <img
                              src={item?.items?.image}
                              height={100}
                              width={100}
                            />
                          </td>
                          <td>{item?.items?.title}</td>
                          <td>
                            <button
                              className="cart_add_btn me-2"
                              onClick={() => {
                                setType(1);
                                addItem(item, type);
                              }}
                            >
                              +
                            </button>
                            <button className="cart_add_btn me-2">
                              {item?.items?.quantity}
                            </button>
                            <button
                              onClick={() => {
                                setType(2);
                                addItem(item, type);
                              }}
                              className="cart_add_btn me-2"
                            >
                              -
                            </button>
                          </td>
                          <td>$ {item?.items?.price}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-3">
              <div className="cart_wrapper px-2 py-3">
                <h4>Summary</h4>
                <p>
                  Total Items: <span className="fw-bolder">{TotalItem}</span>
                </p>
                <p>
                  Total Price : <span className="fw-bolder">{pricee} </span>
                </p>
                {orderList?.length == 0 && (
                  <p>
                    Coupon Discount :
                    <span
                      onClick={toggle}
                      className="text-danger cursor-pointer ps-2"
                    >
                      Apply Coupon
                    </span>{" "}
                  </p>
                )}

                <button
                  className="download_app_btn text-center cursor-pointer w-100"
                  onClick={handlePayment}
                >
                  Payment
                </button>
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle}>Coupon Discount</ModalHeader>
                  <ModalBody>
                    <input
                      type="text"
                      className="form-control"
                      id="couponName"
                      aria-describedby="emailHelp"
                      onChange={(e) => setCouponName(e.target.value)}
                      value={couponName}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onClick={filterCoupon}>
                      Apply Coupon
                    </Button>{" "}
                    <Button color="secondary" onClick={toggle}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
            </div>
          </div>
        ) : (
          <>
            {" "}
            <h4 className="text-center text-success">Your cart is empty !!!</h4>
            <div className="d-flex justify-content-center">
              <img src={img1} width={200} height={200} />
            </div>
            <div className="d-flex justify-content-center my-2">
              <Link to="/">
                <button className="add_to_cart">Continue Shopping</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
