import React from 'react';
import { useCart } from '../context/CartContext';
import './Services.css';

import Americano from '../Images/Americano.png';
import Cappuccino from '../Images/Cappuccino.png';
import CaramelLatte from '../Images/Caramel Latte.png';
import Espresso from '../Images/Espresso.png';
import Latte from '../Images/latte.jpg';
import Matcha from '../Images/matcha.jpg';
import Mocha from '../Images/mocha.jpg';

function Services() {
  const { addToCart } = useCart();

  const coffees = [
    {
      id: 1,
      name: 'Espresso',
      description: 'Rich and strong single-shot espresso.',
      price: 1.80,
      image: Espresso
    },
    {
      id: 2,
      name: 'Americano',
      description: 'Smooth espresso combined with hot water.',
      price: 2.20,
      image: Americano
    },
    {
      id: 3,
      name: 'Cappuccino',
      description: 'Espresso with steamed milk and creamy foam.',
      price: 2.80,
      image: Cappuccino
    },
    {
      id: 4,
      name: 'Latte',
      description: 'Smooth espresso blended with steamed milk.',
      price: 2.80,
      image: Latte
    },
    {
      id: 5,
      name: 'Caramel Latte',
      description: 'Creamy latte with a sweet caramel flavor.',
      price: 3.20,
      image: CaramelLatte
    },
    {
      id: 6,
      name: 'Mocha',
      description: 'Espresso blended with chocolate and steamed milk.',
      price: 3.20,
      image: Mocha
    },
    {
      id: 7,
      name: 'Matcha Latte',
      description: 'Creamy milk combined with premium matcha.',
      price: 3.50,
      image: Matcha
    }
  ];

  const handleOrder = (coffee) => {
    addToCart(coffee);
    alert(`${coffee.name} added to your cart!`);
  };

  return (
    <main className="services-page">
      <section className="services-container">

        <div className="menu-header">
          <p className="menu-kicker">
            JINNY COFFEE
          </p>

          <h2>
            Coffee Menu
          </h2>

          <p className="menu-subtitle">
            ស្វាគមន៍មកកាន់ Coffee Menu របស់ Jinny Coffee ☕
          </p>

          <p className="menu-description">
            Discover our freshly prepared coffee, made with love
            and served with a smile.
          </p>
        </div>

        <div className="product-grid">

          {coffees.map((coffee) => (
            <div
              className="product-card"
              key={coffee.id}
            >

              <div className="product-image-wrap">

                <img
                  src={coffee.image}
                  alt={coffee.name}
                  className="product-image"
                />

                <span className="coffee-badge">
                  COFFEE
                </span>

              </div>

              <div className="product-content">

                <h3>
                  {coffee.name}
                </h3>

                <p className="product-description">
                  {coffee.description}
                </p>

                <div className="product-bottom">

                  <span className="price">
                    ${coffee.price.toFixed(2)}
                  </span>

                  <button
                    className="order-btn"
                    onClick={() => handleOrder(coffee)}
                  >
                    Order ☕
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </section>
    </main>
  );
}

export default Services;