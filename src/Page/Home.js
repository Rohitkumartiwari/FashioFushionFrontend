import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img2 from "../images/portrait-fashionable-woman-oversized-sweater-removebg-preview.png";
import { useCartContext } from "../MyContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import ReactPaginate from "react-paginate";
const Home = () => {
  const [data, setData] = useState();
  const {
    carts,
    setCarts,
    search,
    setSearch,
    dbWishList,
    setDbWishList,
    update,setUpdate
  } = useCartContext();
  const user = JSON.parse(localStorage.getItem("user"));
  const [category, setCategoryType] = useState("");
  const [allData, setAllData] = useState(1);
  const [refetch, setRefetch] = useState(false);
  const [categoriTypeData, setCategoryTypeData] = useState();
  const [categori, setCategory] = useState("");
  const [detail, setDetail] = useState();

  const [cartDepend, setCartDepend] = useState(false);
  const [checkDbList, setCheckDbList] = useState();
  const [totalPages, setTotalPages] = useState(2);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [getCompleteData, setCompleteData] = useState();
  const fetchProductCategory = async () => {
    try {
      const data = await fetch("https://fakestoreapi.com/products/categories");
      const data1 = await data.json();
      setCategory(data1);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:4000/user/${user?._id}`)
      .then((res) => setDetail(res?.data))
      .catch((err) => console.log(err));
  }, [user?._id]);
  useEffect(() => {
    fetchProductCategory();
  }, []);

  useEffect(() => {
    fetch(`http://localhost:4000/cart-list/${user?._id}`)
      .then((res) => res.json())
      .then((data) => setCarts(data))
      .catch((err) => console.log(err));
  }, [cartDepend]);
  const fetchProductList = () => {
    fetch(
      `http://localhost:4000/products?category=${category}&search=${search}&limit=${limit}&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data?.products);
        setCompleteData(data?.totalPages);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchProductList();
  }, [category, search, limit, page]);

  const addToCart = (cartData) => {
    console.log(cartData, "data");
    const isItemPresent = (carts ? carts : []).some(
      (item) => item?.items?._id === cartData?._id
    );
    if (isItemPresent) {
      axios
        .post("http://localhost:4000/cart", user?._id, cartData)
        .then((res) => {setCartDepend(!cartDepend);setUpdate(!update)})
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
        .then((res) => {setCartDepend(!cartDepend);setUpdate(!update)})
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:4000/wishlistData/${user?._id}`)
      .then((res) => {setDbWishList(res?.data);setUpdate(!update)})
      .catch((err) => {
        console.log(err);
      });
  }, [refetch]);

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
    const filterData = data?.filter((item) =>
      item?.title.toLowerCase().includes(search.toLowerCase())
    );
    {
      allData == 1 ? setData(filterData) : setCategoryTypeData(filterData);
    }
  }, [search]);
  const handlePageChange = (selectedPage) => {
    setPage(selectedPage.selected + 1);
  };
  const fetchProductListt = () => {
    // Construct the API URL without the category parameter
    const apiUrl = `http://localhost:4000/products?search=${search}&limit=${limit}&page=${page}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setData(data?.products);
        setCompleteData(data?.totalPages);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="home_wrapper ">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex  flex-column justify-content-center align-items-center">
              <h6>New Arrivals Only</h6>
              <h2 className="fw-bolder">THE COOLEST</h2>
              <h2 className="fw-bolder">STYLES ARE</h2>
              <h2 className="fw-bolder">HERE</h2>
            </div>
            <div className="col-md-6 text-center">
              <img src={img2} height="auto" width={250} />
            </div>
          </div>
        </div>
      </div>
      <div className="container bg-gray">
        <div className="d-flex justify-content-between my-5 flex-column flex-md-row ">
          <h4 className="fw-bolder ">Shop By Category</h4>
          <div className="d-flex justify-content-center gap-3">
            {categori &&
              Array.isArray(categori) &&
              categori.map((item) => (
                <button
                  key={item}
                  className="category_btn"
                  onClick={() => {
                    setCategoryType(item);
                    // setAllData(2);
                  }}
                >
                  {item}
                </button>
              ))}
            <button
              className="category_btn"
              onClick={() => setCategoryType("")}
            >
              All
            </button>
          </div>
        </div>

        <div className="row ">
          {data?.map((item) => {
            return (
              <div className="col-md-3 my-3" key={item?.id}>
                <div className="shop_by_cate_card cursor-pointer d-flex flex-column justify-content-center ">
                  <img src={item?.image} width={100} height={100} />
                  <Link
                    to={`/category/${item?.category}/${item?._id}`}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <p className="py-3 ">{item?.title}</p>
                  </Link>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0"> $ {item?.price} </p>

                    {dbWishList?.some(
                      (data) => data?.productId == item?._id
                    ) ? (
                      <FaHeart size={20} className="cursor-pointer" />
                    ) : (
                      <FaRegHeart
                        onClick={() => addWishList(item)}
                        size={20}
                        className="cursor-pointer"
                      />
                    )}
                    {carts && Array.isArray(carts) && carts.some((data) => data?.items?._id == item?._id) ? (
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
              </div>
            );
          })}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          previousLabel="< previous"
          pageCount={getCompleteData}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          forcePage={page - 1}
          className="d-flex align-items-center pagination"
          // containerClassName="pagination"
          activeClassName="active"
          pageClassName="in-active"
        />

        <div className="welcome_cart my-3 px-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center ">
            <div className="d-flex align-items-center gap-3">
              <div>
                <h4 className="fw-bolder"> Welcome to FashionCart</h4>
                <p>
                  {" "}
                  Download the app get free food &{" "}
                  <span className="text-success">$30</span> off on your first
                  order.
                </p>
              </div>
            </div>
            <div>
              <div className="download_app_btn">Download FashionCart App</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
