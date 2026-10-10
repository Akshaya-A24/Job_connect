// Comprehensive mock data for JobConnect

export const CATEGORIES = [
  { id: 'tech', name: 'Software Development', icon: 'Code', count: 4820, color: 'from-blue-500 to-indigo-600' },
  { id: 'design', name: 'Design & Creative', icon: 'Palette', count: 1940, color: 'from-pink-500 to-rose-600' },
  { id: 'data', name: 'Data & AI', icon: 'Brain', count: 2310, color: 'from-purple-500 to-violet-600' },
  { id: 'product', name: 'Product & Project Management', icon: 'Briefcase', count: 1850, color: 'from-amber-500 to-orange-600' },
  { id: 'marketing', name: 'Growth & Marketing', icon: 'TrendingUp', count: 1420, color: 'from-emerald-500 to-teal-600' },
  { id: 'finance', name: 'Finance & Fintech', icon: 'DollarSign', count: 980, color: 'from-cyan-500 to-blue-600' },
];

export const INITIAL_USER_PROFILE = {
  name: 'Alex Morgan',
  title: 'Senior Frontend Engineer',
  email: 'alex.morgan@example.com',
  phone: '+1 (555) 234-5678',
  location: 'San Francisco, CA',
  experienceYears: 5,
  skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'GraphQL', 'Next.js', 'System Design'],
  resume: {
    fileName: 'Alex_Morgan_Software_Engineer_CV.pdf',
    uploadedAt: '2026-10-01',
    size: '1.4 MB'
  }
};

export const COMPANIES = [
  {
    id: 'stripe',
    name: 'Stripe',
    logo: '⚡',
    banner: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    industry: 'Financial Infrastructure / Fintech',
    size: '7,000+ employees',
    location: 'San Francisco, CA (Hybrid / Remote)',
    rating: 4.8,
    reviewsCount: 1420,
    website: 'https://stripe.com',
    description: 'Stripe is a financial infrastructure platform for businesses. Millions of companies—from the world’s largest enterprises to the most ambitious startups—use Stripe to accept payments, grow their revenue, and accelerate new business opportunities.',
    perks: ['Unlimited PTO', 'Comprehensive Healthcare', '$2,000 WFH Stipend', 'Learning & Growth Budget', '401(k) Matching']
  },
  {
    id: 'linear',
    name: 'Linear',
    logo: '📐',
    banner: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    industry: 'Developer Tools / Product Software',
    size: '80+ employees',
    location: 'Remote Worldwide',
    rating: 4.9,
    reviewsCount: 310,
    website: 'https://linear.app',
    description: 'Linear is designed for modern software teams. Streamline issue tracking, sprint planning, and product roadmaps with unmatched speed and craftsmanship.',
    perks: ['100% Remote Culture', 'Top-tier Equipment', 'Quarterly Team Offsites', 'Generous Equity', 'Flexible Hours']
  },
  {
    id: 'figma',
    name: 'Figma',
    logo: '🎨',
    banner: 'https://images.unsplash.com/photo-1542744094-3a31b272c490?auto=format&fit=crop&w=1200&q=80',
    industry: 'Design Systems & Collaboration',
    size: '1,500+ employees',
    location: 'San Francisco, CA',
    rating: 4.7,
    reviewsCount: 890,
    website: 'https://figma.com',
    description: 'Figma empowers teams to design, prototype, and build better products together in real time. Used by teams at Airbnb, Zoom, Slack, and Netflix.',
    perks: ['Wellness Stipend', 'Parental Leave', 'Design Hackathons', 'Stock Options', 'Annual Retreats']
  },
  {
    id: 'vercel',
    name: 'Vercel',
    logo: '▲',
    banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    industry: 'Cloud Platform & Frontend Infrastructure',
    size: '500+ employees',
    location: 'Remote First',
    rating: 4.8,
    reviewsCount: 540,
    website: 'https://vercel.com',
    description: 'Vercel enables frontend teams to develop, preview, and ship delightful user experiences at scale. Creator of Next.js.',
    perks: ['Global Remote Freedom', 'Latest MacBook Pro', 'Mental Health Support', 'Competitive Compensation']
  },
  {
    id: 'openai',
    name: 'OpenAI',
    logo: '🧠',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    industry: 'Artificial Intelligence Research & Deployment',
    size: '1,200+ employees',
    location: 'San Francisco, CA',
    rating: 4.9,
    reviewsCount: 650,
    website: 'https://openai.com',
    description: 'OpenAI is an AI research and deployment company dedicated to ensuring artificial general intelligence benefits all of humanity.',
    perks: ['Cutting-edge Compute Access', 'Extremely High Compensation', 'Catered Gourmet Meals', 'Full Healthcare Coverage']
  }
];

