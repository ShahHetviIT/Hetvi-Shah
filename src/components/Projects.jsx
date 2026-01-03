import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiExternalLink, FiGithub, FiX } from 'react-icons/fi';

const Projects = ({ projects }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [selectedProject, setSelectedProject] = useState(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    return (
        <section id="projects" className="py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                >
                    <h2 className="section-title text-center gradient-text">Featured Projects</h2>
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                        Real-world AI solutions and full-stack applications
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects?.map((project) => (
                            <motion.div
                                key={project._id}
                                variants={itemVariants}
                                className="card p-6 cursor-pointer group"
                                onClick={() => setSelectedProject(project)}
                                whileHover={{ y: -10 }}
                            >
                                {project.featured && (
                                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm rounded-full mb-4">
                                        Featured
                                    </span>
                                )}

                                <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200 group-hover:gradient-text transition-all">
                                    {project.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies?.slice(0, 3).map((tech, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm rounded-full text-gray-700 dark:text-gray-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies?.length > 3 && (
                                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm rounded-full text-gray-700 dark:text-gray-300">
                                            +{project.technologies.length - 3} more
                                        </span>
                                    )}
                                </div>

                                <div className="flex gap-3">
                                    {project.projectUrl && (
                                        <a
                                            href={project.projectUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary-500 hover:text-primary-600 transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <FiExternalLink className="w-5 h-5" />
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary-500 hover:text-primary-600 transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <FiGithub className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

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
                            className="card max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <FiX className="w-6 h-6" />
                            </button>

                            <h2 className="text-3xl font-bold mb-4 gradient-text">
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

                            <p className="text-gray-600 dark:text-gray-400 mb-6 whitespace-pre-line">
                                {selectedProject.detailDescription || selectedProject.description}
                            </p>

                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                                    Technologies
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.technologies?.map((tech, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 text-sm rounded-full"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {selectedProject.features && selectedProject.features.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                                        Key Features
                                    </h3>
                                    <ul className="space-y-2">
                                        {selectedProject.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                                                <span className="text-primary-500 mt-1">▪</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="flex gap-4">
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
        </section>
    );
};

export default Projects;
