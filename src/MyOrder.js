import React from 'react'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from './firebaseConfig'
export default function MyOrder(props) {
  const [orderdetails, setOrderDetails] = React.useState([])
  const [showOrder, setShowOrder] = React.useState(false)

 //  console.log(props.orders.map((a) => a.Id))
 
const showOrderDetails =(Id) => {
const ID = props.orders.map((a) => a.Id === Id.Id)
if (ID) {
  setOrderDetails({...Id})
  setShowOrder(true)
}

}
const cancelOrder = (Id) => {
  const docRef = doc(db,`usersDetails/${props.userId}/Orders/${Id}`);
  deleteDoc(docRef)
  setShowOrder(false)
}

  return (
    <div className='orders'>
        <h1 className='allOrders'>All orders {props.count}</h1>
    
     {!showOrder &&
     props.orders.map((x, i) =>  (
            <div
            onClick={() => showOrderDetails(x)}
            className='orders-container' key={i}>
              <div className='nameAndAddress'>
              <h1 className="FirstName">Name: {x.shippingDetails.FirstName} {x.shippingDetails.LastName}</h1>
           </div>
           <h1 className="space">Items: ({x.totalItems})</h1>
           <h1 className="space">Cash: ${x.cash}</h1>
           <h1 className='date'>{x.time.toDate().toString()}</h1>
            <br  />
            </div>
        ))}
        {showOrder && 
        <div className='showOrders'>
          {orderdetails.item.map((item) => (
          <div key={item.id} className="orders-container">
          <img className="picture" src={item.images[2]} />
           <div className="favorite">
           <h1 className="product-name">Name: 
           {item.title}</h1>            
            </div>  
            <div className="removeId">
    <h2 className="havingItems"> ({item.quantity}) of this item </h2>
    </div> 
    <h3 className="dollar">Price: ${item.quantity > 1 ?  (((item.price * item.quantity) * item.discountPercentage) / 100 ).toFixed(2) : (( item.price * item.discountPercentage) / 100).toFixed(2)}</h3>
            </div>
          
          ))}
             <div className='detailsS'>
            <h1 className='shownAMES'>Order Details</h1>
           <div className='nexttO'>
           <h1 className='nextTo-last'>FirstName: {orderdetails.shippingDetails.FirstName}</h1>
            <h1 className='nextTo-first'>LastName: {orderdetails.shippingDetails.LastName}</h1>
           </div>
            
            <h1>Mobile: {orderdetails.shippingDetails.Mobile}</h1>
            <h1>Address: {orderdetails.shippingDetails.Address}</h1>
          <h1>Total Order: ${orderdetails.cash}</h1>
         
        </div>
        <div className='handle-btns'>
        <div className='div-cancel'>
        <button className='cancelOrder'
         onClick={() => cancelOrder(orderdetails.Id)}>
          Cancel order</button>
        </div>
        <div className='div-back'>
        <button className='cancelOrder'
           onClick={() => setShowOrder(false)}>
            Back</button>
        </div>
        </div>
       
        </div>
    }
    
    </div>
  )
}
//x.map((z) => z.title