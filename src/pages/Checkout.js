import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { useCart } from '../context/CartContext';
import './Checkout.css';

function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartTotal,
    clearCart
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        customerName: customerName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        paymentMethod,

        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),

        total: cartTotal,
        status: 'Pending',
        createdAt: new Date().toISOString()
      };

const orderRef = await addDoc(
  collection(db, 'orders'),
  orderData
);

clearCart();

navigate('/order-success', {
  state: {
    orderId: orderRef.id
  }
});
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <div className="empty-checkout">

          <div className="empty-checkout-icon">
            🛒
          </div>

          <h2>
            Your cart is empty
          </h2>

          <p>
            Please choose some coffee before checkout.
          </p>

          <Link
            to="/services"
            className="checkout-back-btn"
          >
            Go to Coffee Menu
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">

      <div className="checkout-container">

        {/* Header */}
        <div className="checkout-header">

          <p className="checkout-kicker">
            JINNY COFFEE
          </p>

          <h1>
            Checkout
          </h1>

          <p>
            Complete your order ☕
          </p>

        </div>


        <div className="checkout-layout">

          {/* Customer Form */}
          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >

            <h2>
              Customer Information
            </h2>

            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={customerName}
              onChange={(e) =>
                setCustomerName(e.target.value)
              }
              required
            />


            <label>
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              required
            />


            <label>
              Delivery Address
            </label>

            <textarea
              placeholder="Enter your address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              rows="4"
              required
            />


            <label>
              Payment Method
            </label>

            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            >
              <option value="Cash on Delivery">
                Cash on Delivery
              </option>

              <option value="Bank Transfer">
                Bank Transfer
              </option>

              <option value="ABA Pay">
                ABA Pay
              </option>
            </select>


            <button
              type="submit"
              className="place-order-btn"
              disabled={loading}
            >
              {loading
                ? 'Placing Order...'
                : 'Place Order ☕'}
            </button>

          </form>


          {/* Order Summary */}
          <div className="checkout-summary">

            <h2>
              Order Summary
            </h2>

            <div className="checkout-items">

              {cartItems.map((item) => (
                <div
                  className="checkout-item"
                  key={item.id}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="checkout-item-info">

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      ${item.price.toFixed(2)}
                      {' '}×{' '}
                      {item.quantity}
                    </p>

                  </div>

                  <strong>
                    $
                    {(
                      item.price * item.quantity
                    ).toFixed(2)}
                  </strong>

                </div>
              ))}

            </div>


            <div className="checkout-divider"></div>


            <div className="checkout-total">

              <span>
                Total
              </span>

              <strong>
                ${cartTotal.toFixed(2)}
              </strong>

            </div>


            <Link
              to="/cart"
              className="back-cart-btn"
            >
              ← Back to Cart
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Checkout;