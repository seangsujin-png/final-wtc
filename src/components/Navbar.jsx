import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

function Navbar() {
  const { currentUser, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate('/');
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">

      <div className="nav-container">

        {/* Logo */}
        <Link
          to="/"
          className="nav-logo"
          onClick={closeMenu}
        >
          Jinny Coffee
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        {/* Navigation */}
        <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>

          <li>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/about" onClick={closeMenu}>
              About
            </Link>
          </li>

          <li>
            <Link to="/services" onClick={closeMenu}>
              Coffee
            </Link>
          </li>

          <li>
            <Link to="/contact" onClick={closeMenu}>
              Contact
            </Link>
          </li>

          {/* Cart */}
          <li>
            <Link to="/cart" onClick={closeMenu}>
              🛒 Cart

              {cartCount > 0 && (
                <span className="cart-count">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>

          {/* Admin */}
          {isAdmin && (
            <li>
              <Link to="/admin" onClick={closeMenu}>
                Admin
              </Link>
            </li>
          )}

          {/* Login / Logout */}
          {currentUser ? (
            <li>
              <button
                className="auth-link nav-logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="auth-link"
                onClick={closeMenu}
              >
                Login
              </Link>
            </li>
          )}

        </ul>

      </div>

    </nav>
  );
}

export default Navbar;