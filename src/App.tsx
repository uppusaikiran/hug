import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import ConversationPage from './pages/ConversationPage';
import MeditationPage from './pages/MeditationPage';
import ChallengesPage from './pages/ChallengesPage';
import ChallengeDetailPage from './pages/ChallengeDetailPage';
import ResourcesPage from './pages/ResourcesPage';
import ProfilePage from './pages/ProfilePage';
import CrisisPage from './pages/CrisisPage';
import MoodPage from './pages/MoodPage';
import SignInForm from './components/auth/SignInForm';
import SignUpForm from './components/auth/SignUpForm';

// Components
import Layout from './components/layout/Layout';
import AuthRequired from './components/auth/AuthRequired';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth/signin" element={<SignInForm />} />
              <Route path="/auth/signup" element={<SignUpForm />} />
              <Route element={<Layout />}>
                <Route element={<AuthRequired />}>
                  <Route path="/conversation" element={<ConversationPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/meditation" element={<MeditationPage />} />
                  <Route path="/challenges" element={<ChallengesPage />} />
                  <Route path="/challenges/:challengeId" element={<ChallengeDetailPage />} />
                  <Route path="/resources" element={<ResourcesPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/mood" element={<MoodPage />} />
                </Route>
                <Route path="/crisis" element={<CrisisPage />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;