import { motion } from 'motion/react';
import { Briefcase, Calendar, CheckCircle2, TrendingUp, Cpu, Award } from 'lucide-react';
import ThreeDCard from './ThreeDCard';

export default function Experience() {
  const experiences = [
    {
      role: "Digital Marketing Intern",
      company: "Agski 360",
      duration: "Internship Term",
      highlights: [
        "Assisted in planning and executing high-impact digital marketing campaigns across key social media platforms.",
        "Supported creative content creation, detailed audience research, and multi-channel performance tracking of marketing activities.",
        "Gained comprehensive practical exposure to digital marketing suites and advanced AI-assisted content workflows."
      ],
      skillsLearned: ["Social Media Marketing", "Audience Research", "Performance Analytics", "AI Content Workflows"],
      icon: TrendingUp,
      color: "bg-indigo-50 border-indigo-200 text-indigo-700"
    }
  ];

  return (
    <section id="experience" className="py-20 bg-slate-50 border-b border-slate-200 dark:bg-slate-900 dark:border-slate-950 bg-dot-pattern transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-1.5 px-3 py-1 border border-sky-300/60 bg-sky-50 text-sky-600 dark:border-sky-500/30 dark:bg-sky-950/20 dark:text-sky-400 text-xs font-mono font-bold uppercase tracking-widest mb-3"
          >
            <span>Professional Journey</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tracking-tight transition-colors duration-300"
          >
            Work Experience & Internships
          </motion.h2>
          <div className="w-16 h-[2px] bg-sky-500 mx-auto mt-4" />
        </div>

        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full h-full mb-8 last:mb-0"
              >
                <ThreeDCard glowColor="rgba(99, 102, 241, 0.12)" className="w-full h-full">
                  <div className="relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-none p-8 md:p-10 shadow-lg dark:shadow-2xl transition-colors duration-300 w-full h-full">
                    {/* Timeline badge banner */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800/80 transition-colors duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0 rounded-none transition-colors duration-300">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-100 transition-colors duration-300">{exp.role}</h3>
                          <p className="text-sky-600 dark:text-sky-400 font-mono text-xs uppercase tracking-widest mt-1 transition-colors duration-300">{exp.company}</p>
                        </div>
                      </div>
                      <div className="inline-flex items-center space-x-1.5 px-4 py-1.5 border border-emerald-500/30 bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold uppercase tracking-widest">
                        <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>Active Internship</span>
                      </div>
                    </div>

                    {/* Objective responsibilities list */}
                    <div className="space-y-4 mb-8">
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 transition-colors duration-300">Key Responsibilities & Deliverables:</h4>
                      {exp.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start space-x-3.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5 transition-colors" />
                          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed transition-colors duration-300">{highlight}</p>
                        </div>
                      ))}
                    </div>

                    {/* Gained exposure section */}
                    <div>
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 transition-colors duration-300">Gained Practical Tools & Methods:</h4>
                      <div className="flex flex-wrap gap-2.5">
                        {exp.skillsLearned.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 rounded-none text-xs font-mono uppercase tracking-wider transition-all hover:border-sky-500 dark:hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300"
                          >
                            <Award className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
                            <span>{skill}</span>
                          </span>
                        ))}
                      </div>
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
