import { Navbar, Button, Badge } from 'react-bootstrap';
import { BsCart } from 'react-icons/bs';

const Header = ({ cartCount, onOrder }) => {
  const handleCartClick = async () => {
    const address = prompt('Введите адрес доставки:');
    const phone = prompt('Введите ваш телефон:');
    
    if (address && phone) {
      await onOrder(phone, address);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" className="px-4">
      <Navbar.Brand>Продуктовый магазин</Navbar.Brand>
      <div className="ms-auto">
        <Button variant="outline-light" onClick={handleCartClick}>
          <BsCart /> Корзина
          {cartCount > 0 && (
            <Badge bg="danger" className="ms-2">
              {cartCount}
            </Badge>
          )}
        </Button>
      </div>
    </Navbar>
  );
};

export default Header;