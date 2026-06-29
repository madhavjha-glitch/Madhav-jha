import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Sparkles, FileText, BarChart3, Laptop, Linkedin, Github, Twitter, Instagram, Mail } from 'lucide-react';
import ThreeDCard from './ThreeDCard';
import Magnetic from './Magnetic';

interface HeroProps {
  onNavigate: (view: string) => void;
}

const TITLES = [
  "BBA (Digital Marketing) Student",
  "Aspiring Digital Marketing Professional",
  "MS Excel & Pivot Tables Expert",
  "AI-Powered Productivity Specialist"
];

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/in/madhav-jha-bba',
    color: 'hover:text-blue-600 dark:hover:text-blue-400',
    borderColor: 'hover:border-blue-500/50 dark:hover:border-blue-400/50',
    bgColor: 'hover:bg-blue-50 dark:hover:bg-blue-950/20',
    glow: 'rgba(59, 130, 246, 0.2)'
  },
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/madhavjha514',
    color: 'hover:text-slate-900 dark:hover:text-white',
    borderColor: 'hover:border-slate-500/50 dark:hover:border-slate-400/50',
    bgColor: 'hover:bg-slate-50 dark:hover:bg-slate-900/40',
    glow: 'rgba(148, 163, 184, 0.2)'
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:madhavjha514@gmail.com',
    color: 'hover:text-sky-600 dark:hover:text-sky-400',
    borderColor: 'hover:border-sky-500/50 dark:hover:border-sky-400/50',
    bgColor: 'hover:bg-sky-50 dark:hover:bg-sky-950/20',
    glow: 'rgba(14, 165, 233, 0.2)'
  },
  {
    name: 'Twitter',
    icon: Twitter,
    url: 'https://twitter.com',
    color: 'hover:text-sky-500 dark:hover:text-sky-400',
    borderColor: 'hover:border-sky-400/50 dark:hover:border-sky-400/50',
    bgColor: 'hover:bg-sky-50 dark:hover:bg-sky-950/20',
    glow: 'rgba(56, 189, 248, 0.2)'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://instagram.com',
    color: 'hover:text-pink-600 dark:hover:text-pink-400',
    borderColor: 'hover:border-pink-500/50 dark:hover:border-pink-400/50',
    bgColor: 'hover:bg-pink-50 dark:hover:bg-pink-950/20',
    glow: 'rgba(236, 72, 153, 0.2)'
  }
];

