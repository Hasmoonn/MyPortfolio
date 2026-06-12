import { useCallback, useEffect, useRef, useState } from 'react'

const LOADING_DURATION = 3500
const EXIT_DURATION = 2000
const HERO_REVEAL_DURATION = 3500
const EXIT_DELAY_AFTER_100 = 300

export const ENTRY_PHASE = {
  LOADING: 'loading',
  EXITING: 'exiting',
  REVEALING: 'revealing',
  COMPLETE: 'complete',
}

export function useEntryAnimation() {
  const [phase, setPhase] = useState(ENTRY_PHASE.LOADING)
  const [progress, setProgress] = useState(0)

  const rafRef = useRef(null)
  const startTimeRef = useRef(null)
  const exitTimeoutRef = useRef(null)
  const revealTimeoutRef = useRef(null)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    startTimeRef.current = performance.now()

    const tick = (now) => {
      if (!isMountedRef.current) return

      const elapsed = now - startTimeRef.current
      const raw = Math.min(elapsed / LOADING_DURATION, 1)
      const eased = 1 - Math.pow(1 - raw, 2.8)
      const value = Math.min(Math.floor(eased * 100), 100)

      setProgress(value)

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setProgress(100)

        // After 100%, wait briefly then start exit
        exitTimeoutRef.current = window.setTimeout(() => {
          if (!isMountedRef.current) return
          setPhase(ENTRY_PHASE.EXITING)

          // After exit animation duration, go to REVEALING
          // This is the fallback in case onExitComplete never fires
          revealTimeoutRef.current = window.setTimeout(() => {
            if (!isMountedRef.current) return
            setPhase((prev) =>
              prev === ENTRY_PHASE.EXITING ? ENTRY_PHASE.REVEALING : prev
            )
          }, EXIT_DURATION + 500)
        }, EXIT_DELAY_AFTER_100)
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      isMountedRef.current = false
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current)
      if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current)
    }
  }, [])

  // Scroll lock
  useEffect(() => {
    const shouldLock =
      phase === ENTRY_PHASE.LOADING || phase === ENTRY_PHASE.EXITING

    document.body.style.overflow = shouldLock ? 'hidden' : ''
    document.documentElement.style.overflow = shouldLock ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [phase])

  const handleExitComplete = useCallback(() => {
    if (!isMountedRef.current) return
    // Clear the fallback timer since we got the real callback
    if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current)
    setPhase((prev) =>
      prev === ENTRY_PHASE.EXITING ? ENTRY_PHASE.REVEALING : prev
    )
  }, [])

  const handleHeroRevealComplete = useCallback(() => {
    if (!isMountedRef.current) return
    setPhase((prev) =>
      prev === ENTRY_PHASE.REVEALING ? ENTRY_PHASE.COMPLETE : prev
    )
  }, [])

  const isPreloaderVisible =
    phase === ENTRY_PHASE.LOADING || phase === ENTRY_PHASE.EXITING

  const isHeroRevealing =
    phase === ENTRY_PHASE.REVEALING || phase === ENTRY_PHASE.COMPLETE

  return {
    phase,
    progress,
    isPreloaderVisible,
    isHeroRevealing,
    handleExitComplete,
    handleHeroRevealComplete,
    exitDuration: EXIT_DURATION,
    heroRevealDuration: HERO_REVEAL_DURATION,
  }
}