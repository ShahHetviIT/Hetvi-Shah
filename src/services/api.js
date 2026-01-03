import portfolioData from '../data/portfolioData.json';

// Helper function to simulate API response format
const createResponse = (data, success = true) => ({
    data: {
        success,
        data
    }
});

// Helper function to simulate async API calls
const asyncData = (data) => Promise.resolve(createResponse(data));

// Auth API (keeping original functionality for admin)
export const authAPI = {
    login: (credentials) => {
        // Mock login - in production, this would call a real API
        // The Login component sends 'username' instead of 'email'
        if (credentials.username === 'admin@admin.com' && credentials.password === 'admin') {
            return Promise.resolve(createResponse({ token: 'mock-token' }));
        }
        return Promise.reject(new Error('Invalid credentials'));
    },
    verify: () => Promise.resolve(createResponse({ valid: true })),
};

// Profile API
export const profileAPI = {
    get: () => asyncData(portfolioData.profile),
    update: (data) => {
        // Mock update - in production, this would call a real API
        console.log('Update profile:', data);
        return asyncData({ ...portfolioData.profile, ...data });
    },
};

// Skills API
export const skillsAPI = {
    getAll: (category) => {
        let skills = portfolioData.skills;
        if (category) {
            skills = skills.filter(skill => skill.category === category);
        }
        return asyncData(skills);
    },
    getGrouped: () => {
        const grouped = portfolioData.skills.reduce((acc, skill) => {
            if (!acc[skill.category]) {
                acc[skill.category] = [];
            }
            acc[skill.category].push(skill);
            return acc;
        }, {});
        return asyncData(grouped);
    },
    getById: (id) => {
        const skill = portfolioData.skills.find(s => s._id === id);
        return asyncData(skill);
    },
    create: (data) => {
        console.log('Create skill:', data);
        return asyncData(data);
    },
    update: (id, data) => {
        console.log('Update skill:', id, data);
        return asyncData(data);
    },
    delete: (id) => {
        console.log('Delete skill:', id);
        return asyncData({ message: 'Skill deleted' });
    },
};

// Projects API
export const projectsAPI = {
    getAll: (params = {}) => {
        let projects = portfolioData.projects;

        // Filter by featured
        if (params.featured !== undefined) {
            projects = projects.filter(p => p.featured === params.featured);
        }

        // Filter by category
        if (params.category) {
            projects = projects.filter(p => p.category === params.category);
        }

        // Sort by order
        projects = [...projects].sort((a, b) => (a.order || 0) - (b.order || 0));

        return asyncData(projects);
    },
    getById: (id) => {
        const project = portfolioData.projects.find(p => p._id === id || p.title === id);
        return asyncData(project);
    },
    create: (data) => {
        console.log('Create project:', data);
        return asyncData(data);
    },
    update: (id, data) => {
        console.log('Update project:', id, data);
        return asyncData(data);
    },
    delete: (id) => {
        console.log('Delete project:', id);
        return asyncData({ message: 'Project deleted' });
    },
};

// Education API
export const educationAPI = {
    getAll: () => asyncData(portfolioData.education),
    create: (data) => {
        console.log('Create education:', data);
        return asyncData(data);
    },
    update: (id, data) => {
        console.log('Update education:', id, data);
        return asyncData(data);
    },
    delete: (id) => {
        console.log('Delete education:', id);
        return asyncData({ message: 'Education deleted' });
    },
};

// Experience API
export const experienceAPI = {
    getAll: () => asyncData(portfolioData.experience || []),
    create: (data) => {
        console.log('Create experience:', data);
        return asyncData(data);
    },
    update: (id, data) => {
        console.log('Update experience:', id, data);
        return asyncData(data);
    },
    delete: (id) => {
        console.log('Delete experience:', id);
        return asyncData({ message: 'Experience deleted' });
    },
};

export default {
    authAPI,
    profileAPI,
    skillsAPI,
    projectsAPI,
    educationAPI,
    experienceAPI
};
