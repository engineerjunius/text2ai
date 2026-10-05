import React, { useContext } from 'react'
import { Cpu, Gift, ShieldCheck, Zap } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { AppContext } from '../context/AppContext'

const getFeatures = (limit) => [
  {icon: Gift, title: 'Free to use', description: `Generate up to ${limit} images a day at no cost.`},
  {icon: ShieldCheck, title: 'No sign-up', description: 'No account, email or card. Open the page and create.'},
  {icon: Zap, title: 'Fast', description: 'Most images are ready in just a few seconds.'},
  {icon: Cpu, title: 'State-of-the-art model', description: 'Built on FLUX.1 by Black Forest Labs.'},
]

const Features = () => {

  const { limit } = useContext(AppContext)
  const features = getFeatures(limit || 20)

  return (
    <section className='mx-auto max-w-6xl px-4 py-20 sm:px-6'>
      <SectionHeading eyebrow='Why Text2AI' title='Professional results, zero friction' />

      <div className='grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4'>
        {features.map(feature => (
          <div key={feature.title} className='bg-base p-6'>
            <feature.icon className='size-5 text-cyan-300' />
            <h3 className='mt-4 font-medium'>{feature.title}</h3>
            <p className='mt-1.5 text-sm text-zinc-400'>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features
