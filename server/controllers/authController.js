import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import { JWT_SECRET } from '../middleware/authMiddleware.js';

export async function register(req, res) {
  const { name, email, password, role = 'candidate' } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    db.run(
      `INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)`,
      [name, email, passwordHash, role],
      function (err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'Email address already registered' });
          }
          return res.status(500).json({ error: err.message });
        }

        const userId = this.lastID;

        // If candidate, create default empty profile
        if (role === 'candidate') {
          db.run(
            `INSERT INTO candidate_profiles (user_id, headline, phone, location, skills, experience_years) VALUES (?, ?, ?, ?, ?, ?)`,
            [userId, 'Job Seeker', '', '', '', 0]
          );
        }

        // Generate JWT
        const token = jwt.sign({ id: userId, email, role, name }, JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
          message: 'User registered successfully',
          token,
          user: { id: userId, name, email, role }
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error during registration' });
  }
}

export function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  });
}

export function getMe(req, res) {
  const userId = req.user.id;

  db.get(`SELECT id, name, email, role, created_at FROM users WHERE id = ?`, [userId], (err, user) => {
    if (err || !user) return res.status(404).json({ error: 'User not found' });

    if (user.role === 'candidate') {
      db.get(`SELECT * FROM candidate_profiles WHERE user_id = ?`, [userId], (err, profile) => {
        res.json({ user, profile: profile || {} });
      });
    } else {
      res.json({ user });
    }
  });
}
