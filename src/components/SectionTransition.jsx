import React, { useRef, useEffect } from 'react'
import { ArrowDown } from 'lucide-react'
import '../styles/transition.css'

const SectionTransition = ({ fromSection, toSection, chapterNumber }) => {
  const containerRef = useRef(null)
  const numberRef = useRef(null)
  const lineLeftRef = useRef(null)
  const lineRightRef = useRef(null)
  const centerSquareRef = useRef(null)
  const leftTextRef = useRef(null)
  const rightTextRef = useRef(null)
  const glowCenterRef = useRef(null)
  const glowOrbsRef = useRef([])
  const glowRingRef = useRef(null)
  const glowRing2Ref = useRef(null)
  const glowCrosshairRef = useRef(null)
  const gridRef = useRef(null)
  const rafId = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateStyles = () => {
      const rect = container.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const totalTravel = rect.height + windowHeight
      const traveled = windowHeight - rect.top
      const progress = Math.max(0, Math.min(1, traveled / totalTravel))

      // Stage 1: Lines, labels, square (0 → 0.6)
      const stage1Progress = Math.max(0, Math.min(1, progress / 0.6))

      if (lineLeftRef.current) {
        lineLeftRef.current.style.width = `${stage1Progress * 50}%`
      }
      if (lineRightRef.current) {
        lineRightRef.current.style.width = `${stage1Progress * 50}%`
      }
      if (centerSquareRef.current) {
        centerSquareRef.current.style.transform = `translate(-50%, -50%) scale(${stage1Progress})`
      }
      if (leftTextRef.current) {
        const slideX = -20 + 20 * stage1Progress
        leftTextRef.current.style.transform = `translateY(-50%) translateX(${slideX}px)`
      }
      if (rightTextRef.current) {
        const slideX = 20 - 20 * stage1Progress
        rightTextRef.current.style.transform = `translateY(-50%) translateX(${slideX}px)`
      }

      // Stage 2: Number (0.2 → 0.6)
      const stage2Progress = Math.max(0, Math.min(1, (progress - 0.2) / 0.4))
      const numberTranslateY = -40 + stage2Progress * 40

      if (numberRef.current) {
        numberRef.current.style.transform = `translateY(${numberTranslateY}px)`
      }

      // Exit stage (0.6 → 0.8)
      const exitProgress = Math.max(0, Math.min(1, (progress - 0.6) / 0.2))
      const exitOpacity = 1 - exitProgress

      if (numberRef.current) {
        numberRef.current.style.opacity = `${Math.min(stage2Progress, exitOpacity)}`
      }
      if (lineLeftRef.current) {
        lineLeftRef.current.style.opacity = `${Math.min(stage1Progress, exitOpacity)}`
      }
      if (lineRightRef.current) {
        lineRightRef.current.style.opacity = `${Math.min(stage1Progress, exitOpacity)}`
      }
      if (centerSquareRef.current) {
        centerSquareRef.current.style.opacity = `${Math.min(stage1Progress, exitOpacity)}`
      }
      if (leftTextRef.current) {
        leftTextRef.current.style.opacity = `${Math.min(stage1Progress, exitOpacity)}`
      }
      if (rightTextRef.current) {
        rightTextRef.current.style.opacity = `${Math.min(stage1Progress, exitOpacity)}`
      }

      /* ---- Glow layers ---- */
      const glowIntensity = Math.sin(progress * Math.PI)

      // Center glow
      if (glowCenterRef.current) {
        glowCenterRef.current.style.opacity = `${glowIntensity * 0.85}`
        glowCenterRef.current.style.transform = `translate(-50%, -50%) scale(${0.7 + glowIntensity * 0.5})`
      }

      // Primary ring
      const ringProgress = Math.max(0, Math.min(1, (progress - 0.1) / 0.55))
      if (glowRingRef.current) {
        glowRingRef.current.style.opacity = `${Math.sin(ringProgress * Math.PI) * 0.7}`
        glowRingRef.current.style.transform = `translate(-50%, -50%) scale(${0.25 + ringProgress * 1.3})`
      }

      // Secondary ring — offset timing
      const ring2Progress = Math.max(0, Math.min(1, (progress - 0.2) / 0.5))
      if (glowRing2Ref.current) {
        glowRing2Ref.current.style.opacity = `${Math.sin(ring2Progress * Math.PI) * 0.5}`
        glowRing2Ref.current.style.transform = `translate(-50%, -50%) scale(${0.3 + ring2Progress * 1.1})`
      }

      // Crosshair
      if (glowCrosshairRef.current) {
        glowCrosshairRef.current.style.opacity = `${glowIntensity * 0.8}`
      }

      // Floating orbs
      glowOrbsRef.current.forEach((orb, i) => {
        if (!orb) return
        const orbOffset = i * 0.1
        const orbProgress = Math.max(0, Math.min(1, (progress - orbOffset) / 0.55))
        const orbSin = Math.sin(orbProgress * Math.PI)
        orb.style.opacity = `${orbSin * 0.9}`

        const angle = (i / 5) * Math.PI * 2 + progress * 0.5
        const radius = 50 + orbProgress * 140
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        orb.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${0.5 + orbSin * 0.6})`
      })

      // Grid
      if (gridRef.current) {
        gridRef.current.style.opacity = `${glowIntensity * 0.3}`
      }

      rafId.current = null
    }

    const onScroll = () => {
      if (rafId.current) return
      rafId.current = requestAnimationFrame(updateStyles)
    }

    updateStyles()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
        rafId.current = null
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="sect-transition">

      {/* ====== GLOW BACKGROUND LAYER ====== */}
      <div className="sect-transition__glow-layer" aria-hidden="true">

        {/* Central radial glow */}
        <div
          ref={glowCenterRef}
          className="sect-transition__glow-center"
        />

        {/* Primary expanding ring */}
        <div
          ref={glowRingRef}
          className="sect-transition__glow-ring"
        />

        {/* Secondary expanding ring */}
        <div
          ref={glowRing2Ref}
          className="sect-transition__glow-ring-2"
        />

        {/* Crosshair lines */}
        <div
          ref={glowCrosshairRef}
          className="sect-transition__glow-crosshair"
        />

        {/* Floating orbs */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            ref={(el) => { glowOrbsRef.current[i] = el }}
            className={`sect-transition__glow-orb sect-transition__glow-orb--${i}`}
          />
        ))}

        {/* Ambient pulse */}
        <div className="sect-transition__glow-ambient" />

        {/* Dot grid overlay */}
        <div
          ref={gridRef}
          className="sect-transition__glow-grid"
        />
      </div>

      {/* ====== LAYER 1 — Giant Number ====== */}
      <div className="sect-transition__number-container">
        <div ref={numberRef} className="sect-transition__number">
          {chapterNumber}
        </div>
      </div>

      {/* ====== LAYER 2 — Lines & Center Square ====== */}
      <div className="sect-transition__line-container">
        <div
          ref={lineLeftRef}
          className="sect-transition__line sect-transition__line--left"
        />
        <div ref={centerSquareRef} className="sect-transition__center-square">
          <ArrowDown className="sect-transition__arrow-icon" />
        </div>
        <div
          ref={lineRightRef}
          className="sect-transition__line sect-transition__line--right"
        />
      </div>

      {/* ====== LAYER 3 — Labels ====== */}
      <div className="sect-transition__labels">
        <div
          ref={leftTextRef}
          className="sect-transition__label sect-transition__label--left"
        >
          — {fromSection}
        </div>
        <div
          ref={rightTextRef}
          className="sect-transition__label sect-transition__label--right"
        >
          {toSection} —
        </div>
      </div>
    </div>
  )
}

export default SectionTransition