import React from 'react';
import { CheckSquare, Calendar, FileText, CheckCircle2, Clock, AlertCircle, ArrowUpRight } from 'lucide-react';

export default function MyApplications({ applications = [], onSelectJob, allJobs = [] }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold mb-2">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Candidate Application Tracker</span>
          </div>
          <h2 className="text-3xl font-black text-white font-outfit">
            My Submitted <span className="gradient-text">Applications</span>
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Track real-time hiring pipeline updates for your job submissions.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl glass-card border border-slate-800 text-xs text-slate-300">
          Total Submitted: <span className="font-extrabold text-white text-base ml-1">{applications.length}</span>
        </div>
      </div>

      {/* Application List */}
      {applications.length > 0 ? (
        <div className="space-y-4">
          {applications.map((app) => {
            const relatedJob = allJobs.find(j => j.id === app.jobId);
            return (
              <div 
                key={app.id}
                className="p-6 rounded-3xl glass-card border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-slate-700 transition-all"
              >
                {/* Job & Company Info */}
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-700 flex items-center justify-center text-3xl shrink-0 shadow-md">
                    {app.companyLogo || '🏢'}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-brand-400">{app.companyName}</span>
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                        {app.id}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white font-outfit mt-0.5">
                      {app.jobTitle}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>Submitted on {app.appliedDate}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <FileText className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{app.resumeUsed}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pipeline Status Step Tracker */}
                <div className="w-full md:w-72 bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-slate-400 font-semibold">Status Pipeline:</span>
                    <span className="font-bold text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                      {app.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-1 text-[9px] text-center font-bold">
                    <div className="p-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Submitted
                    </div>
                    <div className={`p-1 rounded ${app.statusStep >= 2 ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30' : 'bg-slate-900 text-slate-600'}`}>
                      In Review
                    </div>
                    <div className={`p-1 rounded ${app.statusStep >= 3 ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-slate-900 text-slate-600'}`}>
                      Interview
                    </div>
                    <div className={`p-1 rounded ${app.statusStep >= 4 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-900 text-slate-600'}`}>
                      Offer
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 rounded-3xl glass-card border border-slate-800 text-center space-y-4">
          <CheckSquare className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-xl font-bold text-white">No Submitted Applications Yet</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Browse open positions on JobConnect and click "Apply Now" to submit your application online.
          </p>
        </div>
      )}

    </div>
  );
}
