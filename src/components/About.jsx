import React, { useState, useRef, useEffect } from 'react'
import { skills } from '../assets/assets.js'
import Skills from './Skills.jsx'
import Counter from './Counter.jsx'
import '../styles/about.css'

const About = () => {
  const band1Ref = useRef(null)
  const band2Ref = useRef(null)
  const statsRef = useRef(null)
  const band4Ref = useRef(null)
  const lastScrollY = useRef(window.scrollY)
  const headerAnimatedRef = useRef(false)
  const statsTriggeredRef = useRef(false)

  const [statsVisible, setStatsVisible] = useState(false)
  const [exitingBands, setExitingBands] = useState(new Set())
  const [visibleCards, setVisibleCards] = useState(new Set())
  const [exitingCards, setExitingCards] = useState(new Set())
  const [headerStage, setHeaderStage] = useState({
    band1Number: false,
    band1Heading: false,
    band1Separator: false,
    band1Text: false,
    band3Stats: false,
    band3Text: false,
    band3Skills: false,
    band4: false,
  })

  useEffect(() => {
    const handleScroll = () => {
      lastScrollY.current = window.scrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observers = []
    const observerOptions = { threshold: 0.15, rootMargin: '-5% 0px -5% 0px' }

    const observeBand = (ref, bandKey, onEnter) => {
      if (!ref.current) return
      const observer = new IntersectionObserver(([entry]) => {
        const scrollingDown = window.scrollY >= lastScrollY.current
        if (entry.isIntersecting) {
          onEnter?.()
          setExitingBands((prev) => {
            const next = new Set(prev)
            next.delete(bandKey)
            return next
          })
        } else if (!scrollingDown) {
          setExitingBands((prev) => new Set([...prev, bandKey]))
        }
      }, observerOptions)
      observer.observe(ref.current)
      observers.push(observer)
    }

    observeBand(band1Ref, 'band1', () => {
      if (headerAnimatedRef.current) return
      headerAnimatedRef.current = true
      setTimeout(() => setHeaderStage((p) => ({ ...p, band1Number: true })), 0)
      setTimeout(() => setHeaderStage((p) => ({ ...p, band1Heading: true })), 150)
      setTimeout(() => setHeaderStage((p) => ({ ...p, band1Separator: true })), 200)
      setTimeout(() => setHeaderStage((p) => ({ ...p, band1Text: true })), 300)
    })

    observeBand(statsRef, 'band3', () => {
      if (statsTriggeredRef.current) return
      statsTriggeredRef.current = true
      setStatsVisible(true)
      setTimeout(() => setHeaderStage((p) => ({ ...p, band3Stats: true })), 0)
      setTimeout(() => setHeaderStage((p) => ({ ...p, band3Text: true })), 100)
      setTimeout(() => setHeaderStage((p) => ({ ...p, band3Skills: true })), 200)
      setTimeout(() => setHeaderStage((p) => ({ ...p, band4: true })), 1200)
    })

    observeBand(band4Ref, 'band4')

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  useEffect(() => {
    const observers = []
    const cards = band2Ref.current?.querySelectorAll('.about__capability-card') ?? []

    cards.forEach((card, index) => {
      const observer = new IntersectionObserver(([entry]) => {
        const scrollingDown = window.scrollY >= lastScrollY.current
        if (entry.isIntersecting) {
          setVisibleCards((prev) => new Set([...prev, index]))
          setExitingCards((prev) => {
            const next = new Set(prev)
            next.delete(index)
            return next
          })
        } else if (!scrollingDown) {
          setExitingCards((prev) => new Set([...prev, index]))
          setVisibleCards((prev) => {
            const next = new Set(prev)
            next.delete(index)
            return next
          })
        }
      }, { threshold: 0.15, rootMargin: '-5% 0px -5% 0px' })
      observer.observe(card)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const band1Exiting = exitingBands.has('band1')
  const band3Exiting = exitingBands.has('band3')
  const band4Exiting = exitingBands.has('band4')

  return (
    <section id="about" className="about w-full relative">
      <div ref={band1Ref} className="about__band about__band-1">
        <div className="about__band-1-container">
          <div className="about__band-1-left">
            <div
              className={`about__large-number ${
                headerStage.band1Number && !band1Exiting ? 'about__large-number--visible' : ''
              } ${band1Exiting ? 'about__large-number--exiting' : ''}`}
            >
              02
            </div>
            <div className="about__chapter-marker">[ 02 ]</div>
            <div className="about__divider-vertical" />
          </div>

          <div className="about__band-1-right">
            <h1
              className={`about__section-heading ${
                headerStage.band1Heading && !band1Exiting ? 'about__section-heading--visible' : ''
              } ${band1Exiting ? 'about__section-heading--exiting' : ''}`}
            >
              About
            </h1>

            <div
              className={`about__heading-separator ${
                headerStage.band1Separator && !band1Exiting ? 'about__heading-separator--visible' : ''
              } ${band1Exiting ? 'about__heading-separator--exiting' : ''}`}
            />

            <p
              className={`about__intro-text ${
                headerStage.band1Text && !band1Exiting ? 'about__intro-text--visible' : ''
              } ${band1Exiting ? 'about__intro-text--exiting' : ''}`}
            >
              I&apos;m a full-stack developer specializing in building scalable, secure applications
              with modern technologies. I bridge the gap between user experience and system
              architecture.
            </p>
          </div>
        </div>
      </div>

      <div ref={band2Ref} className="about__band about__band-2">
        <div className="about__band-2-container">
          {skills.map((skill, index) => (
            <div
              key={skill.title}
              className={`about__capability-card ${
                visibleCards.has(index) ? 'about__capability-card--visible' : ''
              } ${exitingCards.has(index) ? 'about__capability-card--exiting' : ''}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="about__card-index">{String(index + 1).padStart(2, '0')}</div>
              <div className="about__card-icon">
                <skill.icon className="h-6 w-6" />
              </div>
              <h3 className="about__card-title">{skill.title}</h3>
              <p className="about__card-description">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="about__band about__band-3" ref={statsRef}>
        <div className="about__band-3-container">
          <div
            className={`about__stats-column ${
              headerStage.band3Stats && !band3Exiting ? 'about__stats-column--visible' : ''
            } ${band3Exiting ? 'about__stats-column--exiting' : ''}`}
          >
            <div className="about__stat-block">
              <div className="about__stat-number">
                <Counter end={20} startCount={statsVisible} />
                <span className="about__stat-plus">+</span>
              </div>
              <div className="about__stat-label">Projects</div>
            </div>

            <div className="about__stat-block">
              <div className="about__stat-number">
                <Counter end={1} startCount={statsVisible} />
                <span className="about__stat-plus">+</span>
              </div>
              <div className="about__stat-label">Years Experience</div>
            </div>

            <div className="about__stat-block">
              <div className="about__stat-number">
                <Counter end={5} startCount={statsVisible} />
                <span className="about__stat-plus">+</span>
              </div>
              <div className="about__stat-label">Tech Stacks</div>
            </div>

            <div className="about__divider-vertical about__divider-vertical-right" />
          </div>

          <div
            className={`about__story-column ${
              headerStage.band3Text && !band3Exiting ? 'about__story-column--visible' : ''
            } ${band3Exiting ? 'about__story-column--exiting' : ''}`}
          >
            <h2 className="about__story-heading">— My Story</h2>
            <div className="about__story-divider" />

            <p className="about__story-paragraph">
              I am a dedicated Software Engineering undergraduate at the Sabaragamuwa University
              of Sri Lanka with strong expertise in full-stack web development. I specialize in
              PERN and MERN stacks, building secure, scalable applications ranging from
              reservation systems to AI-powered platforms. My work reflects both technical depth
              and adaptability to complex problem domains.
            </p>

            <div className="about__story-rule" />

            <p className="about__story-paragraph">
              Beyond code, I&apos;ve worked in banking and understand system reliability,
              security, and performance at scale. I&apos;m driven by turning ambitious ideas into
              elegant solutions — whether crafting seamless interfaces, architecting robust APIs,
              or implementing enterprise-grade authentication systems.
            </p>

            <div className="about__divider-vertical about__divider-vertical-right" />
          </div>

          <div className={`about__stack-column hidden lg:block ${
              headerStage.band3Skills && !band3Exiting ? 'about__stack-column--visible' : ''
            } ${band3Exiting ? 'about__stack-column--exiting' : ''}`}
          >
            <h3 className="about__stack-label">Stack</h3>
            <div className="about__stack-divider" />
            <Skills />
          </div>
        </div>
      </div>

      <div
        ref={band4Ref}
        className={`about__band about__band-4 ${
          headerStage.band4 && !band4Exiting ? 'about__band-4--visible' : ''
        } ${band4Exiting ? 'about__band-4--exiting' : ''}`}
      >
        <div className="about__band-4-header">
          <h3 className="about__technologies-label">Technologies</h3>
        </div>
        <div className="about__band-4-divider" />
        <div className="about__band-4-content">
          <Skills isFullWidth />
        </div>
      </div>
    </section>
  )
}

export default About
