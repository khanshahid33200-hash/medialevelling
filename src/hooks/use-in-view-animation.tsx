import { useEffect, useRef, useState } from 'react';

/**
 * useInViewAnimation
 * Adds an animation class when the element enters the viewport.
 * @param animationClass Tailwind or custom animation class to add
 * @param rootMargin Optional rootMargin for IntersectionObserver
 */
export function useInViewAnimation<T extends HTMLElement = HTMLElement>(
  animationClass: string = 'animate-fade-in-up',
  rootMargin: string = '0px 0px -10% 0px'
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin]);

  return {
    ref,
    className: inView ? animationClass : 'opacity-0',
  };
} 