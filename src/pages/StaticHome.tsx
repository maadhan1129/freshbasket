import React from 'react';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Fresh Basket</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Featured Products Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Featured Products</h2>
          <p className="text-gray-600">Browse our selection of fresh products.</p>
        </div>

        {/* Special Offers Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Special Offers</h2>
          <p className="text-gray-600">Check out our latest deals and discounts.</p>
        </div>

        {/* Quick Categories Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Categories</h2>
          <p className="text-gray-600">Find what you need quickly.</p>
        </div>
      </div>
    </div>
  );
};

export default Home; 