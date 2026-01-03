import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { skillsAPI, profileAPI } from '../services/api';

const SkillsPage = () => {
    const [skills, setSkills] = useState([]);
    const [profile, setProfile] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [skillsRes, profileRes] = await Promise.all([
                skillsAPI.getAll(),
                profileAPI.get()
            ]);
            setSkills(skillsRes.data.data || []);
            setProfile(profileRes.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const categories = ['All', ...new Set(skills.map(skill => skill.category))];

    const filteredSkills = selectedCategory === 'All'
        ? skills
        : skills.filter(skill => skill.category === selectedCategory);

    const groupedSkills = filteredSkills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {});

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
            <Navbar />

            <main className="flex-1 pt-24 pb-16 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="section-title gradient-text mb-4">Technical Skills</h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Expertise across AI/ML frameworks, full-stack development, and modern technologies
                        </p>
                    </motion.div>

                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-3 mb-12"
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                                    : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>

                    {/* Skills Grid */}
                    <div ref={ref} className="space-y-12 max-w-6xl mx-auto">
                        {Object.entries(groupedSkills).map(([category, categorySkills], catIndex) => (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: catIndex * 0.1 }}
                            >
                                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
                                    <span className="w-2 h-8 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full mr-3"></span>
                                    {category}
                                </h2>

                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {categorySkills.map((skill, index) => (
                                        <motion.div
                                            key={skill._id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                                            transition={{ duration: 0.4, delay: index * 0.05 }}
                                            className="card-hover p-5 group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 group-hover:animate-pulse" />
                                                <h3 className="font-semibold text-gray-800 dark:text-gray-200 group-hover:gradient-text transition-all">
                                                    {skill.name}
                                                </h3>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.8 }}
                        className="mt-16 text-center"
                    >
                        <div className="inline-block px-8 py-4 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-2xl border border-primary-500/20">
                            <p className="text-lg text-gray-700 dark:text-gray-300">
                                <span className="font-bold gradient-text text-2xl">{skills.length}</span> skills across{' '}
                                <span className="font-bold gradient-text text-2xl">{categories.length - 1}</span> categories
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer profile={profile} />
        </div>
    );
};

export default SkillsPage;
