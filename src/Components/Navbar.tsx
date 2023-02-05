import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { FavoriteContext } from "../Context/FavoriteContext";
import { FavoriteType } from "../Context/FavoriteContext";
import { CartType } from "../Context/CartContext";
interface props {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ isAuth, setIsAuth }: props) {
  const [name, setName] = useState<string>("");
  const { favoriteList, setFavoriteList } = useContext(
    FavoriteContext
  ) as FavoriteType;
  const { cart, setCart, sum } = useContext(CartContext) as CartType;
  const [user] = useAuthState(auth);

  let navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth).then(() => {
      navigate("/Login");
      localStorage.clear();
      setIsAuth(false);
      // props.setSearch(true)
      setCart([]);
      setFavoriteList([]);
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName === null && user.email !== null) {
          const email = user.email.substring(0, user.email.indexOf("@"));
          const makeTheName = email.charAt(0).toUpperCase() + email.slice(1);
          setName(makeTheName);
        }
        setName("there");
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, [setIsAuth]);

  //React.useEffect(() => {
  // const getInfo = async () => {
  //const  data = await getDocs(database)
  //setUsersName(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
  //}
  //getInfo()
  //}, [])
  //React.useEffect(() => {
  //auth.onAuthStateChanged((user) => {
  //if (user) {
  //setUserName(user.displayName)
  //}else {
  //  setUserName("")
  // }
  //})
  //},)

  //const hideSearch = () => {
  //props.setSearch(true)
  //}
  return (
    <div className="navFlex">
      <div className="nav">
        <div className="search">
          <Link to="/" className="titleNav">
            <h1 className="shopTitle">Mirna's Shop</h1>
          </Link>
          <div className="toCategory">
            <Link to="/Category" className="toCart">
              <FaSearch className="fa-search" />
              Category
            </Link>
          </div>
          <div className="cart">
            <div className="heart">
              {favoriteList.length !== 0 ? (
                <div className="controlFav">
                  <p className="favNumbers">{favoriteList.length}</p>
                  <Link to="/Fav">
                    <FaHeart style={{ color: "red", fontSize: "30px" }} />
                  </Link>
                </div>
              ) : (
                <Link to="/Fav">
                  <FaRegHeart style={{ color: "red", fontSize: "30px" }} />
                </Link>
              )}
            </div>

            <div className="cartNumber">
              <Link className="my" to="/Cart">
                {cart.length !== 0 && <h1 className="number">{sum}</h1>}
                <h1 className="img">🛒</h1>
              </Link>
            </div>

            {!isAuth ? (
              <>
                <Link className="nextToCART" to="/Login">
                  LOGIN
                </Link>
              </>
            ) : (
              <>
                <div className="user-logOut">
                  <h1 className="user">
                    <AiOutlineUserAdd className="hiUser" /> Hi,
                    {user?.displayName ? user.displayName : name}
                  </h1>
                  <Link className="userOrders" to="/MyOrder">
                    myOrders
                  </Link>
                  <div className="googleProfile">
                    <img
                      alt="YourProfile"
                      className="photoURL"
                      src={user?.photoURL || "www.default.imageurl"}
                    />
                  </div>

                  <div className="btn-out">
                    <button className="btn-logOut" onClick={handleLogout}>
                      Log Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
