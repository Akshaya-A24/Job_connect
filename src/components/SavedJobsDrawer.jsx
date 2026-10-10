import React from 'react';
import { X, Bookmark, Trash2, ArrowUpRight, Briefcase } from 'lucide-react';

export default function SavedJobsDrawer({ 
  isOpen, 
  onClose, 
  savedJobs = [], 
  onToggleSave, 
  onSelectJob, 
  onApplyNow 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm flex justify-end animate-fadeIn">
      
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-700/80 h-full shadow-2xl flex flex-col">
        
        {/* Drawer Header */}
        <div className="p-6 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400" />
            <h3 className="text-lg font-bold text-white font-outfit">
              Saved Jobs ({savedJobs.length})
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {savedJobs.length > 0 ? (
            savedJobs.map((job) => (
              <div 
                key={job.id} 
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xl shrink-0">
                      {job.companyLogo || '🏢'}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-brand-400">{job.companyName}</p>
                      <h4 
                        onClick={() => {
                          onClose();
                          onSelectJob(job);
                        }}
                        className="text-sm font-bold text-white hover:text-brand-300 cursor-pointer line-clamp-1"
                      >
                        {job.title}
                      </h4>
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleSave(job.id)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                    title="Remove bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-white">
                    ${(job.salaryMin / 1000).toFixed(0)}k - ${(job.salaryMax / 1000).toFixed(0)}k
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    {job.workMode}
                  </span>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectJob(job);
                    }}
                    className="flex-1 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onApplyNow(job);
                    }}
                    className="flex-1 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-md shadow-brand-600/20"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 space-y-3 text-slate-400">
              <Bookmark className="w-12 h-12 text-slate-700 mx-auto" />
              <p className="text-sm font-semibold">No saved jobs yet</p>
              <p className="text-xs text-slate-500">
                Click the bookmark icon on any job card to save it for later.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
