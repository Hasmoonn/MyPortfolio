import React, { useState, useRef, useEffect } from 'react'
import { Github, Linkedin, Facebook, Mail, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import '../styles/footer.css'

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
]

const INFO_ITEMS = [
  'Sri Lanka',
  'UTC+5:30',
  'Open to Remote',
]

const SOCIAL_LINKS = [
  { name: 'GitHub', href: 'https://github.com/Hasmoonn', icon: Github },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mohamed-hasmoon-0292732a1/',
    icon: Linkedin,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/1FFV5VcUhe/',
    icon: Facebook,
  },
  {
    name: 'Email',
    href: 'mailto:mohamedhasmoon175@gmail.com',
    icon: Mail,
  },
]

const Footer = () => {
  const band1LeftRef = useRef(null)
  const band1RightRef = useRef(null)
  const band2Ref = useRef(null)
  const band3Ref = useRef(null)
  const lastScrollY = useRef(window.scrollY)

  const [band1LeftVisible, setBand1LeftVisible] = useState(false)
  const [band1LeftExiting, setBand1LeftExiting] = useState(false)
  const [band1RightVisible, setBand1RightVisible] = useState(false)
  const [band1RightExiting, setBand1RightExiting] = useState(false)

  const [band2ColVisible, setBand2ColVisible] = useState([false, false, false])
  const [band2Exiting, setBand2Exiting] = useState(false)

  const [band3Visible, setBand3Visible] = useState(false)
  const [band3Exiting, setBand3Exiting] = useState(false)

  // Inner stagger states for Band 1
  const [leftStage, setLeftStage] = useState({
    label: false,
    statement: false,
    sub: false,
  })
  const [rightStage, setRightStage] = useState({
    label: false,
    email: false,
    dot: false,
  })

  const leftAnimatedRef = useRef(false)
  const rightAnimatedRef = useRef(false)
  const band2AnimatedRef = useRef(false)

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      lastScrollY.current = window.scrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Band 1 — Left column
  useEffect(() => {
    const el = band1LeftRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const scrollingDown = window.scrollY >= lastScrollY.current
        if (entry.isIntersecting) {
          setBand1LeftVisible(true)
          setBand1LeftExiting(false)
          if (!leftAnimatedRef.current) {
            leftAnimatedRef.current = true
            setTimeout(
              () => setLeftStage((p) => ({ ...p, label: true })),
              0,
            )
            setTimeout(
              () => setLeftStage((p) => ({ ...p, statement: true })),
              150,
            )
            setTimeout(
              () => setLeftStage((p) => ({ ...p, sub: true })),
              300,
            )
          }
        } else if (!scrollingDown) {
          setBand1LeftExiting(true)
          setBand1LeftVisible(false)
        }
      },
      { threshold: 0.1, rootMargin: '-5% 0px -5% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Band 1 — Right column
  useEffect(() => {
    const el = band1RightRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const scrollingDown = window.scrollY >= lastScrollY.current
        if (entry.isIntersecting) {
          setBand1RightVisible(true)
          setBand1RightExiting(false)
          if (!rightAnimatedRef.current) {
            rightAnimatedRef.current = true
            setTimeout(
              () => setRightStage((p) => ({ ...p, label: true })),
              100,
            )
            setTimeout(
              () => setRightStage((p) => ({ ...p, email: true })),
              200,
            )
            setTimeout(
              () => setRightStage((p) => ({ ...p, dot: true })),
              350,
            )
          }
        } else if (!scrollingDown) {
          setBand1RightExiting(true)
          setBand1RightVisible(false)
        }
      },
      { threshold: 0.1, rootMargin: '-5% 0px -5% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Band 2 — Navigation band (staggered columns)
  useEffect(() => {
    const el = band2Ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const scrollingDown = window.scrollY >= lastScrollY.current
        if (entry.isIntersecting) {
          setBand2Exiting(false)
          if (!band2AnimatedRef.current) {
            band2AnimatedRef.current = true
            ;[0, 1, 2].forEach((i) => {
              setTimeout(() => {
                setBand2ColVisible((prev) => {
                  const next = [...prev]
                  next[i] = true
                  return next
                })
              }, i * 80)
            })
          }
        } else if (!scrollingDown) {
          setBand2Exiting(true)
          setBand2ColVisible([false, false, false])
          band2AnimatedRef.current = false
        }
      },
      { threshold: 0.1, rootMargin: '-5% 0px -5% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Band 3 — Closing bar
  useEffect(() => {
    const el = band3Ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const scrollingDown = window.scrollY >= lastScrollY.current
        if (entry.isIntersecting) {
          setBand3Visible(true)
          setBand3Exiting(false)
        } else if (!scrollingDown) {
          setBand3Exiting(true)
          setBand3Visible(false)
        }
      },
      { threshold: 0.1, rootMargin: '-5% 0px -5% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <footer className="footer" aria-label="Site footer">
      {/* ==================== BAND 1 — STATEMENT ==================== */}
      <div className="footer__band-1">
        <div className="footer__band-1-inner">
          {/* Left column */}
          <div
            ref={band1LeftRef}
            className={`footer__band-1-left ${
              band1LeftVisible ? 'footer__band-1-left--visible' : ''
            } ${band1LeftExiting ? 'footer__band-1-left--exiting' : ''}`}
          >
            <span
              className={`footer__statement-label ${
                leftStage.label ? 'footer__statement-label--visible' : ''
              }`}
            >
              — Let&apos;s Build Something
            </span>
            <div
              className={`footer__statement-rule ${
                leftStage.label ? 'footer__statement-rule--visible' : ''
              }`}
            />
            <h2
              className={`footer__statement ${
                leftStage.statement ? 'footer__statement--visible' : ''
              }`}
            >
              Available for work.
            </h2>
            <p
              className={`footer__statement-sub ${
                leftStage.sub ? 'footer__statement-sub--visible' : ''
              }`}
            >
              Open to freelance, full-time, and collaborations.
            </p>
          </div>

          {/* Right column */}
          <div
            ref={band1RightRef}
            className={`footer__band-1-right ${
              band1RightVisible ? 'footer__band-1-right--visible' : ''
            } ${band1RightExiting ? 'footer__band-1-right--exiting' : ''}`}
          >
            <div className="footer__cta-top">
              <span
                className={`footer__cta-label ${
                  rightStage.label ? 'footer__cta-label--visible' : ''
                }`}
              >
                — Start a conversation
              </span>
              <a
                href="mailto:mohamedhasmoon175@gmail.com"
                className={`footer__email-link ${
                  rightStage.email ? 'footer__email-link--visible' : ''
                }`}
                aria-label="Send email to Mohamed Hasmoon"
              >
                <span className="footer__email-text">
                  mohamedhasmoon175@gmail.com
                </span>
                <ArrowRight
                  className="footer__email-arrow"
                  aria-hidden="true"
                />
              </a>
            </div>

            <div
              className={`footer__availability ${
                rightStage.dot ? 'footer__availability--visible' : ''
              }`}
            >
              <span className="footer__pulse-dot" aria-hidden="true" />
              <span className="footer__availability-text">Available now</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== BAND 2 — NAVIGATION ==================== */}
      <div ref={band2Ref} className="footer__band-2">
        <div className="footer__band-2-inner">
          {/* Logo column */}
          <div
            className={`footer__nav-col footer__nav-col--logo ${
              band2ColVisible[0] && !band2Exiting
                ? 'footer__nav-col--visible'
                : ''
            } ${band2Exiting ? 'footer__nav-col--exiting' : ''}`}
          >
            <a href="#home" className="footer__logo" aria-label="Back to top">
              <span className="footer__logo-text">HASMOON_DEV</span>
            </a>
            <p className="footer__logo-desc">
              Software Engineer · MERN Stack · ML
            </p>
          </div>

          {/* Navigation links column */}
          <div
            className={`footer__nav-col footer__nav-col--links ${
              band2ColVisible[1] && !band2Exiting
                ? 'footer__nav-col--visible'
                : ''
            } ${band2Exiting ? 'footer__nav-col--exiting' : ''}`}
            style={{ transitionDelay: band2Exiting ? '0ms' : '80ms' }}
          >
            <div className="footer__links-grid">
              <div className="footer__links-sub">
                <span className="footer__nav-col-label">Navigation</span>
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="footer__nav-link"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="footer__links-sub">
                <span className="footer__nav-col-label">Info</span>
                {INFO_ITEMS.map((item) => (
                  <span key={item} className="footer__info-item">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Social column */}
          <div
            className={`footer__nav-col footer__nav-col--social ${
              band2ColVisible[2] && !band2Exiting
                ? 'footer__nav-col--visible'
                : ''
            } ${band2Exiting ? 'footer__nav-col--exiting' : ''}`}
            style={{ transitionDelay: band2Exiting ? '0ms' : '160ms' }}
          >
            <span className="footer__nav-col-label">Connect</span>
            {SOCIAL_LINKS.map((social, idx) => {
              const Icon = social.icon
              return (
                <Link
                  key={social.name}
                  to={social.href}
                  target={
                    social.href.startsWith('mailto') ? undefined : '_blank'
                  }
                  rel={
                    social.href.startsWith('mailto')
                      ? undefined
                      : 'noopener noreferrer'
                  }
                  className="footer__social-row"
                  aria-label={social.name}
                  style={{
                    transitionDelay:
                      band2ColVisible[2] && !band2Exiting
                        ? `${160 + idx * 40}ms`
                        : '0ms',
                  }}
                >
                  <span className="footer__social-name">{social.name}</span>
                  <Icon
                    className="footer__social-icon"
                    aria-hidden="true"
                  />
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* ==================== BAND 3 — CLOSING BAR ==================== */}
      <div
        ref={band3Ref}
        className={`footer__band-3 ${
          band3Visible ? 'footer__band-3--visible' : ''
        } ${band3Exiting ? 'footer__band-3--exiting' : ''}`}
      >
        <div className="footer__band-3-inner">
          <span className="footer__copy">© 2025 Mohamed Hasmoon</span>
          <span className="footer__build-info" aria-hidden="true">
            React · Tailwind · Vite
          </span>
          <span className="footer__attribution">
            Designed &amp; Built by Hasmoon
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer