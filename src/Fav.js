import React from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { Link } from "react-router-dom"

export default function Fav(props) {
  const removeAll =() => {
   //props.setCart([...props.cart, {isFave: false}])
     //const changeFav = props.ourShop.map(x =>
     //({...x, isFav: !x.isFav} )
      //)
     props.setFavIcon([])
     //props.setOurShop(changeFav)
  }
  return (
    <div >
     {props.favIcon.length === 0 && <div className="empty">
      <h1 className="favEmpty">You currently have nothing added to your favorite list.</h1>
     <div className="shopNow-space">
     <button
       className="shopNow"
     >
<Link 
     className='shopLink'
    to="/">
    Shop Now
    </Link>
     </button>
     
     </div>     
      </div> }
      <div className="theShop"> 
      {props.favIcon.map(item => (
     <div key={item.id} className="items">
     <img className="pic" src={item.images[2]} />
     <div className="favorite">
      <h1 className="product-name">Name: 
      {item.title}</h1>
      <div className="isFav">
      {item.isFav ?
       <FaHeart className="hearts"
       onClick={() => props.removeFromFav(item)}
       style={{color: 'red', fontSize: '15px'}} />
       :
       
      <FaRegHeart className="hearts-2"
       onClick={() => props.fav(item)}
     style={{color: 'red', fontSize: '15px'}}/>}
      </div>
       
       </div>        
   <p className="dis">{item.description}</p>
   <div className="money">
   <h3 className="dollar">Price: ${item.price}</h3>
   <h3 className="off">Discount: {item.discountPercentage}%</h3>
   </div>
  
  <p className="left"> {item.stock}  left in the Store</p>
   <div className="add">
    <button 
     className="toCart"
      onClick={() => props.handleAdd(item)}>Add To Cart</button>
      
   </div>
   </div>
    ))}
    </div>
   {props.favIcon.length !== 0 && 
   <>
     <div className="removeFav">
     <button className="removeFav-btn"
    onClick={removeAll}>
    Remove All
   </button>
   </div>
   </>}

 
  
    </div>
  )
}
