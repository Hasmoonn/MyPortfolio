import { Facebook, Github, Heart, Linkedin, Mail } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-[rgba(var(--border),0.5)]">
      <div className='mx-auto max-w-6xl'>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <span className="text-2xl font-bold gradient-text">-Hasmoon-</span>
          </div>

          <div className="flex items-center gap-x-4 mb-4 md:mb-0">
            <Link to={'https://github.com/Hasmoonn'} target='_blank' className="flex items-center justify-center rounded-md glass-card hover:scale-110 transition-all duration-300 hover:gradient-primary h-10 w-10">
              <Github className="h-5 w-5" />
            </Link>

            <Link to={'https://www.linkedin.com/in/mohamed-hasmoon-0292732a1/'} target='_blank' className="flex items-center justify-center rounded-md glass-card hover:scale-110 transition-all duration-300 hover:gradient-primary h-10 w-10">
              <Linkedin className="h-5 w-5" />
            </Link>

            <Link to={'https://www.facebook.com/share/1FFV5VcUhe/'} target='_blank' className="flex items-center justify-center rounded-md glass-card hover:scale-110 transition-all duration-300 hover:gradient-primary h-10 w-10">
              <Facebook className="h-5 w-5" />
            </Link>

            <Link to={'mailto:mohamedhasmoon175@gmail.com'} className="flex items-center justify-center rounded-md glass-card hover:scale-110 transition-all duration-300 hover:gradient-primary h-10 w-10">
              <Mail className="h-5 w-5" />
            </Link>
          </div>

          <div className="flex items-center text-[rgb(var(--muted-foreground))] text-sm">
            Made with <Heart className="h-4 w-4 mx-1 text-indigo-500" /> by Mohamed Hasmoon
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/30 text-center text-[rgb(var(--muted-foreground))] text-sm">
          <p>&copy; {new Date().getFullYear()} Mohamed Hasmoon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer