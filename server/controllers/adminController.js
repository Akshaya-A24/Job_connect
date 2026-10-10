import db from '../config/db.js';

export function getAdminPlacementStats(req, res) {
  // Placement Dashboard Overview Data matching screenshot
  const stats = {
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
      { id: 1, role: 'Software Engineer', company: 'Google', appliedCount: 45, daysLeft: '2d left', badge: 'Urgent', color: 'bg-rose-500' },
      { id: 2, role: 'Data Analyst', company: 'Microsoft', appliedCount: 38, daysLeft: '5d left', badge: 'Upcoming', color: 'bg-amber-500' }
    ],
    topRecruiters: [
      { company: 'TCS', hiredCount: 45, avgCtc: '₹7.50L', demand: 'Strong hiring demand', placements: 45 },
      { company: 'Infosys', hiredCount: 38, avgCtc: '₹8.20L', demand: 'Strong hiring demand', placements: 38 }
    ],
    needsAttention: [
      { department: 'EEE', placedRatio: '58 / 80 students placed', rate: '72.5%', target: '75%' },
      { department: 'MECH', placedRatio: '65 / 90 students placed', rate: '72.2%', target: '75%' }
    ]
  };

  res.json(stats);
}
