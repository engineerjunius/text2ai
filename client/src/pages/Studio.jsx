import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Copy, Dices, Download, ImageIcon, LoaderCircle, RefreshCw, Sparkles, Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'
import { examplePrompts, stylePresets } from '../assets/assets'

const MAX_PROMPT_LENGTH = 800

// "A fox in the forest!" -> "a-fox-in-the-forest"
const fileNameFor = (item) => {
  const slug = item.prompt.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50) || 'image'
  const extension = item.image.startsWith('data:image/png') ? 'png' : 'jpg'
  return `text2ai-${slug}.${extension}`
}

const ActionButton = ({icon: Icon, label, ...props}) => (
  <button type='button' {...props}
  className='inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-zinc-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50'>
    <Icon className='size-4' /> {label}
  </button>
)

const Studio = () => {

  const {generateImage, remaining, limit} = useContext(AppContext)
  const location = useLocation()
  const navigate = useNavigate()

  const [prompt, setPrompt] = useState(location.state?.prompt || '')
  const [styleId, setStyleId] = useState('none')
  const [generating, setGenerating] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [current, setCurrent] = useState(null)
  const [history, setHistory] = useState([])
  const [copied, setCopied] = useState(false)
  const autoStarted = useRef(false)
  const canvasRef = useRef(null)

  const outOfImages = remaining === 0

  const generate = async (text = prompt, style = styleId) => {
    const trimmed = text.trim()
    if (!trimmed || generating || outOfImages) return

    const suffix = stylePresets.find(s => s.id === style)?.suffix
    setGenerating(true)
    // On small screens the canvas sits below the form, so bring it into view
    if (window.innerWidth < 1024) {
      canvasRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'})
    }
    const result = await generateImage(suffix ? `${trimmed}, ${suffix}` : trimmed)
    setGenerating(false)

    if (result) {
      const item = {id: Date.now(), image: result.image, prompt: trimmed, styleId: style}
      setCurrent(item)
      setHistory(previous => [item, ...previous])
    }
  }

  // Coming from the home page with a prompt: start right away, then clear the router
  // state so a page refresh doesn't generate again
  useEffect(() => {
    if (location.state?.prompt && !autoStarted.current) {
      autoStarted.current = true
      navigate(location.pathname, {replace: true, state: null})
      generate(location.state.prompt)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Seconds counter shown while an image is generating
  useEffect(() => {
    if (!generating) return
    setElapsed(0)
    const timer = setInterval(() => setElapsed(seconds => seconds + 1), 1000)
    return () => clearInterval(timer)
  }, [generating])

  const onSubmit = (e) => {
    e.preventDefault()
    generate()
  }

  // Ctrl/Cmd + Enter generates from inside the textarea
  const onPromptKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      generate()
    }
  }

  const surpriseMe = () => {
    const options = examplePrompts.filter(example => example !== prompt)
    setPrompt(options[Math.floor(Math.random() * options.length)])
  }

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(current.prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      toast.error("Couldn't copy the prompt")
    }
  }

  const openFromHistory = (item) => {
    setCurrent(item)
    setPrompt(item.prompt)
    setStyleId(item.styleId)
  }

  return (
    <div className='mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14'>
      <div className='mb-8'>
        <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>Studio</h1>
        <p className='mt-1 text-sm text-zinc-400'>Describe an image, pick a style and generate.</p>
      </div>

      <div className='grid gap-6 lg:grid-cols-[380px_1fr]'>

        {/* Prompt panel */}
        <form onSubmit={onSubmit} className='flex flex-col gap-6 rounded-2xl border border-white/10 bg-surface/80 p-5 backdrop-blur lg:self-start'>
          <div>
            <div className='mb-2 flex items-center justify-between'>
              <label htmlFor='prompt' className='text-sm font-medium'>Prompt</label>
              <button type='button' onClick={surpriseMe} disabled={generating}
              className='inline-flex items-center gap-1 text-xs text-zinc-400 transition hover:text-white disabled:opacity-50'>
                <Dices className='size-3.5' /> Surprise me
              </button>
            </div>
            <textarea id='prompt' value={prompt} onChange={e => setPrompt(e.target.value)} onKeyDown={onPromptKeyDown}
            disabled={generating} maxLength={MAX_PROMPT_LENGTH} rows={5}
            placeholder='A cozy reading nook inside a giant seashell, warm lamp light...'
            className='w-full resize-none rounded-xl border border-white/10 bg-base/60 p-3 text-sm leading-relaxed outline-none transition placeholder:text-zinc-600 focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10 disabled:opacity-60' />
            <p className='mt-1 text-right font-mono text-[11px] text-zinc-600'>{prompt.length}/{MAX_PROMPT_LENGTH}</p>
          </div>

          <fieldset>
            <legend className='mb-2 text-sm font-medium'>Style</legend>
            <div className='flex flex-wrap gap-2'>
              {stylePresets.map(style => (
                <button key={style.id} type='button' onClick={() => setStyleId(style.id)} disabled={generating}
                aria-pressed={styleId === style.id}
                className={`rounded-lg border px-3 py-1.5 text-xs transition disabled:opacity-60 ${styleId === style.id
                  ? 'border-violet-400/60 bg-violet-500/15 text-white'
                  : 'border-white/10 text-zinc-400 hover:border-white/20 hover:text-white'}`}>
                  {style.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <button type='submit' disabled={generating || outOfImages || !prompt.trim()}
            className='flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-from to-accent-to py-3 text-sm font-medium text-white shadow-lg shadow-violet-900/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100'>
              {generating
                ? <><LoaderCircle className='size-4 animate-spin' /> Generating...</>
                : <><Sparkles className='size-4' /> Generate</>}
            </button>
            <p className='mt-3 text-center text-xs text-zinc-500'>
              {outOfImages
                ? "You've used today's free images. Come back tomorrow!"
                : remaining !== null
                  ? <><span className='font-mono text-zinc-300'>{remaining}</span>{limit ? ` of ${limit}` : ''} free images left today · <kbd className='font-mono'>Ctrl</kbd> + <kbd className='font-mono'>Enter</kbd></>
                  : <><kbd className='font-mono'>Ctrl</kbd> + <kbd className='font-mono'>Enter</kbd> to generate</>}
            </p>
          </div>
        </form>

        {/* Canvas */}
        <div className='flex flex-col gap-4'>
          <div ref={canvasRef} className='relative mx-auto aspect-square w-full max-w-[560px] overflow-hidden rounded-2xl border border-white/10 bg-surface'>
            <AnimatePresence mode='wait'>
              {generating ? (
                <motion.div key='loading' initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                className='absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-violet-950/40 via-surface to-cyan-950/30'>
                  <div aria-hidden='true' className='shimmer absolute inset-0' />
                  <LoaderCircle className='size-8 animate-spin text-violet-300' />
                  <p className='text-sm text-zinc-300'>Painting your image...</p>
                  <p className='font-mono text-xs text-zinc-500'>{elapsed}s</p>
                </motion.div>
              ) : current ? (
                <motion.img key={current.id} src={current.image} alt={current.prompt}
                initial={{opacity: 0, scale: 1.02}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0}} transition={{duration: 0.4}}
                className='absolute inset-0 size-full object-cover' />
              ) : (
                <motion.div key='empty' initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                className='absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center'>
                  <div className='flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5'>
                    <ImageIcon className='size-6 text-zinc-500' />
                  </div>
                  <p className='text-sm text-zinc-400'>Your image will appear here</p>
                  <p className='max-w-xs text-xs text-zinc-600'>Tip: describe the subject, setting, lighting and mood for the best results.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {current && !generating &&
            <div className='mx-auto flex w-full max-w-[560px] flex-wrap items-center gap-2'>
              <a href={current.image} download={fileNameFor(current)}
              className='inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-medium text-zinc-900 transition hover:bg-zinc-200'>
                <Download className='size-4' /> Download
              </a>
              <ActionButton icon={RefreshCw} label='Regenerate' disabled={outOfImages}
              onClick={() => generate(current.prompt, current.styleId)} />
              <ActionButton icon={copied ? Check : Copy} label={copied ? 'Copied' : 'Copy prompt'} onClick={copyPrompt} />
            </div>}

          {history.length > 0 &&
            <div className='mx-auto w-full max-w-[560px]'>
              <div className='mb-2 flex items-center justify-between'>
                <p className='text-xs font-medium text-zinc-400'>This session</p>
                <button type='button' onClick={() => { setHistory([]); setCurrent(null) }}
                className='inline-flex items-center gap-1 text-xs text-zinc-500 transition hover:text-white'>
                  <Trash2 className='size-3.5' /> Clear
                </button>
              </div>
              <div className='flex gap-2 overflow-x-auto pb-2'>
                {history.map(item => (
                  <button key={item.id} type='button' onClick={() => openFromHistory(item)} title={item.prompt}
                  className={`size-16 shrink-0 overflow-hidden rounded-lg border-2 transition ${current?.id === item.id ? 'border-violet-400' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                    <img src={item.image} alt={item.prompt} className='size-full object-cover' />
                  </button>
                ))}
              </div>
              <p className='text-[11px] text-zinc-600'>Images aren&apos;t saved after you leave. Download the ones you want to keep.</p>
            </div>}
        </div>
      </div>
    </div>
  )
}

export default Studio
