import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Eye, Grid, Sparkles, Check, Moon, Sun, MonitorDot, HelpCircle } from 'lucide-react';

export type BaseTheme = 'slate-dark' | 'onyx-dark' | 'alabaster-light';
export type AccentColor = 'sky' | 'emerald' | 'amber' | 'violet';
export type CanvasPattern = 'grid' | 'dots' | 'plain';

interface ThemeCustomizerProps {
  baseTheme: BaseTheme;
  setBaseTheme: (theme: BaseTheme) => void;
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
  canvas: CanvasPattern;
  setCanvas: (canvas: CanvasPattern) => void;
  interactiveAura: boolean;
  setInteractiveAura: (active: boolean) => void;
}

export default function ThemeCustomizer({
  baseTheme,
  setBaseTheme,
  accent,
  setAccent,
  canvas,
  setCanvas,
  interactiveAura,
  setInteractiveAura
}: ThemeCustomizerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const accents = [
    { id: 'sky' as AccentColor, name: 'Electric Sky', primary: '#0ea5e9', secondary: '#6366f1', glow: 'rgba(14, 165, 233, 0.15)' },
    { id: 'emerald' as AccentColor, name: 'Forest Emerald', primary: '#10b981', secondary: '#14b8a6', glow: 'rgba(16, 185, 129, 0.15)' },
    { id: 'amber' as AccentColor, name: 'Sunset Amber', primary: '#f59e0b', secondary: '#f97316', glow: 'rgba(245, 158, 11, 0.15)' },
    { id: 'violet' as AccentColor, name: 'Cosmic Violet', primary: '#8b5cf6', secondary: '#d946ef', glow: 'rgba(139, 92, 246, 0.15)' }
  ];

  const baseThemes = [
    { id: 'slate-dark' as BaseTheme, name: 'Slate Space', desc: 'Modern steel dark mode', icon: Moon },
    { id: 'onyx-dark' as BaseTheme, name: 'OLED Onyx', desc: 'Ultra-contrast pitch black', icon: MonitorDot },
    { id: 'alabaster-light' as BaseTheme, name: 'Alabaster Chalk', desc: 'Warm minimalist light', icon: Sun }
  ];

  const canvasPatterns = [
    { id: 'grid' as CanvasPattern, name: 'Grid Mesh', icon: Grid },
    { id: 'dots' as CanvasPattern, name: 'Dot Array', icon: Sparkles },
    { id: 'plain' as CanvasPattern, name: 'Minimal Flat', icon: Eye }
  ];

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-stretch">
      {/* Floating Gear Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-xl flex items-center justify-center transition-all hover:text-accent focus:outline-none relative group"
        style={{
          borderTopLeftRadius: '12px',
          borderBottomLeftRadius: '12px',
          borderRightWidth: '0'
        }}
        title="Customize Theme & Accents"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <Settings className="w-5 h-5 animate-pulse-slow" />
        </motion.div>
        
        {/* Subtle dynamic notification dot with active theme accent */}
        <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
        <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-accent" />
      </button>

      {/* Slide-out Sidebar Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.8 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="w-80 sm:w-88 bg-white/95 dark:bg-slate-950/95 border-l border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md relative"
          >
            <div>
              {/* Header */}
              <div className="pb-4 border-b border-slate-100 dark:border-slate-900 mb-6">
                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 font-sans text-base uppercase tracking-wider">Premium Customizer</h3>
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">Real-time design playground</span>
              </div>

              {/* Theme selection */}
              <div className="mb-6">
                <span className="block text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">1. BASE LAYOUT THEME</span>
                <div className="space-y-2">
                  {baseThemes.map((themeItem) => {
                    const Icon = themeItem.icon;
                    const isActive = baseTheme === themeItem.id;
                    return (
                      <button
                        key={themeItem.id}
                        onClick={() => setBaseTheme(themeItem.id)}
                        className={`w-full flex items-center justify-between p-3 border transition-all text-left group cursor-pointer ${
                          isActive
                            ? 'border-accent bg-slate-50 dark:bg-slate-900/40 text-slate-900 dark:text-slate-100 font-bold'
                            : 'border-slate-200 dark:border-slate-900 hover:border-slate-300 dark:hover:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-slate-400 dark:text-slate-500'}`} />
                          <div>
                            <span className="text-xs block font-sans">{themeItem.name}</span>
                            <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono font-medium block">{themeItem.desc}</span>
                          </div>
                        </div>
                        {isActive && <Check className="w-4 h-4 text-accent shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Accent palette */}
              <div className="mb-6">
                <span className="block text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">2. ACTIVE AMBIENT ACCENT</span>
                <div className="grid grid-cols-2 gap-2">
                  {accents.map((item) => {
                    const isActive = accent === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setAccent(item.id)}
                        className={`p-2.5 border transition-all flex flex-col justify-between items-start cursor-pointer text-left ${
                          isActive
                            ? 'border-accent bg-slate-50 dark:bg-slate-900/40 text-slate-900 dark:text-slate-100 font-bold'
                            : 'border-slate-200 dark:border-slate-900 hover:border-slate-300 dark:hover:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <div className="flex items-center space-x-1.5 mb-2">
                          <span
                            className="w-3 h-3 rounded-full shrink-0 border border-black/10 dark:border-white/10"
                            style={{ background: `linear-gradient(135deg, ${item.primary}, ${item.secondary})` }}
                          />
                          <span className="text-[10px] font-mono font-semibold uppercase">{item.id}</span>
                        </div>
                        <span className="text-[10px] block font-sans text-slate-500 dark:text-slate-400 truncate w-full">{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Canvas styles */}
              <div className="mb-6">
                <span className="block text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">3. CANVAS GEOMETRY PATTERN</span>
                <div className="grid grid-cols-3 gap-2">
                  {canvasPatterns.map((pat) => {
                    const Icon = pat.icon;
                    const isActive = canvas === pat.id;
                    return (
                      <button
                        key={pat.id}
                        onClick={() => setCanvas(pat.id)}
                        className={`p-2.5 border transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
                          isActive
                            ? 'border-accent bg-slate-50 dark:bg-slate-900/40 text-slate-900 dark:text-slate-100 font-bold'
                            : 'border-slate-200 dark:border-slate-900 hover:border-slate-300 dark:hover:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <Icon className={`w-4 h-4 mb-1.5 ${isActive ? 'text-accent' : 'text-slate-400 dark:text-slate-500'}`} />
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wide truncate max-w-full">{pat.name.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cursor trail aura */}
              <div>
                <span className="block text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">4. INTERACTIVE MOUSE SPOTLIGHT</span>
                <button
                  onClick={() => setInteractiveAura(!interactiveAura)}
                  className={`w-full flex items-center justify-between p-3 border transition-all text-left cursor-pointer ${
                    interactiveAura
                      ? 'border-accent bg-slate-50 dark:bg-slate-900/40 text-slate-900 dark:text-slate-100 font-bold'
                      : 'border-slate-200 dark:border-slate-900 hover:border-slate-300 dark:hover:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Eye className={`w-4 h-4 ${interactiveAura ? 'text-accent' : 'text-slate-400 dark:text-slate-500'}`} />
                    <div>
                      <span className="text-xs block font-sans">Dynamic Halo Aura</span>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono font-medium block">Radial light coordinates on hover</span>
                    </div>
                  </div>
                  <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${interactiveAura ? 'bg-accent' : 'bg-slate-200 dark:bg-slate-800'}`}>
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform ${interactiveAura ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </button>
              </div>
            </div>

            {/* Footer Connect Status */}
            <div className="border-t border-slate-100 dark:border-slate-900 pt-4 mt-8 space-y-4">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-accent hover:border-accent dark:hover:text-accent dark:hover:border-accent font-mono text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center space-x-2 bg-slate-50 hover:bg-accent/5 dark:bg-slate-900/30"
              >
                <span>[ CLOSE CUSTOMIZER ]</span>
              </button>

              <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">
                <span>SYSTEM STATUS</span>
                <span className="text-emerald-500 animate-pulse">● LIVE PERFORMANCE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
