import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiCode, FiZap, FiHeart } from 'react-icons/fi';

const About = ({ profile }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const highlights = [
        {
            icon: FiCode,
            title: 'AI/ML Expertise',
            description: 'Building end-to-end AI solutions with LangChain, LangGraph, and modern LLM frameworks'
        },
        {
            icon: FiZap,
            title: 'Full-Stack Development',
            description: 'Proficient in React, Spring Boot, Node.js, and modern web technologies'
        },
        {
            icon: FiAward,
            title: 'Production Experience',
            description: 'Delivered real-world projects across Healthcare, BFSI, Insurance, and Retail'
        },
        {
            icon: FiHeart,
            title: 'Fast Learner',
            description: 'Quick to adapt to new technologies and frameworks with strong problem-solving skills'
        }
    ];

    return (
        <section id="about" className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-title text-center gradient-text mb-12">About Me</h2>

                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        {/* Profile Image Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative group">
                                {/* Decorative background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>

                                {/* Image container */}
                                <div className="relative bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-2xl">
                                    {profile?.profileImage ? (
                                        <img
                                            src={profile.profileImage}
                                            alt={profile.name || 'Profile'}
                                            className="w-full h-auto rounded-xl object-cover"
                                        />
                                    ) : (
                                        <div className="w-full aspect-square bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl flex items-center justify-center">
                                            <div className="text-center p-8">
                                                <div className="text-8xl mb-4">👩‍💻</div>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    Add your photo in admin panel
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Floating badge */}
                                <motion.div
                                    className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-full p-4 shadow-xl"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <div className="text-4xl">✨</div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Content Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                                {profile?.title || 'GenAI Engineer'}
                            </h3>

                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                {profile?.bio || 'GenAI Engineer with hands-on experience in building end-to-end AI solutions, including RAG-based chatbots, multilingual voice agents, and automated agent workflows.'}
                            </p>

                            {/* Highlights Grid */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                {highlights.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-shadow"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                    >
                                        <item.icon className="w-8 h-8 text-primary-500 mb-2" />
                                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {item.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Stats */}
                            <div className="mt-8 flex gap-8">
                                <div>
                                    <div className="text-3xl font-bold gradient-text">6+</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold gradient-text">35+</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Skills</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold gradient-text">100%</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Dedication</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
