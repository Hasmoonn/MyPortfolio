import React, { useState } from 'react'
import { certifications, education } from '../assets/assets.js'
import { Award, Calendar, ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';

const Education = () => {

  const [showAllCertifications, setShowAllCertifications] = useState(false);

  const displayedCertifications = showAllCertifications ? certifications : certifications.slice(0, 4);

  return (
    <section id="education" className="pt-24 py-16 px-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Education & Certifications</h2>
          <p className="text-lg text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
            My academic background and professional certifications that have shaped my expertise in technology and development.
          </p>
        </div>

        {/* education  */}
        <div className='mb-16'>
          <h3 className='text-3xl font-bold mb-8 text-center'>
            Education
          </h3>
          <div className="space-y-8">
            {
              education.map((edu, index) => (
                <div key={index} className='rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] glass-card border-0 hover:scale-105 transition-all duration-300 group'>
                  <div className='p-3 lg:p-8'>
                    <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4'>
                      <div className="flex items-center mb-4 lg:mb-0">
                        <div className="gradient-primary p-3 rounded-full mr-4 group-hover:animate-glow">
                          <GraduationCap className="h-6 w-6 text-white" />
                        </div>

                        <div>
                          <h4 className="text-lg lg:text-xl font-bold">
                            {edu.degree}
                          </h4>
                          <p className="text-md lg:text-lg text-[rgb(var(--muted-foreground))]">
                            {edu.school}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{edu.period}</span>
                      </div>
                    </div>

                    <p className="text-[rgb(var(--muted-foreground))] mb-4">
                      {edu.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {
                        edu.achievements.map((achievement, achievementIndex) => (
                          <div key={achievementIndex} className="flex items-center bg-[rgb(var(--muted-foreground),0.1)] rounded-full px-3 py-1">
                            <Award className="h-3 w-3 mr-1 text-primary" />
                            <span className="text-xs">{achievement}</span>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>


        {/* certifications  */}
        <div>
          <h3 className="text-3xl font-bold mb-8 text-center">
            Professional Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {
              displayedCertifications.map((cert, index) => (
                <div key={index} className='rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] glass-card border-0 hover:scale-105 transition-all duration-300 group'>
                  <div className='p-4 lg:p-6'>
                    <div className="flex items-start justify-between mb-4">
                      <div className="gradient-secondary p-2 rounded-lg group-hover:animate-glow">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-sm text-[rgb(var(--muted-foreground))]">{cert.date}</span>
                    </div>

                    <h4 className="text-md lg:text-lg font-bold mb-2">{cert.title}</h4>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mb-3">{cert.issuer}</p>
                    <p className="text-xs text-[rgb(var(--muted-foreground))]">ID: {cert.id}</p>
                  </div>
                </div>
              ))
            }
          </div>

          {certifications.length > 4 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllCertifications(!showAllCertifications)} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium gradient-border hover:scale-105 transition-all duration-300 h-11 px-8"
              >
                {showAllCertifications ? (
                  <>
                    <ChevronUp className="mr-2 h-4 w-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-2 h-4 w-4" />
                    Show More ({certifications.length - 4} more)
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>

  )
}

export default Education