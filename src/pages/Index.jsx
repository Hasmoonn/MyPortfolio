import React, { useEffect, useState } from 'react'
import ScrollAnimations from '../components/ScrollAnimations'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import Education from '../components/Education'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const Index = () => {

  const [mousePosition, setMousePosition] = useState( { x: 0, y: 0 });

  useEffect(() => {
    const hadleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    };

    window.addEventListener("mousemove", hadleMouseMove);

    return () => {
      window.removeEventListener("mousemove", hadleMouseMove);
    }
  }, []);

  return (
    <div className='min-h-screen overflow-hidden relative'>
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20 animate-pulse" />

      <div style={{
        left: mousePosition.x - 192,
        top: mousePosition.y - 192,
        transition: "all 0.3s ease-out",
      }} className="fixed w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-500/20 rounded-full blur-3xl pointer-events-none z-0"></div>


      <ScrollAnimations />
      <Navbar />

      <main>
        <div id='home'>
          <Hero />
        </div>
        <div data-animate>
          <About />
        </div>
        <div data-animate>
          <Projects />
        </div>
        <div data-animate>
          <Education />
        </div>
        <div data-animate>
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Index