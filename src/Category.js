import React from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
export default function Category(props) {
 const [smartphone, setSmartphone]  = React.useState(false)
 const [fragrance, setFragrance]  = React.useState(false)
 const [skinCare, setSkinCare] = React.useState(false)
 const [groceries, setGroceries] = React.useState(false)
 const [decoration, setDecoration] = React.useState(false)
 const [laptop, setLaptop] = React.useState(false)
 
const smartPhones = (item) => {
   const newItem = props.ourShop.filter(x => {
    return x.category === item
   })
   props.setCategoryItems(newItem)
   setSmartphone(true)
}
const laptops = (item) => {
  const newItem = props.ourShop.filter(x => {
    return x.category === item
   })
    props.setCategoryItems(newItem)
  setLaptop(true)
}
const handleDecoration = (item) => {
  const newItem = props.ourShop.filter(x => {
   return x.category === item
  })
  props.setCategoryItems(newItem)
  setDecoration(true)
}
const handleGroceries = (item) => {
  const newItem = props.ourShop.filter(x => {
   return x.category === item
  })
  props.setCategoryItems(newItem)
  setGroceries(true)
}
const skincare = (item) => {
  const newItem = props.ourShop.filter(x => {
   return x.category === item
  })
  props.setCategoryItems(newItem)
  setSkinCare(true)
}

const fragrances = (item) => {
  const newItem = props.ourShop.filter(x => {
   return x.category === item
  })
  props.setCategoryItems(newItem)
  setSmartphone(false)
  setFragrance(true)
}

const filter = props.categoryItems.filter(item => 
  item.title.toLowerCase().includes(props.theName.toLowerCase())  || item.brand.toLowerCase().includes(props.theName.toLowerCase())  )
  return (
    <div className='handleWithFooter'>
    <div className='CategoryButtons'>
      <div className="laptops">
      <img className="image " src={'../images/laptops.png'} />
      <button
      className='btn-items'
      onClick={() => laptops("laptops")}>laptops</button>
      
      </div>
      <div className="mobile">
      <img className="image " src={'../images/mobiles.png'}  />
      <button 
      className='btn-items'
      onClick={() => smartPhones("smartphones")}>Smartphones</button> 
      </div>
      <div className="fraq">
      <img className="image " src={'../images/fraq.png'} />
    <button 
    className='btn-items'
    onClick={() => fragrances("fragrances")}>Fragrances</button>
      </div>
      <div className="skin">
      <img className="image " src={'../images/skinCare.png'} /> 
    <button
    className='btn-items'
    onClick={() => skincare("skincare")}>Skincare</button>
      </div>
      <div className="groceries">
      <img className="image " src={'../images/groceries.png'} />
    <button 
    className='btn-items'
    onClick={() => handleGroceries("groceries")}>Groceries</button>
      </div>
      <div className="decorate">
      <img className="image " src={'../images/decoration.png'}  />
    <button 
    className='btn-items'
    onClick={() => handleDecoration("home-decoration")}>Home-Decoration</button>  
      </div>

    </div>
{props.canNotFind}
<div className="theShop"> 
    {smartphone && filter.map((item) => (
    <div key={item.id} className="items">
    <img className="pic" src={item.images[1]} />
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
      {decoration && filter.map((item) => (
   <div key={item.id} className="items">
   <img className="pic" src={item.images[1]} />
   <div className="favorite">
   <h1 className="product-name">Name: 
   {item.title}</h1>
   <div className="isFav">
   {item.isFav ?
    <FaHeart className="hearts"
    onClick={() =>  props.removeFromFav(item)}
    style={{color: 'red', fontSize: '15px'}} />
    :
   <FaRegHeart className="hearts-2"
    onClick={() =>  props.fav(item)}
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
    {skinCare && filter.map((item) => (
    <div key={item.id} className="items">
    <img className="pic" src={item.images[1]} />
    <div className="favorite">
    <h1 className="product-name">Name: 
    {item.title}</h1>
    <div className="isFav">
    {item.isFav ?
     <FaHeart className="hearts"
     onClick={() =>  props.removeFromFav(item)}
     style={{color: 'red', fontSize: '15px'}} />
     :
    <FaRegHeart className="hearts-2"
     onClick={() =>  props.fav(item)}
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
         {groceries && filter.map((item) => (
    <div key={item.id} className="items">
    <img className="pic" src={item.images[1]} />
    <div className="favorite">
    <h1 className="product-name">Name: 
    {item.title}</h1>
    <div className="isFav">
    {item.isFav ?
     <FaHeart className="hearts"
     onClick={() =>  props.removeFromFav(item)}
     style={{color: 'red', fontSize: '15px'}} />
     :
    <FaRegHeart className="hearts-2"
     onClick={() =>  props.fav(item)}
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
    {laptop && filter.map((item) => (
    <div key={item.id} className="items">
    <img className="pic" src={item.images[1]} />
    <div className="favorite">
    <h1 className="product-name">Name: 
    {item.title}</h1>
    <div className="isFav">
    {item.isFav ?
     <FaHeart className="hearts"
     onClick={() =>  props.removeFromFav(item)}
     style={{color: 'red', fontSize: '15px'}} />
     :
    <FaRegHeart className="hearts-2"
     onClick={() =>  props.fav(item)}
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
  {fragrance && filter.map((item) => (
    <div key={item.id} className="items">
    <img className="pic" src={item.images[1]} />
    <div className="favorite">
    <h1 className="product-name">Name: 
    {item.title}</h1>
    <div className="isFav">
    {item.isFav ?
     <FaHeart className="hearts"
     onClick={() =>  props.removeFromFav(item)}
     style={{color: 'red', fontSize: '15px'}} />
     :
    <FaRegHeart className="hearts-2"
     onClick={() =>  props.fav(item)}
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
    </div>
  )
}
