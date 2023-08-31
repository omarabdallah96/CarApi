const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  mileage: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  maintenanceEntries: [
    {
      maintenanceGarage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MaintenanceGarage',
      },
      date: { type: Date, default: Date.now },
      problem: { type: String },
    },
  ],
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
