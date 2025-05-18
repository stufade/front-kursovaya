const { Order, Product } = require('../models');

exports.createOrder = async (req, res) => {
  try {
    const { phone, address, products } = req.body;
    
    const order = await Order.create({ phone, address });
    
    await Promise.all(products.map(async (item) => {
      const product = await Product.findByPk(item.id);
      if (product) {
        await order.addProduct(product, { through: { quantity: item.quantity } });
      }
    }));
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{
        model: Product,
        through: { attributes: ['quantity'] }
      }]
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{
        model: Product,
        through: { attributes: ['quantity'] }
      }]
    });
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Обновляем основные данные заказа
    const { phone, address } = req.body;
    if (phone) order.phone = phone;
    if (address) order.address = address;
    await order.save();

    // Обновляем продукты в заказе (если переданы)
    if (req.body.products) {
      // Удаляем все текущие связи
      await OrderProduct.destroy({ where: { OrderId: order.id } });
      
      // Создаем новые связи
      await Promise.all(req.body.products.map(async item => {
        const product = await Product.findByPk(item.id);
        if (product) {
          await OrderProduct.create({
            OrderId: order.id,
            ProductId: product.id,
            quantity: item.quantity
          });
        }
      }));
    }

    // Возвращаем обновленный заказ с продуктами
    const updatedOrder = await Order.findByPk(order.id, {
      include: [{
        model: Product,
        through: { attributes: ['quantity'] }
      }]
    });

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};