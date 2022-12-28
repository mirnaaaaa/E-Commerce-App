
import React from 'react'
import { FaHeart, FaRegHeart} from 'react-icons/fa';
import {AiOutlineStar, AiTwotoneStar} from "react-icons/ai"
export default function ItemDetails(props) {
  const [currentNumber, setCurrentNumber] = React.useState()
    return (
      <div className='try'>
       
        <div className='detailsContainer'>
       
     <div className='rows'>
     {props.products.images.map((x , index) => (
          <div className='picrures'
          key={index}  >
         <img
        className='detailsPicture'
        src={x}/> 
          </div>
         
        ))}
      </div>   
      
 <div className="containers">
           
           <div className='handleTitleWithFav'>
           <h1 className='DetailsTitle'>Name: {props.products.title}</h1>
           <div className="isFavDetails">
      {props.products.isFav ?
       <FaHeart className="heartsDetails"
       onClick={() => props.removeFromFav(props.products)}
       style={{color: 'red', fontSize: '15px'}} />
       :
      <FaRegHeart className="hearts-2Details"
       onClick={() => props.fav(props.products)}
     style={{color: 'red', fontSize: '15px'}}/>}
     </div>
           </div>
        
   <h1 className='DetailsBrand'>Brand: {props.products.brand}</h1>
   <h1 className='DetailsCategory'>category: {props.products.category}</h1>
   <h1 className='DetailsPrice'>Price: ${props.products.price}</h1>
   <h1 className='DetailsDis'>Discount: {props.products.discountPercentage}%</h1>
   <p className='Details'>Description: {props.products.description}</p>
   <h1 className='DetailsRating'>Reviews: {props.products.rating} {props.products.rating  >= 4 && props.products.rating < 4.50 && <>
    <AiTwotoneStar /> <AiTwotoneStar/>  <AiTwotoneStar/> <AiTwotoneStar/>  <AiOutlineStar /></>} 
    { props.products.rating >= 4.50 && <>
    <AiTwotoneStar /> <AiTwotoneStar/>  <AiTwotoneStar/> <AiTwotoneStar/>  <AiTwotoneStar/> </>}
    </h1>
   <h1 className='DetailsLeft'>{props.products.stock} left in the stock</h1>
  
 <div className="adds">
 <button 
  className="toCart"
   onClick={() => props.handleAdd(props.products)}>Add To Cart</button>
   
</div>
        </div>
      
  
        </div>
       
    </div>
    
   
  )
}
