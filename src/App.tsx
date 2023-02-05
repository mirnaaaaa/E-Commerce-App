import "./App.css";
import { ProductsContextProvider } from "./Context/ProductsContext";
import { CartContextProvider } from "./Context/CartContext";
import { IdContextProvider } from "./Context/IdContext";
import { FavoriteContextProvider } from "./Context/FavoriteContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Cart from "./Components/Cart";
import ResetPassword from "./Components/ResetPassword";
import OrderDetails from "./Components/OrderDetails";
import Shop from "./Components/Shop";
import { OrdersContextProvider } from "./Context/OrdersContext";
import React, { useState } from "react";
import Category from "./Components/Category";
import Fav from "./Components/Fav";
import Login from "./Components/Login";
import ItemDetails from "./Components/ItemDetails";
import CheckOut from "./Components/CheckOut";
import Footer from "./Components/Footer";
import SignUp from "./Components/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyOrders from "./Components/MyOrders";
import ReactSwitch from "react-switch";
import ReactLoading from "react-loading";
import { ThemeContextProvider } from "./Context/ThemeContext";
import { useContext } from "react";
import { ProductsContext } from "./Context/ProductsContext";
import { ThemeContext } from "./Context/ThemeContext";
import { ProductsType } from "./Context/ProductsContext";
import { ThemeType } from "./Context/ThemeContext";

export default function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { isLoading } = useContext(ProductsContext) as ProductsType;
  const { theme, toggleTheme } = useContext(ThemeContext) as ThemeType;

  //const filter = ourShop.filter(
  //  (item) =>
  //      item.title.toLowerCase().includes(theName.toLowerCase()) ||
  //    item.brand.toLowerCase().includes(theName.toLowerCase())
  //  );
  // const canNotFind = theName && filter.length === 0 && (
  //   <div className="can-not-find">
  ///   <h1 className="your-search">
  //   Your search {theName} didn't match any products.
  //    </h1>
  //  <li>Try something else</li>
  //  <li>Check your spelling</li>
  // </div>
  // );
  return (
    <ThemeContextProvider>
      <div className="app" id={theme}>
        <ToastContainer />
        <IdContextProvider>
          <ProductsContextProvider>
            <CartContextProvider>
              <FavoriteContextProvider>
                <OrdersContextProvider>
                  <Router>
                    <div className="mode">
                      <Navbar setIsAuth={setIsAuth} isAuth={isAuth} />
                      <div className="modeFloat">
                        <ReactSwitch
                          onChange={toggleTheme}
                          checked={theme === "dark"}
                        />
                      </div>
                    </div>
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
                          <Route
                            path="/ItemDetails/:id"
                            element={<ItemDetails />}
                          />
                          <Route path="/Cart" element={<Cart />} />
                          <Route path="/CheckOut" element={<CheckOut />} />
                          <Route path="/MyOrder" element={<MyOrders />} />
                          <Route
                            path="/OrderDetails/:Id"
                            element={<OrderDetails />}
                          />
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
                          <Route path="/Category" element={<Category />} />
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
    </ThemeContextProvider>
  );
}
