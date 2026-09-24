import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { delay, motion } from "motion/react"
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Header = () => {

    const {user, setShowLogin} = useContext(AppContext);
    const navigate = useNavigate();

    const onClickHandler = () => {
        if(user){
            navigate('/result')
        }else{
            setShowLogin(true)
        }
    }


  return (
    <motion.div className='flex flex-col justify-center items-center text-center my-20'
    initial={{opacity: 0.2, y:100}}
    transition={{duration: 1}}
    whileInView={{opacity: 1, y:0}}
    viewport={{once: true}} 
    >
        <motion.div className='text-stone-100 inline-flex text-center gap-2 bg-violet-200 px-6 py-1 rounded-full border border-neutral-100'
        initial={{opacity: 0, y:-20}}
        animate={{opacity: 1, y:0}}
        transition={{delay: 0.2, duration: 0.8}}
        >
            <p className='text-sm sm:text-sm text-gray-500'>
                Best text to image generator
            </p>
            <img className='w-5' src={assets.trophy} alt="" />
        </motion.div>
        <motion.h1 className='text-4xl max-w-[300px] sm:text-6xl sm:max-w-[590px] text-stone-100 mx-auto mt-10 text-center'
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 0.4, duration: 2}}
        >
            Turn text to <span className='text-yellow-300 sm:text-7xl'>image</span>, <br />in just seconds
        </motion.h1>

        <motion.p className='text-center max-w-xl mx-auto mt-5 text-stone-200'
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y:0}}
        transition={{delay: 0.6, duration: 0.8}}
        >
           Unleash your creativity with Text2Ai. Turn your imagination into visual art in seconds - just type, and watch the magic happen. 
        </motion.p>

        <motion.button 
        onClick={onClickHandler}
        className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-3 flex items-center gap-2 rounded-full cursor-pointer'
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.95}}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{default: { duration: 0.5 }, opacity: { delay: 0.8, duration: 1} }}
        >
            Generate images
            <img className='h-6' src={assets.star} alt="" />
        </motion.button>

        <motion.div className='flex flex-wrap items-center gap-2 mt-10 justify-center'
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 1, duration: 1}}
        >
            
                <motion.img 
                whileHover={{scale: 1.1, duration: 0.1}}
                className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' src={assets.cow} alt=""  width={70}/>
                <motion.img 
                whileHover={{scale: 1.1, duration: 0.1}}
                className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' src={assets.rooster} alt=""  width={70}/>
                <motion.img 
                whileHover={{scale: 1.1, duration: 0.1}}
                className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' src={assets.lion} alt=""  width={70}/>
                <motion.img 
                whileHover={{scale: 1.1, duration: 0.1}}
                className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' src={assets.crocs} alt=""  width={70}/>
                <motion.img 
                whileHover={{scale: 1.1, duration: 0.1}}
                className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' src={assets.monkey} alt=""  width={70}/>
                <motion.img 
                whileHover={{scale: 1.1, duration: 0.1}}
                className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' src={assets.penguin} alt=""  width={70}/>
            
        </motion.div>
            <motion.p className='text-sm text-stone-300 mt-5'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 1.2, duration: 0.8}}
            >Generated images from Text2AI</motion.p>

    </motion.div>
  )
}

export default Header