const MaintenanceGarage = require('../models/MaintenanceGarage'); // Update the path as needed

const createMaintenanceGarage = async (req, res) => {
  try {
    const { name, location } = req.body;
    const newGarage = await MaintenanceGarage.create({
      name,
      location,
    });
    res.status(201).json(newGarage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMaintenanceGarage = async (req, res) => {
  try {
    const updatedGarage = await MaintenanceGarage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedGarage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMaintenanceGarage = async (req, res) => {
  try {
    const deletedGarage = await MaintenanceGarage.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json({ message: 'Maintenance garage deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllMaintenanceGarages = async (req, res) => {
  try {
    const garages = await MaintenanceGarage.find();
    res.status(200).json(garages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMaintenanceGarageById = async (req, res) => {
  try {
    const garage = await MaintenanceGarage.findById(req.params.id);
    res.status(200).json(garage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMaintenanceGarage,
  updateMaintenanceGarage,
  deleteMaintenanceGarage,
  getAllMaintenanceGarages,
  getMaintenanceGarageById,
};
