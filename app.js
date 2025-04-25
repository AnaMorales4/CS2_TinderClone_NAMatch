const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes =require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./db');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/users', userRoutes);
app.use('/api', authRoutes);
connectDB();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
