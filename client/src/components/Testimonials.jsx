import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion } from 'motion/react'

const Testimonials = () => {
  return (
    <motion.div 
    initial={{opacity: 0.2, y:100}}
    transition={{duration: 1}}
    whileInView={{opacity: 1, y:0}}
    viewport={{once: true}}
    
    className='flex flex-col items-center justify-center my-20 py-6'>
        <h1 className='text-3xl text-stone-100 sm:text-4xl font-semibold mb-2'>Customer Testimonials</h1>
        <p className='text-lg text-gray-300 mb-12'>What Our Users Are Saying</p>
        <div className='flex flex-wrap gap-6'>
           {testimonialsData.map((testimonial, index) => (
            <div key={index} className='bg-slate-600/50 p-12 rounded-2xl shadow-lg border w-80 m-auto cursor-pointer hover:scale-105 transition-all duration-500'>
                <div className='flex flex-col justify-center items-center'>
                    <img src={testimonial.image} className="w-14 object-cover border border-gray-500 rounded-full" alt="" />
                    <h2 className='text-xl font-semibold mt-3'>{testimonial.name}</h2>
                    <p className='text-gray-300 mb-4'>{testimonial.role}</p>
                    <div className='flex items-center mb-4'>
                        {Array(testimonial.stars).fill().map((item, index) => (
                            <img key={index} src={assets.star_rating} alt="" className='w-4' />
                        ))}
                    </div>
                    <p className='text-gray-200 text-center text-sm'>{testimonial.quote}</p>
                </div>
            </div>
           )
               
           )}
        </div>
    </motion.div>
  )
}

export default Testimonials