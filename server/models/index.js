const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite')
});

const models = {
  ProductType: require('./productType')(sequelize, Sequelize.DataTypes),
  Product: require('./product')(sequelize, Sequelize.DataTypes),
  Order: require('./order')(sequelize, Sequelize.DataTypes),
  OrderProduct: require('./orderProduct')(sequelize, Sequelize.DataTypes)
};

// Установка ассоциаций
Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = {
  ...models,
  sequelize
};