import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            className="fixed top-6 right-6 z-50 p-3 rounded-full glass-effect hover:scale-110 transition-transform"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <FiMoon className="w-6 h-6 text-gray-900 dark:text-gray-100" />
            ) : (
                <FiSun className="w-6 h-6 text-gray-900 dark:text-gray-100" />
            )}
        </motion.button>
    );
};

export default ThemeToggle;
