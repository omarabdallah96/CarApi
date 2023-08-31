// routes/carRoutes.js

const express = require('express');
const MaintenanceGarageController = require('../controllers/MaintenanceGarageController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, MaintenanceGarageController.createMaintenanceGarage);
router.get('/', authMiddleware, MaintenanceGarageController.getAllMaintenanceGarages);
router.get('/:id', authMiddleware, MaintenanceGarageController.getMaintenanceGarageById);

module.exports = router;
