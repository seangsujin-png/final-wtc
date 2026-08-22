import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './TrackOrder.css';

function TrackOrder() {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderRef = doc(db, 'orders', orderId);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
          setOrder({
            id: orderSnap.id,
            ...orderSnap.data()
          });
        } else {
          setError('រកមិនឃើញ Order នេះទេ។');
        }
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('មិនអាចទាញយក Order បានទេ។');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) {
    return (
      <main className="track-page">
        <div className="track-card loading-card">
          <div className="track-icon">☕</div>
          <h2>Loading Order...</h2>
          <p>កំពុងទាញយកព័ត៌មាន Order របស់អ្នក...</p>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="track-page">
        <div className="track-card">
          <div className="track-icon">❌</div>

          <h2>Order Not Found</h2>

          <p>{error || 'Order មិនមាននៅក្នុងប្រព័ន្ធទេ។'}</p>

          <Link to="/services" className="track-main-btn">
            Go to Coffee Menu
          </Link>
        </div>
      </main>
    );
  }

  const status = order.status || 'Pending';

  const steps = [
    {
      key: 'Pending',
      title: 'Order Placed',
      description: 'Order របស់អ្នកត្រូវបានទទួល។'
    },
    {
      key: 'Accepted',
      title: 'Accepted',
      description: 'ហាងបានទទួល និងយល់ព្រមលើ Order។'
    },
    {
      key: 'Completed',
      title: 'Completed',
      description: 'Order របស់អ្នកបានបញ្ចប់។'
    }
  ];

  const getStepClass = (stepKey) => {
    if (status === 'Cancelled') {
      return stepKey === 'Pending'
        ? 'completed'
        : 'cancelled-step';
    }

    const orderFlow = [
      'Pending',
      'Accepted',
      'Completed'
    ];

    const currentIndex = orderFlow.indexOf(status);
    const stepIndex = orderFlow.indexOf(stepKey);

    if (stepIndex <= currentIndex) {
      return 'completed';
    }

    return '';
  };

  return (
    <main className="track-page">

      <div className="track-container">

        <div className="track-header">
          <p className="track-kicker">JINNY COFFEE</p>

          <h1>Track Your Order</h1>

          <p>
            មើលស្ថានភាព Order របស់អ្នក
          </p>
        </div>


        <div className="track-card">

          {/* Order ID */}
          <div className="track-order-id">
            <span>ORDER ID</span>

            <strong>
              #{order.id.slice(0, 8).toUpperCase()}
            </strong>
          </div>


          {/* Status */}
          <div className={`current-status ${status.toLowerCase()}`}>
            {status === 'Pending' && '⏳ Order Pending'}
            {status === 'Accepted' && '✅ Order Accepted'}
            {status === 'Completed' && '🎉 Order Completed'}
            {status === 'Cancelled' && '❌ Order Cancelled'}
          </div>


          {/* Timeline */}
          {status === 'Cancelled' ? (
            <div className="cancelled-message">
              <div className="cancelled-icon">
                ❌
              </div>

              <h2>
                Order Cancelled
              </h2>

              <p>
                សូមអភ័យទោស Order របស់អ្នកត្រូវបាន Cancelled។
              </p>
            </div>
          ) : (
            <div className="order-timeline">

              {steps.map((step, index) => (
                <div
                  className={`timeline-step ${getStepClass(step.key)}`}
                  key={step.key}
                >

                  <div className="timeline-marker">
                    {getStepClass(step.key) === 'completed'
                      ? '✓'
                      : index + 1}
                  </div>

                  <div className="timeline-content">

                    <h3>
                      {step.title}
                    </h3>

                    <p>
                      {step.description}
                    </p>

                  </div>

                </div>
              ))}

            </div>
          )}


          {/* Customer */}
          <div className="track-info">

            <h3>
              👤 Customer Information
            </h3>

            <div className="info-row">
              <span>Name</span>
              <strong>{order.customerName || '-'}</strong>
            </div>

            <div className="info-row">
              <span>Phone</span>
              <strong>{order.phone || '-'}</strong>
            </div>

            <div className="info-row">
              <span>Address</span>
              <strong>{order.address || '-'}</strong>
            </div>

            <div className="info-row">
              <span>Payment</span>
              <strong>{order.paymentMethod || '-'}</strong>
            </div>

          </div>


          {/* Items */}
          <div className="track-items">

            <h3>
              ☕ Your Coffee
            </h3>

            {order.items?.map((item, index) => (
              <div
                className="track-item"
                key={`${item.id}-${index}`}
              >

                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                  />
                )}

                <div>
                  <h4>{item.name}</h4>

                  <p>
                    ${Number(item.price).toFixed(2)}
                    {' × '}
                    {item.quantity}
                  </p>
                </div>

                <strong>
                  $
                  {(
                    Number(item.price) *
                    Number(item.quantity)
                  ).toFixed(2)}
                </strong>

              </div>
            ))}

          </div>


          {/* Total */}
          <div className="track-total">
            <span>Total</span>

            <strong>
              ${Number(order.total || 0).toFixed(2)}
            </strong>
          </div>


          <div className="track-buttons">

            <Link
              to="/services"
              className="track-main-btn"
            >
              ☕ Order More Coffee
            </Link>

            <Link
              to="/"
              className="track-secondary-btn"
            >
              Back to Home
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}

export default TrackOrder;