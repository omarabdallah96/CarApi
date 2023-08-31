// routes/carRoutes.js

const express = require('express');
const carController = require('../controllers/CarController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, carController.createCar);
router.put('/:id', authMiddleware, carController.updateCar);
router.delete('/:id', authMiddleware, carController.deleteCar);
router.get('/', authMiddleware, carController.getCars);
router.get('/:id', authMiddleware, carController.getCarById);

module.exports = router;
