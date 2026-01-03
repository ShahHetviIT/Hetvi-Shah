import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileAPI } from '../../services/api';
import { motion } from 'framer-motion';
import { FiSave, FiArrowLeft } from 'react-icons/fi';
import ThemeToggle from '../../components/ThemeToggle';

const ManageProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: '',
        title: '',
        bio: '',
        email: '',
        phone: '',
        location: '',
        socialLinks: {
            github: '',
            linkedin: '',
            twitter: '',
            portfolio: ''
        }
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await profileAPI.get();
            if (response.data.success && response.data.data) {
                setProfile(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await profileAPI.update(profile);
            if (response.data.success) {
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update profile' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <ThemeToggle />

            <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="container mx-auto px-6 py-4 flex items-center gap-4">
                    <button onClick={() => navigate('/admin/dashboard')} className="btn-secondary flex items-center gap-2">
                        <FiArrowLeft /> Back
                    </button>
                    <h1 className="text-2xl font-bold gradient-text">Manage Profile</h1>
                </div>
            </header>

            <div className="container mx-auto px-6 py-12">
                <motion.div
                    className="card p-8 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {message.text && (
                        <div className={`mb-6 p-4 rounded-lg ${message.type === 'success'
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-700'
                                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Name</label>
                                <input
                                    type="text"
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Title</label>
                                <input
                                    type="text"
                                    value={profile.title}
                                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Bio</label>
                            <textarea
                                value={profile.bio}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                rows="4"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email</label>
                                <input
                                    type="email"
                                    value={profile.email}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Phone</label>
                                <input
                                    type="tel"
                                    value={profile.phone || ''}
                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Location</label>
                            <input
                                type="text"
                                value={profile.location || ''}
                                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
                            />
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Social Links</h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">GitHub</label>
                                    <input
                                        type="url"
                                        value={profile.socialLinks?.github || ''}
                                        onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, github: e.target.value } })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">LinkedIn</label>
                                    <input
                                        type="url"
                                        value={profile.socialLinks?.linkedin || ''}
                                        onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, linkedin: e.target.value } })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <FiSave /> {saving ? 'Saving...' : 'Save Profile'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default ManageProfile;
