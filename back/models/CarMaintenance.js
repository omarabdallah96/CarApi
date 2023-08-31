const mongoose = require('mongoose');

const carMaintenanceSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  maintenanceGarage: { type: mongoose.Schema.Types.ObjectId, ref: 'MaintenanceGarage', required: true },
  // Other fields related to the relationship
});

module.exports = mongoose.model('CarMaintenance', carMaintenanceSchema);
