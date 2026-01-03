import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi';

const Hero = ({ profile }) => {
    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-accent-500/10 to-primary-600/10 animate-gradient" />

            {/* Floating shapes */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h1
                            className="text-6xl md:text-8xl font-bold font-display mb-6"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Hi, I'm <span className="gradient-text">{profile?.name || 'Hetvi'}</span>
                        </motion.h1>

                        <motion.h2
                            className="text-3xl md:text-4xl font-semibold mb-8 text-gray-700 dark:text-gray-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            {profile?.title || 'GenAI Engineer'}
                        </motion.h2>

                        <motion.p
                            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            {profile?.bio || 'Building end-to-end AI solutions with expertise in RAG chatbots, multilingual voice agents, and LLM-powered applications.'}
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-4 justify-center mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <button onClick={() => scrollToSection('projects')} className="btn-primary">
                                View Projects
                            </button>
                            <button onClick={() => scrollToSection('contact')} className="btn-secondary">
                                Contact Me
                            </button>
                        </motion.div>

                        <motion.div
                            className="flex gap-6 justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1 }}
                        >
                            {profile?.socialLinks?.github && (
                                <a
                                    href={profile.socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full glass-effect hover:scale-110 transition-transform"
                                >
                                    <FiGithub className="w-6 h-6" />
                                </a>
                            )}
                            {profile?.socialLinks?.linkedin && (
                                <a
                                    href={profile.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full glass-effect hover:scale-110 transition-transform"
                                >
                                    <FiLinkedin className="w-6 h-6" />
                                </a>
                            )}
                            {profile?.email && (
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="p-3 rounded-full glass-effect hover:scale-110 transition-transform"
                                >
                                    <FiMail className="w-6 h-6" />
                                </a>
                            )}
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <FiArrowDown className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
