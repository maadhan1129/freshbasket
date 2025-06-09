import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import CategorySection from '../components/home/CategorySection';
import ProductGrid from '../components/products/ProductGrid';
import { categories, products, sampleAds } from '../data/mockData';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSlider />
      <CategorySection />
      
      {/* Category Products */}
      {categories.map((cat, idx) => (
        <div key={cat.id} className="my-8">
          <div className="flex items-center justify-between mb-4 px-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">{cat.name}</h2>
            <a href={`/products?category=${cat.id}`} className="text-yellow-600 text-sm font-semibold hover:underline">See All</a>
          </div>
          <ProductGrid products={products.filter(p => p.category === cat.id).slice(0, 10)} />
        </div>
      ))}
    </div>
  );
};

export default HomePage;