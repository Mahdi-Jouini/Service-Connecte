const express = require('express');
const servicesController =  require('../controllers/servicesController.js');

const router = express.Router();

router.get('/', servicesController.getServices);
router.get('/:id', servicesController.getService);
router.post('/', servicesController.createService);
router.put('/:id', servicesController.updateService);
router.delete('/:id', servicesController.deleteService);

module.exports = router;
