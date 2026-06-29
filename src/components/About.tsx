import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin, Calendar, Heart, Languages, Award, Printer } from 'lucide-react';
import ThreeDCard from './ThreeDCard';

export default function About() {
  const personalInfo = [
    { label: "Father's Name", value: "Mohan Jha", icon: User },
    { label: "Date of Birth", value: "12 July 2006", icon: Calendar },
    { label: "Languages Known", value: "Hindi, English (Fluent)", icon: Languages },
    { label: "Gender", value: "Male", icon: User },
    { label: "Nationality", value: "Indian", icon: Award },
    { label: "Marital Status", value: "Unmarried", icon: Heart },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="about" className="py-20 bg-slate-50 border-b border-slate-200 dark:bg-slate-900 dark:border-slate-950 bg-dot-pattern transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-1.5 px-3 py-1 border border-sky-300/60 bg-sky-50 text-sky-600 dark:border-sky-500/30 dark:bg-sky-950/20 dark:text-sky-400 text-xs font-mono font-bold uppercase tracking-widest mb-3"
          >
            <span>About Me</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tracking-tight transition-colors duration-300"
          >
            Professional Profile & Core Objective
          </motion.h2>
          <div className="w-16 h-[2px] bg-sky-500 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Objective Statement Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <ThreeDCard glowColor="rgba(14, 165, 233, 0.12)">
              <div className="bg-white dark:bg-slate-950/40 rounded-none p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-2xl transition-colors duration-300">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center space-x-2 font-sans uppercase tracking-wider transition-colors duration-300">
                  <span className="w-1 h-6 bg-sky-500 inline-block" />
                  <span>Career Vision</span>
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed mb-8 font-sans transition-colors duration-300">
                  A motivated and detail-oriented BBA (Digital Marketing) student with hands-on internship experience in digital marketing, seeking an entry-level opportunity to apply skills in Excel, MS Word, and AI-driven tools, learn from industry professionals, and contribute positively to organizational growth.
                </p>

                {/* Quick Contact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-950/80 p-6 border border-slate-200 dark:border-slate-800 rounded-none transition-colors duration-300">
                  <div className="flex items-start space-x-3.5">
                    <div className="w-10 h-10 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 flex items-center justify-center shrink-0 rounded-none text-sky-600 dark:text-sky-400 transition-colors duration-300">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors duration-300">Phone</h4>
                      <a href="tel:9990715771" className="text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300">
                        9990715771
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <div className="w-10 h-10 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 flex items-center justify-center shrink-0 rounded-none text-sky-600 dark:text-sky-400 transition-colors duration-300">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors duration-300">Email</h4>
                      <a href="mailto:madhavjha514@gmail.com" className="text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors break-all duration-300">
                        madhavjha514@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5 sm:col-span-2">
                    <div className="w-10 h-10 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 flex items-center justify-center shrink-0 rounded-none text-sky-600 dark:text-sky-400 transition-colors duration-300">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors duration-300">Location</h4>
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200 transition-colors duration-300">
                        Dheeraj Nagar, Faridabad, Haryana - 121003
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center space-x-2 px-5 py-3 border border-sky-500 bg-sky-50 text-sky-600 hover:bg-sky-500 hover:text-slate-950 dark:border-sky-500 dark:bg-sky-950/20 dark:text-sky-400 dark:hover:bg-sky-500 dark:hover:text-slate-950 rounded-none transition-all font-mono font-bold text-xs uppercase tracking-widest cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Resume / Save PDF</span>
                  </button>
                </div>
              </div>
            </ThreeDCard>
          </motion.div>

          {/* Personal Details Table Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <ThreeDCard glowColor="rgba(16, 185, 129, 0.12)">
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-none p-8 md:p-10 shadow-md dark:shadow-2xl relative transition-colors duration-300">
                <h3 className="text-xl font-bold mb-8 flex items-center space-x-2 font-sans uppercase tracking-wider">
                  <span className="w-1 h-6 bg-emerald-500 inline-block" />
                  <span className="text-slate-900 dark:text-slate-100 transition-colors duration-300">Personal Credentials</span>
                </h3>

                <div className="space-y-6">
                  {personalInfo.map((info, idx) => {
                    const Icon = info.icon;
                    return (
                      <div key={idx} className="flex items-center space-x-4 pb-4 border-b border-slate-100 dark:border-slate-800/60 last:border-0 last:pb-0 transition-colors duration-300">
                        <div className="w-9 h-9 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex items-center justify-center shrink-0 rounded-none text-emerald-600 dark:text-emerald-400 transition-colors duration-300">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors duration-300">{info.label}</p>
                          <p className="text-base font-bold text-slate-800 dark:text-slate-200 transition-colors duration-300">{info.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ThreeDCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
