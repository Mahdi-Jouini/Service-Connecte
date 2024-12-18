const db = require('../models/index.js');

const getAllServices = async () => {
  return await db.Service.findAll({ include: { model: db.Category, as: 'category' } });
};

const getServiceById = async (id) => {
  return await db.Service.findByPk(id, { include: { model: db.Category, as: 'category' } });
};

const createService = async (data) => {
  return await db.Service.create(data);
};

const updateService = async (id, data) => {
  const service = await db.Service.findByPk(id);
  if (!service) throw new Error('Service not found');
  return await service.update(data);
};

const deleteService = async (id) => {
  const service = await db.Service.findByPk(id);
  if (!service) throw new Error('Service not found');
  return await service.destroy();
};

module.exports = {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
  };