export const MOCK_JOBS = [
  {
    id: 'job-1',
    title: 'Senior Frontend Architect (React / TypeScript)',
    companyId: 'stripe',
    companyName: 'Stripe',
    companyLogo: '⚡',
    location: 'San Francisco, CA (Hybrid)',
    category: 'tech',
    type: 'Full-time',
    workMode: 'Hybrid',
    salaryMin: 185000,
    salaryMax: 235000,
    currency: 'USD',
    period: 'year',
    featured: true,
    urgent: true,
    postedAt: '2 hours ago',
    experienceLevel: 'Senior (5+ yrs)',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'System Design', 'Performance Optimization'],
    description: 'We are seeking a Senior Frontend Architect to lead the UI design system and core payment components at Stripe. You will build high-velocity frontend architecture that powers checkout experiences for millions of global businesses.',
    responsibilities: [
      'Lead the architecture and performance optimization of Stripe Dashboard micro-frontends.',
      'Design accessible, bulletproof UI component primitives using React and TypeScript.',
      'Collaborate closely with Product Designers and Backend Engineers to build seamless payment flows.',
      'Mentor junior and mid-level engineers across frontend engineering best practices.'
    ],
    requirements: [
      '5+ years of production experience with modern JavaScript framework ecosystems (React, TypeScript, Next.js).',
      'Proven expertise in web performance optimization, accessibility (WCAG), and state management.',
      'Deep knowledge of modern CSS, design tokens, and web component architectures.',
      'Strong communication skills and passion for sleek developer experiences.'
    ],
    benefits: ['Equity grant ($120k value)', '$2,500 Home Office setup budget', 'Full Health, Vision & Dental', 'Unlimited Paid Time Off']
  },
  {
    id: 'job-2',
    title: 'Principal Product Designer (Design Systems)',
    companyId: 'figma',
    companyName: 'Figma',
    companyLogo: '🎨',
    location: 'San Francisco, CA',
    category: 'design',
    type: 'Full-time',
    workMode: 'On-site',
    salaryMin: 170000,
    salaryMax: 220000,
    currency: 'USD',
    period: 'year',
    featured: true,
    urgent: false,
    postedAt: '5 hours ago',
    experienceLevel: 'Lead / Principal',
    skills: ['Figma', 'Design Systems', 'UI/UX', 'Prototyping', 'User Research'],
    description: 'Join Figma as a Principal Product Designer leading the next generation of visual editing tools. You will shape how millions of software teams collaborate and craft digital products around the world.',
    responsibilities: [
      'Define foundational design system standards across canvas tools, auto-layout engine, and component libraries.',
      'Conduct deep qualitative user research with world-class product teams.',
      'Craft pixel-perfect interactive prototypes with high fidelity micro-interactions.',
      'Define long-term product vision and design strategy alongside Product VP.'
    ],
    requirements: [
      '6+ years crafting enterprise design systems or complex web tools.',
      'Expert mastery of Figma tool creation, token architecture, and dynamic layout systems.',
      'Demonstrated portfolio showcasing end-to-end design craft and design system adoption.'
    ],
    benefits: ['Generous Figma equity grant', '$1,800 Annual Learning stipend', 'Fertility & Family Planning benefits']
  },
  {
    id: 'job-3',
    title: 'Lead AI Infrastructure Engineer',
    companyId: 'openai',
    companyName: 'OpenAI',
    companyLogo: '🧠',
    location: 'San Francisco, CA',
    category: 'data',
    type: 'Full-time',
    workMode: 'On-site',
    salaryMin: 240000,
    salaryMax: 360000,
    currency: 'USD',
    period: 'year',
    featured: true,
    urgent: true,
    postedAt: '1 day ago',
    experienceLevel: 'Senior / Staff',
    skills: ['Python', 'PyTorch', 'Distributed Systems', 'CUDA', 'Node.js', 'Docker', 'Kubernetes'],
    description: 'Build and scale high-throughput AI serving infrastructure powering ChatGPT and API products for hundreds of millions of active users.',
    responsibilities: [
      'Architect low-latency GPU cluster scheduling systems and streaming inference pipelines.',
      'Optimize multi-node model execution across thousands of NVIDIA H100 clusters.',
      'Design fault-tolerant backend infrastructure with Python and Rust.'
    ],
    requirements: [
      'Expert proficiency in distributed systems, C++/Python, and PyTorch deployment.',
      'Experience handling high QPS web architectures and real-time streaming sockets.'
    ],
    benefits: ['Extremely competitive equity upside', 'Unlimited gourmet meals & barista on-site', 'Full healthcare premium paid']
  },
  {
    id: 'job-4',
    title: 'Full Stack Developer (Next.js & Node.js)',
    companyId: 'linear',
    companyName: 'Linear',
    companyLogo: '📐',
    location: 'Remote Worldwide',
    category: 'tech',
    type: 'Full-time',
    workMode: 'Remote',
    salaryMin: 150000,
    salaryMax: 190000,
    currency: 'USD',
    period: 'year',
    featured: false,
    urgent: false,
    postedAt: '2 days ago',
    experienceLevel: 'Mid-Senior (3-5 yrs)',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL', 'Tailwind CSS'],
    description: 'Linear is looking for a Full Stack Engineer who cares deeply about UI velocity, keyboard shortcuts, and real-time sync engines.',
    responsibilities: [
      'Develop real-time optimistic UI update engines using WebSockets and SQLite/PostgreSQL.',
      'Build sleek frontend views with React, Tailwind CSS, and TypeScript.',
      'Maintain high test coverage and zero-latency operational metrics.'
    ],
    requirements: [
      '3+ years full-stack web development experience.',
      'Strong experience with React, Node.js, and relational database schema design.',
      'Obsession with app speed and micro-detail UX.'
    ],
    benefits: ['100% Remote flexibility', '$3,000 setup budget', 'Annual company summit in Europe']
  },
  {
    id: 'job-5',
    title: 'Staff Developer Experience Engineer',
    companyId: 'vercel',
    companyName: 'Vercel',
    companyLogo: '▲',
    location: 'Remote US / Canada',
    category: 'tech',
    type: 'Full-time',
    workMode: 'Remote',
    salaryMin: 175000,
    salaryMax: 215000,
    currency: 'USD',
    period: 'year',
    featured: false,
    urgent: false,
    postedAt: '3 days ago',
    experienceLevel: 'Staff (6+ yrs)',
    skills: ['Next.js', 'React', 'TypeScript', 'Node.js', 'System Design', 'Docker'],
    description: 'Help shape the future of web deployment, edge computing runtime, and Next.js developer workflow at Vercel.',
    responsibilities: [
      'Enhance Next.js framework build tooling, edge runtime adapters, and server components.',
      'Create sample applications, documentation, and RFC proposals for the developer community.'
    ],
    requirements: [
      'Deep knowledge of Node.js internals, AST compilers, and React Server Components.',
      'Strong public technical writing skills or open-source engineering contributions.'
    ],
    benefits: ['Vercel Equity Options', 'Flexible working hours', 'Full health & wellness coverage']
  },
  {
    id: 'job-6',
    title: 'Senior Product Manager - Growth & Onboarding',
    companyId: 'stripe',
    companyName: 'Stripe',
    companyLogo: '⚡',
    location: 'New York, NY (Hybrid)',
    category: 'product',
    type: 'Full-time',
    workMode: 'Hybrid',
    salaryMin: 160000,
    salaryMax: 200000,
    currency: 'USD',
    period: 'year',
    featured: false,
    urgent: false,
    postedAt: '3 days ago',
    experienceLevel: 'Senior (4+ yrs)',
    skills: ['Product Strategy', 'A/B Testing', 'Data Analytics', 'SQL', 'User Research'],
    description: 'Drive user acquisition, business onboarding activation, and payment solution adoption across Stripe Connect and Billing.',
    responsibilities: [
      'Own end-to-end activation roadmap for new business signups.',
      'Define success metrics, run multivariate experiments, and synthesize qualitative customer feedback.'
    ],
    requirements: [
      '4+ years as a Product Manager in tech or fintech.',
      'Strong analytical mindset with proficiency in SQL and analytics dashboards.'
    ],
    benefits: ['Competitive base + bonus', 'Commuter stipends', 'Top-grade insurance']
  },
  {
    id: 'job-7',
    title: 'Growth Marketing Lead (Tech SaaS)',
    companyId: 'linear',
    companyName: 'Linear',
    companyLogo: '📐',
    location: 'Remote Worldwide',
    category: 'marketing',
    type: 'Full-time',
    workMode: 'Remote',
    salaryMin: 130000,
    salaryMax: 165000,
    currency: 'USD',
    period: 'year',
    featured: false,
    urgent: false,
    postedAt: '4 days ago',
    experienceLevel: 'Mid-Senior',
    skills: ['Growth Marketing', 'SEO', 'Content Strategy', 'Data Analytics'],
    description: 'Lead developer-focused content strategy, community engagement, and organic acquisition for Linear.',
    responsibilities: [
      'Create high-signal technical stories, changelogs, and product launch campaigns.',
      'Analyze funnel conversion rates and optimize multi-channel user journeys.'
    ],
    requirements: ['3+ years growth marketing experience in developer software or B2B SaaS.'],
    benefits: ['Work from anywhere', 'Equipped home office', 'Comprehensive care package']
  },
  {
    id: 'job-8',
    title: 'Fintech Data Analyst & BI Specialist',
    companyId: 'stripe',
    companyName: 'Stripe',
    companyLogo: '⚡',
    location: 'San Francisco, CA',
    category: 'finance',
    type: 'Contract',
    workMode: 'Hybrid',
    salaryMin: 110000,
    salaryMax: 140000,
    currency: 'USD',
    period: 'year',
    featured: false,
    urgent: false,
    postedAt: '5 days ago',
    experienceLevel: 'Mid-level',
    skills: ['SQL', 'Python', 'Tableau', 'Data Analytics', 'Financial Modeling'],
    description: 'Analyze payment transaction flows, fraud patterns, and merchant revenue trends using SQL and Python.',
    responsibilities: ['Build automated BI reporting dashboards for global risk & operations leadership.'],
    requirements: ['Strong SQL expertise and experience working with financial datasets.'],
    benefits: ['Competitive hourly/annual rate', 'Contract conversion opportunities']
  }
];

