const express = require('express');
const categoriesController = require('../controllers/categoriesController.js');

const router = express.Router();

router.get('/', categoriesController.getCategories);
router.get('/:id', categoriesController.getCategory);
router.post('/', categoriesController.createCategory);
router.put('/:id', categoriesController.updateCategory);
router.delete('/:id', categoriesController.deleteCategory);

module.exports = router;