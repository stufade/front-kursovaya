const express = require('express');
const router = express.Router();
const {
  getAllProductTypes,
  createProductType,
  updateProductType,
  deleteProductType
} = require('../controllers/productTypeController');

router.get('/', getAllProductTypes);
router.post('/', createProductType);
router.put('/:id', updateProductType);
router.delete('/:id', deleteProductType);

module.exports = router;