import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

function Navbar() {
  const { currentUser, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        <Link to="/" className="nav-logo">
          Jinny Coffee
        </Link>

        <ul className="nav-menu">

          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/about">About</Link>
          </li>

          <li>
            <Link to="/services">Coffee</Link>
          </li>

          <li>
            <Link to="/contact">Contact</Link>
          </li>

          {/* Cart */}
          <li>
            <Link to="/cart">
              🛒 Cart

              {cartCount > 0 && (
                <span className="cart-count">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>

          {isAdmin && (
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          )}

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
              <Link to="/login" className="auth-link">
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