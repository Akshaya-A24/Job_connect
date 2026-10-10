import React, { useState } from 'react';
import { TrendingUp, DollarSign, Award, MapPin, BarChart3, Info, Sparkles } from 'lucide-react';
import { SALARY_BENCHMARKS } from '../data/mockData';

export default function SalaryInsights() {
  const [selectedRole, setSelectedRole] = useState(SALARY_BENCHMARKS[0].role);
  const [experienceLevel, setExperienceLevel] = useState('senior'); // entry, mid, senior
  const [selectedLocation, setSelectedLocation] = useState('San Francisco, CA');

  const benchmark = SALARY_BENCHMARKS.find(b => b.role === selectedRole) || SALARY_BENCHMARKS[0];
  const salaryData = benchmark[experienceLevel];

  // Location multipliers for realism
  const locationMultipliers = {
    'San Francisco, CA': 1.15,
    'New York, NY': 1.10,
    'Austin, TX': 1.0,
    'Remote Worldwide': 1.05,
    'London, UK': 0.95
  };

  const multiplier = locationMultipliers[selectedLocation] || 1.0;
  const p25 = Math.round(salaryData.p25 * multiplier);
  const median = Math.round(salaryData.median * multiplier);
  const p75 = Math.round(salaryData.p75 * multiplier);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      
      {/* Header Title */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold mb-3">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Interactive Salary Comparison Calculator</span>
        </div>
        <h2 className="text-3xl font-black text-white font-outfit">
          Tech & Engineering <span className="gradient-text">Salary Insights</span>
        </h2>
        <p className="text-sm text-slate-300 mt-2">
          Compare market median compensation benchmarked against top tech hubs and experience tiers.
        </p>
      </div>

      {/* Calculator Controls Grid */}
      <div className="p-6 rounded-3xl glass-card border border-slate-700/80 grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Role Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Target Job Role
          </label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-brand-500 cursor-pointer [&>option]:bg-slate-900"
          >
            {SALARY_BENCHMARKS.map((b, idx) => (
              <option key={idx} value={b.role}>{b.role}</option>
            ))}
          </select>
        </div>

        {/* Seniority Tier */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Experience Seniority
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-2xl">
            <button
              onClick={() => setExperienceLevel('entry')}
              className={`py-2 rounded-xl text-xs font-bold transition-all ${
                experienceLevel === 'entry' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Entry (0-2y)
            </button>
            <button
              onClick={() => setExperienceLevel('mid')}
              className={`py-2 rounded-xl text-xs font-bold transition-all ${
                experienceLevel === 'mid' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Mid (3-5y)
            </button>
            <button
              onClick={() => setExperienceLevel('senior')}
              className={`py-2 rounded-xl text-xs font-bold transition-all ${
                experienceLevel === 'senior' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Senior (5y+)
            </button>
          </div>
        </div>

        {/* Location Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Region / Market
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-brand-500 cursor-pointer [&>option]:bg-slate-900"
          >
            {Object.keys(locationMultipliers).map((loc, idx) => (
              <option key={idx} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Salary Result Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* 25th Percentile */}
        <div className="p-6 rounded-2xl glass-card border border-slate-800 text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">25th Percentile</span>
          <p className="text-3xl font-black text-slate-200 font-outfit mt-2">
            ${(p25 / 1000).toFixed(0)}k <span className="text-xs text-slate-400 font-normal">/ yr</span>
          </p>
          <p className="text-xs text-slate-400 mt-2">Starting market baseline</p>
        </div>

        {/* Median Highlight */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-brand-950/60 to-purple-950/40 border border-brand-500/40 text-center relative shadow-glow">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-500 text-slate-950 text-[10px] font-black px-3 py-0.5 rounded-full uppercase">
            Market Median
          </span>
          <span className="text-xs font-bold text-brand-300 uppercase tracking-wider">Expected Salary</span>
          <p className="text-4xl font-black text-white font-outfit mt-2">
            ${(median / 1000).toFixed(0)}k <span className="text-xs text-slate-300 font-normal">/ yr</span>
          </p>
          <p className="text-xs text-brand-200 mt-2 font-medium">Average across verified candidates</p>
        </div>

        {/* 75th Percentile */}
        <div className="p-6 rounded-2xl glass-card border border-slate-800 text-center">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">75th Percentile (Top Tier)</span>
          <p className="text-3xl font-black text-emerald-300 font-outfit mt-2">
            ${(p75 / 1000).toFixed(0)}k <span className="text-xs text-slate-400 font-normal">/ yr</span>
          </p>
          <p className="text-xs text-slate-400 mt-2">Top-tier compensation & equity</p>
        </div>

      </div>

      {/* Visual Bar Spectrum */}
      <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center space-x-2">
          <BarChart3 className="w-4 h-4 text-brand-400" />
          <span>Compensation Range Bar Spectrum ({selectedRole})</span>
        </h4>

        <div className="relative pt-6 pb-2">
          {/* Progress Bar Background */}
          <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden flex p-0.5 border border-slate-800">
            <div className="h-full bg-slate-700/60 rounded-l-full" style={{ width: '30%' }} />
            <div className="h-full bg-gradient-to-r from-brand-500 to-indigo-500" style={{ width: '40%' }} />
            <div className="h-full bg-emerald-500/80 rounded-r-full" style={{ width: '30%' }} />
          </div>

          {/* Scale Labels */}
          <div className="flex justify-between text-xs font-bold text-slate-300 mt-3">
            <span>Low: ${(p25 / 1000).toFixed(0)}k</span>
            <span className="text-brand-400">Median: ${(median / 1000).toFixed(0)}k</span>
            <span className="text-emerald-400">High: ${(p75 / 1000).toFixed(0)}k</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 flex items-start space-x-2.5">
          <Info className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
          <span>
            Salary data derived from active job postings on JobConnect, employee self-reports, and tech industry compensation databases. Updated quarterly for accuracy.
          </span>
        </div>
      </div>

    </div>
  );
}
