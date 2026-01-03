import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageProfile from './pages/admin/ManageProfile';
import ManageSkills from './pages/admin/ManageSkills';
import ManageProjects from './pages/admin/ManageProjects';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/profile"
              element={
                <ProtectedRoute>
                  <ManageProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/skills"
              element={
                <ProtectedRoute>
                  <ManageSkills />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/projects"
              element={
                <ProtectedRoute>
                  <ManageProjects />
                </ProtectedRoute>
              }
            />

            {/* 404 - Redirect to Home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
