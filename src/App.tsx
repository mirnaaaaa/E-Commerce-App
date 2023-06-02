import "./App.css";
import { ProductsContextProvider } from "./Context/ProductsContext";
import { CartContextProvider } from "./Context/CartContext";
import { IdContextProvider } from "./Context/IdContext";
import { FavoriteContextProvider } from "./Context/FavoriteContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Cart from "./Components/Cart";
import ResetPassword from "./Components/ResetPassword";
import Shop from "./Components/Shop";
import { OrdersContextProvider } from "./Context/OrdersContext";
import React, { useState } from "react";
import Fav from "./Components/Fav";
import Login from "./Components/Login";
import CheckOut from "./Components/CheckOut";
import Footer from "./Components/Footer";
import SignUp from "./Components/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyOrders from "./Components/MyOrders";
import ReactLoading from "react-loading";
import { useContext } from "react";
import { ProductsContext } from "./Context/ProductsContext";
import { ProductsType } from "./Context/ProductsContext";

export default function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { isLoading } = useContext(ProductsContext) as ProductsType;

  return (
    <div className="">
      <ToastContainer />
      <IdContextProvider>
        <ProductsContextProvider>
          <CartContextProvider>
            <FavoriteContextProvider>
              <OrdersContextProvider>
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
                        <Route
                          path="/ResetPassword"
                          element={<ResetPassword />}
                        />
                      </Routes>

                      <Footer />
                    </>
                  )}
                </Router>
              </OrdersContextProvider>
            </FavoriteContextProvider>
          </CartContextProvider>
        </ProductsContextProvider>
      </IdContextProvider>
    </div>
  );
}
