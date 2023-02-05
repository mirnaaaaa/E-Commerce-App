import React from 'react'

export default function Footer() {
    const date = new Date();
    const year = date.getFullYear();
    
  return (
    <div className='footerContacts'>
        <p className='footerWords'>
            @copy;{year} All Rights Reserved.
        </p>
    </div>
  )
}
