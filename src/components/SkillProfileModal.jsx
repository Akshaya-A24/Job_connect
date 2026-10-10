import React, { useState } from 'react';
import { X, Sparkles, Plus, Check, Trash2, UserCheck } from 'lucide-react';

const AVAILABLE_SKILLS = [
  'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Next.js', 
  'GraphQL', 'Python', 'PyTorch', 'System Design', 'Docker', 
  'Kubernetes', 'Figma', 'UI/UX', 'PostgreSQL', 'SQL', 
  'Product Strategy', 'A/B Testing', 'Data Analytics', 'CUDA'
];

export default function SkillProfileModal({ userProfile, onUpdateSkills, onClose }) {
  const [selectedSkills, setSelectedSkills] = useState(userProfile.skills || []);
  const [customSkill, setCustomSkill] = useState('');

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const addCustomSkill = (e) => {
    e.preventDefault();
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      setSelectedSkills([...selectedSkills, customSkill.trim()]);
      setCustomSkill('');
    }
  };

  const handleSave = () => {
    onUpdateSkills(selectedSkills);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-purple-950/60 to-brand-950/60 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-outfit">
                Candidate Skill Profile
              </h3>
              <p className="text-xs text-purple-200">
                Update your skills to dynamically recalculate job match scores
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
          
          {/* Active Skill Count */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
            <span className="text-slate-400 font-semibold">Active Selected Skills:</span>
            <span className="font-bold text-brand-400 px-2.5 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/30">
              {selectedSkills.length} Skills Listed
            </span>
          </div>

          {/* Add Custom Skill Form */}
          <form onSubmit={addCustomSkill} className="flex gap-2">
            <input
              type="text"
              placeholder="Add custom skill (e.g. Redis, Go, AWS)..."
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-all flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </form>

          {/* Skill Selector Grid */}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Select Your Tech & Soft Skills:
            </p>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_SKILLS.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center space-x-1.5 ${
                      isSelected 
                        ? 'bg-purple-900/60 text-purple-200 border-purple-500/50 shadow-md shadow-purple-900/40' 
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <span>{skill}</span>
                    {isSelected ? <Check className="w-3.5 h-3.5 text-purple-400" /> : <Plus className="w-3.5 h-3.5 text-slate-500" />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Modal Action Controls */}
        <div className="p-4 sm:p-6 bg-slate-850 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => setSelectedSkills([])}
            className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-bold transition-all"
          >
            Clear All
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-brand-600 hover:from-purple-500 hover:to-brand-500 text-white text-xs font-extrabold shadow-lg shadow-purple-600/30 transition-all flex items-center space-x-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>Save & Recalculate Matches</span>
          </button>
        </div>

      </div>
    </div>
  );
}
