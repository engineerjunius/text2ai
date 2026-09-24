import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20'>
        <img src={assets.logo_2} alt="" width={100}/>

        <p className='flex-1 border-l pl-4 text-sm text-gray-200 max-sm:hidden'>Copyright © engineerjunius.dev | All rights reserved</p>

        <div className='flex gap-4'>
            <img src={assets.fb_icon} alt="" width={35} />
            <img src={assets.fb_icon} alt="" width={35} />
            <img src={assets.fb_icon} alt="" width={35} />
        </div>

    </div>
  )
}

export default Footer