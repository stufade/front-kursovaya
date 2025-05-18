import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import ProductList from './components/ProductList';

const API_URL = 'http://localhost:8000/api';

const initialProducts = [
    {
        "id": 1,
        "name": "Макароны",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ_gnc6IaeiOBeYaBctKV5AyOwU07WNTEhBA&s",
        "price": 50,
        "createdAt": "2025-05-17T20:24:02.350Z",
        "updatedAt": "2025-05-17T20:24:02.350Z",
        "ProductTypeId": 1,
        "ProductType": {
            "id": 1,
            "name": "Бакалея",
            "createdAt": "2025-05-17T20:23:12.735Z",
            "updatedAt": "2025-05-17T20:23:12.735Z"
        }
    },
    {
        "id": 2,
        "name": "Макароны",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ_gnc6IaeiOBeYaBctKV5AyOwU07WNTEhBA&s",
        "price": 509,
        "createdAt": "2025-05-17T20:24:21.482Z",
        "updatedAt": "2025-05-17T20:24:21.482Z",
        "ProductTypeId": 1,
        "ProductType": {
            "id": 1,
            "name": "Бакалея",
            "createdAt": "2025-05-17T20:23:12.735Z",
            "updatedAt": "2025-05-17T20:23:12.735Z"
        }
    },
    {
        "id": 3,
        "name": "Макароны",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ_gnc6IaeiOBeYaBctKV5AyOwU07WNTEhBA&s",
        "price": 59,
        "createdAt": "2025-05-17T20:24:26.831Z",
        "updatedAt": "2025-05-17T20:24:26.831Z",
        "ProductTypeId": 1,
        "ProductType": {
            "id": 1,
            "name": "Бакалея",
            "createdAt": "2025-05-17T20:23:12.735Z",
            "updatedAt": "2025-05-17T20:23:12.735Z"
        }
    },
    {
        "id": 4,
        "name": "Шоколад",
        "image": "https://s3.coolclever.tech/img/0000000090026732/960/21553.webp",
        "price": 59,
        "createdAt": "2025-05-17T20:29:49.750Z",
        "updatedAt": "2025-05-17T20:29:49.750Z",
        "ProductTypeId": 1,
        "ProductType": {
            "id": 1,
            "name": "Бакалея",
            "createdAt": "2025-05-17T20:23:12.735Z",
            "updatedAt": "2025-05-17T20:23:12.735Z"
        }
    }
];

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);

  console.log(products);

  useEffect(() => {
    axios.get(`${API_URL}/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? {...item, quantity: item.quantity + 1} 
            : item
        );
      }
      return [...prevCart, {...product, quantity: 1}];
    });
  };

  const handleOrder = async (phone, address) => {
    try {
      const productsData = cart.map(item => ({
        id: item.id,
        quantity: item.quantity
      }));

      await axios.post(`${API_URL}/orders`, {
        phone,
        address,
        products: productsData
      });

      setCart([]);
      alert('Заказ успешно оформлен!');
    } catch (error) {
      alert('Ошибка при оформлении заказа');
    }
  };

  return (
    <>
      <Header cartCount={cart.length} onOrder={handleOrder} />
      <Container className="mt-4">
        <h1 className="mb-4">Онлайн магазин продуктов</h1>
        <ProductList products={products} onAddToCart={addToCart} cart={cart} />
      </Container>
    </>
  );
}

export default App;