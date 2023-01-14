import { FaHeart, FaRegHeart } from 'react-icons/fa'
import React from 'react'
import { doc, deleteDoc, collection, updateDoc, addDoc, getDocs, query } from 'firebase/firestore'
import { db} from "./firebaseConfig"
import { Link } from 'react-router-dom'


export default function Cart(props) {
const [shipping, setShipping] = React.useState(50)

  const handleRemove = (id) => {
//const quantity = props.cart.find(x => x.id === id.id).quantity

 if(id.quantity === 1 ) {
  const docRef = doc(db,`usersDetails/${props.userId}/cartItems/${id.ID}`);
   deleteDoc(docRef)
  //const filter = props.cart.filter((x) => x !== id)
  //props.setCart(filter)
  //const add = props.ourShop.map((x) => 
  //x.id === id.id ? {...x} : x
  //)
  //props.setOurShop(add)
} else {
//  const toAdd = props.cart.map((x) =>
 // x.id === id.id ? {...x, quantity: x.quantity - 1} : x)
  //props.setCart(toAdd)
  const docRef = doc(db,`usersDetails/${props.userId}/cartItems/${id.ID}`);
  const theNew = {quantity: id.quantity - 1}
updateDoc(docRef, theNew)
}
}
  const removeAll = async() => {
   const docRef = collection(db,`usersDetails/${props.userId}/cartItems`);
   const q = query(docRef);
   const querySnapshot = await getDocs(q);
   querySnapshot.forEach((doc) => {
    deleteDoc(doc.ref);
  });
   }

  React.useEffect(() => {
   if(props.cart) {
    let sum = 0
    props.cart.map((x) => {
      sum += ((x.quantity * (x.price * x.discountPercentage) / 100) + shipping)
    
    })

    props.setTotal(sum.toFixed(2))
   }
  },[props.cart])
  
  const fav = (item) => {
    //const changeFav = props.cart.map(x =>{
     //return x.id === item.id ? {...x, isFav: !x.isFav} :  {...x, isFav: x.isFav}
    //} )
     
    const changeFavShop = props.ourShop.map(x =>{
      return x.id === item.id ? {...x, isFav: !x.isFav} :  {...x, isFav: x.isFav}
     } )
     props.setOurShop(changeFavShop)
   // props.setCart(changeFav)
       const favItems = collection(db, "usersDetails" , props.userId, "FavoriteList");
      addDoc(favItems, {
       ...item,
       isFav: !item.isFav
     }, {marge: true});
     const docRef = doc(db,`usersDetails/${props.userId}/cartItems/${item.ID}`);
     updateDoc(docRef, {
        isFav: !item.isFav
      })

      // props.setFavIcon([...props.favIcon])
    //else  {
   
      // props.setFavIcon([...props.favIcon,{ ...item,isFav: !item.isFav}]) 
   // }
   }

   const handleAdd = (item) => {
    const increaseItem = doc(db,`usersDetails/${props.userId}/cartItems/${item.ID}`);
    updateDoc(increaseItem, {
      quantity: item.quantity + 1
    })

   }
   const removeFromFav = (item) => {
    //let task = props.favIcon.filter(x => x.id !== item.id)
    //const docRef = doc(db,`cart/${props.userId}/FavoriteList/${item.ID}`);
    //console.log(docRef)
    //deleteDoc(docRef)
    const cartFav = doc(db,`usersDetails/${props.userId}/cartItems/${item.ID}`);
    updateDoc(cartFav, {
       isFav: !item.isFav
     })
     const inFav =  props.favIcon.find((x) => x.id === item.id ?  x.ID : "")
     if(inFav) {
       const docRef = doc(db,`usersDetails/${props.userId}/FavoriteList/${inFav.ID}`);
       deleteDoc(docRef)
     }
  
    //const changeFav =props.cart.map(x =>{
      //return x.id === item.id ? {...x, isFav: !x.isFav} :  {...x, isFav: x.isFav}
     //} )
     const changeFavShop = props.ourShop.map(x =>{
      return x.id === item.id ? {...x, isFav: !x.isFav} :  {...x, isFav: x.isFav}
     } )
     props.setOurShop(changeFavShop)
     //props.setCart(changeFav)
     //props.setFavIcon(task)
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
   onClick={() => handleAdd(item)} >+</button>
  </div>
    </div>
    </div>
  ))}

  </div>
 
   </div>
   {props.cart.length !==0  && (<div className="del"> 
    <button className="removeAll" 
   onClick={removeAll} >
    Remove All</button>
    <div className="totalCost">
    <h2 className="shipping">shipping: ${shipping}</h2>
    <h2 className="total">total price: ${props.total}</h2>
    
    <div className="check" >
    <Link to="/CheckOut">
  <button className="letsCheck"> 
    CHECKOUT({props.sum})</button> </Link>
</div>
</div>
      </div>) }
 </div>
  )
}