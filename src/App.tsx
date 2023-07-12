import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Cart from "./Components/Cart";
import ResetPassword from "./Components/ResetPassword";
import Shop from "./Components/Shop";
import React, { useEffect, useState } from "react";
import Fav from "./Components/Fav";
import Login from "./Components/Login";
import CheckOut from "./Components/CheckOut";
import Footer from "./Components/Footer";
import SignUp from "./Components/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyOrders from "./Components/MyOrders";
import ReactLoading from "react-loading";
import { totalOfCart } from "./features/Cart";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./features/Shop";

export default function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const isLoading = useSelector((state: any) => state.shop.value.isLoading);
  const cart = useSelector((state: any) => state.cart.cart);
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(totalOfCart());
  }, [cart, dispatch]);
  
  useEffect(() => {
    dispatch(getProducts());
  }, [ dispatch]);

  return (
    <div className="">
      <ToastContainer />
          <Router>
            <Navbar setIsAuth={setIsAuth} isAuth={isAuth} />
            {isLoading ? (
              <div className="div-loading">
                <ReactLoading
                  className="loading"
                  type={"spinningBubbles"}
                  color={"black"}
                  height={50}
                  width={150}
                />
              </div>
            ) : (
              <>
                <Routes>
                  <Route path="/" element={<Shop />} />
                  <Route path="/Cart" element={<Cart />} />
                  <Route path="/CheckOut" element={<CheckOut />} />
                  <Route path="/MyOrder" element={<MyOrders />} />
                  <Route path="/Fav" element={<Fav />} />
                  <Route
                    path="/Login"
                    element={<Login setIsAuth={setIsAuth} />}
                  />
                  <Route
                    path="/SignUp"
                    element={<SignUp setIsAuth={setIsAuth} />}
                  />
                  <Route path="/ResetPassword" element={<ResetPassword />} />
                </Routes>
                <Footer />
              </>
            )}
          </Router>
    </div>
  );
}
