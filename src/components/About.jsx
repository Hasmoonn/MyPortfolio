import React, { useState } from 'react'
import {skills} from '../assets/assets.js'

const About = () => {

  const [showSkills, setShowSkills] = useState(false);

  return (
    <section id='about' className='w-full pt-24 py-16 px-6 relative overflow-hidden'>
      <div className='absolute inset-0 opacity-50'>
        <div className="absolute top-20 left-10 w-72 h-72 gradient-hero rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 gradient-secondary rounded-full mix-blend-multiply filter blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">About Me</h2>
          <p className="text-lg text-[rgb(var(--muted-foreground))] max-w-3xl mx-auto">
            I'm a passionate full-stack developer to creating innovative digital solutions. 
            I love turning complex problems into simple, beautiful and intuitive designs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {
            skills.map((skill, index) => (
              <div key={index} className="rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] glass-card hover:scale-105 transition-all duration-300 border-0 group">
                <div className='p-6 text-center'>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgb(var(--background),0.5)] mb-4 ${skill.color} group-hover:animate-glow`}>
                    <skill.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {skill.title}
                  </h3>
                  <p className="text-[rgb(var(--muted-foreground))]  text-sm">
                    {skill.description}
                  </p>
                </div>
              </div>
            ))
          }
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="animate-fade-in-left">
            <h3 className="text-3xl gradient-text font-bold mb-6">Get to Know Me</h3>
            <p className="text-justify text-[rgb(var(--muted-foreground))] mb-4">
              I am a dedicated and passionate Software Engineering undergraduate at the Sabaragamuwa University of Sri Lanka with strong skills in full-stack web development and backend engineering. I specialize in modern web technologies, including the PERN and MERN stacks, and have hands-on experience building secure, scalable, and user-friendly applications. My projects range from reservation and booking platforms to intelligent systems powered by machine learning, reflecting both my problem-solving ability and adaptability.
            </p>
            <p className="text-justify text-[rgb(var(--muted-foreground))] mb-6">
              Beyond technical expertise, I have professional experience working in the banking sector, which strengthened my analytical and communication skills. I enjoy turning ideas into real-world solutions, whether through designing seamless user interfaces, developing efficient APIs, or implementing advanced authentication and security practices.
            </p>

            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">20+</div>
                <div className="text-[rgb(var(--muted-foreground))] text-sm">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">1+</div>
                <div className="text-[rgb(var(--muted-foreground))] text-sm">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">10+</div>
                <div className="text-[rgb(var(--muted-foreground))] text-sm">Happy Clients</div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-right">
            <div className="glass-card p-5 lg:p-8 rounded-2xl">
              <h4 className="text-2xl font-bold mb-6 text-center text-[rgb(var(--muted-foreground))]">Technical Expertise</h4>
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>HTML5</span>
                    <span>90%</span>
                  </div>
                  <div className="w-full bg-[rgb(var(--muted))] rounded-full h-2">
                  <div className="gradient-secondary h-2 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span>CSS3</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-[rgb(var(--muted))] rounded-full h-2">
                  <div className="gradient-secondary h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span>JavaScript</span>
                    <span>80%</span>
                  </div>
                  <div className="w-full bg-[rgb(var(--muted))] rounded-full h-2">
                  <div className="gradient-secondary h-2 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                </div>
                
                {
                  showSkills && 
                  <>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>React.JS</span>
                        <span>85%</span>
                      </div>
                      <div className="w-full bg-[rgb(var(--muted))] rounded-full h-2">
                      <div className="gradient-secondary h-2 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Node.js/Express.js</span>
                        <span>80%</span>
                      </div>
                      <div className="w-full bg-[rgb(var(--muted))] rounded-full h-2">
                        <div className="gradient-secondary h-2 rounded-full" style={{ width: "80%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span>MongoDB</span>
                        <span>85%</span>
                      </div>
                      <div className="w-full bg-[rgb(var(--muted))] rounded-full h-2">
                      <div className="gradient-secondary h-2 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Java</span>
                        <span>80%</span>
                      </div>
                      <div className="w-full bg-[rgb(var(--muted))] rounded-full h-2">
                        <div className="gradient-secondary h-2 rounded-full" style={{ width: "80%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>SpringBoot</span>
                        <span>80%</span>
                      </div>
                      <div className="w-full bg-[rgb(var(--muted))] rounded-full h-2">
                        <div className="gradient-secondary h-2 rounded-full" style={{ width: "80%" }}></div>
                      </div>
                    </div>
                  </>  
                }
                 
              </div>

              <div className='flex justify-center mt-8'>
                <button onClick={() => setShowSkills(!showSkills)} className='py-2 px-6 text-[rgb(var(--accent-foreground))] animate-glow font-medium border-none gradient-secondary outline-none rounded-lg'>
                  {showSkills ? "Show Less" : "Show More Skills" }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About