export const SALARY_BENCHMARKS = [
  {
    role: 'Frontend Engineer',
    entry: { p25: 95000, median: 120000, p75: 145000 },
    mid: { p25: 135000, median: 165000, p75: 195000 },
    senior: { p25: 175000, median: 210000, p75: 250000 }
  },
  {
    role: 'Full Stack Developer',
    entry: { p25: 90000, median: 115000, p75: 140000 },
    mid: { p25: 130000, median: 160000, p75: 190000 },
    senior: { p25: 170000, median: 205000, p75: 245000 }
  },
  {
    role: 'Product Designer (UI/UX)',
    entry: { p25: 85000, median: 105000, p75: 130000 },
    mid: { p25: 120000, median: 148000, p75: 175000 },
    senior: { p25: 160000, median: 195000, p75: 230000 }
  },
  {
    role: 'AI / Machine Learning Engineer',
    entry: { p25: 110000, median: 140000, p75: 170000 },
    mid: { p25: 160000, median: 195000, p75: 235000 },
    senior: { p25: 210000, median: 275000, p75: 350000 }
  },
  {
    role: 'Product Manager',
    entry: { p25: 90000, median: 115000, p75: 138000 },
    mid: { p25: 130000, median: 158000, p75: 185000 },
    senior: { p25: 165000, median: 200000, p75: 240000 }
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: 'APP-89421',
    jobId: 'job-1',
    jobTitle: 'Senior Frontend Architect (React / TypeScript)',
    companyName: 'Stripe',
    companyLogo: '⚡',
    appliedDate: '2026-10-08',
    status: 'In Review',
    statusStep: 2, // 1: Submitted, 2: In Review, 3: Interview, 4: Offer
    resumeUsed: 'Alex_Morgan_Software_Engineer_CV.pdf',
    notes: 'Application reviewed by hiring manager. Technical recruiter phone screen scheduled.'
  }
];
