// controllers/carController.js

const Car = require('../models/Car');

const createCar = async (req, res) => {


  try {
    const { model, year, mileage, color, make } = req.body;
    const newCar = await Car.create({
      model,
      year,
      mileage,
      color,
      make,
      user: req.user.userId,
    });
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // Add maintenance entry to the car
    if (req.body.maintenanceEntry) {
      updatedCar.maintenanceEntries.push(req.body.maintenanceEntry);
      await updatedCar.save();
    }

    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Car deleted successfully.',data: deletedCar });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCars = async (req, res) => {
  try {
    const { page = 1, limit = 10, searchText } = req.query;

    const query = searchText
      ? { model: { $regex: searchText, $options: 'i' } }
      : {};

    const cars = await Car.find(query)
      .populate('user', 'username') // Populate user data
      .populate('maintenanceEntries.maintenanceGarage', 'name') // Populate maintenanceGarage field with name

      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    const totalCount = await Car.countDocuments(query);

    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = parseInt(page);

    res.status(200).json({ cars, totalCount, totalPages, currentPage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
      .populate('user', 'username') // Populate user data
      .populate('maintenanceEntries.maintenanceGarage', 'name');
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCar,
  updateCar,
  deleteCar,
  getCars,
  getCarById,
};
