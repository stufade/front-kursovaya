module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
  Order.associate = (models) => {
    Order.belongsToMany(models.Product, { through: models.OrderProduct });
  };
  
  return Order;
};