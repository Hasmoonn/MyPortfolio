import { ArrowDown, Download, Facebook, Github, Linkedin, Mail } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import me from '../assets/me.jpg'

const Hero = () => {

  return (
    <section className='w-full min-h-screen flex items-center justify-center relative overflow-hidden'>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-36 w-80 h-80 gradient-primary rounded-full opacity-25 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 gradient-secondary rounded-full opacity-25 animate-float" style={{ animationDelay: "-3s" }}></div>
        <div className="absolute top-1/2 left-[800px] transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 gradient-hero rounded-full opacity-10 animate-float"></div>
      </div>


      <div className='pt-20 mx-auto px-4 text-center relative z-10'>
        <div className='animate-fade-in'>
          <div className='mb-8 flex justify-center'>
            <div className='relative group'>
              <div className='absolute -inset-1 gradient-primary rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt'></div>

              <div className="relative flex overflow-hidden w-32 h-32 md:w-40 md:h-40 border-2 rounded-full border-[rgb(var(--background))]">
                <img src={me} 
                  alt="Profile Photo" 
                  className="w-full h-full object-cover scale-110"
                />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold mb-6">
            Hi, I'm{" "}
            <span className="gradient-text">
              Mohamed Hasmoon
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-[rgb(var(--muted-foreground))] mb-8 max-w-2xl mx-auto">
            Software Engineer | Passionate about web development with the MERN stack and exploring Machine Learning. Eager to build innovative solutions that make an impact.
          </p> 

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a download="Mohamed_Hasmoon_CV.pdf" href='/cv.pdf'  className="flex text-sm font-medium items-center justify-center rounded-md h-11 px-8 gradient-primary hover:scale-105 transition-all duration-300 animate-glow group">
              <Download className="mr-3 h-4 w-4 group-hover:transform group-hover:translate-y-1 transition-all duration-300" />
              Download CV
            </a>

            <a href='#contact' className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium hover:gradient-primary hover:text-[rgb(var(--accent-foreground))] h-11 px-8 glass-card hover:scale-105 transition-all duration-300">
              <Mail className="mr-3 h-4 w-4" />
              Get In Touch
            </a>
          </div>

          <div className="flex justify-center gap-x-6 mb-12">
            <Link to={'https://github.com/Hasmoonn'} target='_blank' className="flex items-center justify-center rounded-md glass-card hover:scale-110 transition-all duration-300 hover:gradient-primary hover:text-[rgb(var(--accent-foreground))] h-10 w-10">
              <Github className="h-5 w-5" />
            </Link>

            <Link to={'https://www.linkedin.com/in/mohamed-hasmoon-0292732a1/'} target='_blank' className="flex items-center justify-center rounded-md glass-card hover:scale-110 transition-all duration-300 hover:gradient-hero hover:text-[rgb(var(--accent-foreground))] h-10 w-10">
              <Linkedin className="h-5 w-5" />
            </Link>

            <Link to={'https://www.facebook.com/share/1FFV5VcUhe/'} target='_blank' className="flex items-center justify-center rounded-md glass-card hover:scale-110 transition-all duration-300 hover:gradient-primary hover:text-[rgb(var(--accent-foreground))] h-10 w-10">
              <Facebook className="h-5 w-5" />
            </Link>

            <Link to={'mailto:mohamedhasmoon175@gmail.com'} className="flex items-center justify-center rounded-md glass-card hover:scale-110 transition-all duration-300 hover:gradient-hero hover:text-[rgb(var(--accent-foreground))] h-10 w-10">
              <Mail className="h-5 w-5" />
            </Link>
          </div>        
        </div>      
      </div>


      <div className="hidden sm:block absolute bottom-3 animate-bounce glass-card p-2 rounded-md">
        <ArrowDown className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
      </div>  
    </section>
  )
}

export default Hero