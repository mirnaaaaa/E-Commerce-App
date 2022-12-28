import './App.css'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Top from "./Top"
import Cart from "./Cart"
import Shop from "./Shop"
import React from 'react'
import Category from"./Category"
import Fav from "./Fav"
import Login from "./Login"
import ItemDetails from "./ItemDetails"
import Footer from "./Footer"
import ResetPassword from "./ResetPassword"

export default function App() {
  const [ourShop, setOurShop] = React.useState( [])
  const [theName,  setTheName] = React.useState("")
 const [cart, setCart] =  React.useState( JSON.parse(localStorage.getItem("cart")) || [])
const[favIcon, setFavIcon] = React.useState( JSON.parse(localStorage.getItem("favIcon")) || [])
const [categoryItems, setCategoryItems]  = React.useState([])
const [sum, setSum] = React.useState(0)
const [isAuth, setIsAuth] = React.useState(false)
const [search, setSearch] = React.useState(false)
const [products, setProducts] = React.useState([])
  React.useEffect(() => {
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data =>  {   
      const q =  data.products.map(x => ({
        ...x,
        isFav : false
      }
      )) 
      setOurShop(q)
  })
},[])
React.useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart))
  localStorage.setItem("favIcon", JSON.stringify(favIcon))
}, [cart, favIcon, ourShop])  

  
  React.useEffect(() => {
    if(cart) {
     let sum = 0
    cart.map((x) => {
       sum += x.quantity 
     })
    
     setSum(sum)
    }
   },[cart])
const handleAdd = (item) => {
const selected = cart.find(x => x.id === item.id)
if(selected) {
  const toAdd = cart.map((x) =>
  x.id === item.id ? {...selected, quantity: selected.quantity + 1} : x)
  const add = ourShop.map((x) => 
  x.id === item.id ? {...x} : x
  )
  const addCategory = categoryItems.map((x) => 
  x.id === item.id ? {...x} : x
  )
  const addFrmDetails = setProducts((x) => 
  x.id === item.id ? {...x} : x
  )
  setCart(toAdd)
  setOurShop(add)
  setCategoryItems(addCategory)
}else {
  setCart([...cart,{ ...item, quantity: 1 }])
}
 }
 
const openItem = (item) => {
  const add = ourShop.map((x) => x.id === item.id  )
  if (add) {
    setProducts({...item})
  }
 
}
 const fav = (item) => {
  const selected = favIcon.find(x => x.id === item.id) 
  const changeFav = ourShop.map(x =>{
   return x.id === item.id ? {...x, isFav: !x.isFav} :  {...x, isFav: x.isFav}
  } )
  const changeFavCart = cart.map(x =>{
    return x.id === item.id ? {...x, isFav: !x.isFav} :  {...x, isFav: x.isFav}
   } )
   const changeFavDetails = setProducts(x =>{
    return x.id === item.id ? {...x, isFav: !x.isFav} :  {...x, isFav: x.isFav}
   } )
    setCart(changeFavCart)
  setOurShop(changeFav)
  if (selected) {
    setFavIcon([...favIcon])
  }else  {
    setFavIcon([...favIcon,{ ...item, isFav: !item.isFav}]) 
  }
 }
 const removeFromFav = (item) => {
  let task = favIcon.filter(x => x.id !== item.id)
  const changeFavCart = cart.map(x =>{
    return x.id === item.id ? {...x, isFav: !x.isFav} :  {...x, isFav: x.isFav}
   } )
    setCart(changeFavCart)
  const changeFav = ourShop.map(x =>{
    return x.id === item.id ? {...x, isFav: !x.isFav} :  {...x, isFav: x.isFav}
   } )
   const changeDetails = setProducts(x =>{
    return x.id === item.id ? {...x, isFav: !x.isFav} :  {...x, isFav: x.isFav}
   } )
   setOurShop(changeFav)
  setFavIcon(task)
 }
const filter = ourShop.filter(item => 
  item.title.toLowerCase().includes(theName.toLowerCase())  || item.brand.toLowerCase().includes(theName.toLowerCase()) 
  )
  
  const product =  filter.map((item) => (
    <div key={item.id} className="items">
        <Link to="/ItemDetails">
      <img 
      onClick={() => openItem(item)}
      className="pic" src={item.images[2]} /></Link>
      <div className="favorite">
      <h1 className="product-name">Name: 
      {item.title}</h1>
      <div className="isFav">
      {item.isFav ?
       <FaHeart className="hearts"
       onClick={() => removeFromFav(item)}
       style={{color: 'red', fontSize: '15px'}} />
       :
      <FaRegHeart className="hearts-2"
       onClick={() => fav(item)}
     style={{color: 'red', fontSize: '15px'}}/>}
      </div>
       </div>   
    <div className="money">
    <h3 className="dollar">Price: ${item.price}</h3>
    <h3 className="off">Discount: {item.discountPercentage}%</h3>
    </div>
    <div className="add">
     <button 
      className="toCart"
       onClick={() => handleAdd(item)}>Add To Cart</button>
       
    </div>
    </div>
    
  ))
  const canNotFind=  theName && filter.length === 0 && 
  <div className="can-not-find">
    <h1 className="your-search">Your search {theName} didn't match any products.</h1>
  <li>Try something else</li>
  <li>Check your spelling</li>
  </div>
  return (
    <div className="app">    
    <Router>
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
      <Routes>
        <Route path="/" element={<Shop
      canNotFind={canNotFind}
      product={product}/>} />
        <Route path="/Cart" element={ <Cart 
       sum={sum}
       cart={cart} 
       setFavIcon={setFavIcon}
        favIcon={favIcon}
       setCart={setCart} 
       setOurShop={setOurShop}
        ourShop={ourShop}
        handleAdd={handleAdd}
        />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/Category" element={  < Category 
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
       />} />
        <Route path="/Fav" element={  <Fav  
       ourShop={setOurShop}
       setOurShop={setOurShop}
       cart={cart}
       setCart={setCart}
          fav={fav}
       favIcon={favIcon}
       setFavIcon={setFavIcon}
       removeFromFav={removeFromFav}
       handleAdd={handleAdd}
       />} />
        <Route path="/Login" element={<Login 
  setSearch={setSearch}
  setIsAuth={setIsAuth}
       />} />
       <Route path="/ItemDetails" element={<ItemDetails 
       removeFromFav={removeFromFav}
       fav={fav}
       handleAdd={handleAdd}
       products={products}
       />}/>
      </Routes>
      
    </Router>

    </div>
  )
}

