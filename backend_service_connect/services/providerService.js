const db = require('../models/index.js');

// Create a new provider
const createProvider = async (providerData) => {
  try {
    const { user_id, service_id, ...providerDetails } = providerData;
    const provider = await db.Provider.create({
      ...providerDetails,
      user_id,  // Link provider to the user
      service_id, // Link provider to the service
    });
    return provider;
  } catch (error) {
    throw new Error('Error creating provider: ' + error.message);
  }
};

// Get all providers along with their user info
const getAllProviders = async () => {
  try {
    const providers = await db.Provider.findAll({
      include: [
        {
          model: db.User, // Including user info
          as: 'user',     // Alias used in the model
          attributes: ['name', 'surname', 'email', 'phone', 'location'], // Select relevant user fields
        },
      ],
    });
    return providers;
  } catch (error) {
    throw new Error('Error fetching providers: ' + error.message);
  }
};

// Get provider by ID with user info
const getProviderById = async (providerId) => {
  try {
    const provider = await db.Provider.findByPk(providerId, {
      include: [
        {
          model: db.User, // Including user info
          as: 'user',
          attributes: ['name', 'surname', 'email', 'phone', 'photo', 'location'],
        },
      ],
    });
    return provider;
  } catch (error) {
    throw new Error('Error fetching provider: ' + error.message);
  }
};

// Update provider info
const updateProvider = async (providerId, updateData) => {
  try {
    const provider = await db.Provider.findByPk(providerId);
    if (!provider) {
      throw new Error('Provider not found');
    }
    await provider.update(updateData);
    return provider;
  } catch (error) {
    throw new Error('Error updating provider: ' + error.message);
  }
};

// Delete provider
const deleteProvider = async (providerId) => {
  try {
    const provider = await db.Provider.findByPk(providerId);
    if (!provider) {
      throw new Error('Provider not found');
    }
    await provider.destroy();
    return { message: 'Provider deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting provider: ' + error.message);
  }
};

const getProvidersByService = async (serviceId) => {
  try {
    const providers = await db.Provider.findAll({
      where: { service_id: serviceId },
      include: [
        {
          model: db.User,
          as: 'user',
          attributes: ['name', 'surname', 'email', 'phone', 'photo', 'location'],
        },
      ],
    });
    return providers;
  } catch (error) {
    throw new Error('Error fetching providers by service: ' + error.message);
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
