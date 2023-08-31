const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const carRoutes = require('./routes/CarRoutes');
const userRoutes = require('./routes/userRoutes');
const MaintenanceGarageRoutes = require('./routes/MaintenanceGarageRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
// Previous connection code
const uri = "mongodb+srv://omar:ATS512512@cluster0.oytvb9b.mongodb.net/<database>?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });




app.use(express.json());
app.use(cors({
  origin: '*', 
  credentials: true, // Allow cookies and credentials
}));

// Routes
app.use('/cars', carRoutes);
app.use('/users', userRoutes);
app.use('/garages', MaintenanceGarageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} url: http://localhost:${PORT}/`, '🚀🚀🚀');
});
