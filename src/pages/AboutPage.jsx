import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiCode, FiZap, FiHeart, FiTarget, FiTrendingUp } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { profileAPI } from '../services/api';

const AboutPage = () => {
    const [profile, setProfile] = useState(null);
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
        fetchProfile();
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

    const highlights = [
        {
            icon: FiCode,
            title: 'AI/ML Expertise',
            description: 'Building end-to-end AI solutions with LangChain, LangGraph, and modern LLM frameworks',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: FiZap,
            title: 'Full-Stack Development',
            description: 'Proficient in React, Spring Boot, Node.js, and modern web technologies',
            color: 'from-purple-500 to-pink-500'
        },
        {
            icon: FiAward,
            title: 'Production Experience',
            description: 'Delivered real-world projects across Healthcare, BFSI, Insurance, and Retail',
            color: 'from-orange-500 to-red-500'
        },
        {
            icon: FiHeart,
            title: 'Fast Learner',
            description: 'Quick to adapt to new technologies with strong problem-solving skills',
            color: 'from-green-500 to-emerald-500'
        },
        {
            icon: FiTarget,
            title: 'Goal-Oriented',
            description: 'Focused on delivering high-quality, production-ready solutions',
            color: 'from-indigo-500 to-purple-500'
        },
        {
            icon: FiTrendingUp,
            title: 'Continuous Growth',
            description: 'Always learning and staying updated with latest tech trends',
            color: 'from-pink-500 to-rose-500'
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
            <SEO
                title="About Hetvi Shah | GenAI Engineer"
                description="Learn about Hetvi Shah's professional journey, expertise in GenAI, AI/ML, and full-stack development. Experienced in building production-ready AI solutions across Healthcare, BFSI, Insurance, and Retail."
                keywords="About Hetvi Shah, GenAI Engineer Biography, AI Engineer Experience, Machine Learning Expert, Full-Stack Developer Portfolio"
                url="/about"
            />
            <Navbar />

            <main className="flex-1 pt-24 pb-16 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-6">
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h1 className="section-title gradient-text mb-4">About Me</h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Passionate about building innovative AI solutions and creating impactful applications
                        </p>
                    </motion.div>

                    {/* Profile Section */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-20">
                        {/* Image */}
                        <motion.div
                            ref={ref}
                            initial={{ opacity: 0, x: -30 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                                <div className="relative bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-2xl">
                                    <img
                                        src="/images/profile.jpg"
                                        alt="Hetvi Shah"
                                        className="w-full h-auto rounded-xl object-cover"
                                    />
                                </div>
                                <motion.div
                                    className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-full p-4 shadow-xl"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <div className="text-4xl">✨</div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                                {profile?.title || 'GenAI Engineer'}
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                {profile?.bio || 'GenAI Engineer with hands-on experience in building end-to-end AI solutions, including RAG-based chatbots, multilingual voice agents, and automated agent workflows.'}
                            </p>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="text-center p-4 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-lg">
                                    <div className="text-3xl font-bold gradient-text">6+</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Projects</div>
                                </div>
                                <div className="text-center p-4 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-lg">
                                    <div className="text-3xl font-bold gradient-text">35+</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Skills</div>
                                </div>
                                <div className="text-center p-4 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-lg">
                                    <div className="text-3xl font-bold gradient-text">100%</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Dedication</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Highlights Grid */}
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
                            What I Bring to the Table
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {highlights.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="card-hover p-6 group"
                                >
                                    <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                        <item.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {item.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer profile={profile} />
        </div>
    );
};

export default AboutPage;
