import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g. "rgba(14, 165, 233, 0.15)"
}

export default function ThreeDCard({ children, className = '', glowColor = 'rgba(14, 165, 233, 0.15)' }: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinates as motion values (normalized from -0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Interactive springs for fluid, premium 3D tilt reaction
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { damping: 25, stiffness: 120 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { damping: 25, stiffness: 120 });

  // Handle dynamic Mouse Move inside the container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);

    // Set custom CSS properties for live spotlight tracker highlight
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none group transition-shadow duration-500 ${className}`}
      style={{ 
        perspective: '1200px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Ambient hover glowing backdrop shadow element */}
      <div
        className="absolute -inset-[1px] opacity-0 blur-2xl transition-opacity duration-500 rounded-none z-0 pointer-events-none group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 75%)`,
        }}
      />

      {/* Floating 3D structure card container */}
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered ? 1.025 : 1,
          z: isHovered ? 15 : 0
        }}
        transition={{ 
          type: 'spring',
          stiffness: 150,
          damping: 20
        }}
        className="w-full h-full relative z-10 overflow-hidden"
      >
        {/* Cursor tracking spotlight glare layer */}
        <div
          className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.07)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.05)_0%,transparent_50%)]"
        />

        {/* Glow border overlay reactively tracked on hover */}
        <div
          className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 opacity-0 group-hover:opacity-100 border border-sky-500/30 dark:border-sky-400/30"
        />

        {/* Inner high-resolution card frame */}
        <div className="w-full h-full" style={{ transform: 'translateZ(1px)' }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
