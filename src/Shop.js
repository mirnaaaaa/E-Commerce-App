import React from 'react'

export default function (props) {
  return (
    <div className='center'>
       <div className='where'>
        {!props.search && props.products.length === 0 && <input  className="input"
      placeholder='Search By Name Or Brand....'
       type="text"
       name={props.theName}
       value={props.theName}
       onChange={(e) => props.setTheName(e.target.value)}
       />}
        </div>
      <div className="noItemsInSearch">
      {props.canNotFind}
      </div>
    
    <div className="theShop">  
     {props.product}
    </div>
    </div> 
  )
}
