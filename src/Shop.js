import React from 'react'

export default function (props) {
  return (
    <div className='center'>
      <div className="noItemsInSearch">
      {props.canNotFind}
      </div>
    
    <div className="theShop">  
     {props.product}
    </div>
    </div> 
  )
}
