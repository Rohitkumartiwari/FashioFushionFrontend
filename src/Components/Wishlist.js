import React, { useEffect, useState } from "react";
import { useCartContext } from "../MyContext";
import img1 from "../images/wishlist2.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { MdCancel } from "react-icons/md";
const Wishlist = () => {
  const [carts, setCarts] = useState([]);
  const [dbWishList, setDbWishList] = useState([]);
  const [cartDepend, setCartDepend] = useState(false);
  const [isCartDelete, setIsCartDelete] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const {
    
    update,setUpdate
  } = useCartContext();
  const location = useLocation();
  useEffect(() => {
    fetch(`http://localhost:4000/cart-list/${user?._id}`)
      .then((res) => res.json())
      .then((data) => setCarts(data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/wishlistData/${user?._id}`)
      .then((res) => setDbWishList(res?.data))
      .catch((err) => {
        console.log(err);
      });
  }, [cartDepend]);

  const addToCart = (cartData) => {
    console.log(cartData, "cartData");
    const isItemPresent = (carts ? carts : []).some(
      (item) => item?.items?._id === cartData?._id
    );
    if (!isItemPresent) {
      cartData = { ...cartData, quantity: 1 };

      axios
        .post("http://localhost:4000/cart", {
          userId: user?._id,
          items: cartData,
        })
        .then((res) => {
          setCartDepend(!cartDepend);
          setUpdate(!update)
          axios
            .delete(
              `http://localhost:4000/wishlist-delete/${cartData?.productId}/${user?._id}`
            )
            .then((res) => setIsCartDelete(!isCartDelete))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };
  const deleteWishlist = (cartData) => {
    axios
      .delete(
        `http://localhost:4000/wishlist-delete/${cartData?.productId}/${user?._id}`
      )
      .then((res) =>
      {
        setDbWishList(dbWishList?.filter((item) => item?._id !== cartData?._id));
        setUpdate(!update)
      }
      
      )
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="p-2">
        <div className="row ">
          {dbWishList?.length > 0 ? (
            dbWishList?.map((item) => {
              return (
                <div className="col-md-4 my-3" key={item?.id}>
                  <div className="shop_by_cate_cardd cursor-pointer d-flex flex-column justify-content-center ">
                    <img src={item?.image} width={100} height={100} />
                    <Link
                      to={`/category/${item?.category}/${item?.id}`}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      <p className="py-3 ">{item?.title}</p>
                    </Link>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-0"> $ {item?.price} </p>

                      {dbWishList?.some((data) => data?.id == item?.id) && (
                        <button
                          className="add_to_cart"
                          onClick={() => addToCart(item)}
                        >
                          Move To Bag
                        </button>
                      )}
                    </div>
                    {/* {location.pathname === "/wishlist" && (
                    
                  )} */}
                    <div
                      className="wishlist_cancel_btn"
                      onClick={() => deleteWishlist(item)}
                    >
                      <MdCancel size={24} />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <div className="d-flex justify-content-center flex-column align-items-center">
                <img src={img1} width={250} height={199} />
                <p className="my-2">
                  Add items that you like to your wishlist. Review <br />
                  them anytime and easily move them to the bag.
                </p>
                <Link to="/">
                  <button className="add_to_cart">Continue Shopping</button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
