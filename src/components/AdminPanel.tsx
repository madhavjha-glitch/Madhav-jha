import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Mail, RefreshCw, Trash2, CheckCircle, UserCheck, Inbox, Search, Database, LogOut, ShieldAlert, Sparkles, AlertCircle, PlusCircle, Code, ExternalLink } from 'lucide-react';
import { Message, Project } from '../types';

export default function AdminPanel() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('admin_token'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Stats & Messages
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'read'>('all');
  const [dbStatus, setDbStatus] = useState({ provider: 'Loading...', usingMongoDB: false });

  // Manage Projects State
  const [activeAdminTab, setActiveAdminTab] = useState<'messages' | 'projects'>('messages');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isProjectsLoading, setIsProjectsLoading] = useState(false);
  
  // New Project Form Fields
  const [projTitle, setProjTitle] = useState('');
  const [projCategory, setProjCategory] = useState<'frontend' | 'backend' | 'fullstack' | 'devops'>('fullstack');
  const [projTechStack, setProjTechStack] = useState('');
  const [projGithub, setProjGithub] = useState('');
  const [projLive, setProjLive] = useState('');
  const [projFeatured, setProjFeatured] = useState(false);
  const [projDescription, setProjDescription] = useState('');
  const [projSearchQuery, setProjSearchQuery] = useState('');
  const [projSuccessMsg, setProjSuccessMsg] = useState('');
  const [projErrorMsg, setProjErrorMsg] = useState('');
  const [isAddingProject, setIsAddingProject] = useState(false);

  // Load dashboard when token changes
  useEffect(() => {
    if (token) {
      fetchMessages();
      fetchDbStatus();
    }
  }, [token]);

  useEffect(() => {
    if (token && activeAdminTab === 'projects') {
      fetchAdminProjects();
    }
  }, [token, activeAdminTab]);

  const fetchDbStatus = async () => {
    try {
      const res = await fetch('/api/db-status');
      if (res.ok) {
        const data = await res.json();
        setDbStatus({ provider: data.provider, usingMongoDB: data.usingMongoDB });
      }
    } catch (e) {
      setDbStatus({ provider: 'Unknown', usingMongoDB: false });
    }
  };

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/messages', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      } else if (res.status === 401 || res.status === 403) {
        // Token expired or invalid
        handleLogout();
      } else {
        console.error('Failed to load messages');
      }
    } catch (err) {
      console.error('Network error loading messages');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('admin_token', data.token);
        setToken(data.token);
        setEmail('');
        setPassword('');
      } else {
        setErrorMsg(data.error || 'Invalid username or password.');
      }
    } catch (err) {
      setErrorMsg('Failed to reach authentication server.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
    setMessages([]);
  };

  const fetchAdminProjects = async () => {
    setIsProjectsLoading(true);
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (e) {
      console.error('Failed to load projects');
    } finally {
      setIsProjectsLoading(false);
    }
  };

  const handleAddProject = async (e: FormEvent) => {
    e.preventDefault();
    setIsAddingProject(true);
    setProjErrorMsg('');
    setProjSuccessMsg('');

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: projTitle,
          description: projDescription,
          techStack: projTechStack,
          githubUrl: projGithub,
          liveUrl: projLive,
          category: projCategory,
          featured: projFeatured
        })
      });

      const data = await res.json();
      if (res.ok) {
        setProjSuccessMsg(data.message || 'Project created successfully!');
        setProjTitle('');
        setProjDescription('');
        setProjTechStack('');
        setProjGithub('');
        setProjLive('');
        setProjCategory('fullstack');
        setProjFeatured(false);
        fetchAdminProjects();
      } else {
        setProjErrorMsg(data.error || 'Failed to add project.');
      }
    } catch (err) {
      setProjErrorMsg('Network error adding project.');
    } finally {
      setIsAddingProject(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this project?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setProjects(prev => prev.filter(p => p.id !== id));
      } else {
        alert('Failed to delete project.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/messages/${id}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        // Update local state
        setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'read' } : m));
      }
    } catch (e) {
      console.error('Failed to update message status');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this message?')) return;
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        // Update local state
        setMessages(prev => prev.filter(m => m.id !== id));
      }
    } catch (e) {
      console.error('Failed to delete message');
    }
  };

  // Filters & Search
  const filteredMessages = messages.filter(msg => {
    const matchesSearch = 
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterType === 'unread') return matchesSearch && msg.status === 'unread';
    if (filterType === 'read') return matchesSearch && msg.status === 'read';
    return matchesSearch;
  });

  const unreadCount = messages.filter(m => m.status === 'unread').length;

  return (
    <section id="admin" className="py-24 bg-white dark:bg-slate-950 min-h-screen bg-grid-pattern border-b border-slate-200 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* If Not Logged In, Show Secure Form */}
        {!token ? (
          <div className="max-w-md mx-auto mt-10">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-none border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl transition-colors duration-300"
            >
              <div className="text-center mb-8">
                <div className="w-12 h-12 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-center mx-auto mb-4 text-sky-600 dark:text-sky-400 rounded-none transition-colors duration-300">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tracking-tight uppercase transition-colors duration-300">Secure Admin Login</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono uppercase tracking-widest mt-1 transition-colors duration-300">Authorized Administrator Access</p>
              </div>

              {/* Quick credential indicator box for testing */}
              <div className="bg-amber-50 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-500/20 p-4 rounded-none mb-6 transition-colors duration-300">
                <div className="flex space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider font-mono">Demo Access Credentials</h4>
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-mono">User: <span className="text-slate-800 dark:text-slate-200">madhavjha514@gmail.com</span></p>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-mono">Pass: <span className="text-slate-800 dark:text-slate-200">madhav2026</span></p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                {errorMsg && (
                  <div className="p-3.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-semibold rounded-none flex items-center space-x-2 font-mono transition-colors">
                    <AlertCircle className="w-4 h-4 text-rose-500 dark:text-rose-400 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div>
                  <label htmlFor="admin-email" className="block text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 transition-colors duration-300">
                    Admin Email
                  </label>
                  <input
                    id="admin-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="madhavjha514@gmail.com"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-none focus:border-sky-500 outline-none text-slate-800 dark:text-slate-100 font-sans text-sm placeholder:text-slate-400 dark:placeholder:text-slate-700 font-medium transition-colors duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="admin-password" className="block text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 transition-colors duration-300">
                    Secure Password
                  </label>
                  <input
                    id="admin-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-none focus:border-sky-500 outline-none text-slate-800 dark:text-slate-100 font-sans text-sm placeholder:text-slate-400 dark:placeholder:text-slate-700 font-medium transition-colors duration-300"
                  />
                </div>

                <button
                  id="login-submit-button"
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-4 border border-sky-500 bg-sky-50 text-sky-600 hover:bg-sky-500 hover:text-slate-950 dark:bg-sky-950/20 dark:text-sky-400 dark:hover:bg-sky-500 dark:hover:text-slate-950 font-mono text-xs font-bold uppercase tracking-widest rounded-none transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {isLoggingIn ? (
                    <span className="w-4 h-4 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Authenticate Securely</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        ) : (
          
          /* Logged In Dashboard View */
          <div>
            {/* Upper Info Strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white dark:bg-slate-900 p-6 rounded-none border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-2xl transition-colors duration-300">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sky-600 dark:text-sky-400 flex items-center justify-center shadow-inner shrink-0 rounded-none transition-colors duration-300">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 font-sans uppercase tracking-tight transition-colors duration-300">Admin Command Center</h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-sans transition-colors duration-300">Active User: <span className="text-sky-600 dark:text-sky-400 font-mono font-bold">madhavjha514@gmail.com</span></p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={fetchMessages}
                  className="p-2.5 bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 rounded-none border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer"
                  title="Reload Messages"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 border border-rose-500 bg-rose-50 hover:bg-rose-500 hover:text-slate-950 dark:border-rose-500/30 dark:bg-rose-950/20 dark:hover:bg-rose-500 dark:hover:text-slate-950 text-rose-600 dark:text-rose-400 font-mono font-bold text-xs rounded-none transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Exit Console</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-none border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-2xl relative transition-colors duration-300">
                <p className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors duration-300">Total Inquiries</p>
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-2 font-sans transition-colors duration-300">{messages.length}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-sans transition-colors duration-300">Submitted from client forms</p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-none border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-2xl relative overflow-hidden transition-colors duration-300">
                <p className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors duration-300">Unread Queries</p>
                <h3 className={`text-2xl md:text-3xl font-extrabold mt-2 font-sans transition-colors duration-300 ${unreadCount > 0 ? 'text-sky-600 dark:text-sky-400' : 'text-slate-900 dark:text-slate-100'}`}>{unreadCount}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-sans transition-colors duration-300">Requires response action</p>
                {unreadCount > 0 && <span className="absolute top-6 right-6 w-2.5 h-2.5 bg-sky-500 rounded-full animate-ping" />}
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-none border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-2xl relative transition-colors duration-300">
                <p className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors duration-300">Database Link Status</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Database className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                  <h3 className="text-sm md:text-base font-mono font-bold text-sky-600 dark:text-sky-400 break-all uppercase tracking-wide transition-colors duration-300">{dbStatus.provider}</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-sans transition-colors duration-300">{dbStatus.usingMongoDB ? 'Relational Atlas schema active' : 'Internal local server backup'}</p>
              </div>
            </div>

            {/* Workspace Tab Switchers */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 space-x-6">
              <button
                onClick={() => setActiveAdminTab('messages')}
                className={`pb-3 text-xs md:text-sm font-bold uppercase tracking-wider font-mono border-b-2 transition-all cursor-pointer ${
                  activeAdminTab === 'messages'
                    ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                    : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                Inquiries Inbox ({messages.length})
              </button>
              <button
                onClick={() => setActiveAdminTab('projects')}
                className={`pb-3 text-xs md:text-sm font-bold uppercase tracking-wider font-mono border-b-2 transition-all cursor-pointer ${
                  activeAdminTab === 'projects'
                    ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                    : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                Portfolio Catalog ({projects.length})
              </button>
            </div>

            {activeAdminTab === 'messages' ? (
              /* Main Queries Table Board */
              <div className="bg-white dark:bg-slate-900 rounded-none border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-2xl overflow-hidden transition-colors duration-300">
                
                {/* Table Controls Header */}
                <div className="p-6 border-b border-slate-200 dark:border-slate-800/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-50 dark:bg-slate-950/40 transition-colors duration-300">
                  
                  {/* Status Toggles */}
                  <div className="flex items-center space-x-1 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-1 rounded-none transition-colors duration-300">
                    {(['all', 'unread', 'read'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setFilterType(type)}
                        className={`px-4 py-2 rounded-none text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer transition-colors duration-300 ${
                          filterType === type
                            ? 'bg-sky-500 text-slate-950 dark:bg-sky-500 dark:text-slate-950'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-750 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  {/* Filter Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search queries by name, email, content..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-none outline-none focus:border-sky-500 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 font-sans transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Table List */}
                <div className="overflow-x-auto">
                  {isLoading ? (
                    <div className="text-center py-20">
                      <span className="inline-block w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono uppercase tracking-widest mt-3">Refreshing client inquiries...</p>
                    </div>
                  ) : filteredMessages.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 dark:text-slate-400">
                      <Inbox className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
                      <h3 className="font-bold text-slate-700 dark:text-slate-300 text-base uppercase font-sans tracking-wide">No messages found</h3>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-sans">There are no client inquiries matching this filter.</p>
                    </div>
                  ) : (
                    <table className="w-full min-w-[700px] text-left border-collapse font-sans">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-50 dark:bg-slate-950/50 transition-colors duration-300">
                          <th className="px-6 py-4">Client Detail</th>
                          <th className="px-6 py-4">Query Message</th>
                          <th className="px-6 py-4">Date Received</th>
                          <th className="px-6 py-4">Status Flag</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm transition-colors duration-300">
                        {filteredMessages.map((msg) => (
                          <tr key={msg.id} className="hover:bg-slate-50 dark:hover:bg-slate-950/40 transition-colors">
                            {/* Name & Email */}
                            <td className="px-6 py-5 shrink-0">
                              <div className="font-bold text-slate-800 dark:text-slate-100 font-sans text-sm transition-colors duration-300">{msg.name}</div>
                              <a href={`mailto:${msg.email}`} className="text-xs text-sky-600 dark:text-sky-400 font-mono hover:underline mt-1 inline-block transition-colors duration-300">
                                {msg.email}
                              </a>
                            </td>

                            {/* Message detail */}
                            <td className="px-6 py-5 max-w-sm">
                              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs bg-slate-50 dark:bg-slate-950 p-3 rounded-none border border-slate-200 dark:border-slate-800/60 font-sans transition-colors duration-300">
                                {msg.message}
                              </p>
                            </td>

                            {/* Date formatted */}
                            <td className="px-6 py-5 text-slate-500 dark:text-slate-400 font-mono text-xs whitespace-nowrap transition-colors duration-300">
                              {new Date(msg.date).toLocaleString(undefined, {
                                dateStyle: 'medium',
                                timeStyle: 'short'
                              })}
                            </td>

                            {/* Status pill badge */}
                            <td className="px-6 py-5">
                              <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest transition-colors duration-300 ${
                                msg.status === 'unread'
                                  ? 'border border-sky-500 bg-sky-50 dark:border-sky-500/30 dark:bg-sky-950/20 text-sky-600 dark:text-sky-400 animate-pulse'
                                  : 'border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-500'
                              }`}>
                                <span>{msg.status}</span>
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-5 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end space-x-2">
                                {msg.status === 'unread' && (
                                  <button
                                    onClick={() => handleMarkAsRead(msg.id)}
                                    className="inline-flex items-center space-x-1 px-3 py-1.5 border border-emerald-500 bg-emerald-50 text-emerald-600 dark:border-emerald-500/30 dark:bg-emerald-950/20 dark:text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 rounded-none text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
                                    title="Mark as Read"
                                  >
                                    <CheckCircle className="w-3.5 h-3.5" />
                                    <span>Mark Read</span>
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteMessage(msg.id)}
                                  className="inline-flex items-center space-x-1 p-2 border border-rose-500 bg-rose-50 hover:bg-rose-500 hover:text-slate-950 dark:border-rose-500/30 dark:bg-rose-950/20 dark:hover:bg-rose-500 dark:hover:text-slate-950 text-rose-600 dark:text-rose-400 rounded-none transition-colors cursor-pointer"
                                  title="Delete Message"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            ) : (
              /* Portfolio Manager Board View */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Form to Add Dynamic Project */}
                <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-md">
                  <div className="flex items-center space-x-2 mb-6">
                    <PlusCircle className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight font-sans">Add Repository</h3>
                  </div>

                  {projSuccessMsg && (
                    <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-5 font-mono flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      <span>{projSuccessMsg}</span>
                    </div>
                  )}

                  {projErrorMsg && (
                    <div className="p-3.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-semibold mb-5 font-mono flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{projErrorMsg}</span>
                    </div>
                  )}

                  <form onSubmit={handleAddProject} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Project Title *</label>
                      <input
                        type="text"
                        required
                        value={projTitle}
                        onChange={(e) => setProjTitle(e.target.value)}
                        placeholder="e.g. ApexMetrics Web Dashboard"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 outline-none text-slate-800 dark:text-slate-100 text-xs font-sans placeholder:text-slate-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Category *</label>
                        <select
                          value={projCategory}
                          onChange={(e) => setProjCategory(e.target.value as any)}
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 outline-none text-slate-850 dark:text-slate-100 text-xs font-mono"
                        >
                          <option value="fullstack">Full Stack</option>
                          <option value="frontend">Frontend</option>
                          <option value="backend">Backend</option>
                          <option value="devops">DevOps / Infra</option>
                        </select>
                      </div>

                      <div className="flex items-center pt-5">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={projFeatured}
                            onChange={(e) => setProjFeatured(e.target.checked)}
                            className="w-4 h-4 accent-sky-500"
                          />
                          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Featured?</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Tech Stack (comma separated) *</label>
                      <input
                        type="text"
                        required
                        value={projTechStack}
                        onChange={(e) => setProjTechStack(e.target.value)}
                        placeholder="e.g. React, Node.js, MongoDB"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 outline-none text-slate-800 dark:text-slate-100 text-xs font-sans placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Description *</label>
                      <textarea
                        required
                        rows={3}
                        value={projDescription}
                        onChange={(e) => setProjDescription(e.target.value)}
                        placeholder="Describe the architecture, layers, or capabilities..."
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 outline-none text-slate-800 dark:text-slate-100 text-xs font-sans placeholder:text-slate-400 leading-relaxed resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">GitHub URL</label>
                      <input
                        type="url"
                        value={projGithub}
                        onChange={(e) => setProjGithub(e.target.value)}
                        placeholder="https://github.com/..."
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 outline-none text-slate-800 dark:text-slate-100 text-xs font-sans placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Live Demo URL</label>
                      <input
                        type="url"
                        value={projLive}
                        onChange={(e) => setProjLive(e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 outline-none text-slate-800 dark:text-slate-100 text-xs font-sans placeholder:text-slate-400"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isAddingProject}
                      className="w-full py-3 bg-sky-50 border border-sky-500 text-sky-600 hover:bg-sky-500 hover:text-slate-950 dark:bg-sky-950/20 dark:text-sky-400 dark:hover:bg-sky-500 dark:hover:text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
                    >
                      {isAddingProject ? (
                        <span className="w-4 h-4 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <PlusCircle className="w-4 h-4" />
                          <span>Publish Project</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* List and Search Saved Projects */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
                  
                  {/* Search and Header */}
                  <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">Published Repository catalog</h3>
                    <div className="relative w-full sm:max-w-xs">
                      <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search local catalog..."
                        value={projSearchQuery}
                        onChange={(e) => setProjSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 outline-none text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Table/List Grid */}
                  <div className="overflow-x-auto">
                    {isProjectsLoading ? (
                      <div className="text-center py-20">
                        <span className="inline-block w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-xs text-slate-400 font-mono uppercase tracking-widest mt-2">Loading catalog...</p>
                      </div>
                    ) : projects.length === 0 ? (
                      <div className="text-center py-20 text-slate-400">
                        <Code className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-slate-800" />
                        <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wide">Catalog Empty</h4>
                        <p className="text-xs mt-1">Add your first full-stack software project using the left pane.</p>
                      </div>
                    ) : (
                      <table className="w-full text-left border-collapse font-sans text-xs">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-50 dark:bg-slate-950/20">
                            <th className="px-6 py-3">Project Detail</th>
                            <th className="px-6 py-3">Stack</th>
                            <th className="px-6 py-3">Links</th>
                            <th className="px-6 py-3 text-right">Delete</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
                          {projects
                            .filter(p => 
                              p.title.toLowerCase().includes(projSearchQuery.toLowerCase()) ||
                              p.description.toLowerCase().includes(projSearchQuery.toLowerCase()) ||
                              p.techStack.some(t => t.toLowerCase().includes(projSearchQuery.toLowerCase()))
                            )
                            .map((p) => (
                              <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-950/10">
                                <td className="px-6 py-4">
                                  <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-1.5">
                                    <span>{p.title}</span>
                                    {p.featured && (
                                      <span className="text-[8px] font-mono font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 px-1 rounded-none">FEATURED</span>
                                    )}
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-mono mt-0.5 uppercase tracking-wide">{p.category}</div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex flex-wrap gap-1 max-w-xs">
                                    {p.techStack.map(t => (
                                      <span key={t} className="text-[9px] font-mono bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400 px-1 py-0.5">
                                        {t}
                                      </span>
                                    ))}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center space-x-2.5">
                                    {p.githubUrl && (
                                      <a href={p.githubUrl} target="_blank" rel="noopener" className="text-slate-400 hover:text-sky-500" title="Repo Link">
                                        <Code className="w-4 h-4" />
                                      </a>
                                    )}
                                    {p.liveUrl && (
                                      <a href={p.liveUrl} target="_blank" rel="noopener" className="text-sky-500 hover:text-sky-600" title="Demo Link">
                                        <ExternalLink className="w-4 h-4" />
                                      </a>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <button
                                    onClick={() => handleDeleteProject(p.id)}
                                    className="p-1.5 border border-rose-500 bg-rose-50 hover:bg-rose-500 hover:text-slate-950 dark:border-rose-500/30 dark:bg-rose-950/20 dark:hover:bg-rose-500 dark:hover:text-slate-950 text-rose-600 dark:text-rose-400 rounded-none cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>

              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
