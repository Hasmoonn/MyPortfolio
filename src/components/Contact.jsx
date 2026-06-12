import React, { useState, useRef, useEffect } from 'react'
import { Send, ArrowRight, Github, Linkedin, Facebook } from 'lucide-react'
import emailjs from 'emailjs-com'
import { toast } from 'react-toastify'
import '../styles/contact.css'

const CONTACT_INFO = [
  {
    index: '01',
    type: 'Email',
    value: 'mohamedhasmoon175@gmail.com',
    href: 'mailto:mohamedhasmoon175@gmail.com',
  },
  {
    index: '02',
    type: 'Phone',
    value: '+94 76 966 0195',
    href: 'tel:+94769660195',
  },
  {
    index: '03',
    type: 'Location',
    value: 'No.538, Lotus road, Sainthamaruthu 14, Sri Lanka',
    href: null,
  },
]

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const headerRef = useRef(null)
  const leftPanelRef = useRef(null)
  const rightPanelRef = useRef(null)
  const bottomBarRef = useRef(null)
  const headerAnimatedRef = useRef(false)
  const lastScrollY = useRef(window.scrollY)

  const [headerStage, setHeaderStage] = useState({
    number: false,
    heading: false,
    separator: false,
    text: false,
  })
  const [leftVisible, setLeftVisible] = useState(false)
  const [leftExiting, setLeftExiting] = useState(false)
  const [rightVisible, setRightVisible] = useState(false)
  const [rightExiting, setRightExiting] = useState(false)
  const [bottomVisible, setBottomVisible] = useState(false)
  const [bottomExiting, setBottomExiting] = useState(false)
  const [headerExiting, setHeaderExiting] = useState(false)

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      lastScrollY.current = window.scrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Zone 1 — Header animation
  useEffect(() => {
    const el = headerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const scrollingDown = window.scrollY >= lastScrollY.current

        if (entry.isIntersecting) {
          setHeaderExiting(false)
          if (!headerAnimatedRef.current) {
            headerAnimatedRef.current = true
            setTimeout(() => setHeaderStage((p) => ({ ...p, number: true })), 0)
            setTimeout(() => setHeaderStage((p) => ({ ...p, heading: true })), 150)
            setTimeout(() => setHeaderStage((p) => ({ ...p, separator: true })), 200)
            setTimeout(() => setHeaderStage((p) => ({ ...p, text: true })), 300)
          }
        } else if (!scrollingDown) {
          setHeaderExiting(true)
        }
      },
      { threshold: 0.15, rootMargin: '-5% 0px -5% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Zone 2 — Left panel
  useEffect(() => {
    const el = leftPanelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const scrollingDown = window.scrollY >= lastScrollY.current
        if (entry.isIntersecting) {
          setLeftVisible(true)
          setLeftExiting(false)
        } else if (!scrollingDown) {
          setLeftExiting(true)
          setLeftVisible(false)
        }
      },
      { threshold: 0.15, rootMargin: '-5% 0px -5% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Zone 2 — Right panel
  useEffect(() => {
    const el = rightPanelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const scrollingDown = window.scrollY >= lastScrollY.current
        if (entry.isIntersecting) {
          setRightVisible(true)
          setRightExiting(false)
        } else if (!scrollingDown) {
          setRightExiting(true)
          setRightVisible(false)
        }
      },
      { threshold: 0.15, rootMargin: '-5% 0px -5% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Zone 3 — Bottom bar
  useEffect(() => {
    const el = bottomBarRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const scrollingDown = window.scrollY >= lastScrollY.current
        if (entry.isIntersecting) {
          setBottomVisible(true)
          setBottomExiting(false)
        } else if (!scrollingDown) {
          setBottomExiting(true)
          setBottomVisible(false)
        }
      },
      { threshold: 0.15, rootMargin: '-5% 0px -5% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSending(true)

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )

      toast.success('Message sent successfully!')
      setIsSent(true)
      setFormData({ name: '', email: '', subject: '', message: '' })

      setTimeout(() => setIsSent(false), 2000)
    } catch (error) {
      console.error('EmailJS Error:', error)
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  const getButtonContent = () => {
    if (isSent) {
      return (
        <>
          <span className="contact__btn-check" aria-hidden="true">✓</span>
          Message Sent
        </>
      )
    }
    if (isSending) {
      return (
        <>
          <span className="contact__btn-spinner" aria-hidden="true" />
          Sending...
        </>
      )
    }
    return (
      <>
        <Send className="contact__btn-icon" aria-hidden="true" />
        Send Message
      </>
    )
  }

  return (
    <section id="contact" className="contact">
      {/* ==================== ZONE 1 — HEADER ==================== */}
      <div ref={headerRef} className="contact__zone-1">
        <div className="contact__zone-1-container">
          <div className="contact__zone-1-left">
            <div
              className={`contact__large-number ${
                headerStage.number && !headerExiting
                  ? 'contact__large-number--visible'
                  : ''
              } ${headerExiting ? 'contact__large-number--exiting' : ''}`}
            >
              05
            </div>
            <div className="contact__chapter-marker">[ 05 ]</div>
          </div>

          <div className="contact__zone-1-right">
            <h1
              className={`contact__section-heading ${
                headerStage.heading && !headerExiting
                  ? 'contact__section-heading--visible'
                  : ''
              } ${headerExiting ? 'contact__section-heading--exiting' : ''}`}
            >
              Contact
            </h1>
            <div
              className={`contact__heading-separator ${
                headerStage.separator && !headerExiting
                  ? 'contact__heading-separator--visible'
                  : ''
              } ${headerExiting ? 'contact__heading-separator--exiting' : ''}`}
            />
            <p
              className={`contact__intro-text ${
                headerStage.text && !headerExiting
                  ? 'contact__intro-text--visible'
                  : ''
              } ${headerExiting ? 'contact__intro-text--exiting' : ''}`}
            >
              Available for freelance work, full-time opportunities, and
              technical collaborations.
            </p>
          </div>
        </div>
      </div>

      {/* ==================== ZONE 2 — MAIN STAGE ==================== */}
      <div className="contact__zone-2">
        {/* Left Panel — Contact Information */}
        <div
          ref={leftPanelRef}
          className={`contact__left-panel ${
            leftVisible ? 'contact__left-panel--visible' : ''
          } ${leftExiting ? 'contact__left-panel--exiting' : ''}`}
        >
          {/* Section A — Identity Block */}
          <div className="contact__info-section">
            <div className="contact__info-label">— Direct Contact</div>
            <div className="contact__info-divider" />

            {CONTACT_INFO.map((item, idx) => (
              <div
                key={item.index}
                className="contact__info-row"
                style={{ transitionDelay: `${idx * 60}ms` }}
              >
                <span className="contact__info-index">{item.index}</span>
                <div className="contact__info-details">
                  <span className="contact__info-type">{item.type}</span>
                  <span className="contact__info-value">{item.value}</span>
                </div>
                {item.href && (
                  <a
                    href={item.href}
                    className="contact__info-arrow"
                    aria-label={`${item.type} link`}
                  >
                    <ArrowRight className="h-3 w-3" />
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Section B — Availability */}
          <div className="contact__status-section">
            <div className="contact__info-label">— Status</div>
            <div className="contact__status-row">
              <span className="contact__status-dot" aria-hidden="true" />
              <span className="contact__status-text">
                Available for new projects
              </span>
            </div>
            <div className="contact__status-note">
              Response within 24 hours
            </div>
          </div>
        </div>

        {/* Right Panel — Contact Form */}
        <div
          ref={rightPanelRef}
          className={`contact__right-panel ${
            rightVisible ? 'contact__right-panel--visible' : ''
          } ${rightExiting ? 'contact__right-panel--exiting' : ''}`}
        >
          <div className="contact__form-label">— Send a Message</div>
          <div className="contact__form-divider" />

          <form onSubmit={handleSubmit} className="contact__form">
            <div className="contact__form-row-double">
              <div
                className="contact__field"
                style={{ transitionDelay: '0ms' }}
              >
                <label htmlFor="contact-name" className="contact__field-label">
                  01 — Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="contact__field-input"
                  autoComplete="name"
                />
              </div>

              <div
                className="contact__field"
                style={{ transitionDelay: '60ms' }}
              >
                <label htmlFor="contact-email" className="contact__field-label">
                  02 — Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="contact__field-input"
                  autoComplete="email"
                />
              </div>
            </div>

            <div
              className="contact__field"
              style={{ transitionDelay: '120ms' }}
            >
              <label htmlFor="contact-subject" className="contact__field-label">
                03 — Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project inquiry"
                required
                className="contact__field-input"
                autoComplete="off"
              />
            </div>

            <div
              className="contact__field"
              style={{ transitionDelay: '180ms' }}
            >
              <label htmlFor="contact-message" className="contact__field-label">
                04 — Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                required
                className="contact__field-input contact__field-textarea"
                rows={5}
              />
            </div>

            <div
              className="contact__field contact__field--submit"
              style={{ transitionDelay: '240ms' }}
            >
              <button
                type="submit"
                disabled={isSending}
                className={`contact__submit-btn ${
                  isSent ? 'contact__submit-btn--sent' : ''
                }`}
              >
                {getButtonContent()}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact