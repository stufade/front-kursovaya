module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  });
  
  return OrderProduct;
};