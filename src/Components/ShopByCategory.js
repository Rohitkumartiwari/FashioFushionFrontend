import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useCartContext } from "../MyContext";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
const CustomButtonGroup = ({ next, previous, ...rest }) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <div
      className={`btn_wrapper d-flex align-items-center justify-content-between`}
    >
      <button
        className={currentSlide === 0 ? ` disable arrow_btn ` : "arrow_btn"}
        onClick={() => previous()}
      >
        <BsArrowLeft />
      </button>
      <button className="arrow_btn" onClick={() => next()}>
        <BsArrowRight />
      </button>
    </div>
  );
};
const ShopByCategory = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [detail, setDetail] = useState({});
  const [checkDbList, setCheckDbList] = useState();
  const [refetch, setRefetch] = useState(false);
  const [data, setData] = useState();
  const {
    // carts,
    // setCarts,
    search,
    setSearch,
    showCard,
    setShowCard,
    wishlist,
    setWishList,
    // dbWishList,
    // setDbWishList,
  } = useCartContext();
  const { category, _id } = useParams();
  const [loading, setLoading] = useState(false);
  const [dbWishList, setDbWishList] = useState([]);
  const [cartDepend, setCartDepend] = useState(false);
  const [carts, setCarts] = useState([]);
  const productDetail = async (req, res) => {
    try {
      setLoading(false);
      const data = await fetch(
        `http://localhost:4000/productDetails/${category}/${_id}`
      );
      const data1 = await data.json();
      setLoading(true);
      setDetail(data1);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetch(`http://localhost:4000/cart-list/${user?._id}`)
      .then((res) => res.json())
      .then((data) => setCarts(data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    productDetail();
  }, [_id]);

  const addToCart = (cartData) => {
    const isItemPresent = (carts ? carts : []).some(
      (item) => item?.items?._id === cartData?._id
    );
    if (isItemPresent) {
      axios
        .post("http://localhost:4000/cart", user?._id, cartData)
        .then((res) => setCartDepend(!cartDepend))
        .catch((err) => console.log(err));
    } else {
      // const updatedCart = [...carts, { ...cartData, quantity: 1 }];
      cartData = { ...cartData, quantity: 1 };
      // setCarts(cartData);
      axios
        .post("http://localhost:4000/cart", {
          userId: user?._id,
          items: cartData,
        })
        .then((res) => setCartDepend(!cartDepend))
        .catch((err) => console.log(err));
    }
  };
  const addWishList = (wishListId) => {
    const wishListDataWithId = { ...wishListId, userId: user?._id };

    const isPresent = dbWishList?.find(
      (item) => item?._id === wishListDataWithId?._id
    );
    console.log(wishListDataWithId, "wishListDataWithId");
    if (!isPresent) {
      axios
        .post("http://localhost:4000/wishlist", wishListDataWithId)
        .then((res) => {
          setCheckDbList(res.data);
          setRefetch(!refetch);
        })
        .catch((err) => console.log(err));
      setDbWishList((prevList) => [...prevList, wishListDataWithId]);
    }
  };
  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) =>
        setData(data?.products?.filter((item) => item?._id != _id))
      )
      .catch((err) => console.log(err));
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  useEffect(() => {
    axios
      .get(`http://localhost:4000/wishlistData/${user?._id}`)
      .then((res) => setDbWishList(res?.data))
      .catch((err) => {
        console.log(err);
      });
  }, [cartDepend]);

  return (
    <>
      {loading ? (
        <>
          <div className="container">
            <div className="row py-3">
              <div className="col-md-6 text-center d-flex align-items-center justify-content-center">
                <img src={detail?.image} height="auto" width={250} />
              </div>
              <div className="col-md-6  d-flex flex-column justify-content-center ">
                <h6 className="text-danger fw-bolder mb-2">
                  {detail?.category && detail.category.toUpperCase()}
                </h6>
                <h4 className="mb-2">{detail?.title}</h4>

                <p>{detail?.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2">
                    {/* <FaStar color="yellow" /><span> {Math.ceil(detail?.rating
                              ?.rate)}</span>  */}
                    {Array.from({
                      length: Math.ceil(detail?.rating?.rate),
                    }).map((_, index) => (
                      <div key={index}>
                        <FaStar color="yellow" />
                      </div>
                    ))}
                  </div>

                  <h5 className="text-danger fw-bolder">$ {detail?.price}</h5>
                  {dbWishList?.some(
                    (data) => data?.productId == detail?._id
                  ) ? (
                    <FaHeart size={20} className="cursor-pointer" />
                  ) : (
                    <FaRegHeart
                      onClick={() => addWishList(detail)}
                      size={20}
                      className="cursor-pointer"
                    />
                  )}
                  {carts?.some((data) => data?.items?._id == detail?._id) ? (
                    <button className="add_to_cartt cursor-pointer">
                      Added
                    </button>
                  ) : (
                    <button
                      className="add_to_cartt cursor-pointer"
                      onClick={() => addToCart(detail)}
                    >
                      Add To Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
            <h4 className="my-4">Customers also Viewed</h4>
          </div>
          <div className="row my-3 container-fluid">
            <Carousel
              responsive={responsive}
              arrows={false}
              autoPlay={true}
              autoPlaySpeed={2000}
              customTransition="transform 800ms ease-in-out"
              transitionDuration={500}
              infinite={true}
              swipeable={true}
              ssr={true}
              containerClass="pb-5"
              customButtonGroup={<CustomButtonGroup />}
            >
              {(data ? data : [])?.map((item) => {
                return (
                  <div className="shop_by_cate_card cursor-pointer d-flex flex-column justify-content-center mx-2 ">
                    <div>
                      <img src={item?.image} width={100} height={100} />
                    </div>

                    <Link
                      to={`/category/${item?.category}/${item?._id}`}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      <p className="py-3 ">{item?.title}</p>
                    </Link>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-0"> $ {item?.price} </p>
                      {dbWishList?.some(
                        (data) => data?.productId == item?.id
                      ) ? (
                        <FaHeart size={20} />
                      ) : (
                        <FaRegHeart
                          onClick={() => addWishList(item)}
                          size={20}
                        />
                      )}
                      {carts?.some((data) => data?.id == item?.id) ? (
                        <button className="add_to_cart">Added</button>
                      ) : (
                        <button
                          className="add_to_cart"
                          onClick={() => addToCart(item)}
                        >
                          Add To Cart
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>
        </>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ShopByCategory;
