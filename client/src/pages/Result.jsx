import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'
import { AppContext } from '../context/AppContext'

const Result = () => {

  const [image, setImage] = useState(assets.coin_star)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [input, setInput] = useState('')

  const {generateImage, token, setShowLogin, guestRemaining} = useContext(AppContext)

  const isGuest = !token
  const trialUsedUp = isGuest && guestRemaining === 0

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (trialUsedUp) {
      setShowLogin(true)
      return
    }

    if (!input.trim() || generating) return

    setGenerating(true)
    const result = await generateImage(input)
    if(result){
      setIsImageLoaded(true)
      setImage(result)
    }
    setGenerating(false)
  }

  const onGenerateAnother = () => {
    setIsImageLoaded(false)
    setImage(assets.coin_star)
    setInput('')
  }


  return (
    <motion.form
    initial={{opacity: 0.2, y:100}}
    transition={{duration: 1}}
    whileInView={{opacity: 1, y:0}}
    viewport={{once: true}}

    onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] justify-center items-center'>

    {isGuest && guestRemaining !== null &&
      <div className='mb-6 px-5 py-2 rounded-full bg-gray-800/70 border border-yellow-600/60 text-sm text-center'>
        {trialUsedUp
          ? <>Your free trial is used up. <span onClick={()=>setShowLogin(true)} className='text-yellow-300 cursor-pointer underline'>Sign up</span> to get 5 free credits!</>
          : <>Free trial: <span className='text-yellow-300 font-semibold'>{guestRemaining}</span> {guestRemaining === 1 ? 'image' : 'images'} left, no sign-up needed</>}
      </div>
    }

    <div>
      <div className='relative'>
        <img src={image} alt={isImageLoaded ? input : ''} className='max-w-sm w-full rounded'/>
        <span className={`absolute bottom-0 left-0 h-1 bg-yellow-300 ${generating ? 'w-full transition-all duration-[10s]' : 'w-0'}`} />
      </div>
      <p className={!generating ? 'hidden' : ''}>Generating....</p>
    </div>

{!isImageLoaded &&

    <div className='flex w-full max-w-xl items-center bg-gray-800 rounded-full text-sm p-2 mt-10'>
      <input onChange={e=> setInput(e.target.value)} value={input} disabled={generating}
      type="text" placeholder='Describe what you want to generate' className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder:text-gray-500 placeholder:text-sm' />
      <button type='submit' disabled={generating || (!trialUsedUp && !input.trim())} className='bg-teal-700 px-10 sm:px-16 py-3 rounded-full cursor-pointer hover:bg-gradient-to-l from-teal-900 to-violet-800 disabled:opacity-60 disabled:cursor-not-allowed'>
        {generating ? 'Generating...' : trialUsedUp ? 'Sign up' : 'Generate'}
      </button>
    </div>

}
{isImageLoaded &&

    <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
      <button type='button' onClick={onGenerateAnother}
      className='bg-transparent border border-zinc-900 text-white px-8 py-3 rounded-full cursor-pointer'>Generate Another</button>
      <a href={image} download='text2ai-image.png' className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
    </div>
}

    </motion.form>
  )
}

export default Result
