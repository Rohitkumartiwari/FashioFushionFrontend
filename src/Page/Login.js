import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCartContext } from "../MyContext";
import "react-toastify/dist/ReactToastify.css";
// import login from "../images/login2.png"
const Login = () => {
  const { user, setUser } = useCartContext();
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        
        localStorage.setItem("loggedin", true);
        localStorage.setItem("user", JSON.stringify(res?.data?.user));
        setUser(res?.data?.user);
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data.errors?.[0]?.message);
    }
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    const user1 = localStorage.getItem("loggedin");
    if (user && user1) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div className="container  ">
      <ToastContainer />
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
          {/* <img src={ login} height="180" width="100%" /> */}
          <div className="login_card mt-5">
            <form onSubmit={handleSubmit}>
              <h4 className="text-center">LOGIN</h4>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="email"
                  value={data?.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  value={data?.password}
                  onChange={handleChange}
                />
              </div>

              <Link
                to={"/register"}
                style={{ color: "black", fontWeight: "bolder" }}
              >
                <p>Create New Account?</p>
              </Link>
              <Link to={"/forgot-password"}>
                <p>Forget Password?</p>
              </Link>

              <button type="submit" className="btn btn-danger w-100 py-2">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
