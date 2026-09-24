import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'
import { AppContext } from '../context/AppContext'

const Result = () => {

  const [image, setImage] = React.useState(assets.coin_star)
  const [isImageLoaded, setIsImageLoaded] = React.useState(false)
  const [generating, setGenerating] = useState(false)
  const [input, setInput] = useState('')

  const {generateImage} = useContext(AppContext)


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setGenerating(true)

    if(input){
      const image = await generateImage(input)
      if(image){
        setIsImageLoaded(true)
        setImage(image)
      }

    }
    setGenerating(false)
  }
  

  return (
    <motion.form 
    initial={{opacity: 0.2, y:100}}
    transition={{duration: 1}}
    whileInView={{opacity: 1, y:0}}
    viewport={{once: true}}

    onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] justify-center items-center'>

    <div>
      <div className='relative'>
        <img src={image} alt="" className='max-w-sm rounded'/>
        <span className={`absolute bottom-0 left-0 h-1 bg-yellow-300 ${generating ? 'w-full transition-all duration-[10s]' : 'w-0'}`} />
      
      </div> 
      <p className={!generating ? 'hidden' : ''}>Generating....</p>
    </div>

{!isImageLoaded && 

    <div className='flex w-full max-w-xl items-center bg-gray-800 rounded-full text-sm p-2 mt-10'>
      <input onChange={e=> setInput(e.target.value)} value={input}
      type="text" placeholder='Describe what you want to generate' className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20   placeholder:text-gray-500 placeholder:text-sm' />
      <button type='submit' className='bg-teal-700 px-10 sm:px-16 py-3 rounded-full hover:bg-gradient-to-l from-teal-900 to-violet-800 '>Generate</button>
    </div>

}
{isImageLoaded &&

    <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
      <p onClick={()=>{setIsImageLoaded(false)}}
      className='bg-transparent border border-zinc-900 text-white px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
      <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
    </div>
}

    </motion.form>
  )
}

export default Result