import React, { useEffect, useMemo, useRef } from 'react'
import '../styles/preloader.css'

const TITLE = 'HASMOON DEV'

const Preloader = ({ progress, isExiting, onExitComplete, exitDuration }) => {
  const letters = useMemo(
    () =>
      TITLE.split('').map((char, index) => ({
        char: char === ' ' ? '\u00A0' : char,
        index,
      })),
    []
  )

  const preloaderRef = useRef(null)
  const timerRef = useRef(null)
  const calledRef = useRef(false)

  useEffect(() => {
    if (!isExiting) {
      calledRef.current = false
      return
    }

    if (timerRef.current) clearTimeout(timerRef.current)

    // Fire onExitComplete after curtain animation finishes
    timerRef.current = setTimeout(() => {
      if (calledRef.current) return
      calledRef.current = true

      if (preloaderRef.current) {
        preloaderRef.current.style.display = 'none'
      }

      if (typeof onExitComplete === 'function') {
        onExitComplete()
      }
    }, exitDuration)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isExiting, onExitComplete, exitDuration])

  return (
    <div
      ref={preloaderRef}
      className={`preloader${isExiting ? ' preloader--exiting' : ''}`}
      aria-hidden="true"
      role="presentation"
    >
      <div className="preloader__backdrop">
        <div className="preloader__bloom" />
      </div>

      <div className="preloader__hud" aria-hidden="true">
        <div className="preloader__hud-corner preloader__hud-corner--tl">
          <span className="preloader__hud-line preloader__hud-line--h" />
          <span className="preloader__hud-line preloader__hud-line--v" />
          <span className="preloader__hud-dot" />
        </div>
        <div className="preloader__hud-corner preloader__hud-corner--tr">
          <span className="preloader__hud-line preloader__hud-line--h" />
          <span className="preloader__hud-line preloader__hud-line--v" />
          <span className="preloader__hud-dot" />
        </div>
        <div className="preloader__hud-corner preloader__hud-corner--bl">
          <span className="preloader__hud-line preloader__hud-line--h" />
          <span className="preloader__hud-line preloader__hud-line--v" />
          <span className="preloader__hud-dot" />
        </div>
      </div>

      <div className="preloader__scanline" aria-hidden="true" />

      <div
        className={`preloader__content${
          isExiting ? ' preloader__content--exit' : ''
        }`}
      >
        <h1 className="preloader__title" aria-label={TITLE}>
          {letters.map(({ char, index }) => (
            <span
              key={`${char}-${index}`}
              className="preloader__letter"
              aria-hidden="true"
            >
              {char}
            </span>
          ))}
        </h1>

        <p className="preloader__counter">
          <span className="preloader__counter-label">LOAD</span>
          <span className="preloader__counter-sep">│</span>
          <span className="preloader__counter-value">
            {String(progress).padStart(3, '0')}
          </span>
          <span className="preloader__counter-unit">%</span>
        </p>
      </div>

      {isExiting && (
        <div className="preloader__exit" aria-hidden="true">
          <div className="preloader__curtain preloader__curtain--left" />
          <div className="preloader__curtain preloader__curtain--right" />
        </div>
      )}
    </div>
  )
}

export default Preloader