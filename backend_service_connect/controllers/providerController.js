// controllers/providerController.js
const providerService = require('../services/providerService');

const createProvider = async (req, res) => {
  try {
    const providerData = req.body;
    const provider = await providerService.createProvider(providerData);
    return res.status(201).json(provider);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllProviders = async (req, res) => {
  try {
    const providers = await providerService.getAllProviders();
    return res.status(200).json(providers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProviderById = async (req, res) => {
  try {
    const providerId = req.params.id;
    const provider = await providerService.getProviderById(providerId);
    return res.status(200).json(provider);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProvider = async (req, res) => {
  try {
    const providerId = req.params.id;
    const updateData = req.body;
    const updatedProvider = await providerService.updateProvider(providerId, updateData);
    return res.status(200).json(updatedProvider);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProvider = async (req, res) => {
  try {
    const providerId = req.params.id;
    const response = await providerService.deleteProvider(providerId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProvidersByService = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const providers = await providerService.getProvidersByService(serviceId);
    return res.status(200).json(providers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProvider,
  getAllProviders,
  getProviderById,
  updateProvider,
  deleteProvider,
  getProvidersByService,
};
