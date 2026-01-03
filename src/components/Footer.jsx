import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';

const Footer = ({ profile }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800">
            <div className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* About */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 gradient-text">Hetvi Shah</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            GenAI Engineer specializing in LLM-powered applications and full-stack development.
                        </p>
                        <div className="flex space-x-4">
                            {profile?.socialLinks?.github && (
                                <a
                                    href={profile.socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-primary-500 hover:text-white transition-colors"
                                >
                                    <FiGithub className="w-5 h-5" />
                                </a>
                            )}
                            {profile?.socialLinks?.linkedin && (
                                <a
                                    href={profile.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-primary-500 hover:text-white transition-colors"
                                >
                                    <FiLinkedin className="w-5 h-5" />
                                </a>
                            )}
                            {profile?.email && (
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-primary-500 hover:text-white transition-colors"
                                >
                                    <FiMail className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/projects" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">Get in Touch</h3>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                            {profile?.email && (
                                <li className="flex items-center space-x-2">
                                    <FiMail className="w-4 h-4" />
                                    <span>{profile.email}</span>
                                </li>
                            )}
                            {profile?.location && (
                                <li className="flex items-center space-x-2">
                                    <span>📍</span>
                                    <span>{profile.location}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center space-x-1">
                        <span>© {currentYear} {profile?.name || 'Hetvi Shah'}.</span>
                        {/* <FiHeart className="w-4 h-4 text-red-500" />
                            <span>using React & Node.js</span> */}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
