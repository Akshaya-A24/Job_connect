import db from '../config/db.js';

export function getAllJobs(req, res) {
  const { search, location, category, work_mode, type, min_salary, sort } = req.query;

  let query = `
    SELECT jobs.*, companies.name as company_name, companies.logo as company_logo, companies.location as company_location
    FROM jobs
    JOIN companies ON jobs.company_id = companies.id
    WHERE jobs.status = 'active'
  `;
  const params = [];

  if (search) {
    query += ` AND (jobs.title LIKE ? OR jobs.skills LIKE ? OR companies.name LIKE ?)`;
    const searchParam = `%${search}%`;
    params.push(searchParam, searchParam, searchParam);
  }

  if (location) {
    query += ` AND (jobs.location LIKE ? OR jobs.work_mode LIKE ?)`;
    params.push(`%${location}%`, `%${location}%`);
  }

  if (category && category !== 'all') {
    query += ` AND jobs.category = ?`;
    params.push(category);
  }

  if (work_mode && work_mode !== 'all') {
    query += ` AND jobs.work_mode = ?`;
    params.push(work_mode);
  }

  if (type && type !== 'all') {
    query += ` AND jobs.type = ?`;
    params.push(type);
  }

  if (min_salary) {
    query += ` AND jobs.salary_max >= ?`;
    params.push(Number(min_salary));
  }

  if (sort === 'salary-high') {
    query += ` ORDER BY jobs.salary_max DESC`;
  } else if (sort === 'recent') {
    query += ` ORDER BY jobs.created_at DESC`;
  } else {
    query += ` ORDER BY jobs.id DESC`;
  }

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    
    // Parse JSON / comma-separated skills
    const jobs = rows.map(row => ({
      ...row,
      skills: row.skills ? row.skills.split(',').map(s => s.trim()) : [],
      responsibilities: row.responsibilities ? row.responsibilities.split('\n') : [],
      requirements: row.requirements ? row.requirements.split('\n') : [],
      benefits: row.benefits ? row.benefits.split(',') : []
    }));

    res.json(jobs);
  });
}

export function getJobById(req, res) {
  const { id } = req.params;

  db.get(`
    SELECT jobs.*, companies.name as company_name, companies.logo as company_logo, 
           companies.banner as company_banner, companies.industry, companies.size as company_size,
           companies.website as company_website, companies.rating as company_rating
    FROM jobs
    JOIN companies ON jobs.company_id = companies.id
    WHERE jobs.id = ?
  `, [id], (err, row) => {
    if (err || !row) return res.status(404).json({ error: 'Job not found' });

    const job = {
      ...row,
      skills: row.skills ? row.skills.split(',').map(s => s.trim()) : [],
      responsibilities: row.responsibilities ? row.responsibilities.split('\n') : [],
      requirements: row.requirements ? row.requirements.split('\n') : [],
      benefits: row.benefits ? row.benefits.split(',') : []
    };

    res.json(job);
  });
}

export function createJob(req, res) {
  const recruiterId = req.user.id;
  const {
    company_id, title, category, location, work_mode, type,
    experience_level, salary_min, salary_max, description,
    responsibilities, requirements, benefits, skills
  } = req.body;

  if (!title || !category || !location || !salary_min || !salary_max) {
    return res.status(400).json({ error: 'Required fields missing' });
  }

  db.run(`
    INSERT INTO jobs (
      company_id, recruiter_id, title, category, location, work_mode, type,
      experience_level, salary_min, salary_max, description, responsibilities,
      requirements, benefits, skills
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    company_id || 1, recruiterId, title, category, location, work_mode || 'Remote',
    type || 'Full-time', experience_level || 'Mid-Senior', salary_min, salary_max,
    description, responsibilities || '', requirements || '', benefits || '',
    Array.isArray(skills) ? skills.join(',') : (skills || '')
  ], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Job created successfully', jobId: this.lastID });
  });
}

export function deleteJob(req, res) {
  const { id } = req.params;
  const recruiterId = req.user.id;

  db.run(`DELETE FROM jobs WHERE id = ? AND recruiter_id = ?`, [id, recruiterId], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(403).json({ error: 'Job not found or unauthorized' });
    res.json({ message: 'Job deleted successfully' });
  });
}
