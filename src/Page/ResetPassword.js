import React, { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import login from "../images/login2.png"
const ResetPassword = () => {
    const { id, token } = useParams();
    const [password, setPassword] = useState("");
  const navigate = useNavigate();
    const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:4000/reset-password/${id}/${token}`, {password})
    .then(res => {
        if(res.status === 200) {
            navigate('/login') 
        }
    }).catch(err => console.log(err))
}
  return (
    <div className="container  ">
      <ToastContainer />
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
        {/* <img src={ login} height="180" width="100%" /> */}
          <div className="login_card mt-5">
            <form onSubmit={handleSubmit}>  
              <h4 className="text-center">Update Password</h4>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>
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

export default ResetPassword;
