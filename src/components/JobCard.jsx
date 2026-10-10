import React from 'react';
import { 
  Bookmark, 
  MapPin, 
  DollarSign, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  ArrowUpRight,
  Zap
} from 'lucide-react';

export function calculateSkillMatch(jobSkills = [], candidateSkills = []) {
  if (!jobSkills.length) return 100;
  const matchCount = jobSkills.filter(s => 
    candidateSkills.some(cs => cs.toLowerCase() === s.toLowerCase())
  ).length;
  return Math.round((matchCount / jobSkills.length) * 100);
}

export default function JobCard({ 
  job, 
  candidateSkills = [], 
  isSaved, 
  onToggleSave, 
  onSelectJob, 
  onApplyNow,
  onOpenCompany 
}) {
  const matchPercentage = calculateSkillMatch(job.skills, candidateSkills);

  // Badge color based on match score
  let matchBadgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  if (matchPercentage < 50) {
    matchBadgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
  } else if (matchPercentage >= 80) {
    matchBadgeColor = 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/40';
  }

  return (
    <div className="glass-card glass-card-hover rounded-2xl p-5 sm:p-6 flex flex-col justify-between border border-slate-800 relative group">
      
      {/* Featured / Urgent Badges */}
      {(job.featured || job.urgent) && (
        <div className="absolute -top-3 left-6 flex items-center space-x-2">
          {job.featured && (
            <span className="bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md">
              Featured
            </span>
          )}
          {job.urgent && (
            <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center space-x-1">
              <Zap className="w-3 h-3 text-rose-400 fill-rose-400" />
              <span>Urgent Hiring</span>
            </span>
          )}
        </div>
      )}

      <div>
        {/* Top Header: Company Info + Bookmark Button */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onOpenCompany && onOpenCompany(job.companyId);
              }}
              className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-2xl shadow-inner hover:scale-105 transition-transform"
              title={`View ${job.companyName} Company Profile`}
            >
              {job.companyLogo || '🏢'}
            </button>
            <div>
              <div className="flex items-center space-x-1.5">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenCompany && onOpenCompany(job.companyId);
                  }}
                  className="font-semibold text-slate-300 hover:text-brand-400 text-sm transition-colors text-left"
                >
                  {job.companyName}
                </button>
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 fill-brand-400/20" />
              </div>
              <span className="text-xs text-slate-400 flex items-center space-x-1 mt-0.5">
                <Clock className="w-3 h-3" />
                <span>{job.postedAt}</span>
              </span>
            </div>
          </div>

          {/* Save Bookmark Action */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(job.id);
            }}
            className={`p-2 rounded-xl border transition-all ${
              isSaved 
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-glow' 
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
            title={isSaved ? "Remove from Saved Jobs" : "Save Job"}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Job Title */}
        <h3 
          onClick={() => onSelectJob(job)} 
          className="mt-4 text-lg font-bold text-white hover:text-brand-300 cursor-pointer transition-colors leading-snug line-clamp-2"
        >
          {job.title}
        </h3>

        {/* Location & Work Type Tags */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>{job.location}</span>
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-800/50 text-indigo-300 font-medium">
            {job.workMode}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
            {job.type}
          </span>
        </div>

        {/* Salary Range Tag */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Estimated Salary</p>
            <p className="text-base sm:text-lg font-extrabold text-white font-outfit">
              ${(job.salaryMin / 1000).toFixed(0)}k - ${(job.salaryMax / 1000).toFixed(0)}k <span className="text-xs text-slate-400 font-normal">/ yr</span>
            </p>
          </div>

          {/* Skill Match % Badge */}
          <div className={`px-2.5 py-1 rounded-xl border text-xs font-bold flex items-center space-x-1 ${matchBadgeColor}`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>{matchPercentage}% Skill Match</span>
          </div>
        </div>

        {/* Skill Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {job.skills.slice(0, 4).map((skill, i) => {
            const isMatched = candidateSkills.some(cs => cs.toLowerCase() === skill.toLowerCase());
            return (
              <span
                key={i}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium border ${
                  isMatched 
                    ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30 font-semibold' 
                    : 'bg-slate-900/80 text-slate-400 border-slate-800'
                }`}
              >
                {skill} {isMatched && '✓'}
              </span>
            );
          })}
          {job.skills.length > 4 && (
            <span className="px-2 py-0.5 rounded-md text-[11px] text-slate-400 bg-slate-900">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>

      </div>

      {/* Action Footer Buttons */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <button
          onClick={() => onSelectJob(job)}
          className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-xs font-semibold transition-all flex items-center justify-center space-x-1"
        >
          <span>View Details</span>
        </button>

        <button
          onClick={() => onApplyNow(job)}
          className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-brand-600/20 transition-all flex items-center justify-center space-x-1 group-hover:shadow-glow"
        >
          <span>Apply Now</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
