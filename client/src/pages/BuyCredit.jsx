import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'motion/react'
import { toast } from 'react-toastify'

const BuyCredit = () => {

  const {user, setShowLogin} = useContext(AppContext)

  // No payment gateway is wired up yet; guests are prompted to sign in first
  const onPlanClick = () => {
    if (!user) {
      setShowLogin(true)
      return
    }
    toast.info('Payments are coming soon!')
  }

  return (
    <motion.div 
    initial={{opacity: 0.2, y:100}}
    transition={{duration: 1}}
    whileInView={{opacity: 1, y:0}}
    viewport={{once: true}}

    className='text-center min-h-[80vh] pt-14 mb-10'>
        <button className='border border-gray-500 px-10 py-2 rounded-full mb-6 cursor-pointer'>Our Plans</button>
        <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the plan</h1>

      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index)=>(
          <div key={index}
          className='bg-slate-500 drop-shadow-sm border rounded-lg pt-1 pb-10 px-8 text-gray-50 hover:scale-105 hover:bg-gradient-to-tl from-yellow-700 to-violet-600 transition-all duration-500'>
          <img className='w-30' src={assets.logo_2} alt=''/>
          <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
          <p className='text-sm text-gray-200'>{item.details}</p>
          <p className='mt-6'>
          <span className='text-3xl font-medium'> {item.price} </span>/ {item.credits} credits</p>
          <button onClick={onPlanClick} className='w-full bg-gray-700 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 cursor-pointer hover:border-amber-300 hover:border-2'>{user ? 'Purchase' : 'Get Started'}</button>

          </div>
        ))}
      </div>
    
    </motion.div>

    
  )
}

export default BuyCredit