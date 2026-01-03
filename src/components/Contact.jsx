import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const Contact = ({ profile }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800/50">
            <div className="container mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-title text-center gradient-text">Get In Touch</h2>
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                        Let's collaborate on your next AI project or discuss opportunities
                    </p>

                    <div className="max-w-2xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-6">
                            {profile?.email && (
                                <motion.a
                                    href={`mailto:${profile.email}`}
                                    className="card p-6 hover:scale-105 transition-transform flex items-center gap-4"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="p-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg">
                                        <FiMail className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Email</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{profile.email}</p>
                                    </div>
                                </motion.a>
                            )}

                            {profile?.phone && (
                                <motion.a
                                    href={`tel:${profile.phone}`}
                                    className="card p-6 hover:scale-105 transition-transform flex items-center gap-4"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="p-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg">
                                        <FiPhone className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Phone</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{profile.phone}</p>
                                    </div>
                                </motion.a>
                            )}

                            {profile?.location && (
                                <motion.div
                                    className="card p-6 flex items-center gap-4"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="p-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg">
                                        <FiMapPin className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Location</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{profile.location}</p>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
