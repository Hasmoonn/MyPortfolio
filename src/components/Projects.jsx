import React, { useState } from 'react'
import { projects } from '../assets/assets.js';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ExternalLink, Github } from 'lucide-react';

const Projects = () => {

  const [showAllProjects, setShowAllProjects] = useState(false);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, 6);

  return (
    <section id="projects" className="pt-24 py-16 px-5">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Featured Projects
          </h2>
          <p className="text-md md:text-lg text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills in full-stack development, 
            UI/UX design, and modern web technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            displayedProjects.map((project, index) => (
              <div key={index} className="rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm glass-card border-0 overflow-hidden hover:scale-105 transition-all duration-300 group">
                <div className='relative overflow-hidden'>
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 right-4 flex gap-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link className="flex items-center justify-center rounded-md hover:scale-110 transition-all duration-300 h-8 w-8 bg-[rgb(var(--secondary))] hover:bg-[rgba(var(--secondary),0.8)]">
                      <Github className="h-4 w-4" />
                    </Link>

                    <Link className="flex items-center justify-center rounded-md hover:scale-110 transition-all duration-300 h-8 w-8 bg-[rgb(var(--secondary))] hover:bg-[rgba(var(--secondary),0.8)]">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className='p-4 lg:p-6'>
                  <h3 className="text-xl font-bold mb-3">
                    {project.title}
                  </h3>
                  <p className="text-[rgb(var(--muted-foreground))] text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {
                      project.technologies.map((tech, techIndex) => (
                        <div key={techIndex} className="flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent text-[rgb(var(--secondary-foreground))] bg-[rgb(var(--muted-foreground),0.2)]">
                          {tech}
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        {projects.length > 6 && (
          <div className="text-center mt-12">
            <button onClick={() => setShowAllProjects(!showAllProjects)} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium gradient-border hover:scale-105 transition-all duration-300 h-11 px-8 hover:bg-accent hover:text-[rgb(var(--accent-foreground))]"
            >
              {
              showAllProjects ? (
                <>
                  <ChevronUp className="mr-2 h-4 w-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="mr-2 h-4 w-4" />
                  View All Projects ({projects.length - 6} more)
                </>
              )}
            </button>
          </div>
        )}
      </div>

    </section>
  )
}

export default Projects