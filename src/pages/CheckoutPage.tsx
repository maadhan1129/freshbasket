import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/currency';
import { supabase } from '../lib/supabase';
import { Address } from '../types/database';
import { useAuth } from '../contexts/AuthContext';

const CheckoutPage: React.FC = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate('/login?redirect=/checkout');
    }
  }, [isLoggedIn, user, navigate]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    phone: '',
    country: '',
  });

  // Update email when user changes
  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({ ...prev, email: user.email }));
    }
  }, [user]);

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedAddresses = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('addresses')
          .select('*')
          .eq('user_id', user.id)
          .order('is_default', { ascending: false });

        if (error) throw error;
        setSavedAddresses(data || []);
        
        const defaultAddress = data?.find(addr => addr.is_default);
        if (defaultAddress) {
          setSelectedAddress(defaultAddress.id);
          setFormData(prev => ({
            ...prev,
            firstName: defaultAddress.first_name,
            lastName: defaultAddress.last_name,
            address: defaultAddress.address_line1,
            city: defaultAddress.city,
            state: defaultAddress.state,
            zipCode: defaultAddress.postal_code,
            country: defaultAddress.country,
            phone: defaultAddress.phone,
          }));
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchSavedAddresses();
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address.id);
    setFormData(prev => ({
      ...prev,
      firstName: address.first_name,
      lastName: address.last_name,
      address: address.address_line1,
      city: address.city,
      state: address.state,
      zipCode: address.postal_code,
      country: address.country,
      phone: address.phone,
    }));
  };

  const handleSaveAddress = async () => {
    if (!user) {
      navigate('/login?redirect=/checkout');
      return;
    }

    try {
      const addressData = {
        user_id: user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        address_line1: formData.address,
        city: formData.city,
        state: formData.state,
        postal_code: formData.zipCode,
        country: formData.country,
        phone: formData.phone,
        is_default: savedAddresses.length === 0,
      };

      const { data, error } = await supabase
        .from('addresses')
        .insert(addressData)
        .select()
        .single();

      if (error) throw error;

      setSavedAddresses(prev => [...prev, data]);
      setSelectedAddress(data.id);
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Failed to save address. Please try again.');
    }
  };

  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
    if (couponApplied) {
      setDiscount(0);
      setCouponApplied(false);
    }
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'BHOJREDDY') {
      setDiscount(0.20);
      setCouponApplied(true);
      alert('Coupon applied successfully! You got 20% discount.');
    } else {
      setDiscount(0);
      setCouponApplied(false);
      alert('Invalid coupon code.');
    }
  };

  const calculateTotal = () => {
    const subtotal = getCartTotal();
    return subtotal * (1 - discount);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login?redirect=/checkout');
      return;
    }

    if (items.length === 0) {
      navigate('/cart');
      return;
    }

    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode', 'phone', 'country'];
    
    if (selectedPaymentMethod === 'card') {
      requiredFields.push('cardNumber', 'expiryDate', 'cvv');
    }

    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    try {
      const shippingAddress = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        address_line1: formData.address,
        city: formData.city,
        state: formData.state,
        postal_code: formData.zipCode,
        phone: formData.phone,
        country: formData.country,
      };

      if (!selectedAddress) {
        await handleSaveAddress();
      }

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: calculateTotal(),
          payment_method: selectedPaymentMethod === 'card' ? 'Card' : selectedPaymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery',
          payment_status: 'pending',
          order_status: 'pending',
          shipping_address: shippingAddress,
        })
        .select()
        .single();

      if (orderError) {
        console.error('Order creation error:', orderError);
        throw new Error(orderError.message || 'Failed to create order');
      }

      if (!order) {
        throw new Error('Failed to create order: No order data returned');
      }

      const orderItemsToInsert = items.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price_at_purchase: item.product.discountPrice || item.product.price,
        product_name: item.product.name,
        product_image_url: item.product.imageUrl,
      }));

      const { error: orderItemsError } = await supabase
        .from('order_items')
        .insert(orderItemsToInsert);

      if (orderItemsError) {
        console.error('Order items creation error:', orderItemsError);
        throw new Error(orderItemsError.message || 'Failed to add order items');
      }

      clearCart();
      navigate(`/order-confirmation/${order.id}`);
    } catch (error: any) {
      console.error('Error placing order:', error);
      alert(`Error placing order: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
              
              {savedAddresses.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-md font-medium text-gray-700 mb-2">Saved Addresses</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {savedAddresses.map(addr => (
                      <div 
                        key={addr.id} 
                        className={`border rounded-lg p-4 cursor-pointer ${selectedAddress === addr.id ? 'border-yellow-500 ring-1 ring-yellow-500' : 'border-gray-200 hover:border-gray-300'}`}
                        onClick={() => handleAddressSelect(addr)}
                      >
                        <p className="font-medium">{addr.first_name} {addr.last_name}</p>
                        <p className="text-sm text-gray-600">{addr.address_line1}</p>
                        <p className="text-sm text-gray-600">{addr.city}, {addr.state} - {addr.postal_code}</p>
                        <p className="text-sm text-gray-600">{addr.country}</p>
                        <p className="text-sm text-gray-600">Phone: {addr.phone}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center mt-4">
                    <input
                      type="radio"
                      id="newAddress"
                      name="addressSelection"
                      value="new"
                      checked={selectedAddress === null}
                      onChange={() => setSelectedAddress(null)}
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
                    />
                    <label htmlFor="newAddress" className="ml-2 block text-sm font-medium text-gray-700">Use a new address</label>
                  </div>
                </div>
              )}

              {selectedAddress === null && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address Line 1</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">ZIP / Postal Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
              )}
              
              <button
                onClick={handleSaveAddress}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Save Address
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    value="card"
                    checked={selectedPaymentMethod === 'card'}
                    onChange={handlePaymentMethodChange}
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
                  />
                  <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">Credit/Debit Card</label>
                </div>
                {selectedPaymentMethod === 'card' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                    <div className="md:col-span-2">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                        placeholder="**** **** **** ****"
                      />
                    </div>
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                        placeholder="***"
                      />
                    </div>
                  </div>
                )}
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="upi"
                    name="paymentMethod"
                    value="upi"
                    checked={selectedPaymentMethod === 'upi'}
                    onChange={handlePaymentMethodChange}
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
                  />
                  <label htmlFor="upi" className="ml-3 block text-sm font-medium text-gray-700">UPI</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={selectedPaymentMethod === 'cod'}
                    onChange={handlePaymentMethodChange}
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
                  />
                  <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">Cash on Delivery</label>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Coupon Code</h2>
              <div className="flex">
                <input
                  type="text"
                  value={couponCode}
                  onChange={handleCouponChange}
                  placeholder="Enter coupon code"
                  className="flex-grow border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  className="bg-yellow-500 text-gray-800 px-4 py-2 rounded-r-md hover:bg-yellow-600 transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponApplied && (
                <p className="text-green-600 text-sm mt-2">20% discount applied!</p>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center">
                    <p className="text-sm text-gray-700">{item.product.name} x {item.quantity}</p>
                    <p className="text-sm font-medium">{formatCurrency((item.product.discountPrice || item.product.price) * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between font-semibold mb-2">
                <span>Subtotal</span>
                <span>{formatCurrency(getCartTotal())}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 mb-2">
                  <span>Discount (20%)</span>
                  <span>-{formatCurrency(getCartTotal() * discount)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-gray-200 pt-4 font-semibold text-xl">
                <span>Total</span>
                <span>{formatCurrency(calculateTotal())}</span>
              </div>
              
              <button
                type="submit"
                onClick={handleSubmit}
                className="mt-6 w-full bg-yellow-500 text-gray-800 py-3 rounded-full hover:bg-yellow-600 transition-colors font-semibold text-lg"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-600">Your cart is empty. Please add items before proceeding to checkout.</p>
          <Link
            to="/products"
            className="mt-4 inline-block bg-yellow-500 text-gray-800 px-6 py-2 rounded-full hover:bg-yellow-600 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;