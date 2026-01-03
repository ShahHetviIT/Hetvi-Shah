import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiUser, FiCode, FiBriefcase, FiMail, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    const navItems = [
        { path: '/', label: 'Home', icon: FiHome },
        { path: '/about', label: 'About', icon: FiUser },
        { path: '/skills', label: 'Skills', icon: FiCode },
        { path: '/projects', label: 'Projects', icon: FiBriefcase },
        { path: '/contact', label: 'Contact', icon: FiMail },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800 shadow-lg dark:shadow-primary-500/5">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <motion.div
                            className="w-10 h-10 flex items-center justify-center"
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img src="/favicon.png" alt="Logo" className="w-full h-full object-cover rounded-lg" />
                        </motion.div>
                        <span className="text-xl font-bold gradient-text hidden sm:block">
                            Hetvi Shah
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 relative ${isActive(item.path)
                                    ? 'text-primary-400'
                                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-slate-800'
                                    }`}
                            >
                                <item.icon className="w-4 h-4" />
                                <span>{item.label}</span>
                                {isActive(item.path) && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500"></span>
                                )}
                            </Link>
                        ))}


                        {/* Theme Toggle */}
                        <motion.button
                            onClick={toggleTheme}
                            className="ml-4 p-2.5 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-300 border border-gray-200 dark:border-slate-700"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? (
                                <FiMoon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            ) : (
                                <FiSun className="w-5 h-5 text-yellow-500" />
                            )}
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-2">
                        <motion.button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-300 border border-gray-200 dark:border-slate-700"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {theme === 'light' ? (
                                <FiMoon className="w-5 h-5 text-gray-700" />
                            ) : (
                                <FiSun className="w-5 h-5 text-yellow-500" />
                            )}
                        </motion.button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden py-4 space-y-2"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 relative ${isActive(item.path)
                                    ? 'text-primary-400 bg-primary-500/10'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                                {isActive(item.path) && (
                                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-accent-500 rounded-r"></span>
                                )}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