export default function Hero({ onNavigate }: HeroProps) {
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Mouse Parallax values
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for high quality motion response
  const springX = useSpring(mouseX, { damping: 35, stiffness: 60 });
  const springY = useSpring(mouseY, { damping: 35, stiffness: 60 });

  // Map parallax positions at different depth multipliers
  const orbX = useTransform(springX, [-1, 1], [-50, 50]);
  const orbY = useTransform(springY, [-1, 1], [-50, 50]);

  const cardParallaxX = useTransform(springX, [-1, 1], [-15, 15]);
  const cardParallaxY = useTransform(springY, [-1, 1], [-15, 15]);

  const slowObjX = useTransform(springX, [-1, 1], [35, -35]);
  const slowObjY = useTransform(springY, [-1, 1], [35, -35]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = TITLES[titleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentFullText.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, 30);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentFullText.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 60);
    }

    if (!isDeleting && charIndex === currentFullText.length) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, titleIndex]);

  // Track cursor position inside the main viewport for high quality resolution lighting effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const normalizedX = (e.clientX - rect.left) / width - 0.5;
    const normalizedY = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-white dark:bg-slate-950 bg-grid-pattern transition-colors duration-300"
    >
      {/* Dynamic Parallax 3D Elements in the background */}
      <motion.div 
        style={{ x: orbX, y: orbY }}
        className="absolute top-1/4 left-1/3 w-96 h-96 bg-sky-500/10 dark:bg-sky-400/10 rounded-full blur-3xl pointer-events-none z-0" 
      />
      <motion.div 
        style={{ x: slowObjX, y: slowObjY }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-400/10 rounded-full blur-3xl pointer-events-none z-0" 
      />

      {/* Floating 3D Geometric Cube Accent Left */}
      <motion.div
        style={{ x: cardParallaxX, y: cardParallaxY, rotate: 12 }}
        className="absolute left-10 md:left-24 top-1/3 w-16 h-16 border-2 border-dashed border-sky-500/20 dark:border-sky-400/20 bg-sky-50/5 dark:bg-slate-900/5 backdrop-blur-md hidden sm:block pointer-events-none z-0"
        animate={{ rotate: 372 }}
        transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
      />

      {/* Floating 3D Geometric Cube Accent Right */}
      <motion.div
        style={{ x: slowObjX, y: slowObjY, rotate: -45 }}
        className="absolute right-12 md:right-32 bottom-1/3 w-20 h-20 border border-emerald-500/20 dark:border-emerald-400/20 bg-emerald-50/5 dark:bg-slate-900/5 backdrop-blur-md hidden sm:block pointer-events-none z-0"
        animate={{ rotate: -405 }}
        transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center font-sans">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-2 border border-accent/30 bg-accent/5 text-accent text-xs font-mono font-bold uppercase tracking-widest mb-8 transition-colors duration-300"
        >
          <Sparkles className="w-4 h-4 text-accent animate-pulse" />
          <span>Available for Internships & Full-Time Entry Roles</span>
        </motion.div>

        {/* Main Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-6 font-sans transition-colors duration-300"
        >
          Hi, I am <span className="bg-gradient-to-r from-accent to-accent-sec bg-clip-text text-transparent">Madhav Jha</span>
        </motion.h1>

        {/* Dynamic Typing Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-10 md:h-12 flex justify-center items-center mb-10"
        >
          <p className="text-sm md:text-lg font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400 transition-colors duration-300">
            I am a <span className="font-bold text-accent border-r-2 border-accent pr-1 animate-pulse">{typedText}</span>
          </p>
        </motion.div>

        {/* Short Pitch */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-12 font-sans transition-colors duration-300"
        >
          A detail-oriented BBA (Digital Marketing) student with practical campaign execution and performance tracking experience. Skilled in advanced Excel formulas, pivot tables, content creation, and AI productivity tools to deliver measurable growth.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
        >
          <button
            onClick={() => onNavigate('contact')}
            className="w-full sm:w-auto px-8 py-4 border border-accent bg-accent/5 text-accent hover:bg-accent hover:text-white dark:bg-accent/10 dark:hover:bg-accent dark:hover:text-slate-950 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 group cursor-pointer"
          >
            <span>Let's Collaborate</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="w-full sm:w-auto px-8 py-4 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-accent dark:border-slate-800 dark:bg-slate-900/30 dark:hover:bg-slate-900 dark:text-slate-300 dark:hover:text-accent font-mono text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>View Resume Profile</span>
          </button>
        </motion.div>

        {/* Sleek, Geometric Connect Row */}
        <motion.div
          id="hero-connect-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-12 flex flex-col items-center justify-center space-y-4"
        >
          <div className="flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-slate-200 dark:bg-slate-800" />
            <span id="hero-connect-title" className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">
              Establish Connection
            </span>
            <span className="w-8 h-[1px] bg-slate-200 dark:bg-slate-800" />
          </div>
          <div id="hero-social-icons-container" className="flex items-center justify-center gap-4">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <div key={link.name} className="w-12 h-12">
                  <Magnetic strength={0.45} className="w-full h-full block">
                    <ThreeDCard
                      glowColor={link.glow}
                      className="w-full h-full rounded-none"
                    >
                      <a
                        id={`hero-social-${link.name.toLowerCase()}`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full h-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-all duration-300 relative group cursor-pointer ${link.color} ${link.borderColor} ${link.bgColor}`}
                        title={`Connect on ${link.name}`}
                      >
                        <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-slate-300 dark:border-slate-700 group-hover:border-sky-500 transition-colors" />
                        <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-slate-300 dark:border-slate-700 group-hover:border-sky-500 transition-colors" />
                        <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-slate-300 dark:border-slate-700 group-hover:border-sky-500 transition-colors" />
                        <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-slate-300 dark:border-slate-700 group-hover:border-sky-500 transition-colors" />
                        
                        <Icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />
                      </a>
                    </ThreeDCard>
                  </Magnetic>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Bullet Quick Stats Cards with Premium 3D Interaction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-20"
        >
          <ThreeDCard glowColor="rgba(14, 165, 233, 0.12)">
            <div className="bg-white dark:bg-slate-950/60 p-6 border border-slate-200 dark:border-slate-800 hover:border-sky-500/40 dark:hover:border-sky-500/40 hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-all shadow-md dark:shadow-none duration-300 w-full h-full text-center">
              <div className="w-12 h-12 border border-slate-200 bg-slate-50 text-sky-600 dark:border-slate-800 dark:bg-slate-900/40 dark:text-sky-400 flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2 transition-colors duration-300">Practical Experience</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans transition-colors duration-300">Completed Digital Marketing Internship at Agski 360</p>
            </div>
          </ThreeDCard>

          <ThreeDCard glowColor="rgba(16, 185, 129, 0.12)">
            <div className="bg-white dark:bg-slate-950/60 p-6 border border-slate-200 dark:border-slate-800 hover:border-sky-500/40 dark:hover:border-sky-500/40 hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-all shadow-md dark:shadow-none duration-300 w-full h-full text-center">
              <div className="w-12 h-12 border border-slate-200 bg-slate-50 text-sky-600 dark:border-slate-800 dark:bg-slate-900/40 dark:text-sky-400 flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2 transition-colors duration-300">Advanced MS Excel</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans transition-colors duration-300">Pivot tables, complex data reporting, formatting</p>
            </div>
          </ThreeDCard>

          <ThreeDCard glowColor="rgba(245, 158, 11, 0.12)">
            <div className="bg-white dark:bg-slate-950/60 p-6 border border-slate-200 dark:border-slate-800 hover:border-sky-500/40 dark:hover:border-sky-500/40 hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-all shadow-md dark:shadow-none duration-300 w-full h-full text-center">
              <div className="w-12 h-12 border border-slate-200 bg-slate-50 text-sky-600 dark:border-slate-800 dark:bg-slate-900/40 dark:text-sky-400 flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2 transition-colors duration-300">AI Productivity</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans transition-colors duration-300">Expertise in leveraging AI tools for content & strategy</p>
            </div>
          </ThreeDCard>
        </motion.div>
      </div>
    </section>
  );
}
