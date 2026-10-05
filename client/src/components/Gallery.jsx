import React from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { WandSparkles } from 'lucide-react'
import { showcase } from '../assets/assets'
import SectionHeading from './SectionHeading'

const Gallery = () => {

  const navigate = useNavigate()

  return (
    <section id='gallery' className='mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6'>
      <SectionHeading eyebrow='Gallery' title='Made with Text2AI'
      description='Every image below started as a single sentence. Click one to try its prompt yourself.' />

      <div className='grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3'>
        {showcase.map((item, index) => (
          <motion.button key={index} type='button'
          onClick={() => navigate('/generate', {state: {prompt: item.prompt}})}
          initial={{opacity: 0, scale: 0.96}}
          whileInView={{opacity: 1, scale: 1}}
          viewport={{once: true}}
          transition={{delay: (index % 3) * 0.08, duration: 0.5}}
          className='group relative aspect-square overflow-hidden rounded-2xl border border-white/10 text-left'>
            <img src={item.image} alt={item.prompt} loading='lazy'
            className='size-full object-cover transition duration-500 group-hover:scale-105' />
            <div className='absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/20 to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100'>
              <p className='line-clamp-3 text-xs text-zinc-200 sm:text-sm'>{item.prompt}</p>
              <span className='mt-2 inline-flex items-center gap-1 text-xs font-medium text-violet-300'>
                <WandSparkles className='size-3.5' /> Use this prompt
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  )
}

export default Gallery
