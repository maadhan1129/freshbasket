import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, MapPin } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { categories } from '../../data/mockData';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(
    localStorage.getItem('selectedLocation') || 'Select Location'
  );
  
  const { getItemCount } = useCart();
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();

  const predefinedLocations = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLocationModal = () => {
    setIsLocationModalOpen(!isLocationModalOpen);
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    localStorage.setItem('selectedLocation', location);
    toggleLocationModal();
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-yellow-50 to-white shadow-md">
      <div className="container mx-auto px-4 flex flex-col">
        {/* Top Row: Logo, Super Saver, Location, Search, Cart/Login */}
        <div className="flex items-center justify-between h-20 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl font-extrabold bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent tracking-tight">Fresh Basket</span>
          </Link>
          {/* Super Saver Toggle */}
          <div className="flex items-center ml-4">
            <span className="bg-yellow-100 rounded-full px-3 py-1 text-xs font-semibold text-yellow-800 mr-2">SUPER SAVER</span>
            <label className="inline-flex relative items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-yellow-500 transition-all"></div>
              <span className="ml-2 text-sm text-gray-600"> </span>
            </label>
          </div>
          {/* Location Selector */}
          <div 
            className="ml-6 flex items-center cursor-pointer hover:text-yellow-600 transition-colors"
            onClick={toggleLocationModal}
          >
            <MapPin size={16} className="text-gray-500 mr-1" />
            <span className="text-sm font-medium text-gray-700 mr-1">{selectedLocation}</span>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 flex justify-center mx-8">
            <div className="relative w-full max-w-lg">
              <input
                type="text"
                placeholder='Search for "chocolate box"'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2.5 px-4 pr-10 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent shadow-sm text-lg"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-600 transition-colors"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
          {/* Cart/Login/Profile */}
          <div className="flex items-center space-x-6">
            <Link to="/cart" className="relative p-2 group">
              <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-yellow-600 transition-colors" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full transform transition-transform group-hover:scale-110">
                  {getItemCount()}
                </span>
              )}
            </Link>
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Link to="/profile" className="p-2 group flex items-center">
                  <User className="h-6 w-6 text-gray-700 group-hover:text-yellow-600 transition-colors" />
                  <span className="hidden md:inline text-sm font-medium text-gray-700 group-hover:text-yellow-600 ml-1">{user?.email || 'Profile'}</span>
                </Link>
                <button
                  onClick={async () => {
                    await logout();
                    navigate('/'); // Redirect to home or login after logout
                  }}
                  className="p-2 text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors hidden md:block"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="p-2 group flex items-center"
              >
                <User className="h-6 w-6 text-gray-700 group-hover:text-yellow-600 transition-colors" />
                <span className="hidden md:inline text-sm font-medium text-gray-700 group-hover:text-yellow-600 ml-1">Sign In</span>
              </Link>
            )}
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-yellow-50 transition-colors" 
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
        {/* Horizontal Category Bar */}
        <div className="w-full overflow-x-auto mt-2 pb-2">
          <div className="flex space-x-6 min-w-max">
            <Link to="/products" className="flex flex-col items-center text-xs font-semibold text-gray-700 hover:text-yellow-600 px-2">
              <span className="text-lg">🛒</span>
              <span>All</span>
            </Link>
            {categories.map(category => (
              <Link key={category.id} to={`/products?category=${category.id}`} className="flex flex-col items-center text-xs font-semibold text-gray-700 hover:text-yellow-600 px-2">
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2.5 px-4 pr-10 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm"
                />
                <button 
                  type="submit" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-600 transition-colors"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>
            
            <nav className="space-y-2">
              <Link 
                to="/" 
                className="flex items-center py-3 px-4 font-medium text-gray-700 hover:bg-yellow-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="h-5 w-5 mr-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </Link>
              <button 
                onClick={() => setShowCategories(!showCategories)}
                className="flex justify-between items-center w-full py-3 px-4 font-medium text-gray-700 hover:bg-yellow-50 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  Categories
                </div>
                <span className="text-gray-400">{showCategories ? '−' : '+'}</span>
              </button>
              
              {showCategories && (
                <div className="pl-4 space-y-1 animate-slide-up">
                  {categories.map(category => (
                    <Link 
                      key={category.id}
                      to={`/products?category=${category.id}`}
                      className="flex items-center py-2.5 px-4 text-gray-600 hover:bg-yellow-50 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="mr-3 text-yellow-600">{category.icon}</span>
                      <span>{category.name}</span>
                    </Link>
                  ))}
                </div>
              )}
              
              <Link 
                to="/products" 
                className="flex items-center py-3 px-4 font-medium text-gray-700 hover:bg-yellow-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="h-5 w-5 mr-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                All Products
              </Link>
              
              {isLoggedIn ? (
                <button 
                  onClick={async () => {
                    await logout();
                    setIsMenuOpen(false);
                    navigate('/');
                  }}
                  className="flex items-center justify-center py-3 px-4 font-medium text-gray-800 bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors shadow-sm"
                >
                  Sign Out
                </button>
              ) : (
                <Link 
                  to="/login" 
                  className="flex items-center justify-center py-3 px-4 font-medium text-gray-800 bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors shadow-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* Location Selection Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={toggleLocationModal}>
          <div 
            className="bg-white rounded-lg p-6 w-80 max-w-md shadow-xl transform transition-all sm:my-8 sm:w-full sm:max-w-sm" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Select Your Location</h3>
              <button onClick={toggleLocationModal} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <ul className="space-y-3">
              {predefinedLocations.map(location => (
                <li key={location}>
                  <button 
                    onClick={() => handleLocationSelect(location)}
                    className="w-full text-left text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 px-3 py-2 rounded-md transition-colors"
                  >
                    {location}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;