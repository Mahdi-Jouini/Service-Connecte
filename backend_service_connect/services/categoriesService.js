const db = require('../models/index.js');

const getAllCategories = async () => {
  return await db.Category.findAll();
};

const getCategoryById = async (id) => {
  return await db.Category.findByPk(id);
};

const createCategory = async (data) => {
  return await db.Category.create(data);
};

const updateCategory = async (id, data) => {
  const category = await db.Category.findByPk(id);
  if (!category) throw new Error('Category not found');
  return await category.update(data);
};

const deleteCategory = async (id) => {
  const category = await db.Category.findByPk(id);
  if (!category) throw new Error('Category not found');
  return await category.destroy();
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
  };
  