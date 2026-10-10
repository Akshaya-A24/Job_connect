import React from 'react';
import { 
  Briefcase, 
  Bookmark, 
  User, 
  Building2, 
  TrendingUp, 
  CheckSquare, 
  Sparkles,
  LayoutDashboard,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  savedJobsCount, 
  applicationsCount, 
  userProfile, 
  onOpenSkillModal, 
  onOpenSavedDrawer 
}) {
  return (
    <header className="sticky top-0 z-40 glass-nav transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('jobs')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-600 via-purple-600 to-sky-400 p-[2px] shadow-glow transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-brand-400 group-hover:rotate-6 transition-transform" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight font-outfit text-white">
                JOB<span className="text-brand-400">CONNECT</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20">
                PRO PORTAL
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80 text-xs">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-medium transition-all ${
                activeTab === 'jobs' 
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Jobs</span>
            </button>

            <button
              onClick={() => setActiveTab('companies')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-medium transition-all ${
                activeTab === 'companies' 
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Companies</span>
            </button>

            <button
              onClick={() => setActiveTab('salary')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-medium transition-all ${
                activeTab === 'salary' 
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Salary Insights</span>
            </button>

            <button
              onClick={() => setActiveTab('applications')}
              className={`relative flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-medium transition-all ${
                activeTab === 'applications' 
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>My Applications</span>
              {applicationsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-emerald-500 text-slate-950 rounded-full">
                  {applicationsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-medium transition-all ${
                activeTab === 'admin' 
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30' 
                  : 'text-purple-300 hover:text-white hover:bg-purple-950/40'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-purple-400" />
              <span>Placement Admin</span>
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-3">
            
            {/* Skill Match Profile Button */}
            <button
              onClick={onOpenSkillModal}
              className="flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-900/40 to-brand-900/40 hover:from-purple-800/50 hover:to-brand-800/50 text-purple-200 border border-purple-500/30 transition-all"
              title="Edit Candidate Skill Profile"
            >
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="hidden sm:inline">{userProfile.skills.length} Skills Profile</span>
            </button>

            {/* Saved Jobs Button */}
            <button
              onClick={onOpenSavedDrawer}
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
              title="Saved Jobs"
            >
              <Bookmark className="w-5 h-5 text-amber-400" />
              {savedJobsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-950">
                  {savedJobsCount}
                </span>
              )}
            </button>

            {/* Candidate User Avatar */}
            <div className="hidden sm:flex items-center space-x-3 pl-2 border-l border-slate-800">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                {userProfile.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="text-left text-xs">
                <p className="font-semibold text-white leading-none">{userProfile.name}</p>
                <p className="text-slate-400 leading-tight mt-0.5 truncate max-w-[110px]">{userProfile.title}</p>
              </div>
            </div>

          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="flex lg:hidden items-center justify-around py-2.5 border-t border-slate-800/60 text-[11px]">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex flex-col items-center space-y-1 ${activeTab === 'jobs' ? 'text-brand-400 font-bold' : 'text-slate-400'}`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Jobs</span>
          </button>
          <button
            onClick={() => setActiveTab('companies')}
            className={`flex flex-col items-center space-y-1 ${activeTab === 'companies' ? 'text-brand-400 font-bold' : 'text-slate-400'}`}
          >
            <Building2 className="w-4 h-4" />
            <span>Companies</span>
          </button>
          <button
            onClick={() => setActiveTab('salary')}
            className={`flex flex-col items-center space-y-1 ${activeTab === 'salary' ? 'text-brand-400 font-bold' : 'text-slate-400'}`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Salaries</span>
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`flex flex-col items-center space-y-1 ${activeTab === 'applications' ? 'text-brand-400 font-bold' : 'text-slate-400'}`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>Applications ({applicationsCount})</span>
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`flex flex-col items-center space-y-1 ${activeTab === 'admin' ? 'text-purple-400 font-bold' : 'text-slate-400'}`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Admin</span>
          </button>
        </div>

      </div>
    </header>
  );
}
