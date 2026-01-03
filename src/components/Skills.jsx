import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Skills = ({ skills }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    // Group skills by category
    const groupedSkills = skills?.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {}) || {};

    return (
        <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800/50">
            <div className="container mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                >
                    <h2 className="section-title text-center gradient-text">Technical Skills</h2>
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                        Expertise across AI/ML frameworks, full-stack development, and modern technologies
                    </p>

                    <div className="space-y-12">
                        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                            <motion.div key={category} variants={itemVariants}>
                                <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                                    {category}
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {categorySkills.map((skill) => (
                                        <motion.div
                                            key={skill._id}
                                            className="card p-4 hover:scale-105 transition-transform cursor-pointer group"
                                            whileHover={{ y: -5 }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 group-hover:animate-pulse" />
                                                <span className="font-medium text-gray-800 dark:text-gray-200">
                                                    {skill.name}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
