import React from 'react'
import { Link } from 'react-router-dom'

// Same mark as public/favicon.svg
export const LogoMark = ({className = 'size-8'}) => (
  <svg viewBox='0 0 32 32' className={className} aria-hidden='true'>
    <defs>
      <linearGradient id='logo-gradient' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stopColor='#8b5cf6' />
        <stop offset='1' stopColor='#22d3ee' />
      </linearGradient>
    </defs>
    <rect width='32' height='32' rx='8' fill='url(#logo-gradient)' />
    <path d='M16 6.5c.6 4.6 2.9 6.9 7.5 7.5-4.6.6-6.9 2.9-7.5 7.5-.6-4.6-2.9-6.9-7.5-7.5 4.6-.6 6.9-2.9 7.5-7.5Z' fill='#fff' />
    <circle cx='23' cy='22.5' r='1.8' fill='#fff' opacity='.85' />
  </svg>
)

const Logo = () => (
  <Link to='/' className='flex items-center gap-2.5' aria-label='Text2AI home'>
    <LogoMark />
    <span className='text-lg font-semibold tracking-tight'>
      Text2<span className='text-gradient'>AI</span>
    </span>
  </Link>
)

export default Logo
