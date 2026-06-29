import { useState } from 'react';
import { motion } from 'motion/react';
import { Award, FileSpreadsheet, FileText, Cpu, CheckCircle2, Languages } from 'lucide-react';
import ThreeDCard from './ThreeDCard';

interface SkillItem {
  name: string;
  level: number; // proficiency out of 100
  desc: string;
  details: string[];
  icon: any;
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'analytics' | 'marketing' | 'productivity'>('all');

  const skills: (SkillItem & { category: string })[] = [
    {
      name: "Advanced MS Excel",
      level: 92,
      category: "analytics",
      desc: "Comprehensive numerical data modeling, analytics, reporting, and dashboard assembly.",
      details: ["Complex Formulas & Lookups", "Pivot Tables & Charts", "Conditional Formatting", "Data Validation & Cleanup"],
      icon: FileSpreadsheet
    },
    {
      name: "Advanced MS Word",
      level: 88,
      category: "productivity",
      desc: "Professional executive documentation formatting, templates, and publication structures.",
      details: ["Custom Layout Designs", "Document Indexing & Table of Contents", "Corporate Formatting", "Standard Operating Procedures"],
      icon: FileText
    },
    {
      name: "AI Productivity Tools",
      level: 90,
      category: "productivity",
      desc: "Leveraging generative models and workflows for content creation, research, and scheduling.",
      details: ["Generative Prompt Engineering", "Automated Content Production", "AI Research Frameworks", "Task Automation"],
      icon: Cpu
    },
    {
      name: "Digital Marketing Fundamentals",
      level: 85,
      category: "marketing",
      desc: "Strategic execution, target audience research, and cross-channel campaign tracking.",
      details: ["Social Media Campaigns", "Content Strategy & Planning", "Audience Research", "Performance Analytics Tracking"],
      icon: Award
    },
    {
      name: "Bilingual Communication",
      level: 95,
      category: "marketing",
      desc: "Exceptional verbal and written communication in English and Hindi for diverse marketing teams.",
      details: ["Professional Copywriting", "Client Consultations", "English (Fluent)", "Hindi (Native/Fluent)"],
      icon: Languages
    }
  ];

  const categories = [
    { label: "All Proficiencies", value: "all" },
    { label: "Data & Analytics", value: "analytics" },
    { label: "Digital Marketing", value: "marketing" },
    { label: "Business Productivity", value: "productivity" }
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-20 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-900 bg-grid-pattern transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-1.5 px-3 py-1 border border-sky-300/60 bg-sky-50 text-sky-600 dark:border-sky-500/30 dark:bg-sky-950/20 dark:text-sky-400 text-xs font-mono font-bold uppercase tracking-widest mb-3 transition-colors duration-300"
          >
            <span>Core Competencies</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tracking-tight transition-colors duration-300"
          >
            Skills Dashboard & Capabilities
          </motion.h2>
          <div className="w-16 h-[2px] bg-sky-500 mx-auto mt-4" />
        </div>

        {/* Category Filter Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value as any)}
              className={`px-5 py-2.5 rounded-none text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer border transition-colors duration-300 ${
                activeCategory === cat.value
                  ? 'bg-sky-50 text-sky-600 border-sky-500 dark:bg-sky-950/50 dark:text-sky-400 dark:border-sky-500'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700 dark:bg-slate-950/40 dark:text-slate-400 dark:border-slate-800 dark:hover:border-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSkills.map((skill, idx) => {
            const Icon = skill.icon;
            
            // Map category to premium neon backdrop glow colours
            const glowColor = skill.category === 'analytics' 
              ? 'rgba(14, 165, 233, 0.15)' 
              : skill.category === 'marketing' 
                ? 'rgba(16, 185, 129, 0.15)' 
                : 'rgba(99, 102, 241, 0.15)';

            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <ThreeDCard glowColor={glowColor} className="w-full h-full">
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-none p-6 md:p-8 hover:border-sky-500/30 dark:hover:border-sky-500/30 hover:bg-slate-50 dark:hover:bg-slate-950/40 shadow-md dark:shadow-2xl flex flex-col justify-between transition-colors duration-300 w-full h-full">
                    <div>
                      {/* Skill Header */}
                      <div className="flex items-center space-x-3.5 mb-5">
                        <div className="w-11 h-11 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0 rounded-none transition-colors duration-300">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base font-sans transition-colors duration-300">{skill.name}</h3>
                          <span className="inline-block mt-1 text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 px-2 py-0.5 rounded-none transition-colors duration-300">
                            {skill.category}
                          </span>
                        </div>
                      </div>

                      {/* Level Slider representation */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 mb-2 transition-colors duration-300">
                          <span>PROFICIENCY LEVEL</span>
                          <span className="text-sky-600 dark:text-sky-400">{skill.level}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/60 rounded-none overflow-hidden transition-colors duration-300">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 rounded-none"
                          />
                        </div>
                      </div>

                      {/* Description text */}
                      <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-sans transition-colors duration-300">
                        {skill.desc}
                      </p>
                    </div>

                    {/* Sub Bullet details */}
                    <div className="border-t border-slate-100 dark:border-slate-800/60 pt-5 mt-auto transition-colors duration-300">
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 transition-colors duration-300">CORE COMPETENCY FOCUS:</h4>
                      <ul className="space-y-2">
                        {skill.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-300 font-sans transition-colors duration-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ThreeDCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
