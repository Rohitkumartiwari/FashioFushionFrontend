import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Dashbaord from "../Components/Dashbaord";
import Order from "../Components/Order";
import Cart from "./Cart";
import Address from "../Components/Address";
import Offer from "./Offer";
import Wishlist from "../Components/Wishlist";
import { Link } from "react-router-dom";
import UserProfile from "../Components/userProfile";
const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const [detail, setDetail] = useState();
  const [tab, setTab] = useState("");
  useEffect(() => {
    setTab(id);
  }, [id]);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/user/${user?.user._id}`)
      .then((res) => setDetail(res?.data))
      .catch((err) => console.log(err));
  }, [user._id]);
  return (
    <>
      <div className="profile_page_wrapper">
        <div className="container py-5 ">
          <h5 className="mb-0">Account</h5>
          <p className="fs-14">{detail?.name}</p>
          <div className="border_bottom"></div>
          <div className="row">
            <div className="col-md-2 ">
              <div className="border_right">
                <div className="px-2">
                  <Link to={`/profile/${tab}`} style={{ color: "black" }}>
                    <p
                      className={`mb-0 py-3  ${
                        tab == 1 ? "text-danger" : "text-black"
                      }`}
                      style={{}}
                      onClick={() => setTab(1)}
                    >
                      {" "}
                      Overview
                    </p>
                  </Link>

                  <div className="border_bottom "></div>
                  <Link to={`/profile/${tab}`} style={{ color: "black" }}>
                    <p
                      className={`mb-0 py-3 ${
                        tab == 7 ? "text-danger" : "text-black"
                      }`}
                      onClick={() => setTab(7)}
                    >
                      {" "}
                      Profile
                    </p>
                  </Link>

                  <div className="border_bottom "></div>
                  <Link to={`/profile/${tab}`} style={{ color: "black" }}>
                    <p
                      className={`mb-0 py-3 ${
                        tab == 2 ? "text-danger" : "text-black"
                      }`}
                      onClick={() => setTab(2)}
                    >
                      {" "}
                      Orders
                    </p>
                  </Link>

                  <div className="border_bottom "></div>
                  <Link to={`/profile/${tab}`} style={{ color: "black" }}>
                    <p
                      className={`mb-0 py-3 ${
                        tab == 6 ? "text-danger" : "text-black"
                      }`}
                      onClick={() => setTab(6)}
                    >
                      {" "}
                      Wishlist
                    </p>
                  </Link>

                  <div className="border_bottom "></div>
                  <Link to={`/profile/${tab}`} style={{ color: "black" }}>
                    <p
                      className={`mb-0 py-3 ${
                        tab == 3 ? "text-danger" : "text-black"
                      }`}
                      onClick={() => setTab(3)}
                    >
                      {" "}
                      Cart
                    </p>
                  </Link>

                  <div className="border_bottom "></div>
                  <Link to={`/profile/${tab}`} style={{ color: "black" }}>
                    <p
                      className={`mb-0 py-3 ${
                        tab == 4 ? "text-danger" : "text-black"
                      }`}
                      onClick={() => setTab(4)}
                    >
                      {" "}
                      Coupons
                    </p>
                  </Link>

                  <div className="border_bottom "></div>
                  <Link to={`/profile/${tab}`} style={{ color: "black" }}>
                    <p
                      className={`mb-0 py-3 ${
                        tab == 5 ? "text-danger" : "text-black"
                      }`}
                      onClick={() => setTab(5)}
                    >
                      {" "}
                      Address
                    </p>
                  </Link>

                  <div className="border_bottom "></div>
                </div>
              </div>
            </div>
            <div className="col-md-10">
              {tab == 1 && <Dashbaord tab={tab} setTab={setTab} />}
              {tab == 2 && <Order tab={tab} setTab={setTab} />}
              {tab == 3 && <Cart tab={tab} setTab={setTab} />}
              {tab == 4 && <Offer />}
              {tab == 5 && <Address />}
              {tab == 6 && <Wishlist />}
              {tab == 7 && <UserProfile />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
