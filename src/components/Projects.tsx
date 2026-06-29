import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Code, ExternalLink, Sparkles, Server, Laptop, Database, Terminal, Shield } from 'lucide-react';
import { Project } from '../types';
import ThreeDCard from './ThreeDCard';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'fullstack' | 'frontend' | 'backend' | 'devops'>('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error('Failed to load projects from server:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    { label: 'All Systems', value: 'all', icon: Terminal },
    { label: 'Full Stack', value: 'fullstack', icon: Laptop },
    { label: 'Frontend', value: 'frontend', icon: Code },
    { label: 'Backend', value: 'backend', icon: Server },
    { label: 'DevOps / Infra', value: 'devops', icon: Shield }
  ];

  // Filtering + Real-time Searching
  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = query === '' || 
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.techStack.some(tech => tech.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-1.5 px-3 py-1 border border-sky-300/60 bg-sky-50 text-sky-600 dark:border-sky-500/30 dark:bg-sky-950/20 dark:text-sky-400 text-xs font-mono font-bold uppercase tracking-widest mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Software Repositories</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight"
          >
            Personal Production-Ready Projects
          </motion.h2>
          <div className="w-16 h-[2px] bg-sky-500 mx-auto mt-4" />
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-sm max-w-xl mx-auto">
            Explore live production microservices, interactive systems, and APIs. Fully structured with relational schemas and robust test suites.
          </p>
        </div>

        {/* Dynamic Controls: Search + Categories */}
        <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Real-time search bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search projects by title, stack (e.g., Redis)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-none focus:border-sky-500 outline-none text-slate-800 dark:text-slate-100 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-700 font-medium transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 px-2 py-1"
              >
                Clear
              </button>
            )}
          </div>

          {/* Categories Tab Pill Controls */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value as any)}
                  className={`flex items-center space-x-1.5 px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-sky-50 text-sky-600 border-sky-500 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-500'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 dark:bg-slate-950 dark:text-slate-400 dark:border-slate-800 dark:hover:border-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Projects Grid Display */}
        {isLoading ? (
          <div className="text-center py-24">
            <span className="inline-block w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono uppercase tracking-widest mt-4">Connecting to full stack repo database...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-200 dark:border-slate-800 p-12 bg-slate-50 dark:bg-slate-950/20">
            <Code className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
            <h3 className="font-extrabold text-slate-800 dark:text-slate-200 text-base uppercase tracking-wider font-mono">No Repositories Found</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">No projects match the query "{searchQuery || activeCategory}" in our catalog.</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                
                // Categorized glows
                const glowColor = project.category === 'fullstack'
                  ? 'rgba(99, 102, 241, 0.15)'
                  : project.category === 'backend'
                    ? 'rgba(16, 185, 129, 0.15)'
                    : 'rgba(14, 165, 233, 0.15)';

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <ThreeDCard glowColor={glowColor} className="w-full h-full">
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 flex flex-col justify-between h-full hover:border-sky-500/30 dark:hover:border-sky-500/30 transition-colors duration-300">
                        
                        <div>
                          {/* Card Category tag + Feature star */}
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 bg-slate-100 dark:bg-slate-800/80 dark:text-slate-400 px-2.5 py-1">
                              {project.category}
                            </span>
                            {project.featured && (
                              <span className="flex items-center space-x-1 text-[9px] font-mono font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/60 dark:text-amber-400 px-2 py-0.5">
                                <Sparkles className="w-3 h-3 text-amber-500 animate-pulse shrink-0" />
                                <span>Featured Project</span>
                              </span>
                            )}
                          </div>

                          {/* Project Title */}
                          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 tracking-tight">
                            {project.title}
                          </h3>

                          {/* Project Description */}
                          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                            {project.description}
                          </p>
                        </div>

                        {/* Tech Stack Pills */}
                        <div>
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {project.techStack.map((tech) => (
                              <span 
                                key={tech} 
                                className="text-[10px] font-mono font-semibold bg-sky-50/60 text-sky-700 dark:bg-sky-950/20 dark:text-sky-400 px-2 py-0.5 border border-sky-100 dark:border-sky-900/40"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Actions links footer */}
                          <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1.5 text-xs font-mono font-bold uppercase text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                              >
                                <Code className="w-3.5 h-3.5" />
                                <span>Source Repo</span>
                              </a>
                            )}
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1.5 text-xs font-mono font-bold uppercase text-sky-600 dark:text-sky-400 hover:text-sky-500 transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Live Demo</span>
                              </a>
                            )}
                          </div>
                        </div>

                      </div>
                    </ThreeDCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
}
