import express from 'express';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import { createServer as createViteServer } from 'vite';

// Load environment variables
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'madhav-portfolio-secret-key-2026';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'madhavjha514@gmail.com';
// Let's use a hashed password in production, but let's support plain text check in fallback
const ADMIN_PASSWORD_PLAIN = process.env.ADMIN_PASSWORD || 'madhav2026';

const MONGODB_URI = process.env.MONGODB_URI || '';

// Initialize database storage model fallback
let MessageModel: mongoose.Model<any> | null = null;
let dbConnected = false;

// Attempt mongoose database initialization
if (MONGODB_URI) {
  try {
    const messageSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true },
      message: { type: String, required: true },
      date: { type: Date, default: Date.now },
      status: { type: String, enum: ['unread', 'read'], default: 'unread' }
    });
    
    MessageModel = mongoose.model('Message', messageSchema);
    
    mongoose.connect(MONGODB_URI)
      .then(() => {
        dbConnected = true;
        console.log('Successfully connected to MongoDB Atlas.');
      })
      .catch((err) => {
        console.error('Failed to connect to MongoDB Atlas. Falling back to local file storage.', err);
      });
  } catch (err) {
    console.error('Mongoose connection init error:', err);
  }
} else {
  console.log('MONGODB_URI environment variable not provided. Using local file database (/data/messages.json) as backup.');
}

// Local File Database helper functions
const DATA_DIR = path.join(process.cwd(), 'data');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

function ensureLocalDataSetup() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2));
  }
}

function getLocalMessages(): any[] {
  ensureLocalDataSetup();
  try {
    const rawData = fs.readFileSync(MESSAGES_FILE, 'utf8');
    return JSON.parse(rawData);
  } catch (err) {
    return [];
  }
}

function saveLocalMessages(messages: any[]) {
  ensureLocalDataSetup();
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
}

// Token Verification Middleware
function authenticateAdminToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Please log in.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Session expired or invalid login token.' });
  }
}

async function startServer() {
  const app = express();
  
  // Body parsing middleware
  app.use(express.json());

  // API Status check
  app.get('/api/db-status', (req, res) => {
    res.json({
      status: 'online',
      provider: dbConnected && MessageModel ? 'MongoDB Atlas' : 'Local JSON file storage',
      usingMongoDB: dbConnected && MessageModel !== null,
    });
  });

  // API: Admin Authentication Login
  app.post('/api/auth/login', async (req: any, res: any) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Please fill in all credentials.' });
      }

      // Check against configured admin details
      const isEmailMatch = email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase().trim();
      const isPasswordMatch = password === ADMIN_PASSWORD_PLAIN;

      if (!isEmailMatch || !isPasswordMatch) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      // Generate a signed web token (valid for 24 hours)
      const token = jwt.sign(
        { email: ADMIN_EMAIL, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      return res.json({
        success: true,
        token,
        admin: {
          email: ADMIN_EMAIL,
          name: 'Madhav Jha'
        }
      });
    } catch (err: any) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // API: Save Contact Message
  app.post('/api/contact', async (req: any, res: any) => {
    try {
      const { name, email, message } = req.body;

      // Fields Validation
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please provide name, email, and message.' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Please enter a valid email address.' });
      }

      const sanitizedMessage = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        date: new Date(),
        status: 'unread'
      };

      // 1. If MongoDB is configured and online, write to MongoDB
      if (dbConnected && MessageModel) {
        const newMessage = new MessageModel(sanitizedMessage);
        const savedMessage = await newMessage.save();
        return res.status(201).json({
          success: true,
          message: 'Thank you! Your message has been sent successfully.',
          data: {
            id: savedMessage._id,
            ...sanitizedMessage
          }
        });
      }

      // 2. Otherwise fall back to local file storage database
      const localMessages = getLocalMessages();
      const newLocalMessage = {
        id: 'msg_' + Math.random().toString(36).substr(2, 9),
        ...sanitizedMessage
      };
      
      localMessages.push(newLocalMessage);
      saveLocalMessages(localMessages);

      return res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been saved locally (using file storage).',
        data: newLocalMessage
      });
    } catch (err: any) {
      console.error('Error saving contact message:', err);
      return res.status(500).json({ error: 'Could not process or save your query.' });
    }
  });

  // API: Get All Messages (Admin Secured)
  app.get('/api/messages', authenticateAdminToken, async (req: any, res: any) => {
    try {
      if (dbConnected && MessageModel) {
        const messages = await MessageModel.find().sort({ date: -1 });
        const formatted = messages.map(m => ({
          id: m._id,
          name: m.name,
          email: m.email,
          message: m.message,
          date: m.date,
          status: m.status
        }));
        return res.json(formatted);
      }

      // Local File fallback
      const localMessages = getLocalMessages();
      // Sort descending by date
      localMessages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return res.json(localMessages);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to retrieve messages.' });
    }
  });

  // API: Mark Message as Read (Admin Secured)
  app.put('/api/messages/:id/read', authenticateAdminToken, async (req: any, res: any) => {
    try {
      const { id } = req.params;

      if (dbConnected && MessageModel) {
        const updated = await MessageModel.findByIdAndUpdate(id, { status: 'read' }, { new: true });
        if (!updated) {
          return res.status(404).json({ error: 'Message not found.' });
        }
        return res.json({ success: true, message: 'Message updated successfully.' });
      }

      // Local File fallback
      const localMessages = getLocalMessages();
      const messageIndex = localMessages.findIndex(m => m.id === id);
      if (messageIndex === -1) {
        return res.status(404).json({ error: 'Message not found.' });
      }
      localMessages[messageIndex].status = 'read';
      saveLocalMessages(localMessages);

      return res.json({ success: true, message: 'Message marked as read.' });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to update message status.' });
    }
  });

  // API: Delete Message (Admin Secured)
  app.delete('/api/messages/:id', authenticateAdminToken, async (req: any, res: any) => {
    try {
      const { id } = req.params;

      if (dbConnected && MessageModel) {
        const deleted = await MessageModel.findByIdAndDelete(id);
        if (!deleted) {
          return res.status(404).json({ error: 'Message not found.' });
        }
        return res.json({ success: true, message: 'Message deleted successfully.' });
      }

      // Local File fallback
      const localMessages = getLocalMessages();
      const filtered = localMessages.filter(m => m.id !== id);
      if (localMessages.length === filtered.length) {
        return res.status(404).json({ error: 'Message not found.' });
      }
      saveLocalMessages(filtered);

      return res.json({ success: true, message: 'Message deleted successfully.' });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to delete message.' });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Madhav Jha's Full Stack Portfolio server running on http://localhost:${PORT}`);
    console.log(`Default Admin Login: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD_PLAIN}`);
  });
}

startServer();
