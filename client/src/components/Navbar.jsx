import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import Result from '../pages/Result'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
    
    const {user, setShowLogin, logout, credit} = useContext(AppContext);

    const navigate = useNavigate();

  return (
    <div className='flex justify-between items-center py-0.5'>
        <Link to={'/'}>
        <img src={assets.logo_2} alt="" className='w-25 sm:w-30'/>
        
        </Link>
        
    <div>
        {user ? 
            <div className='flex items-center gap-2 sm:gap-3'>
                <button onClick={()=>navigate('/buy')} className='flex items-center gap-2 bg-gray-800 px-4 py-2 sm:px-6 sm:py-3 cursor-pointer rounded-full hover:scale-105 transition-all duration-700'>
                    <img src={assets.coin_star} alt="" 
                    className='w-5'/>
                    <p className='text-xs sm:text-sm text-gray-300'>Credits left: {credit}</p>
                </button>
                <p className='text-gray-100 max-sm:hidden pl-4'>Hi, {user.name}</p>
                <div className='relative group'>
                    <img src={assets.user_icon} alt="" className='w-10 drop-shadow-md' />
                    <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-white rounded-2xl pt-12'>
                        <ul className='list-none m-0 p-0 rounded-md border text-sm'>
                            <li onClick={logout} 
                            className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
                        </ul>   

                    </div>
                </div>
            </div>
        : 
            <div className='flex items-center gap-4 sm:gap-5'>
                <p onClick={()=>navigate('/buy')} className='cursor-pointer'>Pricing</p>

                <button onClick={()=>setShowLogin(true)} className='bg-teal-800 text-white px-8 sm:px-10 py-2  cursor-pointer rounded-full hover:bg-gradient-to-r hover:from-violet-800 hover:to-teal-600' >Login</button>
            </div>
        }
        <div></div>
        <div></div>
    </div>

    </div>
  )
}

export default Navbar