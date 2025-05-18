module.exports = (sequelize, DataTypes) => {
  const ProductType = sequelize.define('ProductType', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
  ProductType.associate = (models) => {
    ProductType.hasMany(models.Product);
  };
  
  return ProductType;
};