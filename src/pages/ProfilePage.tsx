import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Package, Settings, LogOut, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { formatCurrency } from '../utils/currency';

interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price_at_purchase: number;
  product_name: string;
  product_image_url: string;
}

interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  created_at: string;
  shipping_address: {
    first_name: string;
    last_name: string;
    email: string;
    address_line1: string;
    city: string;
    state: string;
    postal_code: string;
    phone: string;
    country: string;
  };
  order_items: OrderItem[];
}

const ProfilePage: React.FC = () => {
  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState<string | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login?redirect=/profile');
      return;
    }

    const fetchOrders = async () => {
      if (!user) return;
      setLoadingOrders(true);
      setOrdersError(null);

      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (*)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (error: any) {
        console.error('Error fetching orders:', error);
        setOrdersError(error.message || 'Failed to fetch order history');
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [isLoggedIn, user, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/'); // Redirect to home page after logout
  };

  const handleViewOrders = () => {
    setShowOrderModal(true);
  };

  const OrderModal = () => {
    if (!showOrderModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
            <button
              onClick={() => setShowOrderModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {loadingOrders ? (
            <p className="text-center text-gray-600">Loading orders...</p>
          ) : ordersError ? (
            <p className="text-center text-red-600">Error: {ordersError}</p>
          ) : orders.length === 0 ? (
            <p className="text-center text-gray-600">You haven't placed any orders yet.</p>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">Order #{order.id.substring(0, 8)}</h3>
                      <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.order_status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.order_status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.order_status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                      <div className="text-sm text-gray-600">
                        <p>{order.shipping_address.first_name} {order.shipping_address.last_name}</p>
                        <p>{order.shipping_address.address_line1}</p>
                        <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}</p>
                        <p>{order.shipping_address.country}</p>
                        <p className="mt-2">Phone: {order.shipping_address.phone}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Payment Details</h4>
                      <div className="text-sm text-gray-600">
                        <p>Method: {order.payment_method}</p>
                        <p>Status: {order.payment_status}</p>
                        <p className="mt-2 font-medium">Total: {formatCurrency(order.total_amount)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                    <div className="space-y-3">
                      {order.order_items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-3 rounded-md">
                          <img
                            src={item.product_image_url}
                            alt={item.product_name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{item.product_name}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                            <p className="text-sm text-gray-600">Price: {formatCurrency(item.price_at_purchase)}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">
                              {formatCurrency(item.price_at_purchase * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => navigate(`/order-confirmation/${order.id}`)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-sm"
                    >
                      View Full Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100">
        <p className="text-gray-700">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 px-6 py-8">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full">
                <User className="h-8 w-8 text-yellow-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Welcome back!</h1>
                <p className="text-yellow-100">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Email Address</label>
                    <p className="mt-1 text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">User ID</label>
                    <p className="mt-1 text-gray-900">{user.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Member Since</label>
                    <p className="mt-1 text-gray-900">{new Date(user.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-4">
                  <button 
                    onClick={handleViewOrders}
                    className="w-full flex items-center space-x-3 px-4 py-3 bg-white rounded-lg shadow-sm hover:bg-yellow-50 transition-colors"
                  >
                    <Package className="h-5 w-5 text-yellow-600" />
                    <span className="text-gray-700">View Order History</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 bg-white rounded-lg shadow-sm hover:bg-yellow-50 transition-colors">
                    <Settings className="h-5 w-5 text-yellow-600" />
                    <span className="text-gray-700">Account Settings</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 bg-white rounded-lg shadow-sm hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-5 w-5 text-red-600" />
                    <span className="text-red-600">Sign Out</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Orders Section */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Orders</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                {loadingOrders ? (
                  <p className="text-center text-gray-600">Loading orders...</p>
                ) : ordersError ? (
                  <p className="text-center text-red-600">Error: {ordersError}</p>
                ) : orders.length === 0 ? (
                  <p className="text-center text-gray-600">You haven't placed any orders yet.</p>
                ) : (
                  <div className="space-y-4">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-md p-4 shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-semibold text-lg">Order #{order.id.substring(0, 8)}</h3>
                          <span className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-700 mb-2">Total: {formatCurrency(order.total_amount)}</p>
                        <p className={`text-sm font-medium ${order.order_status === 'delivered' ? 'text-green-600' : 'text-yellow-600'}`}>
                          Status: {order.order_status}
                        </p>
                        <button
                          onClick={() => navigate(`/order-confirmation/${order.id}`)}
                          className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-sm"
                        >
                          View Details
                        </button>
                      </div>
                    ))}
                    {orders.length > 3 && (
                      <button
                        onClick={handleViewOrders}
                        className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm"
                      >
                        View All Orders
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <OrderModal />
    </div>
  );
};

export default ProfilePage; 