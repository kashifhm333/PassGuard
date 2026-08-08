import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define Password Schema & Model
const passwordSchema = new mongoose.Schema({
  id: { type: String, required: true },
  site: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const Password = mongoose.model('Password', passwordSchema);

// --- API ROUTES ---

// 1. Get all saved passwords
app.get('/', async (req, res) => {
  try {
    const passwords = await Password.find({});
    res.json(passwords);
  } catch {
    res.status(500).json({ error: 'Failed to fetch passwords' });
  }
});

// 2. Save a new password
app.post('/', async (req, res) => {
  try {
    const passwordEntry = new Password(req.body);
    const savedPassword = await passwordEntry.save();
    res.json({ success: true, result: savedPassword });
  } catch {
    res.status(500).json({ error: 'Failed to save password' });
  }
});

// 3. Delete a password by ID
app.delete('/', async (req, res) => {
  try {
    const { id } = req.body;
    const deletedPassword = await Password.deleteOne({ id });
    res.json({ success: true, result: deletedPassword });
  } catch {
    res.status(500).json({ error: 'Failed to delete password' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});