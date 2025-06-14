import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductsPage from './pages/ProductsPage';
import Layout from './components/layout/Layout';
import { AuthProvider } from './contexts/AuthContext';
import ProfilePage from './pages/ProfilePage';

// Loading spinner component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
  </div>
);

// Error message component
const ErrorMessage = ({ message }: { message: string }) => (
  <div className="min-h-screen flex items-center justify-center text-red-600 font-bold text-lg">
    Error: {message}
  </div>
);

// AppContent component will now render routes within the Layout
const AppContent = () => {
  const location = useLocation();
  return (
    <Routes>
      {/* All main application routes will be children of the Layout component */}
      <Route path="/" element={<Layout />}>
        {/* Root path handling - always go to home */}
        <Route index element={<Navigate to="/home" replace />} />

        {/* All routes are now directly accessible */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="home" element={<Home />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="order-confirmation/:orderId" element={<OrderConfirmationPage />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;