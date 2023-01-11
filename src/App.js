import "./App.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Top from "./Top";
import Cart from "./Cart";
import Shop from "./Shop";
import React, { createContext, useId } from "react";
import Category from "./Category";
import Fav from "./Fav";
import Login from "./Login";
import ItemDetails from "./ItemDetails";
import Footer from "./Footer";
import ResetPassword from "./ResetPassword";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  query,
  onSnapshot,
  set,
  deleteDoc
} from "firebase/firestore";
import ReactSwitch from "react-switch";

export const ThemeContext = createContext(null);

export default function App() {
  const [ourShop, setOurShop] = React.useState([]);
  const [theName, setTheName] = React.useState("");
  const [cart, setCart] = React.useState(
    //JSON.parse(localStorage.getItem("cart")) ||
     [] );
  const [favIcon, setFavIcon] = React.useState( []);
  const [categoryItems, setCategoryItems] = React.useState([]);
  const [sum, setSum] = React.useState(0);
  const [isAuth, setIsAuth] = React.useState(false);
  const [search, setSearch] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [userId, setUserId] = React.useState(null);
  const [theme, setTheme] = React.useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  React.useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        const q = data.products.map((x) => ({
          ...x,
          isFav: false
        }));
        setOurShop(q);
      });
  }, []);
  
  //React.useEffect(() => {
    //localStorage.setItem("cart", JSON.stringify(cart))
    //localStorage.setItem("favIcon", JSON.stringify(favIcon));
 // }, [cart, favIcon]);

  React.useEffect(() => {
    if (cart) {
      let sum = 0;
      cart.map((x) => {
       sum += x.quantity;
      });

      setSum(sum);
    }
  }, [cart]);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
  }, []);

  const handleAdd =  (item) => {
    if (userId === null) {
    toast.error("Please login first.")
    setTimeout(() => {
    window.location.pathname="/Login"
    }, 3000)
     } else {
     const selected = cart.find((x) => x.id === item.id);
    if (selected) {
      //const inCart =  cart.find((x) => x.id === item.id ?  x.ID : "")
      //if(inCart) {
        //const increaseItem = doc(db,`cart/${userId}/cartItems/${inCart.ID}`);
        //updateDoc(increaseItem, {
          //quantity: item.quantity + 1
        //}) 
     // }
      alert("You already added this product.")
     // const toAdd = cart.map((x) =>
      //x.id === item.id ? {...selected, quantity: selected.quantity + 1} : x)
     // const add = ourShop.map((x) => (x.id === item.id ? { ...x } : x));
      //const addCategory = categoryItems.map((x) =>
        //x.id === item.id ? { ...x } : x
      //);
      //const addFrmDetails = setProducts((x) =>
       // x.id === item.id ? { ...x } : x
      //);
      //setCart(toAdd)
      //setOurShop(add);
      //setCategoryItems(addCategory);
    } else {
   const docRef = collection(db, "cart", userId, "cartItems");
   addDoc(docRef, {
    ...item,
    quantity: 1
  })
    }}
  };

  const openItem = (item) => {
    const add = ourShop.map((x) => x.id === item.id);
    if (add) {
      setProducts({ ...item });
    }
  };

  const getFav = () => {
    const q = query(collection(db, `cart/${userId}/FavoriteList`));
    onSnapshot(q, (snap) => {
      let array = [];
      snap.forEach((doc) => {
      array.push({ ...doc.data(), ID: doc.id});
      });
      setFavIcon(array);
    });
  }
 
