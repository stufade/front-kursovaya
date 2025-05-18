const { ProductType, Product } = require('../models');

exports.getAllProductTypes = async (req, res) => {
  try {
    const types = await ProductType.findAll({
      include: [Product]
    });
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProductType = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    
    const productType = await ProductType.create({ name });
    res.status(201).json(productType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProductType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    const productType = await ProductType.findByPk(id);
    if (!productType) {
      return res.status(404).json({ error: 'Product type not found' });
    }
    
    productType.name = name || productType.name;
    await productType.save();
    
    res.json(productType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProductType = async (req, res) => {
  try {
    const { id } = req.params;
    
    const productType = await ProductType.findByPk(id);
    if (!productType) {
      return res.status(404).json({ error: 'Product type not found' });
    }
    
    // Проверка на связанные продукты
    const productsCount = await Product.count({ where: { ProductTypeId: id } });
    if (productsCount > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete type with associated products' 
      });
    }
    
    await productType.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};