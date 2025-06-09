import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/mockData';

const CategorySection: React.FC = () => {
  return (
    <section className="py-8 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Discover our wide range of fresh products, carefully selected for quality and taste
          </p>
        </div>
        <div className="overflow-x-auto scrollbar-hide -mx-2">
          <div className="flex space-x-4 px-2 min-w-max">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="flex flex-col items-center bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 min-w-[110px] p-4 group border border-[#FFD700] hover:border-[#FFC107]"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="w-12 h-12 flex items-center justify-center mb-2 rounded-full bg-[#FFD700]/10 group-hover:bg-[#FFD700]/20 transition-colors duration-300">
                  <span className="text-2xl text-[#FFD700] group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </span>
                </div>
                <span className="font-medium text-[#333333] group-hover:text-[#FFD700] transition-colors duration-300 text-center text-xs">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;