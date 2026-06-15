import { useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronUp, Award, ExternalLink } from 'lucide-react'
import { certifications, education } from '../assets/assets.js'
import '../styles/education.css'

const CERTS_INITIAL = 4

const Education = () => {
  const [showAllCerts, setShowAllCerts] = useState(false)
  const [headerStage, setHeaderStage] = useState({
    number: false,
    heading: false,
    separator: false,
    text: false,
  })
  const [headerExiting, setHeaderExiting] = useState(false)
  const [visibleEduRecords, setVisibleEduRecords] = useState(new Set())
  const [visibleCertRows, setVisibleCertRows] = useState(new Set())
  const [exitingCertRows, setExitingCertRows] = useState(new Set())
  const [hoveredCert, setHoveredCert] = useState(null)

  const headerRef = useRef(null)
  const headerAnimatedRef = useRef(false)
  const lastScrollY = useRef(window.scrollY)
  const eduRecordRefs = useRef([])
  const certRowRefs = useRef([])

  const displayedCerts = showAllCerts
    ? certifications
    : certifications.slice(0, CERTS_INITIAL)

  useEffect(() => {
    const handleScroll = () => {
      lastScrollY.current = window.scrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  useEffect(() => {
    const observers = []
    const refs = eduRecordRefs.current.filter(Boolean)

    refs.forEach((el, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleEduRecords((prev) => new Set([...prev, index]))
          }
        },
        { threshold: 0.15, rootMargin: '-5% 0px -5% 0px' },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  useEffect(() => {
    const observers = []
    const timer = setTimeout(() => {
      const refs = certRowRefs.current.filter(Boolean)
      refs.forEach((el, index) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            const scrollingDown = window.scrollY >= lastScrollY.current
            if (entry.isIntersecting) {
              setVisibleCertRows((prev) => new Set([...prev, index]))
              setExitingCertRows((prev) => {
                const next = new Set(prev)
                next.delete(index)
                return next
              })
            } else if (!scrollingDown) {
              setExitingCertRows((prev) => new Set([...prev, index]))
              setVisibleCertRows((prev) => {
                const next = new Set(prev)
                next.delete(index)
                return next
              })
            }
          },
          { threshold: 0.1, rootMargin: '-5% 0px -5% 0px' },
        )
        observer.observe(el)
        observers.push(observer)
      })
    }, 50)

    return () => {
      clearTimeout(timer)
      observers.forEach((o) => o.disconnect())
    }
  }, [displayedCerts.length])

  const handleToggleCerts = () => {
    setShowAllCerts((prev) => !prev)
    setTimeout(() => setVisibleCertRows(new Set()), 50)
  }

  return (
    <section id="education" className="edu">

      {/* ==================== ZONE 1 — HEADER ==================== */}
      <div ref={headerRef} className="edu__zone-1">
        <div className="edu__zone-1-container">
          <div className="edu__zone-1-left">
            <div
              className={`edu__large-number ${
                headerStage.number && !headerExiting
                  ? 'edu__large-number--visible'
                  : ''
              } ${headerExiting ? 'edu__large-number--exiting' : ''}`}
            >
              04
            </div>
            <div className="edu__chapter-marker">[ 04 ]</div>
          </div>

          <div className="edu__zone-1-right">
            <h1
              className={`edu__section-heading ${
                headerStage.heading && !headerExiting
                  ? 'edu__section-heading--visible'
                  : ''
              } ${headerExiting ? 'edu__section-heading--exiting' : ''}`}
            >
              Education
            </h1>
            <div
              className={`edu__heading-separator ${
                headerStage.separator && !headerExiting
                  ? 'edu__heading-separator--visible'
                  : ''
              } ${headerExiting ? 'edu__heading-separator--exiting' : ''}`}
            />
            <p
              className={`edu__intro-text ${
                headerStage.text && !headerExiting
                  ? 'edu__intro-text--visible'
                  : ''
              } ${headerExiting ? 'edu__intro-text--exiting' : ''}`}
            >
              Academic foundation and professional certifications that shaped
              my engineering practice.
            </p>
          </div>
        </div>
      </div>

      {/* ==================== ZONE 2 — ACADEMIC TIMELINE ==================== */}
      <div className="edu__zone-2">
        <div className="edu__spine" aria-hidden="true">
          <div className="edu__spine-line" />
        </div>

        <div className="edu__records">
          {education.map((item, index) => (
            <div
              key={`${item.degree}-${index}`}
              ref={(el) => {
                eduRecordRefs.current[index] = el
              }}
              className={`edu__record ${
                visibleEduRecords.has(index) ? 'edu__record--visible' : ''
              }`}
            >
              <div
                className={`edu__spine-marker ${
                  visibleEduRecords.has(index)
                    ? 'edu__spine-marker--visible'
                    : ''
                }`}
                aria-hidden="true"
              />

              <div className="edu__record-inner">
                <div className="edu__record-date">
                  <span className="edu__date-text">{item.period}</span>
                </div>

                <div className="edu__record-degree">
                  <span className="edu__degree-label">— Academic Degree</span>
                  <h3 className="edu__degree-title">{item.degree}</h3>
                  <p className="edu__institution">{item.school}</p>
                  <div className="edu__degree-rule" />
                  <p className="edu__degree-description">{item.description}</p>
                </div>

                <div className="edu__record-achievements">
                  <span className="edu__achievements-label">Achievements</span>
                  {item.achievements && item.achievements.length > 0 ? (
                    item.achievements.map((ach, i) => (
                      <div key={i} className="edu__achievement-item">
                        — {ach}
                      </div>
                    ))
                  ) : (
                    <div className="edu__achievement-item edu__achievement-item--empty">
                      —
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==================== ZONE 3 — CERTIFICATIONS ==================== */}
      <div className="edu__zone-3">

        {/* Section label */}
        <div className="edu__cert-section-header">
          <div className="edu__cert-section-label">
            <Award className="edu__cert-section-icon" />
            <span>Professional Certifications</span>
          </div>
          <div className="edu__cert-section-count">
            {certifications.length} Credentials
          </div>
        </div>

        {/* Certification cards grid */}
        <div className="edu__cert-grid">
          {displayedCerts.map((cert, index) => (
            <div
              key={`${cert.title}-${index}`}
              ref={(el) => {
                certRowRefs.current[index] = el
              }}
              className={`edu__cert-card ${
                visibleCertRows.has(index) ? 'edu__cert-card--visible' : ''
              } ${exitingCertRows.has(index) ? 'edu__cert-card--exiting' : ''}`}
              style={{
                transitionDelay: visibleCertRows.has(index)
                  ? `${index * 80}ms`
                  : '0ms',
              }}
              onMouseEnter={() => setHoveredCert(index)}
              onMouseLeave={() => setHoveredCert(null)}
            >
              {/* Glow effect on hover */}
              <div className="edu__cert-card-glow" />

              {/* Top accent bar */}
              <div className="edu__cert-card-accent" />

              {/* Card content */}
              <div className="edu__cert-card-content">

                {/* Index and year row */}
                <div className="edu__cert-card-meta">
                  <span className="edu__cert-card-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="edu__cert-card-year">{cert.date}</span>
                </div>

                {/* Title */}
                <h4 className="edu__cert-card-title">{cert.title}</h4>

                {/* Issuer */}
                <div className="edu__cert-card-issuer">
                  <div className="edu__cert-card-issuer-dot" />
                  <span>{cert.issuer}</span>
                </div>

                {/* Credential ID */}
                {cert.id && (
                  <div className="edu__cert-card-id">
                    <span className="edu__cert-card-id-label">ID</span>
                    <span className="edu__cert-card-id-value">{cert.id}</span>
                  </div>
                )}
              </div>

              {/* Bottom decoration */}
              <div className="edu__cert-card-footer">
                <div className="edu__cert-card-footer-line" />
                <Award
                  className={`edu__cert-card-badge ${
                    hoveredCert === index ? 'edu__cert-card-badge--active' : ''
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==================== ZONE 4 — SHOW MORE BAR ==================== */}
      {certifications.length > CERTS_INITIAL && (
        <div className="edu__zone-4">
          <div className="edu__show-more-bar">
            <div className="edu__show-more-left">
              <div className="edu__show-more-progress">
                <div
                  className="edu__show-more-progress-fill"
                  style={{
                    width: `${(displayedCerts.length / certifications.length) * 100}%`,
                  }}
                />
              </div>
              <span className="edu__cert-count-text">
                {displayedCerts.length} / {certifications.length} certifications
              </span>
            </div>
            <button
              type="button"
              onClick={handleToggleCerts}
              className="edu__toggle-button"
              aria-label={
                showAllCerts
                  ? 'Show fewer certifications'
                  : 'Show all certifications'
              }
            >
              <span className="edu__toggle-button-bg" />
              <span className="edu__toggle-button-text">
                {showAllCerts ? 'Show Less' : 'View All'}
              </span>
              {showAllCerts ? (
                <ChevronUp className="edu__toggle-icon" />
              ) : (
                <ChevronDown className="edu__toggle-icon" />
              )}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Education