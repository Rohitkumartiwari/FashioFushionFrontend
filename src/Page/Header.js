import React, { useState, useEffect, useContext } from "react";
import bannerImage from "../images/8662727.jpg";
import { FaSearch, FaRegHeart, FaRegUser, FaChevronDown } from "react-icons/fa";
import { CgShoppingBag } from "react-icons/cg";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCartContext } from "../MyContext";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const {
    // setCarts,
    // carts,
    search,
    setSearch,
    showCard,
    setShowCard,
    wishlist,
    setWishList,
    dbWishList,
    setDbWishList,
  } = useCartContext();

  const { pathname } = useLocation();
  const [carts, setCarts] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/cart-list/${user?._id}`)
      .then((res) => res.json())
      .then((data) => setCarts(data))
      .catch((err) => console.log(err));
  }, []);
  const loggedOut = () => {
    localStorage.removeItem("loggedin");
    navigate("/login");
  };
  useEffect(() => {
    axios
      .get(`http://localhost:4000/wishlistData/${user?._id}`)
      .then((res) => setDbWishList(res?.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="header_wrapper">
        <div className="container py-2 ">
          <div
            className={`row ${
              pathname == "/cart" ? "justify-content-between " : null
            }justify-content-center align-items-center text-center text-md-start  header_wrapper_media`}
          >
            <div className="col-md-2 ">
              <Link to="/">
                <img
                  src={bannerImage}
                  alt="img not found"
                  width={130}
                  height={80}
                />
              </Link>
            </div>
            {pathname == "/cart" ? null : (
              <div className="col-md-8 section_head">
                <div className="row">
                  <div className="col-md-12">
                    <div className=" d-flex search_section">
                      <div className="col-md-11  ">
                        <input
                          type="text"
                          placeholder="Search For Products"
                          className="px-3 py-2 input_filed "
                          style={{ border: "none", outline: "none" }}
                          width="100%"
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                      <div className="col-md-1 d-flex">
                        <div className="border-left"></div>
                        <div className="d-flex justify-content-center align-items-center mx-auto">
                          <FaSearch size={16} color="gray" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="col-md-2 d-flex gap-5 justify-content-end align-items-center  ">
              {/* <FaRegHeart size={20} className="cart_section cursor-pointer" /> */}
              <div className="position-relative cursor-pointer cart_section">
                <Link to={`/wishlist`}>
                  <FaRegHeart size={20} style={{ color: "black" }} />
                </Link>
                {dbWishList?.length > 0 && (
                  <span className="cart_count ">
                    {dbWishList && dbWishList?.length}
                  </span>
                )}
              </div>
              <li className="cart_section">
                <FaRegUser size={20} className=" cursor-pointer" />
                <ul id="submenu">
                  <li className="text-black">
                    <Link to={`/profile`} style={{ color: "black" }}>Dashboard</Link>
                  </li>
                  <li className="text-black">
                    <a href="#" className="text-black" onClick={loggedOut}>
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
              <Link
                to="/cart"
                style={{ color: "black", textDecoration: "none" }}
              >
                <div className="position-relative cursor-pointer cart_section">
                  <CgShoppingBag size={20} />
                  {carts?.length > 0 && (
                    <span className="cart_count ">
                      {carts && carts?.length}
                    </span>
                  )}
                </div>
              </Link>
              <div className=" d-md-none cursor-pointer">
                <GiHamburgerMenu
                  onClick={() => setShowCard(!showCard)}
                  size={22}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
