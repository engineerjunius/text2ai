import React from 'react'

const SectionHeading = ({eyebrow, title, description}) => (
  <div className='mx-auto mb-12 max-w-2xl text-center'>
    <p className='font-mono text-xs uppercase tracking-[0.2em] text-violet-400'>{eyebrow}</p>
    <h2 className='mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl'>{title}</h2>
    {description && <p className='mt-4 text-pretty text-zinc-400'>{description}</p>}
  </div>
)

export default SectionHeading
