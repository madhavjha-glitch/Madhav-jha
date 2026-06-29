import { useState, useEffect } from 'react';
import { Menu, X, ShieldAlert, Award, FileUser, User, Mail, Sparkles, Briefcase, GraduationCap, Sun, Moon, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function Navbar({ currentView, onNavigate, theme, onToggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollProgress = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScrollProgress);
    return () => window.removeEventListener('scroll', handleScrollProgress);
  }, []);

  const navItems = [
    { label: 'Home', value: 'home', icon: Sparkles },
    { label: 'About', value: 'about', icon: User },
    { label: 'Skills', value: 'skills', icon: Award },
    { label: 'Projects', value: 'projects', icon: Code },
    { label: 'Experience', value: 'experience', icon: Briefcase },
    { label: 'Education', value: 'education', icon: GraduationCap },
    { label: 'Contact', value: 'contact', icon: Mail },
  ];

  const handleItemClick = (value: string) => {
    onNavigate(value);
    setIsOpen(false);
  };

  return (
    <nav
      id="nav-bar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 border-b border-slate-200 shadow-md dark:bg-slate-950/95 dark:border-slate-900 dark:shadow-xl py-3'
          : 'bg-white/70 border-b border-slate-100 dark:bg-slate-950/70 dark:border-slate-900/40 backdrop-blur-xs py-4'
      }`}
    >
      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-accent to-accent-sec transition-all duration-75 z-10" style={{ width: `${scrollProgress}%` }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div 
            onClick={() => handleItemClick('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 border border-accent bg-accent/5 flex items-center justify-center text-accent font-mono font-extrabold text-lg group-hover:scale-105 transition-transform duration-300">
              MK
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-none block mb-0.5">
                Madhav Krishnatreya
              </span>
              <span className="block text-[10px] font-mono tracking-widest text-accent uppercase">
                Full Stack Software Developer
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => handleItemClick(item.value)}
                  className={`flex items-center space-x-1.5 px-3 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-200 relative ${
                    isActive
                      ? 'text-accent bg-accent/5 border border-accent/20'
                      : 'text-slate-600 hover:text-accent hover:bg-accent/5 dark:text-slate-400 dark:hover:text-accent dark:hover:bg-accent/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 font-bold" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}

            {/* Admin/Secured Login Button */}
            <button
              id="admin-nav-button"
              onClick={() => handleItemClick('admin')}
              className={`ml-4 flex items-center space-x-1.5 px-3 py-2 text-xs font-mono font-bold uppercase tracking-wider border transition-all duration-200 ${
                currentView === 'admin'
                  ? 'border-emerald-500 text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30'
                  : 'border-emerald-500/30 text-emerald-600/80 hover:text-emerald-600 hover:border-emerald-500 hover:bg-emerald-50 dark:text-emerald-400/80 dark:hover:text-emerald-400 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/20'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-button"
              onClick={onToggleTheme}
              className="ml-2 p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-accent dark:hover:text-accent bg-slate-50 dark:bg-slate-900/50 hover:bg-accent/5 transition-all duration-200 cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Geometric Dark Theme'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" /> : <Moon className="w-4 h-4 text-accent" />}
            </button>
          </div>

          {/* Mobile menu and theme buttons */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile quick theme toggle */}
            <button
              id="mobile-quick-theme-toggle"
              onClick={onToggleTheme}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-accent dark:hover:text-accent bg-slate-100 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400 animate-spin-slow" /> : <Moon className="w-5 h-5 text-accent" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-accent dark:hover:text-accent hover:bg-slate-50 dark:hover:bg-slate-900/50 focus:outline-none border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-200 dark:bg-slate-950 dark:border-slate-900 overflow-hidden shadow-2xl"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.value;
                return (
                  <button
                    key={item.value}
                    onClick={() => handleItemClick(item.value)}
                    className={`flex items-center space-x-3 w-full px-4 py-3 text-sm font-mono uppercase tracking-wider transition-colors ${
                      isActive
                        ? 'text-accent bg-accent/5 border border-accent/20'
                        : 'text-slate-600 hover:text-accent hover:bg-accent/5 dark:text-slate-400 dark:hover:text-accent dark:hover:bg-accent/5'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              <div className="pt-2 border-t border-slate-200 dark:border-slate-900">
                <button
                  onClick={() => handleItemClick('admin')}
                  className={`flex items-center space-x-3 w-full px-4 py-3 text-sm font-mono uppercase tracking-wider border ${
                    currentView === 'admin'
                      ? 'border-emerald-500 text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/20'
                      : 'border-emerald-500/30 text-emerald-600/80 hover:text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500/30 dark:text-emerald-400/80 dark:hover:bg-emerald-950/10'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4 text-emerald-500" />
                  <span>Admin Panel</span>
                </button>
              </div>

              {/* Theme state switcher inside drawer */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-900 flex justify-between items-center px-4 py-3">
                <span className="text-sm font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">Theme</span>
                <button
                  id="mobile-drawer-theme-toggle"
                  onClick={onToggleTheme}
                  className="flex items-center space-x-2 px-4 py-2 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-accent dark:hover:text-accent bg-slate-50 dark:bg-slate-900/50 rounded-xl font-mono text-xs uppercase tracking-wider cursor-pointer"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-4 h-4 text-amber-500 animate-spin-slow" />
                      <span>Light</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-accent" />
                      <span>Dark</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
