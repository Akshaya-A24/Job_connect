import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  DollarSign, 
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Download
} from 'lucide-react';

export default function ApplyModal({ job, userProfile, onClose, onSubmitApplication }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: userProfile.name || '',
    email: userProfile.email || '',
    phone: userProfile.phone || '',
    experienceYears: userProfile.experienceYears || 5,
    portfolioUrl: 'https://linkedin.com/in/alexmorgan-dev',
    coverLetter: `Dear Hiring Team at ${job?.companyName || 'the company'},\n\nI am thrilled to submit my application for the ${job?.title || 'position'}. With my strong background in ${job?.skills.slice(0, 3).join(', ')}, I am confident I can make an immediate impact on your team.\n\nBest regards,\n${userProfile.name}`,
    expectedSalary: job ? `${(job.salaryMin / 1000).toFixed(0)}k - ${(job.salaryMax / 1000).toFixed(0)}k` : '185k',
    resumeFile: userProfile.resume || { fileName: 'Alex_Morgan_Software_Engineer_CV.pdf', size: '1.4 MB' }
  });

  const [isDragging, setIsDragging] = useState(false);
  const [submittedApp, setSubmittedApp] = useState(null);

  if (!job) return null;

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFormData(prev => ({
        ...prev,
        resumeFile: {
          fileName: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        }
      }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        resumeFile: {
          fileName: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        }
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppId = `APP-${Math.floor(10000 + Math.random() * 90000)}`;
    const newApplication = {
      id: newAppId,
      jobId: job.id,
      jobTitle: job.title,
      companyName: job.companyName,
      companyLogo: job.companyLogo,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'In Review',
      statusStep: 1,
      resumeUsed: formData.resumeFile.fileName,
      candidateData: formData
    };

    setSubmittedApp(newApplication);
    onSubmitApplication(newApplication);
    setStep(4); // Confirmation step
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header Bar */}
        <div className="p-6 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-xl">
              {job.companyLogo || '🏢'}
            </div>
            <div>
              <p className="text-xs text-brand-400 font-semibold">{job.companyName}</p>
              <h3 className="text-base font-bold text-white font-outfit truncate max-w-xs sm:max-w-md">
                Apply for {job.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step < 4 && (
          <div className="px-6 py-3 bg-slate-950 border-b border-slate-800/60 flex items-center justify-between text-xs text-slate-400 font-medium">
            <span className={step >= 1 ? 'text-brand-400 font-bold' : ''}>1. Personal Details</span>
            <span>→</span>
            <span className={step >= 2 ? 'text-brand-400 font-bold' : ''}>2. Resume Upload</span>
            <span>→</span>
            <span className={step >= 3 ? 'text-brand-400 font-bold' : ''}>3. Cover Letter</span>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* STEP 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Candidate Information</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                  <div className="relative flex items-center bg-slate-950 rounded-xl border border-slate-800 px-3 py-2.5">
                    <User className="w-4 h-4 text-slate-400 mr-2" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <div className="relative flex items-center bg-slate-950 rounded-xl border border-slate-800 px-3 py-2.5">
                    <Mail className="w-4 h-4 text-slate-400 mr-2" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                  <div className="relative flex items-center bg-slate-950 rounded-xl border border-slate-800 px-3 py-2.5">
                    <Phone className="w-4 h-4 text-slate-400 mr-2" />
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-transparent text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Years of Experience</label>
                  <div className="relative flex items-center bg-slate-950 rounded-xl border border-slate-800 px-3 py-2.5">
                    <Briefcase className="w-4 h-4 text-slate-400 mr-2" />
                    <input
                      type="number"
                      min="0"
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                      className="w-full bg-transparent text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Portfolio / LinkedIn URL</label>
                <input
                  type="url"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-slate-950 rounded-xl border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Resume Upload UI */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Upload Resume / CV</h4>

              {/* Drag and Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                  isDragging 
                    ? 'border-brand-500 bg-brand-500/10 scale-[1.01]' 
                    : 'border-slate-700/80 bg-slate-950/60 hover:border-slate-600'
                }`}
              >
                <UploadCloud className="w-12 h-12 text-brand-400 mx-auto mb-3 animate-bounce" style={{ animationDuration: '3s' }} />
                <p className="text-sm font-bold text-white">
                  Drag & Drop your resume PDF/DOCX here
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Supported formats: PDF, DOCX (Max file size: 10MB)
                </p>

                <div className="mt-4">
                  <label className="inline-flex items-center px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-brand-300 text-xs font-bold cursor-pointer border border-slate-700 transition-all">
                    <span>Browse File from Device</span>
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx" 
                      onChange={handleFileChange}
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>

              {/* Current Resume Preview Pill */}
              {formData.resumeFile && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-emerald-400" />
                    <div>
                      <p className="text-sm font-semibold text-white">{formData.resumeFile.fileName}</p>
                      <p className="text-xs text-slate-400">{formData.resumeFile.size || '1.4 MB'} • Verified PDF</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                    Ready to Attach ✓
                  </span>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Cover Letter & Expected Salary */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Cover Letter & Salary Expectation</h4>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Expected Annual Salary ($ USD)</label>
                <div className="relative flex items-center bg-slate-950 rounded-xl border border-slate-800 px-3.5 py-2.5">
                  <DollarSign className="w-4 h-4 text-emerald-400 mr-2" />
                  <input
                    type="text"
                    value={formData.expectedSalary}
                    onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                    className="w-full bg-transparent text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Cover Letter (Optional)</label>
                <textarea
                  rows={6}
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  className="w-full bg-slate-950 rounded-xl border border-slate-800 p-3.5 text-sm text-white focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Application Confirmation */}
          {step === 4 && submittedApp && (
            <div className="py-4 text-center space-y-6">
              
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-glow">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  APPLICATION SUCCESSFUL
                </span>
                <h3 className="text-2xl font-black text-white font-outfit mt-3">
                  Application Submitted to {job.companyName}!
                </h3>
                <p className="text-sm text-slate-300 mt-1 max-w-md mx-auto">
                  Your candidate profile and resume have been dispatched to the hiring team at {job.companyName}.
                </p>
              </div>

              {/* Reference Details Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Application Reference ID:</span>
                  <span className="font-mono font-bold text-brand-400">{submittedApp.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Role:</span>
                  <span className="font-semibold text-white">{submittedApp.jobTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Attached Resume:</span>
                  <span className="font-semibold text-slate-300">{submittedApp.resumeUsed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Submission Date:</span>
                  <span className="text-slate-300">{submittedApp.appliedDate}</span>
                </div>
              </div>

              {/* Hiring Stage Progress Bar */}
              <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 text-left">
                <p className="text-xs font-bold text-white mb-3">Live Application Stage:</p>
                <div className="grid grid-cols-4 gap-2 text-[10px] text-center">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                    1. Submitted
                  </div>
                  <div className="p-2 rounded-lg bg-brand-500/10 text-brand-300 border border-brand-500/30">
                    2. In Review
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 text-slate-500">
                    3. Interview
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 text-slate-500">
                    4. Offer
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Action Controls Footer */}
        <div className="p-4 sm:p-6 bg-slate-850 border-t border-slate-800 flex items-center justify-between">
          {step < 4 ? (
            <>
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center space-x-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : <div />}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-md shadow-brand-600/30 flex items-center space-x-1"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold shadow-lg shadow-emerald-600/30 flex items-center space-x-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Submit Application</span>
                </button>
              )}
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold transition-all"
            >
              Done & Track in My Applications
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
