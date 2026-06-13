import React, { useState, useEffect, useRef } from 'react'
import { ChevronDown, ChevronUp, Github, ExternalLink } from 'lucide-react'
import { projects } from '../assets/assets.js'
import '../styles/projects.css'

const Projects = () => {
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [visibleRows, setVisibleRows] = useState(new Set())
  const [headerAnimStage, setHeaderAnimStage] = useState({
    number: false,
    heading: false,
    separator: false,
    text: false,
    count: false,
  })

  const headerRef = useRef(null)
  const projectRowRefs = useRef([])
  const headerAnimatedRef = useRef(false)

  const displayedProjects = showAllProjects ? projects : projects.slice(0, 4)

  useEffect(() => {
    const headerElement = headerRef.current
    if (!headerElement) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !headerAnimatedRef.current) {
          headerAnimatedRef.current = true
          setTimeout(() => setHeaderAnimStage((p) => ({ ...p, number: true })), 0)
          setTimeout(() => setHeaderAnimStage((p) => ({ ...p, heading: true })), 150)
          setTimeout(() => setHeaderAnimStage((p) => ({ ...p, separator: true })), 200)
          setTimeout(() => setHeaderAnimStage((p) => ({ ...p, text: true })), 300)
          setTimeout(() => setHeaderAnimStage((p) => ({ ...p, count: true })), 400)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '-5% 0px -5% 0px' },
    )

    observer.observe(headerElement)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observers = []
    const timer = setTimeout(() => {
      projectRowRefs.current.filter(Boolean).forEach((rowRef, index) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleRows((prev) => new Set([...prev, index]))
              observer.disconnect()
            }
          },
          { threshold: 0.15, rootMargin: '-5% 0px -5% 0px' },
        )
        observer.observe(rowRef)
        observers.push(observer)
      })
    }, 50)

    return () => {
      clearTimeout(timer)
      observers.forEach((o) => o.disconnect())
    }
  }, [displayedProjects.length])

  const handleToggleProjects = () => {
    setShowAllProjects((prev) => !prev)
    setTimeout(() => setVisibleRows(new Set()), 50)
  }

  const getProjectIndex = (idx) => String(idx + 1).padStart(2, '0')

  return (
    <section id="projects" className="projects">
      <div ref={headerRef} className="projects__zone-1">
        <div className="projects__zone-1-container">        
          <div className="projects__zone-1-left">
            <h1
              className={`projects__section-heading ${
                headerAnimStage.heading ? 'projects__section-heading--visible' : ''
              }`}
            >
              Projects
            </h1>
            <div
              className={`projects__heading-separator ${
                headerAnimStage.separator ? 'projects__heading-separator--visible' : ''
              }`}
            />
            <p
              className={`projects__intro-text ${
                headerAnimStage.text ? 'projects__intro-text--visible' : ''
              }`}
            >
              A selection of work spanning full-stack systems, AI platforms, and scalable web
              applications. Each represents thoughtful architecture and user-centered design.
            </p>
            <div
              className={`projects__project-count ${
                headerAnimStage.count ? 'projects__project-count--visible' : ''
              }`}
            >
              {String(projects.length).padStart(2, '0')} Projects
            </div>
          </div>

          <div className="projects__zone-1-right">
            <div
              className={`projects__large-number ${
                headerAnimStage.number ? 'projects__large-number--visible' : ''
              }`}
            >
              03
            </div>
            <div className="projects__chapter-marker">[ 03 ]</div>
          </div>
        </div>
      </div>

      <div className="projects__zone-2">
        {displayedProjects.map((project, index) => (
          <div
            key={project.title}
            ref={(el) => {
              projectRowRefs.current[index] = el
            }}
            className={`projects__row ${
              visibleRows.has(index) ? 'projects__row--visible' : ''
            }`}
          >
            <div className="projects__row-index">
              <span className="projects__row-index-text">{getProjectIndex(index)}</span>
            </div>

            <div className="projects__row-image">
              <img
                src={project.image}
                alt={project.title}
                className="projects__row-image-img"
                loading="lazy"
                decoding="async"
                width={320}
                height={200}
              />
            </div>

            <div className="projects__row-content">
              <h3 className="projects__row-title">{project.title}</h3>
              <div className="projects__row-separator" />
              <p className="projects__row-description">{project.description}</p>

              <div className="projects__tech-tags">
                {project.technologies.map((tech) => (
                  <span key={tech} className="projects__tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="projects__row-links">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="projects__row-link"
                aria-label={`View ${project.title} source code on GitHub`}
              >
                <span>GitHub</span>
                <Github className="projects__row-link-icon" />
              </a>

              {project.live && project.live !== 'not hosted yet' ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="projects__row-link"
                  aria-label={`View ${project.title} live`}
                >
                  <span>Live</span>
                  <ExternalLink className="projects__row-link-icon" />
                </a>
              ) : (
                <div className="projects__row-link projects__row-link--disabled">
                  <span>Pending</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {projects.length > 4 && (
        <div className="projects__zone-3">
          <div className="projects__show-more-bar">
            <span className="projects__project-count-text">
              Showing {displayedProjects.length} of {projects.length} projects
            </span>
            <button
              type="button"
              onClick={handleToggleProjects}
              className="projects__toggle-button"
              aria-label={showAllProjects ? 'Show less projects' : 'Show all projects'}
            >
              <span>{showAllProjects ? 'Show Less' : 'View All'}</span>
              {showAllProjects ? (
                <ChevronUp className="projects__toggle-icon" />
              ) : (
                <ChevronDown className="projects__toggle-icon" />
              )}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects
