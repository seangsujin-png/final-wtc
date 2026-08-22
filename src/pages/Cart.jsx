import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  return (
    <main className="cart-page">
      <div className="cart-container">

        <div className="cart-header">
          <p className="cart-kicker">JINNY COFFEE</p>
          <h1>Your Cart </h1>
          <p>ពិនិត្យមើលការបញ្ជាទិញរបស់អ្នក</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">☕</div>

            <h2>Your cart is empty</h2>

            <p>
              អ្នកមិនទាន់បានជ្រើសរើសកាហ្វេនៅឡើយទេ។
            </p>

            <Link to="/services" className="back-menu-btn">
              Browse Coffee Menu
            </Link>
          </div>
        ) : (
          <div className="cart-content">

            <div className="cart-items">

              {cartItems.map((item) => (
                <div
                  className="cart-item"
                  key={item.id}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />

                  <div className="cart-item-info">

                    <h3>{item.name}</h3>

                    <p>
                      {item.description}
                    </p>

                    <span className="cart-item-price">
                      ${item.price.toFixed(2)}
                    </span>

                  </div>

                  <div className="quantity-box">

                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      +
                    </button>

                  </div>

                  <div className="item-total">
                    $
                    {(item.price * item.quantity).toFixed(2)}
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    Remove
                  </button>

                </div>
              ))}

            </div>

            <div className="cart-summary">

              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Items</span>
                <span>{cartItems.length}</span>
              </div>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>
                  ${cartTotal.toFixed(2)}
                </span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Total</span>
                <span>
                  ${cartTotal.toFixed(2)}
                </span>
              </div>

              <Link
                to="/checkout"
                className="checkout-btn"
              >
                Checkout →
              </Link>

              <Link
                to="/services"
                className="continue-btn"
              >
                Continue Shopping
              </Link>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}

export default Cart;