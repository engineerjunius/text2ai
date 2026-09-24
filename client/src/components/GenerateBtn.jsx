import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom';

const GenerateBtn = () => {

  const navigate = useNavigate();

    // Guests can try it for free; the Result page handles the trial and sign-up prompt
    const onClickHandler = () => navigate('/result')


  return (
    <motion.div 
    initial={{opacity: 0.2, y:100}}
    transition={{duration: 1}}
    whileInView={{opacity: 1, y:0}}
    viewport={{once: true}}
    
    className='pb-16 text-center'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-bold text-white py-6'>
            See the magic. Try now
        </h1>
        <button onClick={onClickHandler} className='inline-flex items-center gap-2 px-12 py-3 bg-gray-800 m-auto cursor-pointer rounded-full hover:bg-gradient-to-br from-yellow-800 via-yellow-600 to-yellow-800 hover:scale-105 duration-700 text-white hover:shadow-yellow-700/60 transition ease-in-out'>
            Try it free
        <img src={assets.star} alt="" className='w-6' />
        </button>
    </motion.div>
  )
}

export default GenerateBtn