import React from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  Users, 
  Globe, 
  Star, 
  CheckCircle2, 
  Briefcase, 
  ExternalLink,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';
import JobCard from './JobCard';

export default function CompanyProfileModal({ 
  company, 
  allJobs = [], 
  candidateSkills = [], 
  savedJobIds = [], 
  onToggleSave, 
  onSelectJob, 
  onApplyNow, 
  onClose 
}) {
  if (!company) return null;

  const companyJobs = allJobs.filter(j => j.companyId === company.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Banner Image */}
        <div className="h-40 sm:h-52 w-full relative overflow-hidden bg-slate-950">
          <img 
            src={company.banner} 
            alt={company.name} 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-xl bg-slate-900/80 backdrop-blur-md text-slate-300 hover:text-white border border-slate-700 transition-all z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Header Profile Summary */}
        <div className="px-6 sm:px-8 -mt-12 relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          
          <div className="flex items-end space-x-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-950 border-2 border-slate-700 flex items-center justify-center text-4xl shadow-xl shrink-0">
              {company.logo || '🏢'}
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white font-outfit">
                  {company.name}
                </h2>
                <CheckCircle2 className="w-5 h-5 text-brand-400 fill-brand-400/20" />
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                {company.industry}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold flex items-center space-x-1.5 transition-all"
            >
              <Globe className="w-4 h-4 text-brand-400" />
              <span>Visit Website</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>

        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* Company Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <p className="text-slate-400 flex items-center justify-center space-x-1 mb-1">
                <Users className="w-3.5 h-3.5 text-brand-400" />
                <span>Company Size</span>
              </p>
              <p className="font-bold text-white text-sm">{company.size}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <p className="text-slate-400 flex items-center justify-center space-x-1 mb-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Headquarters</span>
              </p>
              <p className="font-bold text-white text-sm truncate">{company.location}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <p className="text-slate-400 flex items-center justify-center space-x-1 mb-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Employee Rating</span>
              </p>
              <p className="font-bold text-amber-400 text-sm">{company.rating} / 5.0 ({company.reviewsCount})</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <p className="text-slate-400 flex items-center justify-center space-x-1 mb-1">
                <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                <span>Open Positions</span>
              </p>
              <p className="font-bold text-purple-300 text-sm">{companyJobs.length} Live Roles</p>
            </div>
          </div>

          {/* About Overview */}
          <div>
            <h3 className="text-base font-bold text-white font-outfit mb-2">About {company.name}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {company.description}
            </p>
          </div>

          {/* Culture Perks */}
          {company.perks && (
            <div>
              <h3 className="text-base font-bold text-white font-outfit mb-3">Employee Benefits & Culture Perks</h3>
              <div className="flex flex-wrap gap-2">
                {company.perks.map((perk, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-850 border border-slate-800 text-xs text-slate-200 font-semibold flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{perk}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Active Job Openings at Company */}
          <div>
            <h3 className="text-lg font-bold text-white font-outfit mb-4 flex items-center justify-between">
              <span>Open Vacancies at {company.name} ({companyJobs.length})</span>
            </h3>

            {companyJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {companyJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    candidateSkills={candidateSkills}
                    isSaved={savedJobIds.includes(job.id)}
                    onToggleSave={onToggleSave}
                    onSelectJob={() => {
                      onClose();
                      onSelectJob(job);
                    }}
                    onApplyNow={() => {
                      onClose();
                      onApplyNow(job);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center text-slate-400 text-sm">
                No active public openings listed for this company right now.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
