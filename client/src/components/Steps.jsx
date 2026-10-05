import React from 'react'
import { motion } from 'motion/react'
import { Download, PenLine, WandSparkles } from 'lucide-react'
import SectionHeading from './SectionHeading'

const steps = [
  {
    icon: PenLine,
    title: 'Describe your vision',
    description: 'Type a phrase, sentence or paragraph describing the image you want. Add a style if you like.',
  },
  {
    icon: WandSparkles,
    title: 'Let the AI paint it',
    description: 'The FLUX.1 model turns your words into a unique, high-quality 1024 × 1024 image in seconds.',
  },
  {
    icon: Download,
    title: 'Download and share',
    description: 'Save your image in one click, or regenerate for a fresh take on the same prompt.',
  },
]

const Steps = () => {
  return (
    <section id='how-it-works' className='mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6'>
      <SectionHeading eyebrow='How it works' title='From prompt to picture in three steps' />

      <div className='grid gap-4 md:grid-cols-3'>
        {steps.map((step, index) => (
          <motion.div key={step.title}
          initial={{opacity: 0, y: 24}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{delay: index * 0.1, duration: 0.5}}
          className='relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.05]'>
            <span className='absolute right-6 top-6 font-mono text-xs text-zinc-600'>0{index + 1}</span>
            <div className='flex size-11 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10'>
              <step.icon className='size-5 text-violet-300' />
            </div>
            <h3 className='mt-5 text-lg font-medium'>{step.title}</h3>
            <p className='mt-2 text-sm leading-relaxed text-zinc-400'>{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Steps
