module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });
  
  Product.associate = (models) => {
    Product.belongsTo(models.ProductType);
    Product.belongsToMany(models.Order, { through: models.OrderProduct });
  };
  
  return Product;
};