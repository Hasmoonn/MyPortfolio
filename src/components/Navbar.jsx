import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import '../styles/navbar.css'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
]

const SCROLL_THRESHOLD = 60

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')

  const progressRef = useRef(null)

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.slice(1)
      const target = document.getElementById(targetId)
      if (target) {
        document.body.classList.add('is-navigating')
        
        target.scrollIntoView({ behavior: 'smooth' })
        
        const onScrollEnd = () => {
          document.body.classList.remove('is-navigating')
          window.dispatchEvent(new CustomEvent('nav-scroll-end'))
          window.removeEventListener('scrollend', onScrollEnd)
        }
        
        if ('onscrollend' in window) {
          window.addEventListener('scrollend', onScrollEnd)
        } else {
          setTimeout(onScrollEnd, 1000)
        }
        
        setIsMobileMenuOpen(false)
      }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled((prev) => {
        const scrolled = scrollY > SCROLL_THRESHOLD
        return scrolled === prev ? prev : scrolled
      })

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const progress =
        docHeight > 0 ? Math.min(100, (scrollY / docHeight) * 100) : 0

      if (progressRef.current) {
        progressRef.current.style.width = `${progress}%`
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter(Boolean)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setActiveSection(`#${visible[0].target.id}`)
        }
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div
        ref={progressRef}
        className="navbar__progress"
        aria-hidden="true"
      />

      <nav
        className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
        aria-label="Main navigation"
      >
        <div className="mx-auto h-14 max-w-7xl px-4 md:px-6">
          <div className="navbar__inner relative flex h-14 items-center justify-between md:grid md:grid-cols-3">
            <div className="flex items-center">
              <a href="/" className="navbar__logo">
                <span className="navbar__logo-text">HASMOON_DEV</span>
              </a>
            </div>

            <div className="hidden items-center justify-center gap-x-8 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`navbar__link ${
                    activeSection === item.href ? 'navbar__link--active' : ''
                  }`}
                >
                  {item.name}
                  {activeSection === item.href && (
                    <span
                      className="navbar__link-indicator"
                      aria-hidden="true"
                    />
                  )}
                </a>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2">
              <ThemeToggle />
              <button
                type="button"
                className="navbar__menu-btn md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="navbar__mobile-panel md:hidden">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="navbar__mobile-link"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </>
  )
}

export default Navbar
