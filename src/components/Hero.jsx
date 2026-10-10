import React from 'react';
import { Search, MapPin, Briefcase, Sparkles, TrendingUp, CheckCircle2, Star } from 'lucide-react';

export default function Hero({ 
  searchQuery, 
  setSearchQuery, 
  locationQuery, 
  setLocationQuery, 
  selectedCategory, 
  setSelectedCategory,
  categories,
  onSearchSubmit
}) {
  const quickTags = ['Remote', 'React Architect', 'Product Design', 'AI Infra', 'Senior Level', '$180k+'];

  return (
    <div className="relative overflow-hidden pt-8 pb-12 lg:pt-12 lg:pb-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      
      {/* Background Decorative Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-600/20 via-purple-600/15 to-sky-500/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Highlight Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-card text-xs font-semibold text-brand-300 border border-brand-500/30 shadow-glow mb-6">
            <Sparkles className="w-4 h-4 text-brand-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>AI-Powered Skill Matcher & Salary Verification Enabled</span>
            <span className="bg-brand-500 text-slate-950 px-2 py-0.5 rounded-full font-bold text-[10px]">NEW</span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-outfit leading-none sm:leading-tight">
            Find Your Dream Job & <br className="hidden sm:inline" />
            <span className="gradient-text">Apply Directly Online</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            Discover verified roles at top tech giants, high-growth startups, and global remote teams with instant skill compatibility scoring.
          </p>
        </div>

        {/* Interactive Search Bar Box */}
        <div className="mt-8 sm:mt-10 max-w-5xl mx-auto">
          <div className="p-3 sm:p-4 rounded-3xl glass-card border border-slate-700/80 shadow-2xl relative z-10 backdrop-blur-xl">
            <form onSubmit={onSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3">
              
              {/* Job Title / Keyword Input */}
              <div className="md:col-span-4 relative flex items-center bg-slate-900/90 rounded-2xl border border-slate-800 px-3.5 py-2.5 focus-within:border-brand-500 transition-all">
                <Search className="w-5 h-5 text-brand-400 shrink-0 mr-3" />
                <input
                  type="text"
                  placeholder="Job title, skills, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              {/* Location Input */}
              <div className="md:col-span-3 relative flex items-center bg-slate-900/90 rounded-2xl border border-slate-800 px-3.5 py-2.5 focus-within:border-brand-500 transition-all">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mr-3" />
                <input
                  type="text"
                  placeholder="City, state, or 'Remote'"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              {/* Category Dropdown */}
              <div className="md:col-span-3 relative flex items-center bg-slate-900/90 rounded-2xl border border-slate-800 px-3.5 py-2.5 focus-within:border-brand-500 transition-all">
                <Briefcase className="w-5 h-5 text-purple-400 shrink-0 mr-3" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-transparent text-sm text-white focus:outline-none cursor-pointer [&>option]:bg-slate-900 [&>option]:text-white"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} ({cat.count})
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Submit Button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full h-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 flex items-center justify-center space-x-2 transition-all active:scale-[0.98]"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Jobs</span>
                </button>
              </div>

            </form>

            {/* Quick Filter Tags */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-semibold mr-1">Popular Searches:</span>
              {quickTags.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(tag)}
                  className="px-3 py-1 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
          <div className="p-4 rounded-2xl glass-card border border-slate-800/80">
            <p className="text-2xl sm:text-3xl font-extrabold text-white font-outfit">14,800+</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">Active Tech Jobs</p>
          </div>
          <div className="p-4 rounded-2xl glass-card border border-slate-800/80">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-outfit">1,250+</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">Verified Companies</p>
          </div>
          <div className="p-4 rounded-2xl glass-card border border-slate-800/80">
            <p className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-outfit">98.4%</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">Skill Match Accuracy</p>
          </div>
          <div className="p-4 rounded-2xl glass-card border border-slate-800/80">
            <p className="text-2xl sm:text-3xl font-extrabold text-brand-400 font-outfit">&lt; 48 hrs</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">Average Response Time</p>
          </div>
        </div>

      </div>
    </div>
  );
}
