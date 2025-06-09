import React from 'react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency } from '../../utils/currency';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showAddToCart = true 
}) => {
  const { addToCart } = useCart();
  const {
    name,
    price,
    discountPrice,
    image,
    unit,
    description,
    stock
  } = product;

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col w-48 min-w-[180px] mx-auto border-2 border-[#FFD700]">
      <div className="relative aspect-square bg-gray-50 flex items-center justify-center">
        <img 
          src={image} 
          alt={name}
          className="w-28 h-28 object-contain mx-auto my-4 drop-shadow-sm"
        />
        {discountPrice && (
          <span className="absolute top-2 left-2 bg-[#FFD700] text-[#333333] text-xs font-semibold px-2 py-1 rounded-full shadow">{Math.round(100 - (discountPrice / price) * 100)}% Off</span>
        )}
      </div>
      <div className="flex-1 flex flex-col px-4 pb-4">
        <h3 className="text-base font-semibold text-gray-900 mt-2 mb-1 truncate">{name}</h3>
        <p className="text-xs text-gray-500 mb-2 truncate">{description}</p>
        <div className="flex items-end space-x-2 mb-2">
          {discountPrice ? (
            <>
              <span className="text-lg font-bold text-[#FFD700]">{formatCurrency(discountPrice)}</span>
              <span className="text-sm text-gray-400 line-through">{formatCurrency(price)}</span>
            </>
          ) : (
            <span className="text-lg font-bold text-[#FFD700]">{formatCurrency(price)}</span>
          )}
          <span className="text-xs text-gray-500 ml-1">{unit}</span>
        </div>
        {showAddToCart && (
          <button 
            onClick={handleAddToCart}
            disabled={stock === 0}
            className="mt-auto w-full bg-[#FFD700] text-[#333333] py-2 rounded-full font-semibold hover:bg-[#FFC107] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {stock === 0 ? 'Out of Stock' : 'Add'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;