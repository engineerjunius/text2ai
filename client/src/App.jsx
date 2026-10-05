import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import Home from './pages/Home'
import Studio from './pages/Studio'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {

  const { pathname, hash } = useLocation()

  // Jump to the linked section (e.g. /#gallery), otherwise start each page at the top
  useEffect(() => {
    const section = hash && document.getElementById(hash.slice(1))
    if (section) {
      section.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return (
    <div className='relative flex min-h-screen flex-col overflow-x-clip'>
      {/* Background: faint grid plus a soft violet/cyan glow at the top */}
      <div aria-hidden='true' className='pointer-events-none absolute inset-0 -z-10'>
        <div className='bg-grid absolute inset-0' />
        <div className='absolute left-1/2 top-[-12rem] h-[36rem] w-[60rem] max-w-[140vw] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600/25 via-fuchsia-500/10 to-cyan-500/20 blur-3xl' />
      </div>

      <ToastContainer position='bottom-right' theme='dark' />
      <Navbar />

      <main className='flex-1'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/generate' element={<Studio />} />
          <Route path='/result' element={<Navigate to='/generate' replace />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
