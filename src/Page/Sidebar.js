import React from "react";
import { Link } from "react-router-dom";
import bannerImage from "../images/8662727.jpg";
import { RxCross2 } from "react-icons/rx";
import { useCartContext } from "../MyContext";
import { useNavigate, useLocation } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  const { carts, setCarts, search, setSearch, showCard, setShowCard } =
    useCartContext();
  const loggedOut = () => {
    localStorage.removeItem("loggedin");
    navigate("/login");
  };
  return (
    <div>
      {" "}
      <div className={`${showCard?"right-0":""} sidebarr_wrapper`}  >
        <div className="d-flex justify-content-end cursor-pointer ">
          <RxCross2 onClick={() => setShowCard(!showCard)} />
        </div>
        <div>
          <Link to="/cart" style={{ color: "black", textDecoration: "none" }}>
            <img
              src={bannerImage}
              alt="img not found"
              width={130}
              height={80}
            />
          </Link>
        </div>
        <div className="px-4">
          <a href="#" className="text-black" onClick={loggedOut}>
            Logout
          </a>
        </div>
        <div className="border_bottom"></div>
        <Link to="/cart" style={{ color: "black", textDecoration: "none" }}>
          {" "}
          <div className="px-4">Cart</div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
