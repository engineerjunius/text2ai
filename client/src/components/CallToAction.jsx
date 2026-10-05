import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'

const CallToAction = () => {
  return (
    <section className='mx-auto max-w-6xl px-4 py-12 sm:px-6'>
      <motion.div
      initial={{opacity: 0, y: 24}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
      transition={{duration: 0.6}}
      className='relative overflow-hidden rounded-3xl border border-white/10 bg-surface px-6 py-16 text-center'>
        <div aria-hidden='true' className='absolute inset-x-0 -top-24 mx-auto h-48 w-2/3 rounded-full bg-gradient-to-r from-violet-600/30 to-cyan-500/30 blur-3xl' />

        <h2 className='relative text-3xl font-semibold tracking-tight text-balance sm:text-4xl'>See the magic for yourself</h2>
        <p className='relative mx-auto mt-4 max-w-md text-zinc-400'>Your first image is one sentence away.</p>

        <Link to='/generate' className='relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200'>
          Start creating, it&apos;s free
          <ArrowRight className='size-4' />
        </Link>
      </motion.div>
    </section>
  )
}

export default CallToAction
