import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiSend, FiGithub, FiLinkedin } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { profileAPI } from '../services/api';

const ContactPage = () => {
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create mailto link with form data
        const mailtoLink = `mailto:${profile?.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
        window.location.href = mailtoLink;
    };

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
            <Navbar />

            <main className="flex-1 pt-24 pb-16 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="section-title gradient-text mb-4">Get In Touch</h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Let's collaborate on your next AI project or discuss opportunities
                        </p>
                    </motion.div>

                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
                                Contact Information
                            </h2>

                            <div className="space-y-6">
                                {/* Email */}
                                {profile?.email && (
                                    <motion.a
                                        href={`mailto:${profile.email}`}
                                        className="card-hover p-6 flex items-center gap-4 group"
                                        whileHover={{ x: 10 }}
                                    >
                                        <div className="w-14 h-14 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <FiMail className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Email</h3>
                                            <p className="text-gray-600 dark:text-gray-400">{profile.email}</p>
                                        </div>
                                    </motion.a>
                                )}

                                {/* Phone */}
                                {profile?.phone && (
                                    <motion.a
                                        href={`tel:${profile.phone}`}
                                        className="card-hover p-6 flex items-center gap-4 group"
                                        whileHover={{ x: 10 }}
                                    >
                                        <div className="w-14 h-14 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <FiPhone className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Phone</h3>
                                            <p className="text-gray-600 dark:text-gray-400">{profile.phone}</p>
                                        </div>
                                    </motion.a>
                                )}

                                {/* Location */}
                                {profile?.location && (
                                    <motion.div
                                        className="card p-6 flex items-center gap-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <div className="w-14 h-14 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                                            <FiMapPin className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Location</h3>
                                            <p className="text-gray-600 dark:text-gray-400">{profile.location}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Social Links */}
                            <div className="mt-8">
                                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                                    Connect With Me
                                </h3>
                                <div className="flex gap-4">
                                    {profile?.socialLinks?.github && (
                                        <a
                                            href={profile.socialLinks.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-primary-500 hover:to-accent-500 hover:text-white transition-all"
                                        >
                                            <FiGithub className="w-6 h-6" />
                                        </a>
                                    )}
                                    {profile?.socialLinks?.linkedin && (
                                        <a
                                            href={profile.socialLinks.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-primary-500 hover:to-accent-500 hover:text-white transition-all"
                                        >
                                            <FiLinkedin className="w-6 h-6" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="card p-8">
                                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                                    Send Me a Message
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="input-field"
                                            required
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                            Your Email
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="input-field"
                                            required
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="input-field"
                                            required
                                            placeholder="Project Collaboration"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                            Message
                                        </label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            rows="6"
                                            className="textarea-field"
                                            required
                                            placeholder="Tell me about your project..."
                                        />
                                    </div>

                                    <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                                        <FiSend />
                                        <span>Send Message</span>
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer profile={profile} />
        </div>
    );
};

export default ContactPage;
