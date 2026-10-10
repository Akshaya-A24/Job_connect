import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  Percent, 
  Briefcase, 
  Download, 
  UserPlus, 
  Building, 
  Calendar, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  Search,
  Bell,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch placement stats from Express API or fallback to mock
    fetch('http://localhost:5000/api/admin/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => {
        // Mock fallback matching image
        setStats({
          overview: {
            totalStudents: 450,
            totalStudentsChange: '+20.1%',
            studentsPlaced: 342,
            studentsPlacedChange: '+18.5%',
            placementRate: '76.0%',
            placementRateChange: '+15.2%',
            activeJobs: 28,
            activeJobsChange: '+12.3%'
          },
          quickActions: [
            { id: 'invite', title: 'Invite Members', desc: 'Add team members', icon: 'UserPlus' },
            { id: 'export', title: 'Export All Data', desc: 'Download reports', icon: 'Download' },
            { id: 'add_student', title: 'Add Student', desc: 'Register new student', icon: 'UserCheck' },
            { id: 'add_company', title: 'Add Company', desc: 'Register company', icon: 'Building' },
            { id: 'schedule', title: 'Schedule Report', desc: 'Set up reports', icon: 'Calendar' }
          ],
          upcomingDeadlines: [
            { id: 1, role: 'Software Engineer', company: 'Google • 45 applied', daysLeft: '2d left', badge: 'Urgent', color: 'bg-rose-500' },
            { id: 2, role: 'Data Analyst', company: 'Microsoft • 38 applied', daysLeft: '5d left', badge: 'Upcoming', color: 'bg-amber-500' }
          ],
          topRecruiters: [
            { company: 'TCS', hiredCount: '45 hired', avgCtc: '₹7.50L Avg CTC', demand: 'Strong hiring demand' },
            { company: 'Infosys', hiredCount: '38 hired', avgCtc: '₹8.20L Avg CTC', demand: 'Strong hiring demand' }
          ],
          needsAttention: [
            { department: 'EEE', placedRatio: '58 / 80 students placed', rate: '72.5%', target: 'Target: 75%' },
            { department: 'MECH', placedRatio: '65 / 90 students placed', rate: '72.2%', target: 'Target: 75%' }
          ]
        });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-12 text-center text-slate-400">Loading placement dashboard analytics...</div>;
  }

  const { overview, quickActions, upcomingDeadlines, topRecruiters, needsAttention } = stats;

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen p-4 sm:p-8 space-y-8 animate-fadeIn">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <p className="text-xs text-slate-400 flex items-center space-x-1">
            <span>Home</span>
            <span>&gt;</span>
            <span>Admin</span>
            <span>&gt;</span>
            <span className="text-brand-400 font-semibold">Dashboard</span>
          </p>
          <h1 className="text-2xl font-black text-white font-outfit mt-1">
            Placement & Admin Analytics Dashboard
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-md shadow-brand-600/30 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* 1. Overview Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: TOTAL STUDENTS */}
        <div className="p-5 rounded-2xl glass-card border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">TOTAL STUDENTS</p>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl font-extrabold text-white font-outfit">{overview.totalStudents}</span>
              <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                {overview.totalStudentsChange}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">from last month</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: STUDENTS PLACED */}
        <div className="p-5 rounded-2xl glass-card border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">STUDENTS PLACED</p>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl font-extrabold text-emerald-400 font-outfit">{overview.studentsPlaced}</span>
              <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                {overview.studentsPlacedChange}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">from last month</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: PLACEMENT RATE */}
        <div className="p-5 rounded-2xl glass-card border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">PLACEMENT RATE</p>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl font-extrabold text-amber-400 font-outfit">{overview.placementRate}</span>
              <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                {overview.placementRateChange}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">from last month</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: ACTIVE JOBS */}
        <div className="p-5 rounded-2xl glass-card border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">ACTIVE JOBS</p>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl font-extrabold text-purple-400 font-outfit">{overview.activeJobs}</span>
              <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                {overview.activeJobsChange}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">from last week</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* 2. Quick Actions Section */}
      <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
        <div>
          <h3 className="text-base font-bold text-white font-outfit">Quick Actions</h3>
          <p className="text-xs text-slate-400">Common administrative actions and shortcuts</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-brand-500/40 text-center transition-all group flex flex-col items-center justify-center"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                {action.id === 'invite' && <UserPlus className="w-5 h-5" />}
                {action.id === 'export' && <Download className="w-5 h-5" />}
                {action.id === 'add_student' && <UserCheck className="w-5 h-5" />}
                {action.id === 'add_company' && <Building className="w-5 h-5" />}
                {action.id === 'schedule' && <Calendar className="w-5 h-5" />}
              </div>
              <h4 className="text-xs font-bold text-white group-hover:text-brand-300">{action.title}</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">{action.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Bottom 3 Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Box 1: Upcoming Deadlines */}
        <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 text-rose-400">
            <Clock className="w-4 h-4" />
            <h3 className="text-base font-bold text-white font-outfit">Upcoming Deadlines</h3>
          </div>
          <p className="text-xs text-slate-400 -mt-2">Critical application windows closing soon</p>

          <div className="space-y-3">
            {upcomingDeadlines.map((item) => (
              <div key={item.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.role}</h4>
                    <p className="text-xs text-slate-400">{item.company}</p>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full text-white ${item.color}`}>
                    {item.daysLeft}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500" style={{ width: '80%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Box 2: Top Recruiters */}
        <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 text-emerald-400">
            <Building className="w-4 h-4" />
            <h3 className="text-base font-bold text-white font-outfit">Top Recruiters</h3>
          </div>
          <p className="text-xs text-slate-400 -mt-2">Companies with highest student placement</p>

          <div className="space-y-3">
            {topRecruiters.map((rec, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{rec.company}</h4>
                  <p className="text-xs text-slate-400">{rec.hiredCount} • {rec.demand}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-emerald-400 font-outfit">{rec.avgCtc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Box 3: Needs Attention */}
        <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 text-amber-400">
            <AlertCircle className="w-4 h-4" />
            <h3 className="text-base font-bold text-white font-outfit">Needs Attention</h3>
          </div>
          <p className="text-xs text-slate-400 -mt-2">Departments with placement rates below 75% target</p>

          <div className="space-y-3">
            {needsAttention.map((dept, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">{dept.department}</span>
                  <span className="font-bold text-amber-400">{dept.rate}</span>
                </div>
                <p className="text-[11px] text-slate-400">{dept.placedRatio} ({dept.target})</p>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500" style={{ width: '72%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
