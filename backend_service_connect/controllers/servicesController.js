const servicesService = require('../services/servicesService.js') ;

const getServices = async (req, res) => {
  try {
    const services = await servicesService.getAllServices();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getService = async (req, res) => {
  try {
    const service = await servicesService.getServiceById(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createService = async (req, res) => {
  try {
    const service = await servicesService.createService(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const service = await servicesService.updateService(req.params.id, req.body);
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    await servicesService.deleteService(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
    getServices,
    getService,
    createService,
    updateService,
    deleteService,
  };
