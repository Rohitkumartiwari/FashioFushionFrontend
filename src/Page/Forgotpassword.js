import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import login from "../images/login2.png"
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const[error,setError]=useState("")
  const navigate = useNavigate();
  
  const handleSubmit =(e) => {
    e.preventDefault();
      axios.post("http://localhost:4000/forgot-password", { email }).then(res => {
          if (res.data.status == 200) {
              console.log("login")
          }
      }
          ).catch(err=>console.log(err))
      
  };

  return (
    <div className="container  ">
      <ToastContainer />
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
        {/* <img src={ login} height="180" width="100%" /> */}
          <div className="login_card mt-5">
            <form onSubmit={handleSubmit}>
              
              <h4 className="text-center">Forgot Password</h4>
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
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
              {/* <div className="mb-3">
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
              </div> */}
            
             
            

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

export default ForgotPassword;
