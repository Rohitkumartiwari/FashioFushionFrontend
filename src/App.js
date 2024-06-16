import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Page/Login";
import Register from "./Page/Register";
import Home from "./Page/Home";
import ProtectedRoute from "./Services/ProtectedRoute";
import FAQ from "./Page/Faq";
import ShopByCategory from "./Components/ShopByCategory";
import Cart from "./Page/Cart";
import Layout from "./Components/Layout";
import Terms from "./Page/Terms";
import Offer from "./Page/Offer";
import Profile from "./Page/Profile";
import Forgotpassword from "./Page/Forgotpassword";
import ResetPassword from "./Page/ResetPassword";
import ProfileId from "./Page/ProfileId";
import WishList from "./Page/Wishlist";
import Coupon from "./Page/Coupon";
import Post from "./Page/Post";
import "./http";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<Forgotpassword />} />
          <Route
            path="/reset-password/:id/:token"
            element={<ResetPassword />}
          />
          <Route element={<Layout />}>
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/add-post" element={<Post />} />
              <Route path="/coupon" element={<Coupon />} />
              <Route path="/wishlist" element={<WishList />} />
              <Route path="/offer" element={<Offer />} />

              <Route path="/terms-and-conditions" element={<Terms />} />
              <Route path="/profile" element={<Profile />} />
              {/* <Route path="/profile/:id" element={<ProfileId />} /> */}
              <Route
                path="/category/:category/:_id"
                exact
                element={<ShopByCategory />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
