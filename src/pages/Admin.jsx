import React, { useState, useEffect } from 'react';
import { db } from '../firebase';

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';

import './Admin.css';

function Admin() {
  // ==========================================
  // COFFEE PRODUCTS
  // ==========================================

  const [products, setProducts] = useState([]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [editId, setEditId] = useState(null);


  // ==========================================
  // CUSTOMER ORDERS
  // ==========================================

  const [orders, setOrders] = useState([]);


  // ==========================================
  // FETCH PRODUCTS
  // ==========================================

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, 'products')
      );

      const productList = querySnapshot.docs.map((item) => ({
        id: item.id,
        ...item.data()
      }));

      setProducts(productList);

    } catch (error) {
      console.error('Error fetching products:', error);

      alert(
        'មិនអាចទាញយក Coffee Menu បានទេ!'
      );
    }
  };


  // ==========================================
  // FETCH ORDERS
  // ==========================================

  const fetchOrders = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, 'orders')
      );

      const orderList = querySnapshot.docs.map((item) => ({
        id: item.id,
        ...item.data()
      }));

      // Newest orders first
      orderList.sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      );

      setOrders(orderList);

    } catch (error) {
      console.error('Error fetching orders:', error);

      alert(
        'មិនអាចទាញយក Customer Orders បានទេ!'
      );
    }
  };


  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);


  // ==========================================
  // ADD / UPDATE COFFEE
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const coffeeData = {
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        imageUrl: imageUrl.trim()
      };

      if (
        !name.trim() ||
        !description.trim() ||
        !price
      ) {
        alert(
          'សូមបំពេញព័ត៌មានកាហ្វេឱ្យបានគ្រប់គ្រាន់!'
        );

        return;
      }

      if (editId) {

        await updateDoc(
          doc(db, 'products', editId),
          coffeeData
        );

        alert(
          'បានកែប្រែកាហ្វេដោយជោគជ័យ!'
        );

      } else {

        await addDoc(
          collection(db, 'products'),
          coffeeData
        );

        alert(
          'បានបន្ថែមកាហ្វេថ្មីដោយជោគជ័យ!'
        );
      }

      clearForm();
      fetchProducts();

    } catch (error) {

      console.error(
        'Error saving product:',
        error
      );

      alert(
        'មានបញ្ហាក្នុងការរក្សាទុកកាហ្វេ!'
      );
    }
  };


  // ==========================================
  // EDIT COFFEE
  // ==========================================

  const handleEdit = (product) => {
    setName(product.name || '');
    setDescription(product.description || '');
    setPrice(product.price || '');
    setImageUrl(product.imageUrl || '');

    setEditId(product.id);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  // ==========================================
  // DELETE COFFEE
  // ==========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'តើអ្នកពិតជាចង់លុបកាហ្វេនេះមែនទេ?'
    );

    if (!confirmDelete) return;

    try {

      await deleteDoc(
        doc(db, 'products', id)
      );

      alert(
        'បានលុបកាហ្វេដោយជោគជ័យ!'
      );

      fetchProducts();

    } catch (error) {

      console.error(
        'Error deleting product:',
        error
      );

      alert(
        'មិនអាចលុបកាហ្វេបានទេ!'
      );
    }
  };


  // ==========================================
  // CLEAR COFFEE FORM
  // ==========================================

  const clearForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setImageUrl('');
    setEditId(null);
  };


  // ==========================================
  // UPDATE ORDER STATUS
  // ==========================================

  const updateOrderStatus = async (
    orderId,
    newStatus
  ) => {
    try {

      await updateDoc(
        doc(db, 'orders', orderId),
        {
          status: newStatus
        }
      );

      // Update UI immediately
      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: newStatus
              }
            : order
        )
      );

      alert(
        `Order status changed to ${newStatus}`
      );

    } catch (error) {

      console.error(
        'Error updating order status:',
        error
      );

      alert(
        'មិនអាចកែប្រែ Order Status បានទេ!'
      );
    }
  };


  // ==========================================
  // DELETE ORDER
  // ==========================================

  const handleDeleteOrder = async (orderId) => {
    const confirmDelete = window.confirm(
      'តើអ្នកពិតជាចង់លុប Order នេះមែនទេ?'
    );

    if (!confirmDelete) return;

    try {

      await deleteDoc(
        doc(db, 'orders', orderId)
      );

      setOrders((currentOrders) =>
        currentOrders.filter(
          (order) => order.id !== orderId
        )
      );

      alert(
        'បានលុប Order ដោយជោគជ័យ!'
      );

    } catch (error) {

      console.error(
        'Error deleting order:',
        error
      );

      alert(
        'មិនអាចលុប Order បានទេ!'
      );
    }
  };


  return (
    <div className="admin-container">

      {/* ======================================
          ADMIN HEADER
      ======================================= */}

      <div className="admin-header">

        <p className="admin-kicker">
          JINNY COFFEE
        </p>

        <h2>
          Admin Dashboard
        </h2>

        <p>
          គ្រប់គ្រង Coffee Menu និង Customer Orders
        </p>

      </div>


      {/* ======================================
          COFFEE MENU
      ======================================= */}

      <section>

        <h3 className="admin-section-title">
          ☕ Coffee Menu Management
        </h3>


        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="admin-form"
        >

          <input
            type="text"
            placeholder="ឈ្មោះកាហ្វេ (e.g. Latte)"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />


          <textarea
            placeholder="បរិយាយកាហ្វេ"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows="4"
            required
          />


          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="តម្លៃ ($)"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            required
          />


          <input
            type="url"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) =>
              setImageUrl(e.target.value)
            }
          />


          <div className="admin-form-buttons">

            <button
              type="submit"
              className="admin-submit-btn"
            >
              {editId
                ? 'កែប្រែកាហ្វេ'
                : 'បន្ថែមកាហ្វេ'}
            </button>


            {editId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={clearForm}
              >
                បោះបង់
              </button>
            )}

          </div>

        </form>


        {/* PRODUCT LIST */}

        <div className="admin-list">

          <h3>
            ☕ Coffee Products
          </h3>


          {products.length === 0 ? (

            <div className="no-products">

              <p>
                មិនទាន់មានកាហ្វេនៅឡើយទេ។
              </p>

              <p>
                បន្ថែម Coffee ខាងលើ
                ដើម្បីបង្ហាញវានៅក្នុង Coffee Menu។
              </p>

            </div>

          ) : (

            products.map((product) => (

              <div
                key={product.id}
                className="admin-item"
              >

                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="admin-product-image"
                  />
                )}


                <div className="admin-product-info">

                  <h4>
                    {product.name}
                  </h4>

                  <p>
                    {product.description}
                  </p>

                  <strong>
                    ${Number(product.price).toFixed(2)}
                  </strong>

                </div>


                <div className="admin-actions">

                  <button
                    onClick={() =>
                      handleEdit(product)
                    }
                    className="edit-btn"
                  >
                    Edit
                  </button>


                  <button
                    onClick={() =>
                      handleDelete(product.id)
                    }
                    className="delete-btn"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </section>


      {/* ======================================
          CUSTOMER ORDERS
      ======================================= */}

      <section className="orders-section">

        <div className="orders-header">

          <div>

            <p className="admin-kicker">
              CUSTOMER ORDERS
            </p>

            <h3>
              📦 Orders
            </h3>

          </div>


          <button
            className="refresh-orders-btn"
            onClick={fetchOrders}
          >
            🔄 Refresh
          </button>

        </div>


        {orders.length === 0 ? (

          <div className="no-orders">

            <div className="no-orders-icon">
              📦
            </div>

            <h3>
              No Orders Yet
            </h3>

            <p>
              មិនទាន់មាន Customer Order ទេ។
            </p>

          </div>

        ) : (

          <div className="orders-list">

            {orders.map((order) => (

              <div
                key={order.id}
                className="order-card"
              >

                {/* ORDER TOP */}

                <div className="order-top">

                  <div>

                    <span className="order-label">
                      ORDER ID
                    </span>

                    <strong className="order-id">
                      #{order.id.slice(0, 8)}
                    </strong>

                  </div>


                  <span
                    className={`order-status ${(
                      order.status || 'Pending'
                    ).toLowerCase()}`}
                  >
                    {order.status || 'Pending'}
                  </span>

                </div>


                {/* CUSTOMER INFO */}

                <div className="order-customer">

                  <h4>
                    👤 Customer Information
                  </h4>

                  <p>
                    <strong>Name:</strong>{' '}
                    {order.customerName || '-'}
                  </p>

                  <p>
                    <strong>Phone:</strong>{' '}
                    {order.phone || '-'}
                  </p>

                  <p>
                    <strong>Address:</strong>{' '}
                    {order.address || '-'}
                  </p>

                  <p>
                    <strong>Payment:</strong>{' '}
                    {order.paymentMethod || '-'}
                  </p>

                </div>


                {/* ORDER ITEMS */}

                <div className="order-items">

                  <h4>
                    ☕ Coffee Ordered
                  </h4>


                  {order.items &&
                    order.items.map(
                      (item, index) => (

                        <div
                          className="order-item-row"
                          key={`${item.id}-${index}`}
                        >

                          <div className="order-item-left">

                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="order-item-image"
                              />
                            )}

                            <div>

                              <strong>
                                {item.name}
                              </strong>

                              <p>
                                ${Number(item.price).toFixed(2)}
                                {' '}×{' '}
                                {item.quantity}
                              </p>

                            </div>

                          </div>


                          <strong>
                            $
                            {(
                              Number(item.price) *
                              Number(item.quantity)
                            ).toFixed(2)}
                          </strong>

                        </div>

                      )
                    )}

                </div>


                {/* ORDER TOTAL */}

                <div className="order-total-row">

                  <span>
                    Total
                  </span>

                  <strong>
                    $
                    {Number(
                      order.total || 0
                    ).toFixed(2)}
                  </strong>

                </div>


                {/* ACTIONS */}

                <div className="order-actions">

                  <button
                    className="order-accept-btn"
                    onClick={() =>
                      updateOrderStatus(
                        order.id,
                        'Accepted'
                      )
                    }
                  >
                    ✅ Accept
                  </button>


                  <button
                    className="order-complete-btn"
                    onClick={() =>
                      updateOrderStatus(
                        order.id,
                        'Completed'
                      )
                    }
                  >
                    ✔ Complete
                  </button>


                  <button
                    className="order-cancel-btn"
                    onClick={() =>
                      updateOrderStatus(
                        order.id,
                        'Cancelled'
                      )
                    }
                  >
                    ✕ Cancel
                  </button>


                  <button
                    className="order-delete-btn"
                    onClick={() =>
                      handleDeleteOrder(order.id)
                    }
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default Admin;