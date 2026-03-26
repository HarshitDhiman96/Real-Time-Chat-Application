import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * OrbAscension Component
 * Animates a glowing orb from login form to navbar profile slot
 */
const OrbAscension = ({ onComplete }) => {
  const orbRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    // Get target coordinates (navbar profile slot)
    const profileSlot = document.getElementById('profile-slot');
    
    if (!profileSlot) {
      console.warn('Profile slot not found - skipping ascension animation');
      if (onComplete) onComplete();
      return;
    }

    // Get coordinates
    const slotRect = profileSlot.getBoundingClientRect();
    const orbRect = orb.getBoundingClientRect();

    // Calculate center points
    const targetX = slotRect.left + slotRect.width / 2 - orbRect.left - orbRect.width / 2;
    const targetY = slotRect.top + slotRect.height / 2 - orbRect.top - orbRect.height / 2;

    // Create GSAP timeline
    timelineRef.current = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Initial orb state
    gsap.set(orb, {
      scale: 1,
      opacity: 1,
      x: 0,
      y: 0
    });

    // Create particle burst elements
    const particleCount = 12;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'star-particle';
      particle.style.position = 'absolute';
      particle.style.pointerEvents = 'none';
      orb.appendChild(particle);
      particles.push(particle);
      
      // Set initial particle positions
      const angle = (i / particleCount) * Math.PI * 2;
      const velocity = 80 + Math.random() * 40;
      
      gsap.set(particle, {
        x: Math.cos(angle) * 10,
        y: Math.sin(angle) * 10,
        scale: 0,
        opacity: 0
      });
    }

    // Animation sequence
    timelineRef.current = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // 1. Setup Initial State
    gsap.set(orb, { scale: 1, opacity: 1, x: 0, y: 0 });

    timelineRef.current
      // Phase 1: Charge Up (Orb glows and grows)
      .to(orb, {
        scale: 1.4,
        duration: 0.6,
        ease: "power4.out",
        filter: "brightness(2) drop-shadow(0 0 30px #00F0FF)" 
      })
      // Phase 2: The Cinematic Flight (Curved movement)
      .to(orb, {
        x: targetX,
        y: targetY,
        scale: 0.1,
        duration: 1.2,
        ease: "expo.inOut", 
        rotation: 360,
        onUpdate: function() {
          // Add motion blur during the fastest part of the flight
          const p = this.progress();
          const blur = p > 0.2 && p < 0.8 ? 8 : 0;
          gsap.set(orb, { filter: `blur(${blur}px) brightness(1.5)` });
        }
      }, "-=0.2")
      // Phase 3: The Docking Burst
      .to(particles, {
        opacity: 1,
        scale: () => Math.random() * 1.5 + 0.5,
        x: (i) => Math.cos((i / particleCount) * Math.PI * 2) * 120,
        y: (i) => Math.sin((i / particleCount) * Math.PI * 2) * 120,
        rotation: () => Math.random() * 360,
        duration: 0.7,
        ease: "power4.out",
        stagger: 0.01
      }, "-=0.1")
      // Phase 4: Fade Out
      .to([orb, ...particles], {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
      }, "-=0.2");

    // Cleanup
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      
      // Remove particles
      particles.forEach(p => {
        if (p.parentNode) {
          p.parentNode.removeChild(p);
        }
      });
    };
  }, [onComplete]);

  return (
    <div 
      ref={orbRef}
      className="fixed z-[100] pointer-events-none will-animate"
      style={{
        width: '80px',
        height: '80px',
        left: '50%',
        top: '50%',
        marginLeft: '-40px',
        marginTop: '-40px'
      }}
    >
      {/* Glowing Orb Core */}
      <div 
        className="w-full h-full rounded-full relative"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #00F0FF 0%, #B535F6 70%, #7C3AED 100%)',
          boxShadow: `
            0 0 60px rgba(0, 240, 255, 0.8),
            0 0 100px rgba(0, 240, 255, 0.5),
            0 0 140px rgba(181, 53, 246, 0.4),
            inset 0 0 40px rgba(255, 255, 255, 0.3)
          `
        }}
      >
        {/* Inner glow ring */}
        <div 
          className="absolute inset-2 rounded-full border-2 border-white/50"
          style={{
            filter: 'blur(4px)',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.6)'
          }}
        />
        
        {/* Outer glow aura */}
        <div 
          className="absolute -inset-4 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 240, 255, 0.3) 0%, transparent 70%)',
            filter: 'blur(8px)',
            animation: 'pulse 2s ease-in-out infinite'
          }}
        />
      </div>
    </div>
  );
};

export default OrbAscension;
