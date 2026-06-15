import {
  ArrowDown,
  ArrowRight,
  Download,
  Facebook,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import me from '../assets/me.webp'
import '../styles/hero.css'

const SOCIAL_LINKS = [
  { href: 'https://github.com/Hasmoonn', label: 'GitHub', icon: Github },
  {
    href: 'https://www.linkedin.com/in/mohamed-hasmoon-0292732a1/',
    label: 'LinkedIn',
    icon: Linkedin,
  },
  {
    href: 'https://www.facebook.com/share/1FFV5VcUhe/',
    label: 'Facebook',
    icon: Facebook,
  },
  {
    href: 'mailto:mohamedhasmoon175@gmail.com',
    label: 'Email',
    icon: Mail,
  },
]

const Hero = ({
  isRevealed = false,
  onRevealComplete,
  revealDuration = 3500,
}) => {
  const [isActive, setIsActive] = useState(false)
  const activatedRef = useRef(false)

  useEffect(() => {
    // Only ever activate once — never deactivate
    if (!isRevealed || activatedRef.current) return
    activatedRef.current = true

    const t = setTimeout(() => {
      setIsActive(true)
    }, 50)

    return () => clearTimeout(t)
  }, [isRevealed])

  useEffect(() => {
    if (!isActive || !onRevealComplete) return
    const timer = setTimeout(onRevealComplete, revealDuration)
    return () => clearTimeout(timer)
  }, [isActive, onRevealComplete, revealDuration])

  // Parallax refs
  const rafRef = useRef(null)
  const scrollTimerRef = useRef(null)
  const scrollYRef = useRef(0)
  const textColRef = useRef(null)
  const imageColRef = useRef(null)
  const contentWrapRef = useRef(null)
  const scrollHintRef = useRef(null)
  const gridRef = useRef(null)
  const accentLineRef = useRef(null)

  useEffect(() => {
    if (!isActive) return

    scrollYRef.current = window.scrollY

    const applyParallax = () => {
      const y = scrollYRef.current
      const vh = window.innerHeight
      const mobile = window.innerWidth < 1024
      const factor = mobile ? 0.5 : 1

      if (textColRef.current) {
        const drift = Math.max(0, Math.min(y * 0.14 * factor, 70 * factor))
        textColRef.current.style.transform = `translateY(-${drift}px)`
      }
      if (imageColRef.current) {
        const drift = Math.max(0, Math.min(y * 0.07 * factor, 35 * factor))
        imageColRef.current.style.transform = `translateY(${drift}px)`
      }
      if (gridRef.current) {
        const drift = Math.max(0, Math.min(y * 0.07 * factor, 35 * factor))
        gridRef.current.style.transform = `translateY(-${drift}px)`
      }
      if (contentWrapRef.current) {
        const fadeStart = mobile ? vh * 0.95 : vh * 0.65
        const fadeEnd = mobile ? vh * 1.55 : vh * 1.25
        const opacity =
          y <= fadeStart
            ? 1
            : y >= fadeEnd
              ? 0
              : 1 - (y - fadeStart) / (fadeEnd - fadeStart)
        contentWrapRef.current.style.opacity = String(
          Math.max(0, Math.min(1, opacity))
        )
      }
      if (scrollHintRef.current) {
        scrollHintRef.current.style.opacity = String(
          Math.max(0, Math.min(1, 1 - y / 60))
        )
      }
      if (accentLineRef.current) {
        const p = Math.max(0, Math.min(y / (vh * 0.75), 1))
        accentLineRef.current.style.height = `${60 + p * 25}%`
      }

      rafRef.current = null
    }

    const onScroll = () => {
      scrollYRef.current = window.scrollY
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(applyParallax)
    }

    scrollTimerRef.current = setTimeout(() => {
      window.addEventListener('scroll', onScroll, { passive: true })
      applyParallax()
    }, 400)

    return () => {
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isActive])

  return (
    <section
      className={`hero-reveal relative w-full min-h-[110vh] overflow-hidden bg-[rgb(var(--background))] pb-8${
        isActive ? ' hero-reveal--active' : ''
      }`}
      aria-label="Introduction"
    >
      <div
        className={`hero-reveal__bg absolute inset-0 overflow-hidden${
          isActive ? ' hero-reveal__bg--active' : ''
        }`}
      >
        <div
          ref={gridRef}
          className="hero-reveal__grid absolute inset-0 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="hero-reveal__scan-line absolute left-0 right-0 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      <div
        ref={accentLineRef}
        className="hero-reveal__accent-line hidden lg:block"
        aria-hidden="true"
      />

      <div
        ref={contentWrapRef}
        className="relative z-10 mx-auto flex min-h-[110vh] w-full max-w-[1400px] items-center px-5 pb-12 pt-28 sm:px-8 lg:px-14 lg:pt-32"
      >
        <div className="grid w-full grid-cols-1 items-center gap-20 lg:grid-cols-[58%_42%] lg:gap-16 xl:gap-24">

          {/* Text column */}
          <div
            ref={textColRef}
            className="hero-reveal__text-col order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left"
            style={{ willChange: 'transform' }}
          >
            <p className="hero-reveal__byline mb-8 font-mono text-xs tracking-[0.3em] text-[rgb(var(--muted-foreground))]">
              [ 01 ]
            </p>

            <h1 className="hero-reveal__headline mb-8 text-6xl font-black leading-[0.95] tracking-normal text-[rgb(var(--foreground))] lg:text-8xl xl:text-9xl">
              <span
                className="hero-reveal__word block"
              >
                Hi, I&apos;m Mohamed
              </span>
              <span
                className="hero-reveal__word block"
              >
                <span className="gradient-text">Hasmoon</span>
              </span>
            </h1>

            <div
              className="hero-reveal__separator mb-8 h-px w-10 bg-[rgb(var(--border))] lg:w-[60px]"
              aria-hidden="true"
            />

            <div className="hero-reveal__meta mb-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:justify-start">
              <div
                className="hero-reveal__roles w-full lg:w-auto"
                aria-live="polite"
                aria-label="Current role"
              >
                <span className="hero-reveal__role" aria-hidden="true">
                  Full Stack Developer
                </span>
                <span className="hero-reveal__role" aria-hidden="true">
                  MERN Stack Engineer
                </span>
                <span className="hero-reveal__role" aria-hidden="true">
                  ML Enthusiast
                </span>
                <span className="sr-only">
                  Full Stack Developer, MERN Stack Engineer, ML Enthusiast
                </span>
              </div>

              <div
                className="hero-reveal__meta-divider hidden h-[14px] w-px shrink-0 bg-[rgb(var(--border))] sm:block"
                aria-hidden="true"
              />

              <p className="hero-reveal__meta-tagline text-xs tracking-[0.15em] text-[rgb(var(--muted-foreground))]">
                Building precise, scalable software.
              </p>
            </div>

            <p className="hero-reveal__subtitle mb-12 max-w-[440px] text-sm leading-[1.8] text-[rgb(var(--muted-foreground))]">
              Passionate about web development with the MERN stack and
              exploring Machine Learning. Eager to build innovative solutions
              that make an impact.
            </p>

            <div className="hero-reveal__actions mb-12 flex w-full flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start lg:gap-4">
              <a
                download="Mohamed_Hasmoon_CV.pdf"
                href="/cv.pdf"
                className="hero-reveal__btn-primary group flex h-10 w-full items-center justify-center rounded-sm px-7 text-xs font-medium uppercase tracking-[0.12em] transition-opacity duration-200 hover:opacity-80 sm:w-auto"
              >
                <Download className="mr-2.5 h-3.5 w-3.5" />
                Download CV
              </a>

              <a
                href="#contact"
                className="hero-reveal__btn-secondary group inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-sm px-7 text-xs font-medium uppercase tracking-[0.12em] transition-opacity duration-200 sm:w-auto"
              >
                Get In Touch
                <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </div>

            <div className="hero-reveal__social flex items-center gap-2">
              {SOCIAL_LINKS.map(({ href, label, icon }) => (
                <Link
                  key={label}
                  to={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={
                    href.startsWith('mailto')
                      ? undefined
                      : 'noopener noreferrer'
                  }
                  aria-label={label}
                  className="hero-reveal__social-link flex h-8 w-8 items-center justify-center rounded-sm transition-opacity duration-200"
                >
                  {React.createElement(icon, {
                    className: 'h-3.5 w-3.5',
                    'aria-hidden': 'true',
                  })}
                </Link>
              ))}
            </div>
          </div>

          {/* Image column */}
          <div
            ref={imageColRef}
            className="hero-reveal__image-col order-1 flex justify-center lg:order-2"
            style={{ willChange: 'transform' }}
          >
            <div className="hero-reveal__avatar relative">
              <div
                className="hero-reveal__watermark absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                aria-hidden="true"
              >
                <span className="hero-reveal__watermark-text">DEV</span>
              </div>

              <div className="relative mx-auto h-[200px] w-[200px] lg:h-[380px] lg:w-[300px]">
                <div className="hero-reveal__image-ring relative h-full w-full overflow-hidden rounded-2xl">
                  <img
                    src={me}
                    alt="Mohamed Hasmoon — Software Engineer"
                    className="h-full w-full object-cover object-top"
                    loading="eager"
                    decoding="async"
                    width={300}
                    height={380}
                  />
                </div>

                <p className="hero-reveal__caption hero-reveal__caption--top absolute right-0 top-0 flex items-center gap-1.5 tracking-wider">
                  <span
                    className="hero-reveal__caption-dot"
                    aria-hidden="true"
                  />
                  Available
                </p>

                <p className="hero-reveal__caption hero-reveal__caption--bottom absolute bottom-0 left-0 tracking-wider">
                  MERN · ML · FS
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="hero-reveal__scroll-indicator absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center sm:flex"
        aria-hidden="true"
      >
        <div className="hero-reveal__scroll-hint rounded-sm p-2">
          <ArrowDown className="h-4 w-4 text-[rgb(var(--foreground))]" />
        </div>
        <div className="hero-reveal__scroll-wire" aria-hidden="true" />
      </div>
    </section>
  )
}

Hero.displayName = 'Hero'

export default Hero