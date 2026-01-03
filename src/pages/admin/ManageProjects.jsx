import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsAPI } from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiArrowLeft, FiX } from 'react-icons/fi';
import ThemeToggle from '../../components/ThemeToggle';

const CATEGORIES = ['AI/ML', 'Full Stack', 'Backend', 'Frontend', 'Automation', 'Other'];

const ManageProjects = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        technologies: '',
        features: '',
        category: 'AI/ML',
        featured: false,
        order: 0
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await projectsAPI.getAll();
            setProjects(response.data.data || []);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const projectData = {
                ...formData,
                technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
                features: formData.features.split('\n').map(f => f.trim()).filter(Boolean)
            };

            if (editingProject) {
                await projectsAPI.update(editingProject._id, projectData);
            } else {
                await projectsAPI.create(projectData);
            }
            fetchProjects();
            closeModal();
        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await projectsAPI.delete(id);
                fetchProjects();
            } catch (error) {
                console.error('Error deleting project:', error);
            }
        }
    };

    const openModal = (project = null) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                title: project.title,
                description: project.description,
                technologies: project.technologies?.join(', ') || '',
                features: project.features?.join('\n') || '',
                category: project.category || 'AI/ML',
                featured: project.featured || false,
                order: project.order || 0
            });
        } else {
            setEditingProject(null);
            setFormData({
                title: '',
                description: '',
                technologies: '',
                features: '',
                category: 'AI/ML',
                featured: false,
                order: 0
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingProject(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <ThemeToggle />

            <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/admin/dashboard')} className="btn-secondary flex items-center gap-2">
                            <FiArrowLeft /> Back
                        </button>
                        <h1 className="text-2xl font-bold gradient-text">Manage Projects</h1>
                    </div>
                    <button onClick={() => openModal()} className="btn-primary flex items-center gap-2">
                        <FiPlus /> Add Project
                    </button>
                </div>
            </header>

            <div className="container mx-auto px-6 py-12">
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <motion.div
                                key={project._id}
                                className="card p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {project.featured && (
                                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm rounded-full mb-3">
                                        Featured
                                    </span>
                                )}
                                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">{project.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies?.slice(0, 3).map((tech, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => openModal(project)} className="flex-1 btn-secondary text-sm py-2">
                                        <FiEdit2 className="inline mr-1" /> Edit
                                    </button>
                                    <button onClick={() => handleDelete(project._id)} className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded hover:bg-red-200 dark:hover:bg-red-900/50">
                                        <FiTrash2 />
                                    </button>
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
                            className="card max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold gradient-text">
                                    {editingProject ? 'Edit Project' : 'Add Project'}
                                </h2>
                                <button onClick={closeModal} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                    <FiX className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Project Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows="4"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Technologies (comma-separated)</label>
                                    <input
                                        type="text"
                                        value={formData.technologies}
                                        onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                        placeholder="React, Node.js, MongoDB"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Key Features (one per line)</label>
                                    <textarea
                                        value={formData.features}
                                        onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                        rows="4"
                                        placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
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
                                        <label className="block text-sm font-medium mb-2">Order</label>
                                        <input
                                            type="number"
                                            value={formData.order}
                                            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={formData.featured}
                                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                        className="w-4 h-4"
                                    />
                                    <label htmlFor="featured" className="text-sm font-medium">Featured Project</label>
                                </div>

                                <button type="submit" className="w-full btn-primary">
                                    {editingProject ? 'Update Project' : 'Add Project'}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageProjects;