const getCart = () => {
  const items = query(collection(db, `cart/${userId}/cartItems`)) 
  onSnapshot(items, (item) => {
   let array = [];
     item.forEach((doc) => {
       array.push({...doc.data(), ID: doc.id});
     })
   setCart(array)
 })   
 }   
  React.useEffect(() => {
 getCart();
 getFav();

  }, [userId]);

  const fav = async (item) => {
    //const selected = favIcon.find((x) => x.id === item.id);
    if (userId === null) {
      toast.error("Please login first.")
      setTimeout(() => {
      window.location.pathname="/Login"
      }, 3000)
       } else {
    const changeFav = ourShop.map((x) => {
      return x.id === item.id
        ? { ...x, isFav: !x.isFav }
        : { ...x, isFav: x.isFav };
    });

    //const changeFavCart = cart.map((x) => {
      //return x.id === item.id
       // ? { ...x, isFav: !x.isFav }
        //: { ...x, isFav: x.isFav };
   // });
    const changeFavDetails = categoryItems.map((x) => {
      return x.id === item.id
        ? { ...x, isFav: !x.isFav }
        : { ...x, isFav: x.isFav };
    });
    //setCart(changeFavCart);
    setCategoryItems(changeFavDetails)
    setOurShop(changeFav);
  
      const favItems = collection(db, "cart" , userId, "FavoriteList");
       addDoc(favItems, {
        ...item,
        isFav: !item.isFav
      }, {marge: true});
     // updateDoc(favItems, {
      //  isFav: !item.isFav
    //  });
     // const favItem = collection(db, "cart" , userId, "FavoriteList");

      //const update = doc(favItem, item.ID);
      //updateDoc(update, {
        //isFav: !item.isFav
     // });
      //setFavIcon([...favIcon,{ ...item, isFav: !item.isFav}])
     const inCart =  cart.find((x) => x.id === item.id ?  x.ID : "")
     if (inCart) {
      const docRef = doc(db,`cart/${userId}/cartItems/${inCart.ID}`);
      updateDoc(docRef, {
       isFav: !item.isFav  
    });
     }}
  };
  
  const removeFromFav = (item) => {
    const inFav =  favIcon.find((x) => x.id === item.id ?  x.ID : "")
    if(inFav) {
      const docRef = doc(db,`cart/${userId}/FavoriteList/${inFav.ID}`);
      deleteDoc(docRef)
    }
 
    const inCart =  cart.find((x) => x.id === item.id ?  x.ID : "")
    if (inCart) {
     const docRef = doc(db,`cart/${userId}/cartItems/${inCart.ID}`);
     updateDoc(docRef, {
      isFav: !item.isFav  
   });
    }
    // let task = favIcon.filter((x) => x.id !== item.id);
    //const changeFavCart = cart.map((x) => {
     // return x.id === item.id
       // ? { ...x, isFav: !x.isFav }
      ///  : { ...x, isFav: x.isFav };
    //});
    //setCart(changeFavCart);
    const changeFav = ourShop.map((x) => {
      return x.id === item.id
        ? { ...x, isFav: !x.isFav }
        : { ...x, isFav: x.isFav };
    });
    const changeFavDetails = categoryItems.map((x) => {
      return x.id === item.id
        ? { ...x, isFav: !x.isFav }
        : { ...x, isFav: x.isFav };
    });
    setCategoryItems(changeFavDetails)
    setOurShop(changeFav);
    //setFavIcon(task);
  };
  const filter = ourShop.filter(
    (item) =>
      item.title.toLowerCase().includes(theName.toLowerCase()) ||
      item.brand.toLowerCase().includes(theName.toLowerCase())
  );

  const product = filter.map((item) => (
    <div key={item.id} className="items">
      <Link to="/ItemDetails">
        <img
          onClick={() => openItem(item)}
          className="pic"
          src={item.images[2]}
        />
      </Link>
      <div className="favorite">
        <h1 className="product-name">
          Name:
          {item.title}
        </h1>
        <div className="isFav">
                 
            {item.isFav ? (             
            <FaHeart
              className="hearts"
              onClick={() => removeFromFav(item)}
              style={{ color: "red", fontSize: "15px" }}
            />
          ) : (
            <FaRegHeart
              className="hearts-2"
              onClick={() => fav(item)}
              style={{ color: "red", fontSize: "15px" }}
            />
          )}
  
        </div>
      </div>
      <div className="money">
        <h3 className="dollar">Price: ${item.price}</h3>
        <h3 className="off">Discount: {item.discountPercentage}%</h3>
      </div>
      <div className="add">
        <button className="toCart" onClick={() => handleAdd(item)}>
          Add To Cart
        </button>
      </div>
    </div>
  ));
  const canNotFind = theName && filter.length === 0 && (
    <div className="can-not-find">
      <h1 className="your-search">
        Your search {theName} didn't match any products.
      </h1>
      <li>Try something else</li>
      <li>Check your spelling</li>
    </div>
  );
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="app" id={theme}>
        <ToastContainer />
        <Router>
          <div className="mode">
            <Top
              setIsAuth={setIsAuth}
              products={products}
              setSearch={setSearch}
              search={search}
              isAuth={isAuth}
              sum={sum}
              favIcon={favIcon}
              theName={theName}
              setTheName={setTheName}
              cart={cart}
            />
            <div className="modeFloat">
              <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
            </div>
          </div>

          <Routes>
            <Route
              path="/"
              element={<Shop canNotFind={canNotFind} product={product} />}
            />
            <Route
              path="/Cart"
              element={
                <Cart
                  userId={userId}
                  sum={sum}
                  cart={cart}
                  setFavIcon={setFavIcon}
                  favIcon={favIcon}
                  setCart={setCart}
                  setOurShop={setOurShop}
                  ourShop={ourShop}
                />
              }
            />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route
              path="/Category"
              element={
                <Category
                  categoryItems={categoryItems}
                  setCategoryItems={setCategoryItems}
                  setFavIcon={setFavIcon}
                  favIcon={favIcon}
                  canNotFind={canNotFind}
                  product={product}
                  theName={theName}
                  removeFromFav={removeFromFav}
                  fav={fav}
                  ourShop={ourShop}
                  setOurShop={setOurShop}
                  handleAdd={handleAdd}
                  removeFromFav={removeFromFav}
                />
              }
            />
            <Route
              path="/Fav"
              element={
                <Fav
                userId={userId}
                  ourShop={ourShop}
                  setOurShop={setOurShop}
                  cart={cart}
                  setCart={setCart}
                  fav={fav}
                  favIcon={favIcon}
                  setFavIcon={setFavIcon}
                  removeFromFav={removeFromFav}
                  handleAdd={handleAdd}
                />
              }
            />
            <Route
              path="/Login"
              element={<Login setSearch={setSearch} setIsAuth={setIsAuth} />}
            />
            <Route
              path="/ItemDetails"
              element={
                <ItemDetails
                  removeFromFav={removeFromFav}
                  fav={fav}
                  handleAdd={handleAdd}
                  products={products}
                />
              }
            />
          </Routes>
          <Footer />
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}
