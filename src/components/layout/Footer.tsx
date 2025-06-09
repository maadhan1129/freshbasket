import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, PhoneCall, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-600">Fresh Basket</h3>
            <p className="text-gray-600 mb-4">
              Your one-stop solution for fresh groceries delivered right to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-yellow-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-yellow-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-yellow-600 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-600">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-600">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=fruits" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Fruits
                </Link>
              </li>
              <li>
                <Link to="/products?category=vegetables" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Vegetables
                </Link>
              </li>
              <li>
                <Link to="/products?category=dairy" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Dairy Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=snacks" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Snacks
                </Link>
              </li>
              <li>
                <Link to="/products?category=beverages" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Beverages
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-600">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                <span className="text-gray-600">
                  123 Grocery Lane, Fresh City, FC 12345
                </span>
              </li>
              <li className="flex items-center">
                <PhoneCall className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="text-gray-600">support@freshbasket.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="font-semibold mb-2 text-gray-800">Subscribe to Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-200 flex-grow"
                />
                <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 px-4 py-2 rounded-r-md transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Fresh Basket. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-600 hover:text-yellow-600 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-yellow-600 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/shipping" className="text-gray-600 hover:text-yellow-600 text-sm transition-colors">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;