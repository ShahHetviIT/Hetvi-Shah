import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiX, FiFilter } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { projectsAPI, profileAPI } from '../services/api';

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [profile, setProfile] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [projectsRes, profileRes] = await Promise.all([
                projectsAPI.getAll(),
                profileAPI.get()
            ]);
            setProjects(projectsRes.data.data || []);
            setProfile(profileRes.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const categories = ['All', ...new Set(projects.map(p => p.category))];
    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
            <SEO
                title="Projects Portfolio | Hetvi Shah"
                description="Explore Hetvi Shah's portfolio of GenAI and full-stack development projects including RAG chatbots, voice agents, and intelligent applications across Healthcare, BFSI, Insurance, and Retail industries."
                keywords="GenAI Projects, AI Projects Portfolio, RAG Chatbot, Voice Agents, Full-Stack Projects, AI Applications"
                url="/projects"
            />
            <Navbar />

            <main className="flex-1 pt-24 pb-16 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="section-title gradient-text mb-4">Featured Projects</h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Real-world AI solutions and full-stack applications across multiple domains
                        </p>
                    </motion.div>

                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-3 mb-12"
                    >
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <FiFilter className="w-5 h-5" />
                            <span className="font-medium">Filter:</span>
                        </div>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${filter === category
                                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>

                    {/* Projects Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="card-hover p-6 cursor-pointer group"
                                onClick={() => setSelectedProject(project)}
                            >
                                {/* Featured Badge */}
                                {project.featured && (
                                    <div className="mb-4">
                                        <span className="badge">⭐ Featured</span>
                                    </div>
                                )}

                                {/* Title */}
                                <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200 group-hover:gradient-text transition-all">
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                    {project.description}
                                </p>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies?.slice(0, 4).map((tech, idx) => (
                                        <span key={idx} className="skill-tag text-xs">
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies?.length > 4 && (
                                        <span className="skill-tag text-xs">
                                            +{project.technologies.length - 4}
                                        </span>
                                    )}
                                </div>

                                {/* Links */}
                                <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    {project.projectUrl && (
                                        <a
                                            href={project.projectUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary-500 hover:text-primary-600 transition-colors flex items-center gap-1"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <FiExternalLink className="w-4 h-4" />
                                            <span className="text-sm">Live Demo</span>
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary-500 hover:text-primary-600 transition-colors flex items-center gap-1"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <FiGithub className="w-4 h-4" />
                                            <span className="text-sm">Code</span>
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredProjects.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-xl text-gray-600 dark:text-gray-400">
                                No projects found in this category
                            </p>
                        </div>
                    )}
                </div>
            </main>

            {/* Project Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            className="card max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <FiX className="w-6 h-6" />
                            </button>

                            {/* Content */}
                            <div className="mb-4">
                                {selectedProject.featured && (
                                    <span className="badge mb-4 inline-block">⭐ Featured Project</span>
                                )}
                                <h2 className="text-4xl font-bold gradient-text mb-4">
                                    {selectedProject.title}
                                </h2>

                                {/* Project Metadata */}
                                <div className="flex flex-wrap gap-3 mb-6">
                                    {selectedProject.industry && (
                                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-800">
                                            🏭 {selectedProject.industry}
                                        </span>
                                    )}
                                    {selectedProject.subCategory && (
                                        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg text-sm font-medium border border-purple-200 dark:border-purple-800">
                                            🔖 {selectedProject.subCategory}
                                        </span>
                                    )}
                                    {selectedProject.agentType && (
                                        <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${selectedProject.agentType === 'Inbound'
                                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800'
                                            : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800'
                                            }`}>
                                            {selectedProject.agentType === 'Inbound' ? '📞 Inbound' : '📢 Outbound'}
                                        </span>
                                    )}
                                </div>
                                <p className="text-lg text-gray-600 dark:text-gray-400 whitespace-pre-line">
                                    {selectedProject.detailDescription || selectedProject.description}
                                </p>
                            </div>

                            {/* Technologies */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                                    Technologies Used
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.technologies?.map((tech, idx) => (
                                        <span key={idx} className="skill-tag">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Features */}
                            {selectedProject.features && selectedProject.features.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                                        Key Features
                                    </h3>
                                    <ul className="space-y-2">
                                        {selectedProject.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                                                <span className="text-primary-500 mt-1">▪</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Links */}
                            <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                                {selectedProject.projectUrl && (
                                    <a
                                        href={selectedProject.projectUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary flex items-center gap-2"
                                    >
                                        <FiExternalLink /> View Project
                                    </a>
                                )}
                                {selectedProject.githubUrl && (
                                    <a
                                        href={selectedProject.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-secondary flex items-center gap-2"
                                    >
                                        <FiGithub /> View Code
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer profile={profile} />
        </div>
    );
};

export default ProjectsPage;
