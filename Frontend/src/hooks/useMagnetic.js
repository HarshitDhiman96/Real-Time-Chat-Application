import { useRef, useEffect } from 'react';
import gsap from 'gsap';

/**
 * Premium Magnetic Hook using GSAP (Performance Optimized)
 * @param {number} strength - How far the element pulls (default 0.4)
 * @param {number} lerp - The "heaviness" of the movement (default 0.1 for smooth drag)
 */
export const useMagnetic = (strength = 0.4, lerp = 0.1) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Use GSAP's quickSetter for maximum performance (60fps+)
    const xSet = gsap.quickSetter(element, "x", "px");
    const ySet = gsap.quickSetter(element, "y", "px");

    const handleMouseMove = (e) => {
      const { left, top, width, height } = element.getBoundingClientRect();
      
      // Calculate center of element
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      // Calculate distance from mouse to center
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Animate with GSAP power4 ease for that premium feel
      gsap.to(element, {
        x: deltaX * strength,
        y: deltaY * strength,
        duration: 0.6,
        ease: "power4.out",
        overwrite: true
      });
    };

    const handleMouseLeave = () => {
      // Smoothly return to center
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)" // Adds a premium subtle bounce when released
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return elementRef;
};

export default useMagnetic;