import { useEffect, useRef, useState } from 'react';

/**
 * Reusable scroll-driven animation hook for bidirectional reveals
 * Animates elements IN on scroll down, OUT on scroll up
 */
const useScrollReveal = (options = {}) => {
  const {
    threshold = 0.15,
    rootMargin = '-10% 0px -10% 0px',
    direction = 'up',
    distance = 30,
    duration = 700,
    delay = 0,
    exitThreshold = 0.05,
  } = options;

  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const previousYRef = useRef(0);
  const observerRef = useRef(null);

  // Check for reduced motion preference
  const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const scrollDirection = window.scrollY > previousYRef.current ? 'down' : 'up';
          previousYRef.current = window.scrollY;

          if (entry.isIntersecting) {
            // Element is IN viewport
            if (scrollDirection === 'down' || (scrollDirection === 'up' && window.scrollY < (entry.target.offsetTop + entry.target.offsetHeight))) {
              setIsVisible(true);
              setIsExiting(false);
            }
          } else {
            // Element is OUT of viewport
            if (scrollDirection === 'up') {
              // Scrolling up and element exited from top
              setIsExiting(true);
              setIsVisible(false);
            } else if (scrollDirection === 'down' && window.scrollY > entry.target.offsetTop + entry.target.offsetHeight) {
              // Scrolling down and element exited from top
              setIsVisible(false);
              setIsExiting(false);
            }
          }
        });
      },
      {
        threshold: [exitThreshold, threshold],
        rootMargin,
      }
    );

    observer.observe(element);
    observerRef.current = observer;

    return () => {
      if (element && observer) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, exitThreshold]);

  return { ref, isVisible, isExiting };
};

export default useScrollReveal;
