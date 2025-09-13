import React from 'react'
import ScrollAnimations from '../components/ScrollAnimations'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import Education from '../components/Education'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const Index = () => {
  return (
    <div className='min-h-screen'>
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