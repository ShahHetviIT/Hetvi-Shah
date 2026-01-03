import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import ThemeToggle from '../components/ThemeToggle';
import { profileAPI, skillsAPI, projectsAPI } from '../services/api';
import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

const Home = () => {
    const [profile, setProfile] = useState(null);
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [profileRes, skillsRes, projectsRes] = await Promise.all([
                profileAPI.get().catch(() => ({ data: { data: null } })),
                skillsAPI.getAll().catch(() => ({ data: { data: [] } })),
                projectsAPI.getAll().catch(() => ({ data: { data: [] } })),
            ]);

            setProfile(profileRes.data.data);
            setSkills(skillsRes.data.data);
            setProjects(projectsRes.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                    <FiLoader className="w-12 h-12 text-primary-500" />
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <ThemeToggle />
            <Hero profile={profile} />
            <About profile={profile} />
            <Skills skills={skills} />
            <Projects projects={projects} />
            <Contact profile={profile} />

            {/* Footer */}
            <footer className="py-8 bg-gray-100 dark:bg-gray-900 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                    © {new Date().getFullYear()} {profile?.name || 'Hetvi Shah'}. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default Home;
