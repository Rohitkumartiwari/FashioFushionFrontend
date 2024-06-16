import React, { useState } from "react";
import axios from "axios";
const Coupon = ({ onSubmit }) => {
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  const handleActiveChange = (e) => {
    setIsActive(e.target.value === "active"); // Convert 'active' to true, 'inActive' to false
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/add-coupon", {
        code,
        discount_type: discountType,
        discount_value: parseFloat(discountValue),
        is_active: isActive,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container py-3">
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>
              Coupon Code:
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </label>
          </div>
          <div className="col-md-6">
            <label>
              Discount Type:
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="percent">Percentage</option>
                <option value="fixed_amount">Fixed Amount</option>
              </select>
            </label>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md">
            <label>
              Discount Value:
              <input
                type="number"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
              />
            </label>
          </div>
          <div className="col-md-6">
            <label>
              IsActive:
              <select
                value={isActive ? "active" : "inActive"}
                onChange={handleActiveChange}
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inActive">In Active</option>
              </select>
            </label>
          </div>
        </div>

        <div className="d-flex justify-content-center my-2">
          <button type="submit">Add Coupon</button>
        </div>
      </form>
    </div>
  );
};

export default Coupon;
