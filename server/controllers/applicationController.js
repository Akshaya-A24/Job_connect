import db from '../config/db.js';

export function applyForJob(req, res) {
  const candidateId = req.user.id;
  const { job_id, candidate_name, email, phone, skills, experience_years, education, cover_letter } = req.body;
  const resumeFile = req.file;

  if (!job_id || !candidate_name || !email) {
    return res.status(400).json({ error: 'Job ID, candidate name, and email are required' });
  }

  // Check for duplicate application
  db.get(`SELECT id FROM job_applications WHERE job_id = ? AND candidate_id = ?`, [job_id, candidateId], (err, existing) => {
    if (err) return res.status(500).json({ error: err.message });
    if (existing) {
      return res.status(400).json({ error: 'You have already applied for this job' });
    }

    const appRef = `APP-${Math.floor(10000 + Math.random() * 90000)}`;
    const resumePath = resumeFile ? `/uploads/${req.file.filename}` : '/uploads/sample_cv.pdf';

    db.run(`
      INSERT INTO job_applications (
        app_ref, job_id, candidate_id, candidate_name, email, phone,
        skills, experience_years, education, cover_letter, resume_path, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      appRef, job_id, candidateId, candidate_name, email, phone || '',
      skills || '', experience_years || 0, education || '', cover_letter || '',
      resumePath, 'Applied'
    ], function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json({
        message: 'Application submitted successfully!',
        appRef,
        applicationId: this.lastID
      });
    });
  });
}

export function getCandidateApplications(req, res) {
  const candidateId = req.user.id;

  db.all(`
    SELECT ja.*, j.title as job_title, j.location as job_location, c.name as company_name, c.logo as company_logo
    FROM job_applications ja
    JOIN jobs j ON ja.job_id = j.id
    JOIN companies c ON j.company_id = c.id
    WHERE ja.candidate_id = ?
    ORDER BY ja.applied_at DESC
  `, [candidateId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
}

export function getRecruiterApplications(req, res) {
  const recruiterId = req.user.id;

  db.all(`
    SELECT ja.*, j.title as job_title, c.name as company_name
    FROM job_applications ja
    JOIN jobs j ON ja.job_id = j.id
    JOIN companies c ON j.company_id = c.id
    WHERE j.recruiter_id = ?
    ORDER BY ja.applied_at DESC
  `, [recruiterId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
}

export function updateApplicationStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body; // Applied, Under Review, Shortlisted, Interview Scheduled, Selected, Rejected

  const validStatuses = ['Applied', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Selected', 'Rejected'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid application status value' });
  }

  db.run(`UPDATE job_applications SET status = ? WHERE id = ?`, [status, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: `Application status updated to ${status}` });
  });
}
