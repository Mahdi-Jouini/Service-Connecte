
const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providerController');

router.post('/', providerController.createProvider); // Create provider
router.get('/', providerController.getAllProviders); // Get all providers
router.get('/:id', providerController.getProviderById); // Get provider by ID
router.put('/:id', providerController.updateProvider); // Update provider
router.delete('/:id', providerController.deleteProvider); // Delete provider
router.get('/service/:serviceId', providerController.getProvidersByService);

module.exports = router;
