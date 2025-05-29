import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Users, BarChart3, Settings, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { name: 'ホーム', path: '/', icon: <Users size={20} /> },
    { name: '投票', path: '/vote', icon: <Award size={20} /> },
    { name: 'ランキング', path: '/leaderboard', icon: <BarChart3 size={20} /> },
    { name: '管理', path: '/admin', icon: <Settings size={20} /> },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <Award className="text-primary-600 mr-2" size={28} />
              <span className="text-xl font-bold text-gray-900">従業員評価アプリ</span>
            </motion.div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`flex items-center px-2 py-1 rounded-md transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-primary-600 font-semibold'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center"
                >
                  <span className="mr-1">{item.icon}</span>
                  <span>{item.name}</span>
                </motion.div>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 ${
                  location.pathname === item.path
                    ? 'bg-primary-50 text-primary-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;