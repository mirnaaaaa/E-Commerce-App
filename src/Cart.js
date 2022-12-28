import { FaHeart, FaRegHeart } from 'react-icons/fa'
import React from 'react'
export default function Cart(props) {
const [total, setTotal] =React.useState(0)
const [shipping, setShipping] = React.useState(50)

  const handleRemove = (id) => {
const quantity = props.cart.find(x => x.id === id.id).quantity

 if(quantity === 1 ) {
  const filter = props.cart.filter((x) => x !== id)
  props.setCart(filter)
  const add = props.ourShop.map((x) => 
  x.id === id.id ? {...x} : x
  )
  props.setOurShop(add)
} else {
  const toAdd = props.cart.map((x) =>
  x.id === id.id ? {...x, quantity: x.quantity - 1} : x)
  props.setCart(toAdd)
 }
}

  const removeAll = () => {
    props.setCart([])
   }

  React.useEffect(() => {
   if(props.cart) {
    let sum = 0
    props.cart.map((x) => {
      sum += ((x.quantity * (x.price * x.discountPercentage) / 100) + shipping)
    })
    setTotal(sum.toFixed(2))
   }
  },[props.cart])
  
  const fav = (item) => {
    const selected = props.favIcon.find(x => x.id === item.id) 
    const changeFav = props.cart.map(x =>{
     return x.id === item.id ? {...x, isFav: !x.isFav} :  {...x, isFav: x.isFav}
    } )
    const changeFavShop = props.ourShop.map(x =>{
      return x.id === item.id ? {...x, isFav: !x.isFav} :  {...x, isFav: x.isFav}
     } )
     props.setOurShop(changeFavShop)
    props.setCart(changeFav)
    if (selected) {
      props.setFavIcon([...props.favIcon])
    }else  {
      props.setFavIcon([...props.favIcon,{ ...item,isFav: !item.isFav}]) 
    }
   }
   const removeFromFav = (item) => {
    let task = props.favIcon.filter(x => x.id !== item.id)
    const changeFav =props.cart.map(x =>{
      return x.id === item.id ? {...x, isFav: !x.isFav} :  {...x, isFav: x.isFav}
     } )
     const changeFavShop = props.ourShop.map(x =>{
      return x.id === item.id ? {...x, isFav: !x.isFav} :  {...x, isFav: x.isFav}
     } )
     props.setOurShop(changeFavShop)
     props.setCart(changeFav)
     props.setFavIcon(task)
   }

  return (
    <div className="shopping-cart">
   <div >
   {props.cart.length === 0 ? <h1 className="cartEmpty"> Cart: (Empty)</h1> :  ""}
   <div className="theShop">  
    { props.cart.map((item) => 
   (
    <div key={item.id} className="items">
     <img className="pic" src={item.images[2]} />
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
    <p className="dis">{item.description}</p>
    <div className="money">
    <h3 className="oldDollar">Price: ${item.price}</h3>
    <h3>discount: {item.discountPercentage}%</h3>
    <h3 className="dollar">Total: ${item.quantity > 1 ?  (((item.price * item.quantity) * item.discountPercentage) / 100 ).toFixed(2) : (( item.price * item.discountPercentage) / 100).toFixed(2)}</h3>
    </div>

    <p className="left">{item.stock} left in the Store</p>
    <div className="removeId">
      <div className="negative">
      <button
    className="remove"
    onClick={() => handleRemove(item)} >-</button>
      </div>
    <h2 className="havingItems"> ({item.quantity}) </h2>
  <div className="positive">
  <button
   className="remove"
   onClick={() => props.handleAdd(item)} >+</button>
  </div>
    </div>
    </div>
  ))}

  </div>
 
   </div>
   {props.cart.length !==0  && (<div className="del"> 
    <button className="removeAll" 
   onClick={ removeAll} >
    Remove All</button>
    <div className="totalCost">
    <h2 className="shipping">shipping: ${shipping}</h2>
    <h2 className="total">total price: ${total}</h2>
    
    <div className="check" >
  <button className="letsCheck">
    CHECKOUT({props.sum})</button>
</div>
</div>
      </div>) }
 </div>
  )
}