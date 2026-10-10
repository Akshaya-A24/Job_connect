import db from '../config/db.js';

export function getAllCompanies(req, res) {
  db.all(`SELECT * FROM companies ORDER BY rating DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const companies = rows.map(c => ({
      ...c,
      culture_perks: c.culture_perks ? c.culture_perks.split(',') : []
    }));
    res.json(companies);
  });
}

export function getCompanyById(req, res) {
  const { id } = req.params;

  db.get(`SELECT * FROM companies WHERE id = ?`, [id], (err, company) => {
    if (err || !company) return res.status(404).json({ error: 'Company not found' });

    db.all(`SELECT * FROM jobs WHERE company_id = ? AND status = 'active'`, [id], (err, jobs) => {
      res.json({
        company: {
          ...company,
          culture_perks: company.culture_perks ? company.culture_perks.split(',') : []
        },
        jobs: jobs || []
      });
    });
  });
}

export function createCompany(req, res) {
  const recruiterId = req.user.id;
  const { name, logo, banner, industry, location, size, website, description, culture_perks } = req.body;

  if (!name || !industry) {
    return res.status(400).json({ error: 'Company name and industry are required' });
  }

  db.run(`
    INSERT INTO companies (recruiter_id, name, logo, banner, industry, location, size, website, description, culture_perks)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    recruiterId, name, logo || '🏢', banner || '', industry, location || '',
    size || '100+ employees', website || '', description || '',
    Array.isArray(culture_perks) ? culture_perks.join(',') : (culture_perks || '')
  ], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Company profile created', companyId: this.lastID });
  });
}
