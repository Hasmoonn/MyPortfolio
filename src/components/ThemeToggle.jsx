import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "" ? "dark" : "");
  };


  return (
    <button onClick={toggleTheme} className="flex justify-center items-center hover:bg-[rgb(var(--muted-foreground),0.1)] hover:text-[rgb(var(--primary))] glass-card hover:scale-110 transition-all duration-300 p-2 rounded-lg relative">
      <Sun className={`absolute h-[1rem] w-[1rem] transition-all duration-500 ${
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
        }`} />
        
        <Moon className={`h-[1rem] w-[1rem] transition-all duration-500 ${
          theme === ""
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
        }`} />
    </button>
  )
}

export default ThemeToggle