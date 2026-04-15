import React, { useState, useRef, useEffect } from 'react'
import {skills} from '../assets/assets.js'
import Skills from './Skills.jsx';
import Counter from './Counter.jsx';

const About = () => {

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.6 } // trigger when 60% visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id='about' ref={sectionRef} className='w-full pt-24 py-16 px-6 relative overflow-hidden'>
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

            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">
                  <Counter end={20} startCount={isVisible} />+
                </div>
                <div className="text-[rgb(var(--muted-foreground))] text-sm">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">
                  <Counter end={1} startCount={isVisible} />+
                </div>
                <div className="text-[rgb(var(--muted-foreground))] text-sm">Years Experience</div>
              </div>
              {/* <div>
                <div className="text-3xl font-bold gradient-text mb-2">
                  <Counter end={10} startCount={isVisible} />+
                </div>
                <div className="text-[rgb(var(--muted-foreground))] text-sm">Happy Clients</div>
              </div> */}
            </div>
          </div>

          <div className="animate-fade-in-right">
            <Skills />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About