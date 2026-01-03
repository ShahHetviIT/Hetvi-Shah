import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { skillsAPI } from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiArrowLeft, FiX } from 'react-icons/fi';
import ThemeToggle from '../../components/ThemeToggle';

const CATEGORIES = [
    'AI/ML Tools & Frameworks',
    'Programming Languages',
    'Frontend Technologies',
    'Backend Technologies',
    'Databases',
    'Tools/IDEs/Technologies'
];

const ManageSkills = () => {
    const navigate = useNavigate();
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category: CATEGORIES[0],
        proficiency: 80,
        order: 0
    });

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const response = await skillsAPI.getAll();
            setSkills(response.data.data || []);
        } catch (error) {
            console.error('Error fetching skills:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingSkill) {
                await skillsAPI.update(editingSkill._id, formData);
            } else {
                await skillsAPI.create(formData);
            }
            fetchSkills();
            closeModal();
        } catch (error) {
            console.error('Error saving skill:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this skill?')) {
            try {
                await skillsAPI.delete(id);
                fetchSkills();
            } catch (error) {
                console.error('Error deleting skill:', error);
            }
        }
    };

    const openModal = (skill = null) => {
        if (skill) {
            setEditingSkill(skill);
            setFormData({
                name: skill.name,
                category: skill.category,
                proficiency: skill.proficiency || 80,
                order: skill.order || 0
            });
        } else {
            setEditingSkill(null);
            setFormData({
                name: '',
                category: CATEGORIES[0],
                proficiency: 80,
                order: 0
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingSkill(null);
    };

    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <ThemeToggle />

            <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/admin/dashboard')} className="btn-secondary flex items-center gap-2">
                            <FiArrowLeft /> Back
                        </button>
                        <h1 className="text-2xl font-bold gradient-text">Manage Skills</h1>
                    </div>
                    <button onClick={() => openModal()} className="btn-primary flex items-center gap-2">
                        <FiPlus /> Add Skill
                    </button>
                </div>
            </header>

            <div className="container mx-auto px-6 py-12">
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <div className="space-y-8">
                        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                            <motion.div
                                key={category}
                                className="card p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">{category}</h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {categorySkills.map((skill) => (
                                        <div key={skill._id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex justify-between items-center">
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-800 dark:text-gray-200">{skill.name}</h3>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">Proficiency: {skill.proficiency}%</div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => openModal(skill)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                                                    <FiEdit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(skill._id)} className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600">
                                                    <FiTrash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                    >
                        <motion.div
                            className="card max-w-lg w-full p-8"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold gradient-text">
                                    {editingSkill ? 'Edit Skill' : 'Add Skill'}
                                </h2>
                                <button onClick={closeModal} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                    <FiX className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Skill Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
                                    >
                                        {CATEGORIES.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Proficiency ({formData.proficiency}%)</label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="100"
                                        value={formData.proficiency}
                                        onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Order</label>
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
                                    />
                                </div>

                                <button type="submit" className="w-full btn-primary">
                                    {editingSkill ? 'Update Skill' : 'Add Skill'}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageSkills;
