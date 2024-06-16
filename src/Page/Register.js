import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status == 201) {
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("loggedin", true);
        navigate("/");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    const user1 = localStorage.getItem("loggedin");
    if (user && user1) {
      navigate("/");
    }
  }, []);
  return (
    <div className="container  ">
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-md-6">
          <div className="login_card">
            <form onSubmit={handleSubmit}>
              <h4 className="text-center">REGISTER</h4>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="name"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="name"
                  value={data?.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email address</label>
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
                <label className="form-label">Mobile</label>
                <input
                  type="mobile"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="mobile"
                  value={data?.mobile}
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
                to={"/login"}
                style={{ color: "black", fontWeight: "bolder" }}
              >
                <p>Already registered?</p>
              </Link>
              <button type="submit" className="btn btn-danger w-100 py-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
