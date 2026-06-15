import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { ToastContainer } from 'react-toastify'

// Patch IntersectionObserver to skip rapid animations during smooth scroll navigation
const OriginalObserver = window.IntersectionObserver;
window.IntersectionObserver = class extends OriginalObserver {
  constructor(callback, options) {
    const targetMap = new Map();
    const observerObj = { current: null };

    const flushHandler = () => {
      if (targetMap.size > 0 && observerObj.current) {
        callback(Array.from(targetMap.values()), observerObj.current);
        targetMap.clear();
      }
    };
    window.addEventListener('nav-scroll-end', flushHandler);

    const wrappedCallback = (entries, observer) => {
      observerObj.current = observer;
      if (document.body.classList.contains('is-navigating')) {
        entries.forEach(entry => targetMap.set(entry.target, entry));
      } else {
        callback(entries, observer);
      }
    };
    
    super(wrappedCallback, options);
    this._flushHandler = flushHandler;
  }
  
  disconnect() {
    window.removeEventListener('nav-scroll-end', this._flushHandler);
    super.disconnect();
  }
};

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <BrowserRouter>
      <App />
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  </ThemeProvider>
)