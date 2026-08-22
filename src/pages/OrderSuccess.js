import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './OrderSuccess.css';

function OrderSuccess() {
  const location = useLocation();

  const orderId = location.state?.orderId;

  return (
    <main className="success-page">
      <div className="success-card">

        <div className="success-icon">
          ✓
        </div>

        <p className="success-kicker">
          JINNY COFFEE
        </p>

        <h1>
          Order Confirmed!
        </h1>

        <p className="success-message">
          អរគុណសម្រាប់ការបញ្ជាទិញរបស់អ្នក ☕
        </p>

        {orderId && (
          <div className="order-number">
            <span>Order ID</span>

            <strong>
              #{orderId.slice(0, 8).toUpperCase()}
            </strong>
          </div>
        )}

        <p className="success-description">
          Order របស់អ្នកត្រូវបានទទួលដោយ Jinny Coffee។
          យើងនឹងរៀបចំកាហ្វេរបស់អ្នកឱ្យបានលឿនបំផុត។
        </p>

        <div className="success-buttons">

          {/* Track Order */}
          {orderId && (
            <Link
              to={`/track-order/${orderId}`}
              className="success-primary-btn"
            >
              📦 Track My Order
            </Link>
          )}

          {/* Order More */}
          <Link
            to="/services"
            className="success-secondary-btn"
          >
            ☕ Order More Coffee
          </Link>

          {/* Home */}
          <Link
            to="/"
            className="success-secondary-btn"
          >
            Back to Home
          </Link>

        </div>

      </div>
    </main>
  );
}

export default OrderSuccess;