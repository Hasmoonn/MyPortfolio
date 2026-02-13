import React, { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'
import { Menu, X } from 'lucide-react';


const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" }
];


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-2 left-2 right-2 lg:top-3 lg:left-28 lg:right-28 z-50 transition-all duration-300 rounded-full ${ isScrolled ? "glass-card backdrop-blur-md" : "bg-transparent" }`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold gradient-text italic">
              It's HasMoon
            </span>
          </div>

          <div className="hidden md:flex items-center gap-x-8">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className="text-[rgb(var(--foreground))] hover:gradient-text transition-colors duration-200 font-medium relative group" >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-x-2">
            <ThemeToggle />
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="hover:bg-[rgb(var(--muted-foreground),0.1)] hover:text-[rgb(var(--primary))] p-2 font-medium glass-card justify-center items-center flex hover:scale-110 transition-all duration-300 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="h-[1.2rem] w-[1.2rem] transition-all duration-300" /> : <Menu className="h-[1.2rem] w-[1.2rem] transition-all duration-300" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass-card mt-2 rounded-lg p-4 animate-fade-in">
            <div className="flex flex-col gap-y-4">
              {navItems.map((item) => (
                <a key={item.name} href={item.href} className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors duration-200 py-2" onClick={() => setIsMobileMenuOpen(false)} >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar