import React from 'react'

export default function myOrder(props) {
   const a =  props.orders.map(x => x.item.map((z) => z.title))
   //console.log("oreders",  props.orders)
   const array = a.map((z) => z.map((x) => x))
   //(a.map((z) => z[0].price))
   //console.log(props.orders)
   console.log(props.orders.map((x) => x.Id))

  return (
    <div className='orders'>
        <h1>All orders {props.count}</h1>
     
     {
     a.map((x, i) =>  (
            <div key={i ++}>
           <h1 className="space">{x.map((z) => z.brand)}</h1>
            <h1>{x.map((z) => z.price)}</h1>
            <br></br>
            </div>
        ))}
    </div>
  )
}
//x.map((z) => z.title