import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import img1 from "../images/person1.svg";
import { BsGift, BsFillPersonLinesFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import { CiDiscount1 } from "react-icons/ci";
import { MdEditLocationAlt } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
const Dashbaord = ({ tab, setTab }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [detail, setDetail] = useState();

  useEffect(() => {
    axios
      .get(`/user/${user?._id}`)
      .then((res) => setDetail(res?.data))
      .catch((err) => console.log(err));
  }, [user?._id]);
  console.log(detail, "detail");
  return (
    <>
      <div className="row my-3 ">
        <div className="col-md-3 profile-wrapper text-center">
          <div>
            <img
              src={`http://localhost:4000/${detail?.image}`}
              width="100"
              height="150"
              alt="img not found"
            />
          </div>
        </div>
        <div className="col-md-9 profile_wrapper_design">
          <div className="profile-wrapper">
            <h5>User Details</h5>
            <div className="border_bottom "></div>
            <div className="row">
              <div className="col-md-6">
                <h6 className="mb-0">Name:</h6>
                <p className="fs-14">{detail?.name}</p>
                <h6 className="mb-0">Mobile:</h6>
                <p className="fs-14">{detail?.mobile}</p>
              </div>
              <div className="col-md-6">
                <h6 className="mb-0">Email:</h6>
                <p className="fs-14">{detail?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 p-0">
          <div
            className="profile_card_wrapper text-center cursor-pointer"
            onClick={() => setTab(2)}
          >
            <BsGift size={23} />
            <h6 className="my-3">Orders</h6>
            <p className="fs-14"> Check Your Order</p>
          </div>
        </div>
        <div className="col-md-4 p-0">
          <div
            className="profile_card_wrapper text-center cursor-pointer"
            onClick={() => setTab(7)}
          >
            <FaHeart size={23} />
            <h6 className="my-3">Wishlist</h6>
            <p className="fs-14"> Check Wishlist</p>
          </div>
        </div>
        <div className="col-md-4 p-0">
          <div
            className="profile_card_wrapper text-center cursor-pointer"
            onClick={() => setTab(3)}
          >
            <FaCartPlus size={23} />
            <h6 className="my-3">Cart</h6>
            <p className="fs-14"> Add more items</p>
          </div>
        </div>
        <div className="col-md-4 p-0">
          <div
            className="profile_card_wrapper text-center cursor-pointer"
            onClick={() => setTab(4)}
          >
            <CiDiscount1 size={23} />
            <h6 className="my-3">Coupons</h6>
            <p className="fs-14"> Manage coupons for additional discounts</p>
          </div>
        </div>
        <div className="col-md-4 p-0">
          <div
            className="profile_card_wrapper text-center cursor-pointer"
            onClick={() => setTab(6)}
          >
            <BsFillPersonLinesFill size={23} />
            <h6 className="my-3">Profile</h6>
            <p className="fs-14"> Update Your Profile</p>
          </div>
        </div>
        <div className="col-md-4 p-0">
          <div
            className="profile_card_wrapper text-center cursor-pointer "
            onClick={() => setTab(5)}
          >
            <MdEditLocationAlt size={23} />
            <h6 className="my-3">Address</h6>
            <p className="fs-14"> Add more adresses</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashbaord;
