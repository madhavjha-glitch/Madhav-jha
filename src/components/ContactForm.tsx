import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, AlertCircle, Phone, Mail, MapPin, Sparkles } from 'lucide-react';
import ThreeDCard from './ThreeDCard';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMsg, setResponseMsg] = useState<{ success: boolean; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMsg(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setResponseMsg({ success: true, text: result.message || 'Thank you! Your message has been sent.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setResponseMsg({ success: false, text: result.error || 'Something went wrong. Please try again.' });
      }
    } catch (err) {
      setResponseMsg({ success: false, text: 'Network error. Please check if your server is running.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 border-b border-slate-200 dark:bg-slate-900 dark:border-slate-950 bg-dot-pattern transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-1.5 px-3 py-1 border border-sky-300/60 bg-sky-50 text-sky-600 dark:border-sky-500/30 dark:bg-sky-950/20 dark:text-sky-400 text-xs font-mono font-bold uppercase tracking-widest mb-3 transition-colors duration-300"
          >
            <span>Get In Touch</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tracking-tight transition-colors duration-300"
          >
            Start A Discussion
          </motion.h2>
          <div className="w-16 h-[2px] bg-sky-500 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-stretch">
          {/* Contact Details Pane */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <ThreeDCard glowColor="rgba(14, 165, 233, 0.12)" className="w-full h-full">
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-none p-8 md:p-10 flex flex-col justify-between shadow-lg dark:shadow-2xl relative transition-colors duration-300 w-full h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />
                
                <div>
                  <span className="inline-flex items-center space-x-1.5 text-sky-600 dark:text-sky-400 text-xs font-mono font-bold uppercase tracking-widest mb-6 transition-colors duration-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Let's Connect</span>
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold font-sans tracking-tight mb-4 uppercase">Contact Info</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed mb-8 font-sans transition-colors duration-300">
                    Reach out for internship positions, consulting queries, digital campaign strategies, or custom Excel spreadsheet consulting. I will reply within 24 hours.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0 rounded-none transition-colors duration-300">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors duration-300">Direct Phone</p>
                        <a href="tel:9990715771" className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300">
                          9990715771
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0 rounded-none transition-colors duration-300">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors duration-300">Professional Email</p>
                        <a href="mailto:madhavjha514@gmail.com" className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors break-all duration-300">
                          madhavjha514@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0 rounded-none transition-colors duration-300">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors duration-300">Location</p>
                        <p className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-200 transition-colors duration-300">
                          Faridabad, Haryana
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800/80 pt-6 mt-8 transition-colors duration-300">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 transition-colors duration-300">ESTABLISHED WORKFLOW:</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-sans transition-colors duration-300">
                    Data privacy guaranteed. Your queries are secured with industry standards.
                  </p>
                </div>
              </div>
            </ThreeDCard>
          </motion.div>

          {/* Form Pane */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <ThreeDCard glowColor="rgba(16, 185, 129, 0.12)" className="w-full h-full">
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-8 md:p-10 rounded-none shadow-lg dark:shadow-2xl flex flex-col justify-center transition-colors duration-300 w-full h-full">
            <AnimatePresence mode="wait">
              {responseMsg?.success ? (
                <motion.div
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   className="text-center py-8"
                >
                  <div className="w-16 h-16 border border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-6 rounded-none">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-100 mb-3 font-sans transition-colors duration-300">Submission Received!</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 max-w-sm mx-auto font-sans transition-colors duration-300">{responseMsg.text}</p>
                  <button
                    onClick={() => setResponseMsg(null)}
                    className="px-6 py-2.5 border border-sky-500 bg-sky-50 text-sky-600 hover:bg-sky-500 hover:text-slate-950 dark:bg-sky-950/20 dark:text-sky-400 dark:hover:bg-sky-500 dark:hover:text-slate-950 font-mono text-xs font-bold uppercase tracking-widest rounded-none transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {responseMsg && !responseMsg.success && (
                    <div className="flex items-center space-x-3 p-4 rounded-none bg-rose-50 dark:bg-rose-950/20 border border-rose-300 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-sans">
                      <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      <p>{responseMsg.text}</p>
                    </div>
                  )}

                  <div>
                    <label htmlFor="contact-name" className="block text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2 transition-colors duration-300">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500/30 rounded-none outline-none text-slate-800 dark:text-slate-100 font-sans text-sm transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2 transition-colors duration-300">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500/30 rounded-none outline-none text-slate-800 dark:text-slate-100 font-sans text-sm transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2 transition-colors duration-300">
                      Message details
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me about your project, query, or position..."
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500/30 rounded-none outline-none text-slate-800 dark:text-slate-100 font-sans text-sm transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium resize-none transition-colors duration-300"
                    />
                  </div>

                  <button
                    id="contact-submit-button"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 border border-sky-500 bg-sky-50 text-sky-600 hover:bg-sky-500 hover:text-slate-950 dark:bg-sky-950/20 dark:text-sky-400 dark:hover:bg-sky-500 dark:hover:text-slate-950 font-mono text-xs font-bold uppercase tracking-widest rounded-none transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="w-4 h-4 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
              </div>
            </ThreeDCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
