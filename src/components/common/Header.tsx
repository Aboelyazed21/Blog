// (كل الـ imports زي ما كانت عندك بالضبط)
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, PenTool, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-menu-container')) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileMenuOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <PenTool className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Blog
            </span>
          </Link>

          {/* ✅ Desktop Navigation (بعد التعديل: مخفية على الموبايل) */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">Home</Link>
            <Link to="/blog" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">Blog</Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">About</Link>
            <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">Contact</Link>
            <a href="https://typeusi.github.io/my-portfolio/" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">My Pro</a>
            <a href="https://aboelyazed21.github.io/Code-Force/" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">💻 Codeforces</a>
            <a href="https://aboelyazed21.github.io/Gallary/" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">🖼️ Gallery</a>
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {user ? (
              <div className="relative profile-menu-container">
                <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full px-3 py-2 transition-all duration-300 transform hover:scale-105">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.name}</span>
                  {user.role === 'admin' && (
                    <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs px-2 py-1 rounded-full animate-pulse">Admin</span>
                  )}
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <Link to="/profile" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"><User className="h-4 w-4 mr-2" />Profile</Link>
                    <Link to="/create-post" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"><PenTool className="h-4 w-4 mr-2" />Write Post</Link>
                    {user.role === 'admin' && (
                      <Link to="/admin" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"><Settings className="h-4 w-4 mr-2" />Admin Panel</Link>
                    )}
                    <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"><LogOut className="h-4 w-4 mr-2" />Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Login</Link>
                <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-2">
            <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
              {isMenuOpen ? <X className="h-6 w-6 text-gray-700 dark:text-gray-300" /> : <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />}
            </button>
          </div>
        </div>

        {/* ✅ Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 px-4">
            <nav className="flex flex-col space-y-2 text-sm">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
              <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Blog</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">About</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Contact</Link>
              <a href="https://typeusi.github.io/my-portfolio/" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">My Pro</a>
              <a href="https://aboelyazed21.github.io/Code-Force/" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">💻 Codeforces</a>
              <a href="https://aboelyazed21.github.io/Gallary/" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">🖼️ Gallery</a>

              {user && (
                <>
                  <hr className="border-gray-200 dark:border-gray-700 my-2" />
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Profile</Link>
                  <Link to="/create-post" onClick={() => setIsMenuOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Write Post</Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">🔧 Admin Panel</Link>
                  )}
                  <button onClick={handleLogout} className="text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Logout</button>
                </>
              )}

              {!user && (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Login</Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-center hover:from-blue-700 hover:to-purple-700">Sign Up</Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
