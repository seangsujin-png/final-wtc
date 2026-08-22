import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import PrivateRoute from './components/PrivateRoute';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import OrderSuccess from './pages/OrderSuccess';
import TrackOrder from './pages/TrackOrder';
import Admin from './pages/Admin';


import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>

          <div className="App">

            <Navbar />

            <Routes>

              <Route
  path="/track-order/:orderId"
  element={<TrackOrder />}
/>
              

              <Route
                path="/"
                element={<Home />}
              />

              <Route
                path="/about"
                element={<About />}
              />

              <Route
                path="/services"
                element={<Services />}
              />

              {/* Cart */}
              <Route
                path="/cart"
                element={<Cart />}
              />

              {/* Checkout */}
              <Route
                path="/checkout"
                element={<Checkout />}
              />

              <Route
                path="/contact"
                element={<Contact />}
              />

              <Route
                path="/login"
                element={<Login />}
              />

              <Route
                path="/register"
                element={<Register />}
              />

              <Route
                path="/order-success"
                 element={<OrderSuccess />}
              />

              {/* Admin */}
              <Route
                path="/admin"
                element={
                  <PrivateRoute adminOnly>
                    <Admin />
                  </PrivateRoute>
                }
              />

            </Routes>

            <Footer />

          </div>

        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;