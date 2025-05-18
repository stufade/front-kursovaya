const express = require('express');
const cors = require('cors');
const {sequelize} = require('./models');

const app = express();
const port = 8000;

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
app.use(express.json());

// Роуты
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productTypeRoutes = require('./routes/productTypeRoutes');

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/product-types', productTypeRoutes);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});