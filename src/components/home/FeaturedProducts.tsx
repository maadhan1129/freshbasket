import React from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '../products/ProductGrid';
import { getPopularProducts } from '../../data/mockData';

const FeaturedProducts: React.FC = () => {
  const popularProducts = getPopularProducts().slice(0, 8);

  return (
    <section className="py-10 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Featured Products
          </h2>
          <Link 
            to="/products" 
            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-[#333333] bg-[#FFD700] hover:bg-[#FFC107] rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            See All
            <svg className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
        <ProductGrid products={popularProducts} />
      </div>
    </section>
  );
};

export default FeaturedProducts;