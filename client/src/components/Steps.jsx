import React from 'react'
import { stepsData } from '../assets/assets'
import { motion } from 'motion/react'

const Steps = () => {
  return (
    <motion.div 
        initial={{opacity: 0.2, y:100}}
        transition={{duration: 1}}
        whileInView={{opacity: 1, y:0}}
        viewport={{once: true}}
    className='flex flex-col gap-4 items-center justify-center my-32'>
        <h1 className='text-3xl text-stone-100 sm:text-4xl font-semibold mb-2'>
            How it works
        </h1>
        <p className='text-lg text-gray-200 mb-8'>
            Transform Texts Into Stunning Images
        </p>

        <div className='space-y-4 w-full max-w-3xl text-sm'>
            {stepsData.map((item, index)=>(
                <div className='flex items-center gap-4 p-5 px-8 bg-slate-500/50 rounded-2xl shadow-lg border border-slate-400 cursor-pointer hover:scale-105 transition-all duration-500' key={index}>
                    <img width={40} src={item.icon} alt="" />
                    <div>
                    <h2 className='text-xl font-bold text-white'>{item.title}</h2>
                    <p className='text-gray-300'>{item.description}</p>
                    </div>
                </div>

            ))}
        </div>

    </motion.div>
  )
}

export default Steps