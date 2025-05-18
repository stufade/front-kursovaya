import { Row } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductList = ({ products, onAddToCart, cart }) => {
  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {products.map(product => (
        <ProductCard 
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          cart={cart}
        />
      ))}
    </Row>
  );
};

export default ProductList;