import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, Award, RefreshCw } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { products, getProductsByCategory } from '../data/mockData';
import ProductGrid from '../components/products/ProductGrid';
import { Product } from '../types';
import { formatCurrency } from '../utils/currency';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedTab, setSelectedTab] = useState('description');
  
  const { addToCart } = useCart();

  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Get related products from the same category
      const related = getProductsByCategory(foundProduct.category)
        .filter(p => p.id !== id)
        .slice(0, 4);
      
      setRelatedProducts(related);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="bg-yellow-500 text-gray-800 px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors">
          Back to Products
        </Link>
      </div>
    );
  }

  const {
    name,
    brand,
    price,
    discountPrice,
    unit,
    rating,
    image,
    description,
    category,
    tags,
    stock
  } = product;

  const hasDiscount = discountPrice !== undefined;
  const discountPercentage = hasDiscount 
    ? Math.round(((price - discountPrice) / price) * 100) 
    : 0;

  const handleIncrease = () => {
    if (quantity < stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-8">
        <ol className="flex flex-wrap text-sm text-gray-600">
          <li className="flex items-center">
            <Link to="/" className="hover:text-yellow-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <Link to="/products" className="hover:text-yellow-600 transition-colors">Products</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <Link 
              to={`/products?category=${category}`} 
              className="hover:text-yellow-600 transition-colors capitalize"
            >
              {category}
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-900 font-medium">{name}</li>
        </ol>
      </nav>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-auto object-cover aspect-square"
          />
        </div>

        {/* Product Info */}
        <div>
          <span className="text-sm text-gray-500 mb-2 block">{brand}</span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{name}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={`${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">({rating}) • {stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
          </div>
          
          {/* Price */}
          <div className="mb-6">
            <div className="flex items-center">
              {hasDiscount ? (
                <>
                  <span className="text-3xl font-bold text-yellow-600">
                    {formatCurrency(discountPrice)}
                  </span>
                  <span className="ml-3 text-lg text-gray-500 line-through">
                    {formatCurrency(price)}
                  </span>
                  <span className="ml-3 bg-accent-500 text-white text-sm font-semibold px-2 py-1 rounded-full">
                    {discountPercentage}% Off
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-yellow-600">
                  {formatCurrency(price)}
                </span>
              )}
            </div>
            <span className="text-sm text-gray-600">Price per {unit}</span>
          </div>
          
          {/* Description */}
          <p className="text-gray-700 mb-6">{description}</p>
          
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map(tag => (
                <Link 
                  key={tag}
                  to={`/products?tag=${tag}`}
                  className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
          
          {/* Add to Cart */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="flex items-center border rounded-lg mr-4">
                <button 
                  onClick={handleDecrease}
                  className="px-4 py-2 text-gray-600 hover:text-yellow-600 transition-colors"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button 
                  onClick={handleIncrease}
                  className="px-4 py-2 text-gray-600 hover:text-yellow-600 transition-colors"
                  disabled={quantity >= stock}
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-600">
                {stock} {stock === 1 ? 'item' : 'items'} available
              </span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 min-w-[180px] bg-yellow-500 hover:bg-yellow-600 text-gray-800 py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                disabled={stock <= 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </button>
              
              <button
                onClick={toggleFavorite}
                className={`p-3 rounded-lg border transition-colors ${
                  isFavorite 
                    ? 'bg-accent-50 border-accent-500 text-accent-500' 
                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                <Heart className={isFavorite ? 'fill-accent-500' : ''} />
              </button>
              
              <button className="p-3 rounded-lg border border-gray-300 text-gray-600 hover:border-gray-400 transition-colors">
                <Share2 />
              </button>
            </div>
          </div>
          
          {/* Product Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="mr-3 bg-yellow-50 p-2 rounded-full">
                <Truck className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Free Delivery</h4>
                <p className="text-xs text-gray-600">Orders over $50</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 bg-yellow-50 p-2 rounded-full">
                <RefreshCw className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Easy Returns</h4>
                <p className="text-xs text-gray-600">30-day returns policy</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 bg-yellow-50 p-2 rounded-full">
                <Shield className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Secure Checkout</h4>
                <p className="text-xs text-gray-600">100% protected payments</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 bg-yellow-50 p-2 rounded-full">
                <Award className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Quality Guaranteed</h4>
                <p className="text-xs text-gray-600">Only the best products</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;