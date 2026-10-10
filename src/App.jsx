import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import JobCard from './components/JobCard';
import JobDetailsModal from './components/JobDetailsModal';
import ApplyModal from './components/ApplyModal';
import CompanyProfileModal from './components/CompanyProfileModal';
import SalaryInsights from './components/SalaryInsights';
import SkillProfileModal from './components/SkillProfileModal';
import MyApplications from './components/MyApplications';
import AdminDashboard from './components/AdminDashboard';
import SavedJobsDrawer from './components/SavedJobsDrawer';
import Toast from './components/Toast';

import { 
  CATEGORIES, 
  MOCK_JOBS, 
  COMPANIES, 
  INITIAL_USER_PROFILE, 
  INITIAL_APPLICATIONS 
} from './data/mockData';

import { 
  SlidersHorizontal, 
  Search,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState('jobs'); // jobs, companies, salary, applications, admin

  // Candidate State
  const [userProfile, setUserProfile] = useState(INITIAL_USER_PROFILE);
  const [savedJobIds, setSavedJobIds] = useState(['job-1', 'job-3']);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);

  // Search & Filter Controls State
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [workModeFilter, setWorkModeFilter] = useState('all'); // all, Remote, Hybrid, On-site
  const [minSalary, setMinSalary] = useState(40000);
  const [jobTypeFilter, setJobTypeFilter] = useState('all'); // all, Full-time, Contract
  const [sortBy, setSortBy] = useState('relevance'); // relevance, salary-high, recent

  // Modal Views State
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyJob, setApplyJob] = useState(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Saved Bookmark Toggle
  const toggleSaveJob = (jobId) => {
    if (savedJobIds.includes(jobId)) {
      setSavedJobIds(savedJobIds.filter(id => id !== jobId));
      showToast('Removed job from bookmarks');
    } else {
      setSavedJobIds([...savedJobIds, jobId]);
      showToast('Saved job to your bookmarks!');
    }
  };

  // Submit Application Handler
  const handleNewApplication = (newApp) => {
    setApplications([newApp, ...applications]);
    showToast(`Application ${newApp.id} submitted successfully!`);
  };

  // Update Candidate Skills
  const handleUpdateSkills = (newSkills) => {
    setUserProfile(prev => ({ ...prev, skills: newSkills }));
    showToast('Updated candidate skills & recalculated match scores!');
  };

  // Filtered Jobs Logic
  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter(job => {
      const query = searchQuery.toLowerCase();
      const matchesKeyword = !query || 
        job.title.toLowerCase().includes(query) ||
        job.companyName.toLowerCase().includes(query) ||
        job.skills.some(s => s.toLowerCase().includes(query));

      const locQuery = locationQuery.toLowerCase();
      const matchesLocation = !locQuery || job.location.toLowerCase().includes(locQuery);

      const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
      const matchesWorkMode = workModeFilter === 'all' || job.workMode === workModeFilter;
      const matchesJobType = jobTypeFilter === 'all' || job.type === jobTypeFilter;
      const matchesSalary = job.salaryMax >= minSalary;

      return matchesKeyword && matchesLocation && matchesCategory && matchesWorkMode && matchesJobType && matchesSalary;
    }).sort((a, b) => {
      if (sortBy === 'salary-high') return b.salaryMax - a.salaryMax;
      if (sortBy === 'recent') return a.id.localeCompare(b.id);
      return 0;
    });
  }, [searchQuery, locationQuery, selectedCategory, workModeFilter, jobTypeFilter, minSalary, sortBy]);

  const savedJobs = MOCK_JOBS.filter(j => savedJobIds.includes(j.id));
  const activeCompany = COMPANIES.find(c => c.id === selectedCompanyId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedJobsCount={savedJobIds.length}
        applicationsCount={applications.length}
        userProfile={userProfile}
        onOpenSkillModal={() => setIsSkillModalOpen(true)}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        
        {/* VIEW 1: EXPLORE JOBS PAGE */}
        {activeTab === 'jobs' && (
          <div>
            {/* Hero Banner */}
            <Hero
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              locationQuery={locationQuery}
              setLocationQuery={setLocationQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={CATEGORIES}
              onSearchSubmit={(e) => e.preventDefault()}
            />

            {/* Main Listings Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
              
              {/* Category Cards Bar */}
              <div>
                <h2 className="text-xl font-bold text-white font-outfit mb-4 flex items-center justify-between">
                  <span>Browse by Category</span>
                  {selectedCategory !== 'all' && (
                    <button 
                      onClick={() => setSelectedCategory('all')} 
                      className="text-xs text-brand-400 font-semibold hover:underline"
                    >
                      Clear Category Filter
                    </button>
                  )}
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                        className={`p-4 rounded-2xl border text-left transition-all group ${
                          isSelected 
                            ? 'bg-gradient-to-b from-brand-900/60 to-purple-950/60 border-brand-500/60 shadow-glow' 
                            : 'glass-card border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full inline-block mb-2 ${
                          isSelected ? 'bg-brand-500 text-slate-950' : 'bg-slate-900 text-slate-400'
                        }`}>
                          {cat.count} Roles
                        </span>
                        <h4 className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors line-clamp-1">
                          {cat.name}
                        </h4>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Listings Controls & Sidebar */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Search & Filters Sidebar */}
                <aside className="lg:col-span-3 glass-card rounded-3xl p-6 border border-slate-800 space-y-6 sticky top-28">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <h3 className="font-bold text-white text-base font-outfit flex items-center space-x-2">
                      <SlidersHorizontal className="w-4 h-4 text-brand-400" />
                      <span>Filter Jobs</span>
                    </h3>
                    {(workModeFilter !== 'all' || jobTypeFilter !== 'all' || minSalary > 40000 || searchQuery || locationQuery) && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setLocationQuery('');
                          setWorkModeFilter('all');
                          setJobTypeFilter('all');
                          setMinSalary(40000);
                          setSelectedCategory('all');
                        }}
                        className="text-xs text-rose-400 hover:underline font-medium"
                      >
                        Reset All
                      </button>
                    )}
                  </div>

                  {/* Work Mode Filter */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Work Environment
                    </label>
                    <div className="space-y-1.5 text-xs font-medium">
                      {['all', 'Remote', 'Hybrid', 'On-site'].map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setWorkModeFilter(mode)}
                          className={`w-full px-3 py-2 rounded-xl text-left transition-all ${
                            workModeFilter === mode 
                              ? 'bg-brand-600/30 text-brand-200 border border-brand-500/40 font-bold' 
                              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-transparent'
                          }`}
                        >
                          {mode === 'all' ? 'All Environments' : mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Salary Filter Slider */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-2">
                      <label className="font-bold text-slate-300 uppercase tracking-wider">Min Salary Range</label>
                      <span className="font-bold text-emerald-400 font-outfit">${(minSalary / 1000).toFixed(0)}k+</span>
                    </div>
                    <input
                      type="range"
                      min="40000"
                      max="250000"
                      step="10000"
                      value={minSalary}
                      onChange={(e) => setMinSalary(Number(e.target.value))}
                      className="w-full accent-brand-500 cursor-pointer bg-slate-900"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>$40k</span>
                      <span>$150k</span>
                      <span>$250k+</span>
                    </div>
                  </div>

                  {/* Job Type Filter */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Job Employment Type
                    </label>
                    <div className="space-y-1.5 text-xs font-medium">
                      {['all', 'Full-time', 'Contract'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setJobTypeFilter(type)}
                          className={`w-full px-3 py-2 rounded-xl text-left transition-all ${
                            jobTypeFilter === type 
                              ? 'bg-brand-600/30 text-brand-200 border border-brand-500/40 font-bold' 
                              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-transparent'
                          }`}
                        >
                          {type === 'all' ? 'All Employment Types' : type}
                        </button>
                      ))}
                    </div>
                  </div>

                </aside>

                {/* Job Cards Feed Section */}
                <div className="lg:col-span-9 space-y-6">
                  
                  {/* Results Count & Sort Toolbar */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-slate-800">
                    <div>
                      <p className="text-sm font-bold text-white">
                        Showing <span className="text-brand-400 font-extrabold">{filteredJobs.length}</span> Available Roles
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Sorted by candidate skill compatibility & relevance
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 text-xs w-full sm:w-auto">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-brand-500 cursor-pointer [&>option]:bg-slate-900"
                      >
                        <option value="relevance">Sort by Relevance</option>
                        <option value="salary-high">Sort by Highest Salary</option>
                        <option value="recent">Sort by Most Recent</option>
                      </select>
                    </div>
                  </div>

                  {/* Grid Display */}
                  {filteredJobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredJobs.map((job) => (
                        <JobCard
                          key={job.id}
                          job={job}
                          candidateSkills={userProfile.skills}
                          isSaved={savedJobIds.includes(job.id)}
                          onToggleSave={toggleSaveJob}
                          onSelectJob={setSelectedJob}
                          onApplyNow={setApplyJob}
                          onOpenCompany={setSelectedCompanyId}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 rounded-3xl glass-card border border-slate-800 text-center space-y-4">
                      <Search className="w-12 h-12 text-slate-600 mx-auto" />
                      <h3 className="text-xl font-bold text-white">No Matching Jobs Found</h3>
                      <p className="text-sm text-slate-400 max-w-md mx-auto">
                        Try clearing your search query or adjusting your location and salary range filters.
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setLocationQuery('');
                          setWorkModeFilter('all');
                          setSelectedCategory('all');
                          setMinSalary(40000);
                        }}
                        className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold"
                      >
                        Reset Search Filters
                      </button>
                    </div>
                  )}

                </div>

              </div>

            </div>
          </div>
        )}

        {/* VIEW 2: TOP COMPANIES PAGE */}
        {activeTab === 'companies' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-black text-white font-outfit">
                Top Hiring <span className="gradient-text">Companies</span>
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Explore tech leaders and startups actively building world-class engineering teams.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COMPANIES.map((company) => {
                const openJobsCount = MOCK_JOBS.filter(j => j.companyId === company.id).length;
                return (
                  <div
                    key={company.id}
                    onClick={() => setSelectedCompanyId(company.id)}
                    className="glass-card glass-card-hover rounded-3xl p-6 border border-slate-800 cursor-pointer space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-3xl shadow-md">
                          {company.logo}
                        </div>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                          {openJobsCount} Open Jobs
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white font-outfit mt-4 flex items-center space-x-2">
                        <span>{company.name}</span>
                        <CheckCircle2 className="w-4 h-4 text-brand-400" />
                      </h3>

                      <p className="text-xs text-slate-400 font-semibold mt-0.5">{company.industry}</p>

                      <p className="text-slate-300 text-xs mt-3 line-clamp-3 leading-relaxed">
                        {company.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                      <span>{company.size}</span>
                      <span className="font-bold text-amber-400">★ {company.rating} Rating</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 3: SALARY INSIGHTS PAGE */}
        {activeTab === 'salary' && (
          <SalaryInsights />
        )}

        {/* VIEW 4: MY APPLICATIONS PAGE */}
        {activeTab === 'applications' && (
          <MyApplications
            applications={applications}
            onSelectJob={setSelectedJob}
            allJobs={MOCK_JOBS}
          />
        )}

        {/* VIEW 5: PLACEMENT ADMIN DASHBOARD PAGE */}
        {activeTab === 'admin' && (
          <AdminDashboard />
        )}

      </main>

      {/* Footer */}
      <footer className="mt-16 bg-slate-950 border-t border-slate-900 py-10 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-black text-white font-outfit text-base">
              JOB<span className="text-brand-400">CONNECT</span>
            </span>
            <span>© 2026 JobConnect Portal Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6 text-slate-400">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Employer Hub</span>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      {selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          candidateSkills={userProfile.skills}
          isSaved={savedJobIds.includes(selectedJob.id)}
          onToggleSave={toggleSaveJob}
          onClose={() => setSelectedJob(null)}
          onApplyNow={(j) => setApplyJob(j)}
          onOpenCompany={(cid) => setSelectedCompanyId(cid)}
        />
      )}

      {applyJob && (
        <ApplyModal
          job={applyJob}
          userProfile={userProfile}
          onClose={() => setApplyJob(null)}
          onSubmitApplication={handleNewApplication}
        />
      )}

      {selectedCompanyId && (
        <CompanyProfileModal
          company={activeCompany}
          allJobs={MOCK_JOBS}
          candidateSkills={userProfile.skills}
          savedJobIds={savedJobIds}
          onToggleSave={toggleSaveJob}
          onSelectJob={setSelectedJob}
          onApplyNow={setApplyJob}
          onClose={() => setSelectedCompanyId(null)}
        />
      )}

      {isSkillModalOpen && (
        <SkillProfileModal
          userProfile={userProfile}
          onUpdateSkills={handleUpdateSkills}
          onClose={() => setIsSkillModalOpen(false)}
        />
      )}

      <SavedJobsDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedJobs={savedJobs}
        onToggleSave={toggleSaveJob}
        onSelectJob={setSelectedJob}
        onApplyNow={setApplyJob}
      />

      <Toast message={toastMessage} />

    </div>
  );
}
