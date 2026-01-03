import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { FiUser, FiCode, FiBriefcase, FiLogOut, FiHome } from 'react-icons/fi';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const menuItems = [
        { icon: FiUser, title: 'Profile', description: 'Manage personal information', path: '/admin/profile' },
        { icon: FiCode, title: 'Skills', description: 'Add and edit technical skills', path: '/admin/skills' },
        { icon: FiBriefcase, title: 'Projects', description: 'Manage project portfolio', path: '/admin/projects' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
            {/* Header */}
            <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-gray-200 dark:border-slate-800">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold gradient-text">Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600 dark:text-gray-400">
                            Welcome, {user?.username}
                        </span>
                        <Link to="/" className="btn-secondary flex items-center gap-2">
                            <FiHome /> View Site
                        </Link>
                        <button onClick={handleLogout} className="btn-primary flex items-center gap-2">
                            <FiLogOut /> Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
                        Content Management
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {menuItems.map((item, index) => (
                            <motion.div
                                key={item.path}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link to={item.path}>
                                    <div className="card-hover p-6 cursor-pointer group">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="p-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg">
                                                <item.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 group-hover:gradient-text transition-all">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {item.description}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default Dashboard;
