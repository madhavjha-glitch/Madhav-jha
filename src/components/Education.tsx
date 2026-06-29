import { motion } from 'motion/react';
import { GraduationCap, Calendar, Award, School, Sparkles, Trophy } from 'lucide-react';
import ThreeDCard from './ThreeDCard';

export default function Education() {
  const educationList = [
    {
      qualification: "BBA (Digital Marketing) — Pursuing",
      institution: "Aravali College of Engineering and Management",
      year: "2025 - 2028",
      score: "Ongoing Study",
      isCurrent: true,
      details: "Pursuing specialized commerce and marketing foundations. Mastering Lead Generation funnels, Advanced Excel & Google Sheets automation, organic SEO ranking audits, and cross-platform Social Media management.",
      icon: Trophy
    },
    {
      qualification: "Full Stack Software Engineering — Specialized Track",
      institution: "Self-Directed Advanced Engineering Study",
      year: "2024 - Present",
      score: "Ongoing Practice",
      isCurrent: true,
      details: "Comprehensive training in modern frontend architectures (React/Vite), database modeling (MongoDB/PostgreSQL), secure API design (Express/Node.js), and container orchestration (Docker/Nginx).",
      icon: Award
    },
    {
      qualification: "Senior Secondary (Class 12)",
      institution: "M.V.M Sr. Sec. School | HBSE Board",
      year: "Completed: 2025",
      score: "50%",
      isCurrent: false,
      details: "Focused on core business studies, commerce streams, communication techniques, and computer systems.",
      icon: School
    },
    {
      qualification: "Secondary (Class 10)",
      institution: "M.V.M Sr. Sec. School | HBSE Board",
      year: "Completed: 2023",
      score: "63%",
      isCurrent: false,
      details: "General secondary education with distinction in mathematics, science, and computer concepts.",
      icon: School
    }
  ];

  return (
    <section id="education" className="py-20 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-900 bg-grid-pattern transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-1.5 px-3 py-1 border border-sky-300/60 bg-sky-50 text-sky-600 dark:border-sky-500/30 dark:bg-sky-950/20 dark:text-sky-400 text-xs font-mono font-bold uppercase tracking-widest mb-3 transition-colors duration-300"
          >
            <span>Academic Profile</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tracking-tight transition-colors duration-300"
          >
            Education & Certifications
          </motion.h2>
          <div className="w-16 h-[2px] bg-sky-500 mx-auto mt-4" />
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {educationList.map((edu, idx) => {
            const Icon = edu.icon;
            const glowColor = edu.isCurrent ? 'rgba(14, 165, 233, 0.15)' : 'rgba(148, 163, 184, 0.1)';

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="w-full h-full"
              >
                <ThreeDCard glowColor={glowColor} className="w-full h-full">
                  <div
                    className={`relative rounded-none p-8 border transition-all duration-300 flex flex-col justify-between w-full h-full ${
                      edu.isCurrent
                        ? 'bg-slate-50 border-sky-500 dark:bg-slate-900 dark:border-sky-500 text-slate-800 dark:text-slate-100 shadow-xl dark:shadow-2xl z-10'
                        : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-sky-500 dark:hover:border-slate-700 text-slate-600 dark:text-slate-300 shadow-md hover:shadow-xl'
                    }`}
                  >
                    <div>
                      {/* Visual badge/indicator for current studies */}
                      {edu.isCurrent && (
                        <span className="absolute top-6 right-6 inline-flex items-center space-x-1 px-3 py-1.5 border border-sky-500 bg-sky-50 dark:bg-sky-950/20 text-sky-600 dark:text-sky-400 text-[10px] font-mono font-bold uppercase tracking-widest animate-pulse rounded-none">
                          <Sparkles className="w-3 h-3 text-sky-500 dark:text-sky-400" />
                          <span>In Progress</span>
                        </span>
                      )}

                      {/* Card Icon */}
                      <div className={`w-12 h-12 flex items-center justify-center mb-6 rounded-none border transition-colors duration-300 ${
                        edu.isCurrent
                          ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Qualification & Year */}
                      <div className="mb-4 font-sans">
                        <span className={`inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-widest mb-2 transition-colors duration-300 ${
                          edu.isCurrent ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400 dark:text-slate-500'
                        }`}>
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{edu.year}</span>
                        </span>
                        <h3 className="text-lg md:text-xl font-extrabold leading-tight mb-2 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
                          {edu.qualification}
                        </h3>
                        <p className={`text-xs font-mono font-bold uppercase tracking-widest transition-colors duration-300 ${edu.isCurrent ? 'text-slate-700 dark:text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                          {edu.institution}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className={`w-full h-px my-6 transition-colors duration-300 ${edu.isCurrent ? 'bg-slate-200 dark:bg-slate-800' : 'bg-slate-100 dark:bg-slate-800/60'}`} />

                      {/* Details Description */}
                      <p className="text-xs md:text-sm leading-relaxed mb-6 text-slate-600 dark:text-slate-400 font-sans transition-colors duration-300">
                        {edu.details}
                      </p>
                    </div>

                    {/* Score Indicator */}
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors duration-300">
                        ACADEMIC SCORE
                      </span>
                      <span className={`text-xs font-mono font-bold uppercase tracking-wider px-3 py-1.5 border transition-colors duration-300 ${
                        edu.isCurrent
                          ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300'
                      }`}>
                        {edu.score}
                      </span>
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
