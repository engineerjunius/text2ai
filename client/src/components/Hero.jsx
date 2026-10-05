import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { examplePrompts, showcase } from '../assets/assets'

const fadeUp = (delay) => ({
  initial: {opacity: 0, y: 16},
  animate: {opacity: 1, y: 0},
  transition: {delay, duration: 0.6, ease: 'easeOut'},
})

const Hero = () => {

  const [prompt, setPrompt] = useState('')
  const navigate = useNavigate()

  // The studio picks the prompt up from router state and starts generating
  const startGenerating = (text) => {
    navigate('/generate', {state: {prompt: text.trim()}})
  }

  const onSubmit = (e) => {
    e.preventDefault()
    startGenerating(prompt)
  }

  return (
    <section className='mx-auto max-w-4xl px-4 pb-20 pt-20 text-center sm:px-6 sm:pt-28'>
      <motion.div {...fadeUp(0)} className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300'>
        <span className='size-1.5 rounded-full bg-emerald-400' />
        Powered by FLUX.1 · Free, no sign-up
      </motion.div>

      <motion.h1 {...fadeUp(0.1)} className='mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-6xl'>
        Turn your words into <span className='text-gradient'>stunning images</span>
      </motion.h1>

      <motion.p {...fadeUp(0.2)} className='mx-auto mt-5 max-w-xl text-base text-pretty text-zinc-400 sm:text-lg'>
        Describe anything you can imagine and Text2AI paints it in seconds. No account, no credit card, just create.
      </motion.p>

      <motion.form {...fadeUp(0.3)} onSubmit={onSubmit}
      className='mx-auto mt-10 flex max-w-2xl items-center gap-2 rounded-2xl border border-white/10 bg-surface/80 p-2 shadow-2xl shadow-violet-950/40 backdrop-blur transition focus-within:border-violet-500/50 focus-within:ring-4 focus-within:ring-violet-500/10'>
        <Sparkles className='ml-3 size-5 shrink-0 text-violet-400' aria-hidden='true' />
        <input value={prompt} onChange={e => setPrompt(e.target.value)} maxLength={800}
        aria-label='Describe the image you want'
        placeholder='A fox made of autumn leaves in a misty forest...'
        className='min-w-0 flex-1 bg-transparent py-2.5 text-sm outline-none placeholder:text-zinc-500 sm:text-base' />
        <button type='submit' className='inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-r from-accent-from to-accent-to px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-110 sm:px-5'>
          <span className='max-sm:hidden'>Generate</span>
          <ArrowRight className='size-4' />
        </button>
      </motion.form>

      <motion.div {...fadeUp(0.4)} className='mt-5 flex flex-wrap justify-center gap-2'>
        <span className='py-1 text-xs text-zinc-500'>Try:</span>
        {examplePrompts.slice(0, 3).map(example => (
          <button key={example} type='button' onClick={() => startGenerating(example)}
          className='max-w-[16rem] truncate rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400 transition hover:border-white/20 hover:text-white'>
            {example}
          </button>
        ))}
      </motion.div>

      <motion.div {...fadeUp(0.55)} className='mt-16 flex items-center justify-center'>
        {showcase.map((item, index) => (
          <img key={index} src={item.image} alt={item.prompt}
          style={{rotate: `${(index - 2.5) * 4}deg`}}
          className='-mx-2 size-16 rounded-xl border-2 border-base object-cover shadow-xl transition duration-300 hover:z-10 hover:-translate-y-2 hover:scale-110 sm:-mx-3 sm:size-24' />
        ))}
      </motion.div>
      <p className='mt-4 text-xs text-zinc-500'>All images generated with Text2AI</p>
    </section>
  )
}

export default Hero
