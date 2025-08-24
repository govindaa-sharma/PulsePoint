const express = require('express');
const router = express.Router();
const healthCampController = require('../../controllers/healthCampController');
const { validateHealthCamp, handleValidationErrors } = require('../../middleware/validation');

// GET all health camps
router.get('/', healthCampController.getAllCamps);

// GET a specific health camp by ID
router.get('/:id', healthCampController.getCampById);

// POST create a new health camp
router.post('/', validateHealthCamp, handleValidationErrors, healthCampController.createCamp);

// PUT update a health camp
router.put('/:id', validateHealthCamp, handleValidationErrors, healthCampController.updateCamp);

// DELETE a health camp
router.delete('/:id', healthCampController.deleteCamp);

// POST register for a health camp
router.post('/:id/register', healthCampController.registerForCamp);

// GET search health camps
router.get('/search/all', healthCampController.searchCamps);

module.exports = router;