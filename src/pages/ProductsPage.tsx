import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/products/ProductGrid';
import { products, categories, searchProducts, getProductsByCategory } from '../data/mockData';
import { Product, Category } from '../types';

const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  
  const categoryParam = searchParams.get('category') as Category | null;
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    let result: Product[] = [];
    
    if (categoryParam && categories.some(c => c.id === categoryParam)) {
      result = getProductsByCategory(categoryParam);
      setActiveCategory(categoryParam);
    } else if (searchQuery) {
      result = searchProducts(searchQuery);
      setActiveCategory(null);
    } else {
      result = products;
      setActiveCategory(null);
    }
    
    setFilteredProducts(result);
  }, [categoryParam, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
            {activeCategory 
              ? categories.find(c => c.id === activeCategory)?.name || 'Products'
              : searchQuery 
                ? `Search Results: "${searchQuery}"`
                : 'All Products'
            }
          </h1>
          <span className="text-[#FFD700] font-semibold text-sm">{filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} found</span>
        </div>
      </div>
      <ProductGrid products={filteredProducts} />
    </div>
  );
};

export default ProductsPage;