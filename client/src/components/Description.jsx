import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'

const Description = () => {
  return (
    <motion.div 
    initial={{opacity: 0.2, y:100}}
    transition={{duration: 1}}
    whileInView={{opacity: 1, y:0}}
    viewport={{once: true}}
    
    className='flex flex-col justify-center items-center my-24 p-6 md:px-28'>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
        <p className='text-gray-200 mb-8'>Turn your imagination into visuals</p>
        
        <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
            <img src={assets.roboticHand} alt="" className='w-80 xl:w-96 rounded-lg' />
            <div>
                <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing the AI-Powered Text to Image Generator</h2>
                <p className='text-gray-300'>Turn your words into stunning visuals with our AI-powered Text-to-Image Generator! Simply enter a description, and our advanced AI will create a unique, high-quality image based on your input. Perfect for artists, designers, and anyone looking to bring their ideas to life. Try it now and watch your imagination come to life! 🚀🎨.</p>
                
            </div>
        </div>



    </motion.div>
  )
}

export default Description