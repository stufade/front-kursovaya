import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product, onAddToCart, cart }) => {
  const cartItem = cart.find(item => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  return (
    <Card className="h-100">
      <Card.Img 
        variant="top" 
        src={product.image || 'https://via.placeholder.com/150'}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="mt-auto">
          <span className="fs-4">{product.price} ₽</span>
          <div className="d-flex align-items-center mt-2">
            <Button 
              variant="primary" 
              onClick={() => onAddToCart(product)}
            >
              В корзину
            </Button>
            {quantityInCart > 0 && (
              <span className="ms-3">
                В корзине: {quantityInCart}
              </span>
            )}
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;