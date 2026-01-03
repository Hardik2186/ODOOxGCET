const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorMiddleware = require('./middleware/error.middleware');
const cors = require('cors');

dotenv.config();
connectDB();


const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static('uploads'));


// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/employee', require('./routes/employee.routes'));
app.use('/api/attendance', require('./routes/attendance.routes'));
app.use('/api/leave', require('./routes/leave.routes'));
app.use('/api/payroll', require('./routes/payroll.routes'));
app.use('/api/admin', require('./routes/admin.routes'));

// Error handler
app.use(errorMiddleware);

module.exports = app;
