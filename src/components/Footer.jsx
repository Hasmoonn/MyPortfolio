import { useState, useRef, useEffect } from 'react'
import { Github, Linkedin, Facebook, Mail, ArrowUpRight } from 'lucide-react'
import '../styles/footer.css'

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
]

const SOCIAL_LINKS = [
  { name: 'GitHub', href: 'https://github.com/Hasmoonn', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/mohamed-hasmoon-0292732a1/', icon: Linkedin },
  { name: 'Facebook', href: 'https://www.facebook.com/share/1FFV5VcUhe/', icon: Facebook },
  { name: 'Email', href: 'mailto:mohamedhasmoon175@gmail.com', icon: Mail },
]

const Footer = () => {
  const [heroVis, setHeroVis] = useState(false)
  const [heroExit, setHeroExit] = useState(false)
  const [gridVis, setGridVis] = useState(false)
  const [gridExit, setGridExit] = useState(false)
  const [barVis, setBarVis] = useState(false)
  const [barExit, setBarExit] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  const footerRef = useRef(null)
  const heroRef = useRef(null)
  const gridRef = useRef(null)
  const barRef = useRef(null)
  const lastScroll = useRef(window.scrollY)

  useEffect(() => {
    const fn = () => { lastScroll.current = window.scrollY }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const handleMouse = (e) => {
    const rect = footerRef.current?.getBoundingClientRect()
    if (!rect) return
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  useEffect(() => {
    const makeObs = (ref, setVis, setEx) => {
      const el = ref.current
      if (!el) return null
      const obs = new IntersectionObserver(([entry]) => {
        const down = window.scrollY >= lastScroll.current
        if (entry.isIntersecting) { setVis(true); setEx(false) }
        else if (!down) { setEx(true); setVis(false) }
      }, { threshold: 0.1, rootMargin: '-5% 0px -5% 0px' })
      obs.observe(el)
      return obs
    }
    const o1 = makeObs(heroRef, setHeroVis, setHeroExit)
    const o2 = makeObs(gridRef, setGridVis, setGridExit)
    const o3 = makeObs(barRef, setBarVis, setBarExit)
    return () => { o1?.disconnect(); o2?.disconnect(); o3?.disconnect() }
  }, [])

  const mx = (mousePos.x - 0.5) * 15
  const my = (mousePos.y - 0.5) * 15

  return (
    <footer
      ref={footerRef}
      className="ft"
      aria-label="Site footer"
      onMouseMove={handleMouse}
    >
      {/* ====== BAND 1 — CINEMATIC CTA ====== */}
      <div
        ref={heroRef}
        className={`ft__hero ${heroVis ? 'ft__hero--in' : ''} ${heroExit ? 'ft__hero--out' : ''}`}
      >
        {/* Parallax watermark */}
        <div
          className="ft__hero-watermark"
          style={{ transform: `translate(${mx * 0.8}px, ${my * 0.8}px)` }}
          aria-hidden="true"
        >
          MOON
        </div>

        {/* Floating accent lines */}
        <div className="ft__hero-lines" aria-hidden="true">
          <div
            className="ft__hero-line ft__hero-line--1"
            style={{ transform: `translate(${mx * 0.3}px, ${my * 0.2}px)` }}
          />
          <div
            className="ft__hero-line ft__hero-line--2"
            style={{ transform: `translate(${mx * -0.2}px, ${my * -0.15}px)` }}
          />
        </div>

        <div className="ft__hero-content">
          <div className="ft__hero-eyebrow">
            <span className="ft__hero-eyebrow-line" />
            <span>Let's Build Something</span>
          </div>

          <h2 className="ft__hero-title">
            <span className="ft__hero-title-line">
              <span className="ft__hero-title-word">Available</span>
            </span>
            <span className="ft__hero-title-line">
              <span className="ft__hero-title-word ft__hero-title-word--accent">for Work.</span>
            </span>
          </h2>

          <p className="ft__hero-desc">
            Open to freelance, full-time, and collaborations.
          </p>

          <a
            href="mailto:mohamedhasmoon175@gmail.com"
            className="ft__hero-cta"
          >
            <span className="ft__hero-cta-bg" />
            <span className="ft__hero-cta-content">
              <Mail className="ft__hero-cta-icon" />
              <span>mohamedhasmoon175@gmail.com</span>
              <ArrowUpRight className="ft__hero-cta-arrow" />
            </span>
          </a>

          <div className="ft__hero-status">
            <span className="ft__hero-status-dot" />
            <span>Available Now</span>
          </div>
        </div>
      </div>

      {/* ====== BAND 2 — NAVIGATION GRID ====== */}
      <div
        ref={gridRef}
        className={`ft__grid ${gridVis ? 'ft__grid--in' : ''} ${gridExit ? 'ft__grid--out' : ''}`}
      >
        {/* Col 1 — Brand */}
        <div className="ft__grid-col ft__grid-col--brand">
          <a href="#home" className="ft__brand" aria-label="Back to top">
            HASMOON_DEV
          </a>
          <p className="ft__brand-desc">
            Software Engineer crafting modern digital experiences.
          </p>
        </div>

        {/* Col 2 — Navigation */}
        <div className="ft__grid-col">
          <span className="ft__grid-label">Navigation</span>
          <div className="ft__grid-links">
            {NAV_LINKS.map((link) => (
              <a key={link.name} href={link.href} className="ft__grid-link">
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Col 3 — Social */}
        <div className="ft__grid-col">
          <span className="ft__grid-label">Connect</span>
          <div className="ft__grid-links">
            {SOCIAL_LINKS.map((s) => {
              const Icon = s.icon
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={s.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="ft__grid-social"
                >
                  <Icon className="ft__grid-social-icon" />
                  <span>{s.name}</span>
                  <ArrowUpRight className="ft__grid-social-arrow" />
                </a>
              )
            })}
          </div>
        </div>

        {/* Col 4 — Info */}
        <div className="ft__grid-col">
          <span className="ft__grid-label">Info</span>
          <div className="ft__grid-links">
            <span className="ft__grid-info">Sri Lanka</span>
            <span className="ft__grid-info">UTC +5:30</span>
            <span className="ft__grid-info">Open to Remote</span>
          </div>
        </div>
      </div>

      {/* ====== BAND 3 — BOTTOM BAR ====== */}
      <div
        ref={barRef}
        className={`ft__bar ${barVis ? 'ft__bar--in' : ''} ${barExit ? 'ft__bar--out' : ''}`}
      >
        <span className="ft__bar-text">© 2025 Mohamed Hasmoon</span>
        <div className="ft__bar-center">
          <span className="ft__bar-dot" />
          <span className="ft__bar-text">React · Tailwind · Vite</span>
          <span className="ft__bar-dot" />
        </div>
        <span className="ft__bar-text ft__bar-text--accent">
          Designed & Built by Hasmoon
        </span>
      </div>
    </footer>
  )
}

export default Footer