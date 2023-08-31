const mongoose = require('mongoose');

const maintenanceGarageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  // Other fields specific to MaintenanceGarage
});

const MaintenanceGarage = mongoose.model('MaintenanceGarage', maintenanceGarageSchema);

module.exports = MaintenanceGarage;
