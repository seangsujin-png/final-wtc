import { useState } from 'react';
import './App.css';

const INITIAL_ITEMS = [
  { id: 1, name: 'Espresso', category: 'Hot Drinks', price: 1.00, desc: 'Rich and bold single shot of roasted espresso', image: '☕' },
  { id: 2, name: 'Cappuccino', category: 'Hot Drinks', price: 1.50, desc: 'Equal parts espresso, steamed milk, and rich foam', image: '🥛' },
  { id: 3, name: 'Caramel Macchiato', category: 'Hot Drinks', price: 1.50, desc: 'Fresh espresso with vanilla syrup and caramel drizzle', image: '🍯' },
  { id: 4, name: 'Ice Vanila', category: 'Cold Drinks', price: 1.50, desc: 'Coffee mix with vanila', image: '🥛' },
  { id: 5, name: 'Iced Matcha Latte', category: 'Cold Drinks', price: 1.50, desc: 'Japanese green tea with chilled milk over ice', image: '🍵' },
  { id: 6, name: 'Iced Americano', category: 'Cold Drinks', price: 1.25, desc: 'Espresso shots topped with cold water and ice', image: '🥤' },
  { id: 7, name: 'Ice Mocha', category: 'Cold Drinks', price: 1.50, desc: 'Coffee mix with chocolate', image: '🥛' },
  { id: 8, name: 'Hot Chocolate', category: 'Hot Drinks', price: 1.25, desc: 'Velvety steamed milk with rich dark chocolate fudge', image: '☕' }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('menu'); // 'login', 'menu', 'categories', 'about', 'admin'
  const [menuItems, setMenuItems] = useState(INITIAL_ITEMS);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  
  // Admin Data 
  const [customerOrders, setCustomerOrders] = useState([]);

  // Login Form 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Add Item Form (Admin)
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Hot Drinks');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemImage, setNewItemImage] = useState('☕');

  // Cart Functions
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return alert('Please enter both email and password.');
    
    const cleanEmail = email.toLowerCase().trim();
    const isAdminAccount = cleanEmail === 'admin@coffee.com';

    // Verify Admin Password
    if (isAdminAccount && password !== 'admin123') {
      alert('Incorrect password for admin account.');
      return;
    }

    const username = cleanEmail.split('@')[0];
    setUser({ name: username, email: cleanEmail, isAdmin: isAdminAccount });

    if (isAdminAccount) {
      setCurrentPage('admin');
    } else {
      setCurrentPage('menu');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setEmail('');
    setPassword('');
    setCurrentPage('login');
  };

  // Checkout Function (Saves Order to Admin Page)
  const handleCheckout = () => {
    if (!user) {
      alert('Please log in first to complete your order!');
      setCurrentPage('login');
      return;
    }

    const newOrder = {
      id: Date.now(),
      buyerName: user.name,
      buyerEmail: user.email,
      items: cart,
      total: totalPrice,
      date: new Date().toLocaleString(),
    };

    setCustomerOrders((prev) => [newOrder, ...prev]);
    alert(`Thank you for your order, ${user.name}! Total: $${totalPrice}`);
    setCart([]);
  };

  // Admin: Add New Menu Item Function
  const handleAddMenuItem = (e) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice) return alert('Please provide an item name and price.');

    const newItem = {
      id: Date.now(),
      name: newItemName,
      category: newItemCategory,
      price: parseFloat(newItemPrice),
      desc: newItemDesc,
      image: newItemImage || '☕',
    };

    setMenuItems((prev) => [...prev, newItem]);
    alert(`"${newItemName}" added to the menu successfully!`);

    
    setNewItemName('');
    setNewItemCategory('Hot Drinks');
    setNewItemPrice('');
    setNewItemDesc('');
    setNewItemImage('☕');
  };

  return (
    <div className="coffee-app">
      {/* Universal Navigation */}
      <nav className="navbar">
        <div className="logo" onClick={() => setCurrentPage('menu')}>☕ BUNLONG CAFE</div>
        
        <div className="nav-links">
          <button className={currentPage === 'menu' ? 'active' : ''} onClick={() => setCurrentPage('menu')}>Menu</button>
          <button className={currentPage === 'categories' ? 'active' : ''} onClick={() => setCurrentPage('categories')}>Hot & Cold</button>
          <button className={currentPage === 'about' ? 'active' : ''} onClick={() => setCurrentPage('about')}>About Us</button>
          {user?.isAdmin && (
            <button className={`admin-nav-btn ${currentPage === 'admin' ? 'active' : ''}`} onClick={() => setCurrentPage('admin')}>
              📊 Admin Dashboard
            </button>
          )}
        </div>

        <div className="nav-actions">
          {user ? (
            <div className="user-profile">
              <span>👋 {user.name} {user.isAdmin && <strong className="admin-badge">ADMIN</strong>}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button className={`auth-btn ${currentPage === 'login' ? 'active-auth' : ''}`} onClick={() => setCurrentPage('login')}>
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Main Page Routing */}
      <main className="main-content">
        
        {/* LOGIN PAGE */}
        {currentPage === 'login' && (
          <section className="page-container auth-page">
            <div className="auth-card">
              <h2>Welcome to Jinny Cafe</h2>
              <p className="auth-subtitle">Sign in to place orders or manage the store</p>
              
              <form onSubmit={handleLogin} className="auth-form">
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    placeholder="admin@coffee.com or user@gmail.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>

                <button type="submit" className="submit-btn">Sign In</button>
              </form>
            </div>
          </section>
        )}

        {/* DRINK MENU PAGE */}
        {currentPage === 'menu' && (
          <section className="page-container menu-page">
            <header className="hero">
              <h1>Fresh Daily Coffee</h1>
              <p>Hand-picked beans, roasted locally and prepared with precision.</p>
            </header>

            <div className="layout-grid">
              <div className="menu-list">
                <h2>All Drinks & Items</h2>
                <div className="menu-grid">
                  {menuItems.map((item) => (
                    <div key={item.id} className="coffee-card">
                      <div className="card-top">
                        <span className="card-icon">{item.image}</span>
                        <span className="category-tag">{item.category}</span>
                      </div>
                      <h3>{item.name}</h3>
                      <p className="desc">{item.desc}</p>
                      <div className="card-bottom">
                        <span className="price">${item.price.toFixed(2)}</span>
                        <button className="add-btn" onClick={() => addToCart(item)}>+ Add</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar Cart View */}
              <aside className="cart-sidebar">
                <h3>🛒 Current Order ({totalCartCount})</h3>
                {cart.length === 0 ? (
                  <p className="empty-cart">Your cart is empty.</p>
                ) : (
                  <>
                    <div className="cart-items">
                      {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                          <div>
                            <strong>{item.name}</strong>
                            <div className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</div>
                          </div>
                          <div className="quantity-controls">
                            <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="cart-summary">
                      <div className="total-row">
                        <span>Total:</span>
                        <strong>${totalPrice}</strong>
                      </div>
                      <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
                    </div>
                  </>
                )}
              </aside>
            </div>
          </section>
        )}

        {/*  CATEGORIES (HOT & COLD SPLIT) */}
        {currentPage === 'categories' && (
          <section className="page-container categories-page">
            <h2>Drink Categories</h2>
            <p className="page-desc">You can choose a delicious drinks here.</p>

            <div className="category-sections">
              {/* Hot Drinks Section */}
              <div className="category-block">
                <div className="category-header hot-header">
                  <h3>🔥 Hot Drinks</h3>
                </div>
                <div className="menu-grid">
                  {menuItems.filter(i => i.category === 'Hot Drinks').map((item) => (
                    <div key={item.id} className="coffee-card">
                      <div className="card-top">
                        <span className="card-icon">{item.image}</span>
                      </div>
                      <h3>{item.name}</h3>
                      <p className="desc">{item.desc}</p>
                      <div className="card-bottom">
                        <span className="price">${item.price.toFixed(2)}</span>
                        <button className="add-btn" onClick={() => addToCart(item)}>+ Add</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cold Drinks Section */}
              <div className="category-block">
                <div className="category-header cold-header">
                  <h3>🧊 Cold Drinks</h3>
                </div>
                <div className="menu-grid">
                  {menuItems.filter(i => i.category === 'Cold Drinks').map((item) => (
                    <div key={item.id} className="coffee-card">
                      <div className="card-top">
                        <span className="card-icon">{item.image}</span>
                      </div>
                      <h3>{item.name}</h3>
                      <p className="desc">{item.desc}</p>
                      <div className="card-bottom">
                        <span className="price">${item.price.toFixed(2)}</span>
                        <button className="add-btn" onClick={() => addToCart(item)}>+ Add</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/*  ABOUT PAGE */}
        {currentPage === 'about' && (
          <section className="page-container about-page">
            <div className="about-content">
              <h2>About Jinny Cafe</h2>
              <p className="lead-text">
                Founded with a passion for exceptional coffee, Jinny Cafe brings artisan roasting standards and warm community hospitality together under one roof.
              </p>

              <div className="about-grid">
                <div className="about-card">
                  <h4>☕ Quality Sourcing</h4>
                  <p>We partner directly with ethical coffee farms across South America and Southeast Asia to source 100% Arabica beans.</p>
                </div>
                <div className="about-card">
                  <h4>🔥 In-House Roasting</h4>
                  <p>Our beans are small-batch roasted weekly to preserve delicate aromatic profiles and peak flavor intensity.</p>
                </div>
                <div className="about-card">
                  <h4>🌱 Sustainability</h4>
                  <p>All takeaway cups, lids, and straws are 100% biodegradable and compostable.</p>
                </div>
              </div>

              <div className="store-info">
                <h3>Visit Us</h3>
                <p>📍 Phnom Penh, Cambodia</p>
                <p>⏰ Open Daily: 7:00 AM – 8:00 PM</p>
              </div>
            </div>
          </section>
        )}

        {/* PAGE 5: ADMIN PAGE */}
        {currentPage === 'admin' && (
          <section className="page-container admin-page">
            {!user?.isAdmin ? (
              <div className="access-denied">
                <h2>🔒 Access Denied</h2>
                <p>Please log in with an administrator account (<code>admin@coffee.com</code>) to view this page.</p>
                <button className="submit-btn" onClick={() => setCurrentPage('login')}>Go to Login</button>
              </div>
            ) : (
              <div className="admin-grid">
                {/* Section 1: Add New Menu Item */}
                <div className="admin-card">
                  <h2>➕ Add New Menu Item</h2>
                  <form onSubmit={handleAddMenuItem} className="admin-form">
                    <div className="form-group">
                      <label>Item Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Vanilla Latte" 
                        value={newItemName} 
                        onChange={(e) => setNewItemName(e.target.value)} 
                        required 
                      />
                    </div>

                    <div className="form-group">
                      <label>Category</label>
                      <select 
                        value={newItemCategory} 
                        onChange={(e) => setNewItemCategory(e.target.value)} 
                        className="select-input"
                      >
                        <option value="Hot Drinks">Hot Drinks</option>
                        <option value="Cold Drinks">Cold Drinks</option>
                        <option value="Bakery">Bakery</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Price ($)</label>
                      <input 
                        type="number" 
                        step="0.01" 
                        placeholder="4.50" 
                        value={newItemPrice} 
                        onChange={(e) => setNewItemPrice(e.target.value)} 
                        required 
                      />
                    </div>

                    <div className="form-group">
                      <label>Emoji Icon</label>
                      <input 
                        type="text" 
                        placeholder="☕ or 🧊" 
                        value={newItemImage} 
                        onChange={(e) => setNewItemImage(e.target.value)} 
                      />
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <textarea 
                        placeholder="Short item description..." 
                        value={newItemDesc} 
                        onChange={(e) => setNewItemDesc(e.target.value)} 
                        className="textarea-input"
                      />
                    </div>

                    <button type="submit" className="submit-btn">Add to Menu</button>
                  </form>
                </div>

                {/* Section 2: Customer Orders List */}
                <div className="admin-card">
                  <h2>📋 Customer Orders ({customerOrders.length})</h2>
                  {customerOrders.length === 0 ? (
                    <p className="empty-orders">No customer orders received yet.</p>
                  ) : (
                    <div className="orders-container">
                      {customerOrders.map((order) => (
                        <div key={order.id} className="order-box">
                          <div className="order-header">
                            <div>
                              <strong>👤 {order.buyerName}</strong> ({order.buyerEmail})
                            </div>
                            <span className="order-date">{order.date}</span>
                          </div>
                          
                          <div className="order-item-list">
                            {order.items.map((i) => (
                              <div key={i.id} className="order-item-row">
                                <span>{i.image} {i.name} (x{i.quantity})</span>
                                <span>${(i.price * i.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>

                          <div className="order-total-row">
                            <span>Total Paid:</span>
                            <strong>${order.total}</strong>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Jinny Cafe. All rights reserved.</p>
      </footer>
    </div>
  );
}