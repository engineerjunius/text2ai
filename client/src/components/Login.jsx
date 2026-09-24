import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext.jsx';
import { motion } from 'motion/react'
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {

    const [state, setState] = useState('Login');
    const {setShowLogin, backendUrl, login} = useContext(AppContext);


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const {data} = state === 'Login'
                ? await axios.post(backendUrl + '/api/user/login', {email, password})
                : await axios.post(backendUrl + '/api/user/register', {name, email, password})

            if (data.success) {
                login(data.token, data.user)
                setShowLogin(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);


  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>


    <motion.form onSubmit={onSubmitHandler}
    initial={{opacity: 0.2, y:50}}
    transition={{duration: 0.3}}
    whileInView={{opacity: 1, y:0}}
    viewport={{once: true}}

    className='relative bg-white p-10 rounded-xl text-slate-500'>
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
        <p className='text-sm'>{state === 'Login' ? 'Welcome back! Please sign in to continue' : 'Create an account to get 5 free credits'}</p>

        {state !== 'Login' && <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4 focus-within:outline-2 focus-within:outline-indigo-600'>
            <img src={assets.user_icon}  alt="" width={25} />
            <input onChange={e => setName(e.target.value)} value={name} 
            type="text" autoComplete="name" className='focus:border-indigo-600 focus:outline-hidden text-sm' placeholder='Full Name' required/>
        </div>}

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4 focus-within:outline-2 focus-within:outline-indigo-600'>
            <img src={assets.mail}  alt="" width={25} />
            <input onChange={e => setEmail(e.target.value)} value={email}
            type="email" autoComplete="email" className='focus:border-indigo-600 focus:outline-hidden text-sm' placeholder='Email ID' required/>
        </div>

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4 focus-within:outline-2 focus-within:outline-indigo-600'>
            <img src={assets.locked}  alt="" width={25} />
            <input onChange={e => setPassword(e.target.value)} value={password}
            type="password" autoComplete={state === 'Login' ? 'current-password' : 'new-password'} minLength={state === 'Login' ? undefined : 8} className='focus:border-indigo-600 focus:outline-hidden text-sm' placeholder='Password' required/>
        </div>

        <button disabled={loading} className='bg-indigo-600 text-white py-2 rounded-full w-full mt-6 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'>
            {loading ? 'Please wait...' : state === 'Login' ? 'Login' : 'Create Account'}
        </button>

        {state === 'Login' ? <p className='mt-5 text-center'>Don&apos;t have an account? <span className='text-indigo-700 cursor-pointer'onClick={()=>setState('Sign Up')}>Sign Up</span></p>
        :
        <p className='mt-5 text-center'>Already have an account? <span className='text-indigo-700 cursor-pointer' onClick={()=>setState('Login')}>Login</span></p>}

        <img onClick={()=>setShowLogin(false)} src={assets.close_icon} alt="" className='absolute top-5 right-5 cursor-pointer w-3' />

    </motion.form>

    </div>
  )
}

export default Login