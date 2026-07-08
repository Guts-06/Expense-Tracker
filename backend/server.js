const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js'); // <-- NEW: Import the DB connection function

// Load environment variables early
dotenv.config();

// Connect to Database
connectDB(); // <-- NEW: Execute the connection function

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows frontend to make requests to this API
app.use(express.json()); // Parses incoming JSON payloads

// Routes
app.use('/api/users', require('./routes/userRoutes'));

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'Server is running normally.' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});