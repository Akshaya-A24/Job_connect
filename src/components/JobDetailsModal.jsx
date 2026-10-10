import React from 'react';
import { 
  X, 
  MapPin, 
  DollarSign, 
  Clock, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Share2, 
  Bookmark,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { calculateSkillMatch } from './JobCard';

export default function JobDetailsModal({ 
  job, 
  candidateSkills = [], 
  isSaved, 
  onToggleSave, 
  onClose, 
  onApplyNow, 
  onOpenCompany 
}) {
  if (!job) return null;

  const matchPercentage = calculateSkillMatch(job.skills, candidateSkills);
  const matchedSkills = job.skills.filter(s => 
    candidateSkills.some(cs => cs.toLowerCase() === s.toLowerCase())
  );
  const missingSkills = job.skills.filter(s => 
    !candidateSkills.some(cs => cs.toLowerCase() === s.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Top Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex items-start justify-between relative">
          
          <div className="flex items-start space-x-4 pr-10">
            <button 
              onClick={() => onOpenCompany(job.companyId)}
              className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-700 flex items-center justify-center text-3xl shadow-md shrink-0 hover:scale-105 transition-transform"
              title={`View ${job.companyName} Profile`}
            >
              {job.companyLogo || '🏢'}
            </button>

            <div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => onOpenCompany(job.companyId)}
                  className="text-sm font-bold text-brand-400 hover:underline"
                >
                  {job.companyName}
                </button>
                <CheckCircle2 className="w-4 h-4 text-brand-400" />
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                  {job.workMode}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white font-outfit mt-1 leading-snug">
                {job.title}
              </h2>

              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{job.location}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1 font-bold text-white">
                  <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                  <span>${(job.salaryMin / 1000).toFixed(0)}k - ${(job.salaryMax / 1000).toFixed(0)}k / yr</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1 text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Posted {job.postedAt}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Close Button & Save Bookmark */}
          <div className="flex items-center space-x-2 absolute top-6 right-6">
            <button
              onClick={() => onToggleSave(job.id)}
              className={`p-2.5 rounded-xl border transition-all ${
                isSaved 
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' 
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
              title={isSaved ? "Saved" : "Save Job"}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-400' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* Skill Compatibility Score Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-brand-950/30 to-slate-900 border border-purple-500/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              
              <div className="flex items-center space-x-4">
                {/* Match Ring */}
                <div className="relative w-16 h-16 shrink-0 flex items-center justify-center rounded-full bg-slate-950 border-2 border-purple-500/40 text-white font-black text-lg font-outfit shadow-glow">
                  <span>{matchPercentage}%</span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>Candidate Skill Match Score</span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Calculated against your current skill profile ({candidateSkills.length} skills listed)
                  </p>
                </div>
              </div>

              {/* Progress Summary */}
              <div className="text-right text-xs">
                <span className="font-semibold text-emerald-400">{matchedSkills.length} Matched</span>
                <span className="text-slate-500 mx-1.5">•</span>
                <span className="font-semibold text-amber-400">{missingSkills.length} Missing</span>
              </div>
            </div>

            {/* Matched vs Missing Skill Badges */}
            <div className="mt-4 pt-3 border-t border-purple-500/20 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-slate-400 font-semibold mb-1.5 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Your Matched Skills ({matchedSkills.length}):</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {matchedSkills.length > 0 ? (
                    matchedSkills.map((s, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 font-medium">
                        {s} ✓
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500 italic">No skills matched yet</span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-slate-400 font-semibold mb-1.5 flex items-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Recommended Skills to Learn ({missingSkills.length}):</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {missingSkills.length > 0 ? (
                    missingSkills.map((s, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-amber-950/40 text-amber-300 border border-amber-500/30 font-medium">
                        + {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-emerald-400 font-medium">100% Match! You have all required skills.</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Job Overview */}
          <div>
            <h3 className="text-lg font-bold text-white font-outfit mb-3">About the Role</h3>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Key Responsibilities */}
          {job.responsibilities && (
            <div>
              <h3 className="text-lg font-bold text-white font-outfit mb-3">Key Responsibilities</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                {job.responsibilities.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-brand-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && (
            <div>
              <h3 className="text-lg font-bold text-white font-outfit mb-3">Qualifications & Skills Needed</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-emerald-400 mt-1">✓</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits & Perks */}
          {job.benefits && (
            <div>
              <h3 className="text-lg font-bold text-white font-outfit mb-3">Benefits & Perks</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {job.benefits.map((b, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-850 border border-slate-800 flex items-center space-x-2.5">
                    <ShieldCheck className="w-4 h-4 text-brand-400 shrink-0" />
                    <span className="text-slate-200 font-medium">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Company Mini Card */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-2xl">
                {job.companyLogo || '🏢'}
              </div>
              <div>
                <p className="font-bold text-white text-sm">{job.companyName}</p>
                <p className="text-xs text-slate-400">{job.location}</p>
              </div>
            </div>
            <button
              onClick={() => onOpenCompany(job.companyId)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-brand-300 text-xs font-semibold border border-slate-700 transition-all flex items-center space-x-1"
            >
              <span>View Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Modal Footer Bar */}
        <div className="p-4 sm:p-6 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-slate-400">Total Compensation Range</p>
            <p className="text-lg font-black text-white font-outfit">
              ${(job.salaryMin / 1000).toFixed(0)}k - ${(job.salaryMax / 1000).toFixed(0)}k <span className="text-xs font-normal text-slate-400">/ yr</span>
            </p>
          </div>

          <button
            onClick={() => {
              onClose();
              onApplyNow(job);
            }}
            className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 transition-all flex items-center space-x-2 active:scale-95"
          >
            <span>Apply Online Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
