import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, MapPin, Mail, Phone, ArrowUpRight, Minus } from 'lucide-react'
import emailjs from 'emailjs-com'
import { toast } from 'react-toastify'
import '../styles/contact.css'

const CONTACT_LINKS = [
  { type: 'Email', value: 'mohamedhasmoon175@gmail.com', href: 'mailto:mohamedhasmoon175@gmail.com', icon: Mail },
  { type: 'Phone', value: '+94 76 966 0195', href: 'tel:+94769660195', icon: Phone },
  { type: 'Location', value: 'Sainthamaruthu, Sri Lanka', href: null, icon: MapPin },
]

const FIELDS = [
  { id: 'name', label: 'Name', type: 'text', placeholder: 'Your full name', half: true, autoComplete: 'name' },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', half: true, autoComplete: 'email' },
  { id: 'subject', label: 'Subject', type: 'text', placeholder: 'What is this regarding?', half: false, autoComplete: 'off' },
  { id: 'message', label: 'Message', type: 'textarea', placeholder: 'Tell me everything...', half: false, autoComplete: 'off' },
]

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  // Animation states
  const [heroVisible, setHeroVisible] = useState(false)
  const [heroExit, setHeroExit] = useState(false)
  const [panelVisible, setPanelVisible] = useState(false)
  const [panelExit, setPanelExit] = useState(false)

  const sectionRef = useRef(null)
  const heroRef = useRef(null)
  const panelRef = useRef(null)
  const lastScroll = useRef(window.scrollY)

  // Scroll tracker
  useEffect(() => {
    const fn = () => { lastScroll.current = window.scrollY }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Mouse parallax on hero
  const handleMouse = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }, [])

  // Observers
  useEffect(() => {
    const makeObs = (ref, setVisible, setExit) => {
      const el = ref.current
      if (!el) return null
      const obs = new IntersectionObserver(([entry]) => {
        const down = window.scrollY >= lastScroll.current
        if (entry.isIntersecting) { setVisible(true); setExit(false) }
        else if (!down) { setExit(true); setVisible(false) }
      }, { threshold: 0.15, rootMargin: '-5% 0px -5% 0px' })
      obs.observe(el)
      return obs
    }

    const obs1 = makeObs(heroRef, setHeroVisible, setHeroExit)
    const obs2 = makeObs(panelRef, setPanelVisible, setPanelExit)

    return () => { obs1?.disconnect(); obs2?.disconnect(); }
  }, [])

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, subject: form.subject, message: form.message },
        import.meta.env.VITE_USER_ID,
      )
      if (import.meta.env.VITE_AUTOREPLY_TEMPLATE_ID) {
        try {
          await emailjs.send(
            import.meta.env.VITE_SERVICE_ID,
            import.meta.env.VITE_AUTOREPLY_TEMPLATE_ID,
            { to_name: form.name, to_email: form.email, subject: form.subject },
            import.meta.env.VITE_USER_ID,
          )
        } catch (err) {
          toast.warn('Message sent, but failed to send auto-reply.')
          console.error('Auto-reply error:', err)
        }
      }
      toast.success('Message sent successfully!')
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSent(false), 2500)
    } catch (err) {
      console.error(err)
      toast.error('Failed to send. Try again.')
    } finally {
      setSending(false)
    }
  }

  const mx = (mousePos.x - 0.5) * 20
  const my = (mousePos.y - 0.5) * 20

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="ct"
      onMouseMove={handleMouse}
    >
      {/* ====== ZONE A — CINEMATIC HERO ====== */}
      <div
        ref={heroRef}
        className={`ct__hero ${heroVisible ? 'ct__hero--in' : ''} ${heroExit ? 'ct__hero--out' : ''}`}
      >
        {/* Floating accent lines */}
        <div className="ct__hero-lines" aria-hidden="true">
          <div
            className="ct__hero-line ct__hero-line--1"
            style={{ transform: `translate(${mx * 0.3}px, ${my * 0.3}px)` }}
          />
          <div
            className="ct__hero-line ct__hero-line--2"
            style={{ transform: `translate(${mx * -0.2}px, ${my * -0.2}px)` }}
          />
          <div
            className="ct__hero-line ct__hero-line--3"
            style={{ transform: `translate(${mx * 0.15}px, ${my * -0.15}px)` }}
          />
        </div>

        {/* Chapter number — cinematic watermark */}
        <div
          className="ct__hero-watermark"
          style={{ transform: `translate(${mx * 0.5}px, ${my * 0.5}px)` }}
          aria-hidden="true"
        >
          05
        </div>

        {/* Main heading stack */}
        <div className="ct__hero-content">
          <div className="ct__hero-eyebrow">
            <Minus className="ct__hero-dash" />
            <span>Get in Touch</span>
          </div>

          <h1 className="ct__hero-title">
            <span className="ct__hero-title-line">
              <span className="ct__hero-title-word">Let's</span>
            </span>
            <span className="ct__hero-title-line">
              <span className="ct__hero-title-word ct__hero-title-word--accent">Create</span>
            </span>
            <span className="ct__hero-title-line">
              <span className="ct__hero-title-word">Together.</span>
            </span>
          </h1>

          <p className="ct__hero-desc">
            Available for freelance, full-time, and collaborations.
            <br />
            Let's turn your vision into reality.
          </p>

          {/* Status pill */}
          <div className="ct__hero-status">
            <span className="ct__hero-status-dot" />
            <span className="ct__hero-status-text">Available Now</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="ct__hero-scroll" aria-hidden="true">
          <div className="ct__hero-scroll-line" />
          <span className="ct__hero-scroll-text">Scroll</span>
        </div>
      </div>

      {/* ====== ZONE B — FORM + INFO PANEL ====== */}
      <div
        ref={panelRef}
        className={`ct__panel ${panelVisible ? 'ct__panel--in' : ''} ${panelExit ? 'ct__panel--out' : ''}`}
      >
        {/* Left — Form */}
        <div className="ct__form-side">
          <div className="ct__form-head">
            <span className="ct__form-head-num">01</span>
            <span className="ct__form-head-label">Send a Message</span>
          </div>

          <form onSubmit={handleSubmit} className="ct__form">
            <div className="ct__form-grid">
              {FIELDS.map((f, i) => (
                <div
                  key={f.id}
                  className={`ct__field ${f.half ? 'ct__field--half' : ''} ${
                    focused === f.id ? 'ct__field--focus' : ''
                  } ${form[f.id] ? 'ct__field--filled' : ''}`}
                  style={{ '--field-i': i }}
                >
                  <label htmlFor={`ct-${f.id}`} className="ct__field-label">
                    {f.label}
                  </label>

                  {f.type === 'textarea' ? (
                    <textarea
                      id={`ct-${f.id}`}
                      name={f.id}
                      value={form[f.id]}
                      onChange={handleChange}
                      onFocus={() => setFocused(f.id)}
                      onBlur={() => setFocused(null)}
                      placeholder={f.placeholder}
                      required
                      rows={5}
                      className="ct__input ct__input--textarea"
                    />
                  ) : (
                    <input
                      id={`ct-${f.id}`}
                      type={f.type}
                      name={f.id}
                      value={form[f.id]}
                      onChange={handleChange}
                      onFocus={() => setFocused(f.id)}
                      onBlur={() => setFocused(null)}
                      placeholder={f.placeholder}
                      required
                      className="ct__input"
                      autoComplete={f.autoComplete}
                    />
                  )}

                  <div className="ct__field-bar" />
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={sending}
              className={`ct__submit ${sent ? 'ct__submit--sent' : ''}`}
            >
              <span className="ct__submit-bg" />
              <span className="ct__submit-content">
                {sent ? (
                  <>
                    <span className="ct__submit-check">✓</span>
                    <span>Sent Successfully</span>
                  </>
                ) : sending ? (
                  <>
                    <span className="ct__submit-spinner" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="ct__submit-icon" />
                    <span>Send Message</span>
                    <ArrowUpRight className="ct__submit-arrow" />
                  </>
                )}
              </span>
            </button>
          </form>
        </div>

        {/* Right — Info */}
        <div className="ct__info-side">
          <div className="ct__info-head">
            <span className="ct__info-head-num">02</span>
            <span className="ct__info-head-label">Contact Details</span>
          </div>

          <div className="ct__info-channels">
            {CONTACT_LINKS.map((link, i) => {
              const Icon = link.icon
              const Tag = link.href ? 'a' : 'div'
              return (
                <Tag
                  key={i}
                  {...(link.href ? { href: link.href } : {})}
                  className={`ct__channel ${link.href ? 'ct__channel--link' : ''}`}
                  style={{ '--ch-i': i }}
                >
                  <div className="ct__channel-icon">
                    <Icon />
                  </div>
                  <div className="ct__channel-text">
                    <span className="ct__channel-type">{link.type}</span>
                    <span className="ct__channel-val">{link.value}</span>
                  </div>
                  {link.href && <ArrowUpRight className="ct__channel-arr" />}
                </Tag>
              )
            })}
          </div>

          {/* Decorative quote block */}
          <div className="ct__quote">
            <div className="ct__quote-mark" aria-hidden="true">"</div>
            <p className="ct__quote-text">
              Great things are built through great collaboration. Every project starts with a conversation.
            </p>
          </div>

          {/* Response time */}
          <div className="ct__response">
            <div className="ct__response-bar">
              <div className="ct__response-fill" />
            </div>
            <span className="ct__response-text">Avg. response: &lt; 24 hours</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact