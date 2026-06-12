import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
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

  const headerRef = useRef(null)
  const headerAnimatedRef = useRef(false)
  const lastScrollY = useRef(window.scrollY)
  const eduRecordRefs = useRef([])
  const certRowRefs = useRef([])

  const displayedCerts = showAllCerts
    ? certifications
    : certifications.slice(0, CERTS_INITIAL)

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      lastScrollY.current = window.scrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Zone 1 — Header
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
            setTimeout(
              () => setHeaderStage((p) => ({ ...p, number: true })),
              0,
            )
            setTimeout(
              () => setHeaderStage((p) => ({ ...p, heading: true })),
              150,
            )
            setTimeout(
              () => setHeaderStage((p) => ({ ...p, separator: true })),
              200,
            )
            setTimeout(
              () => setHeaderStage((p) => ({ ...p, text: true })),
              300,
            )
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

  // Zone 2 — Education records
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

  // Zone 3 — Cert rows
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

        {/* Timeline spine */}
        <div className="edu__spine" aria-hidden="true">
          <div className="edu__spine-line" />
        </div>

        {/* Records */}
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
              {/* Spine marker */}
              <div
                className={`edu__spine-marker ${
                  visibleEduRecords.has(index)
                    ? 'edu__spine-marker--visible'
                    : ''
                }`}
                aria-hidden="true"
              />

              <div className="edu__record-inner">

                {/* Date column */}
                <div className="edu__record-date">
                  <span className="edu__date-text">{item.period}</span>
                </div>

                {/* Degree column */}
                <div className="edu__record-degree">
                  <span className="edu__degree-label">— Academic Degree</span>
                  <h3 className="edu__degree-title">{item.degree}</h3>
                  {/* ✅ uses item.school — correct field name */}
                  <p className="edu__institution">{item.school}</p>
                  <div className="edu__degree-rule" />
                  <p className="edu__degree-description">{item.description}</p>
                </div>

                {/* Achievements column */}
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

      {/* ==================== ZONE 3 — CERTIFICATIONS TABLE ==================== */}
      <div className="edu__zone-3">

        {/* Table header */}
        <div className="edu__table-header" aria-hidden="true">
          <div className="edu__th edu__th--index">#</div>
          <div className="edu__th edu__th--cert">Certification</div>
          <div className="edu__th edu__th--issuer">Issuer</div>
          <div className="edu__th edu__th--year">Year</div>
        </div>

        {/* Table body */}
        <div className="edu__table-body">
          {displayedCerts.map((cert, index) => (
            <div
              key={`${cert.title}-${index}`}
              ref={(el) => {
                certRowRefs.current[index] = el
              }}
              className={`edu__cert-row ${
                visibleCertRows.has(index) ? 'edu__cert-row--visible' : ''
              } ${exitingCertRows.has(index) ? 'edu__cert-row--exiting' : ''}`}
              style={{
                transitionDelay: visibleCertRows.has(index)
                  ? `${index * 50}ms`
                  : '0ms',
              }}
            >
              <div className="edu__td edu__td--index">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className="edu__td edu__td--cert">
                <span className="edu__cert-title">{cert.title}</span>
                {/* ✅ uses cert.id — correct field name */}
                {cert.id && (
                  <span className="edu__cert-id">{cert.id}</span>
                )}
              </div>

              {/* ✅ uses cert.issuer — correct field name */}
              <div className="edu__td edu__td--issuer">{cert.issuer}</div>

              {/* ✅ uses cert.date — correct field name */}
              <div className="edu__td edu__td--year">{cert.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ==================== ZONE 4 — SHOW MORE BAR ==================== */}
      {certifications.length > CERTS_INITIAL && (
        <div className="edu__zone-4">
          <div className="edu__show-more-bar">
            <span className="edu__cert-count-text">
              Showing {displayedCerts.length} of {certifications.length}{' '}
              certifications
            </span>
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
              <span>{showAllCerts ? 'Show Less' : 'View All'}</span>
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