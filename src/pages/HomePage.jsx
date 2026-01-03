import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload, FiCode, FiZap, FiCpu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import About from '../components/About';
import Projects from '../components/Projects';
import { profileAPI, projectsAPI } from '../services/api';

const HomePage = () => {
    const [profile, setProfile] = useState(null);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProfile();
        fetchProjects();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await profileAPI.get();
            if (response.data.success) {
                setProfile(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const fetchProjects = async () => {
        try {
            const response = await projectsAPI.getAll({ featured: true });
            if (response.data.success) {
                const allProjects = response.data.data;
                const targetTitles = [
                    'WISHAI - RAG Chatbot',
                    'Automated Challenge Platform',
                    'Insurance Claim Agent'
                ];

                // Filter and sort based on the target titles order
                const featuredProjects = allProjects
                    .filter(p => targetTitles.includes(p.title))
                    .sort((a, b) => {
                        return targetTitles.indexOf(a.title) - targetTitles.indexOf(b.title);
                    });

                setProjects(featuredProjects);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
            <Navbar />

            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32 pb-16 light-pattern dark:dark-pattern">
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary-400/10 rounded-full blur-2xl animate-pulse-slow" />
                </div>

                {/* Floating Icons */}
                <motion.div
                    className="absolute top-32 right-20 text-primary-500/20 hidden lg:block"
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                >
                    <FiCode className="w-16 h-16" />
                </motion.div>
                <motion.div
                    className="absolute bottom-32 left-20 text-accent-500/20 hidden lg:block"
                    animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                >
                    <FiCpu className="w-20 h-20" />
                </motion.div>
                <motion.div
                    className="absolute top-1/2 right-32 text-primary-400/20 hidden lg:block"
                    animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                >
                    <FiZap className="w-12 h-12" />
                </motion.div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Greeting Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="inline-block mb-8 animate-fade-in-down"
                            >
                                <span className="px-6 py-2 bg-primary-500/10 dark:bg-primary-500/20 border border-primary-500/30 rounded-full text-sm font-medium text-primary-600 dark:text-primary-400 backdrop-blur-sm">
                                    👋 Welcome to my portfolio
                                </span>
                            </motion.div>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12">
                                {/* Profile Image - Left Side */}
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="relative flex-shrink-0"
                                >
                                    <div className="w-48 h-48 md:w-64 md:h-64 relative z-10 flex justify-center items-center">
                                        <img
                                            src="/images/bitmoji-hi.png"
                                            alt="Profile"
                                            className="w-full h-full object-contain filter drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-accent-500/20 blur-3xl -z-10 transform scale-90 rounded-full opacity-60" />
                                    </div>
                                </motion.div>

                                {/* Text Content - Right Side */}
                                <div className="text-center md:text-left">
                                    {/* Main Heading */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        className="mb-4"
                                    >
                                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display mb-2 text-gray-900 dark:text-white leading-tight">
                                            Hi, I'm <br className="hidden md:block" />
                                            <span className="gradient-text">{profile?.name || 'Hetvi Shah'}</span>
                                        </h1>
                                    </motion.div>

                                    {/* Title with Typing Effect */}
                                    <motion.h2
                                        className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-gray-700 dark:text-gray-300"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.8, delay: 0.4 }}
                                    >
                                        <span className="text-primary-500 dark:text-primary-400">
                                            {profile?.title || 'GenAI Engineer'}
                                        </span>
                                    </motion.h2>

                                    {/* Description */}
                                    <motion.p
                                        className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.8, delay: 0.6 }}
                                    >
                                        Building intelligent <span className="text-primary-500 dark:text-primary-400 font-semibold">RAG chatbots</span>,{' '}
                                        <span className="text-primary-500 dark:text-primary-400 font-semibold">voice agents</span>, and{' '}
                                        <span className="text-primary-500 dark:text-primary-400 font-semibold">LLM apps</span> that solve real problems.
                                    </motion.p>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <motion.div
                                className="flex flex-wrap gap-4 justify-center mb-16"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                            >
                                <Link to="/projects" className="btn-primary flex items-center space-x-2">
                                    <span>View My Work</span>
                                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link to="/contact" className="btn-secondary flex items-center space-x-2">
                                    <span>Get in Touch</span>
                                </Link>
                                {profile?.resumeUrl && (
                                    <a
                                        href={profile.resumeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-secondary flex items-center space-x-2"
                                    >
                                        <FiDownload />
                                        <span>Resume</span>
                                    </a>
                                )}
                            </motion.div>

                            {/* Stats Cards */}
                            <motion.div
                                className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 1 }}
                            >
                                {[
                                    { number: '6+', label: 'Projects', delay: 0 },
                                    { number: '35+', label: 'Skills', delay: 0.1 },
                                    { number: '100%', label: 'Dedication', delay: 0.2 }
                                ].map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        className="card-hover p-4 sm:p-6 text-center group"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1 + stat.delay }}
                                    >
                                        <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform">
                                            {stat.number}
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                {/* <motion.div
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400">
                        <span className="text-sm">Scroll to explore</span>
                        <div className="w-6 h-10 border-2 border-primary-500/50 rounded-full flex justify-center p-1">
                            <motion.div
                                className="w-1.5 h-3 bg-primary-500 rounded-full"
                                animate={{ y: [0, 12, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        </div>
                    </div>
                </motion.div> */}
            </section>

            {/* Expertise Section */}
            <section className="py-20 relative">
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 font-display">
                            <span className="gradient-text">What I Bring to the Table</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                            Merging cutting-edge AI research with robust software engineering to deliver scalable, intelligent solutions.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <FiZap className="w-8 h-8" />,
                                title: "Generative AI",
                                desc: "Architecting RAG systems & fine-tuning LLMs for domain-specific accuracy."
                            },
                            {
                                icon: <FiCpu className="w-8 h-8" />,
                                title: "Voice AI Agents",
                                desc: "Building low-latency, multilingual voice assistants using ElevenLabs & Twilio."
                            },
                            {
                                icon: <FiCode className="w-8 h-8" />,
                                title: "Full-Stack Eng.",
                                desc: "Developing secure, scalable web apps with React, Node.js, and Spring Boot."
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                whileHover={{ y: -10 }}
                                className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-2xl hover:shadow-primary-500/10 transition-all group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center text-primary-500 group-hover:scale-110 transition-transform mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Projects Section */}
            {projects.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-800/50">
                    <Projects projects={projects} />
                </div>
            )}

            <Footer profile={profile} />
        </div>
    );
};

export default HomePage;
