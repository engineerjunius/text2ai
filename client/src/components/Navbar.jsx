import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import Logo from './Logo'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const { remaining } = useContext(AppContext)

  return (
    <header className='sticky top-0 z-20 border-b border-white/5 bg-base/70 backdrop-blur-xl'>
      <nav className='mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6'>
        <Logo />

        <div className='flex items-center gap-2 sm:gap-4'>
          <Link to='/#how-it-works' className='hidden px-2 text-sm text-zinc-400 transition hover:text-white sm:block'>How it works</Link>
          <Link to='/#gallery' className='hidden px-2 text-sm text-zinc-400 transition hover:text-white sm:block'>Gallery</Link>

          {remaining !== null &&
            <span className='hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-zinc-400 md:block'>
              {remaining} free today
            </span>}

          <NavLink to='/generate' className={({isActive}) => `${isActive ? 'hidden' : 'inline-flex'} items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200`}>
            <Sparkles className='size-4' />
            Create
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
