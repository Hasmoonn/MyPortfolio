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

      const stage2Progress = Math.max(0, Math.min(1, (progress - 0.2) / 0.4))
      const numberTranslateY = -40 + stage2Progress * 40

      if (numberRef.current) {
        numberRef.current.style.transform = `translateY(${numberTranslateY}px)`
      }

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
      <div className="sect-transition__number-container">
        <div ref={numberRef} className="sect-transition__number">
          {chapterNumber}
        </div>
      </div>

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