import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { StudentOnboard } from './components/StudentOnboard';
import { AdminLogin } from './components/AdminLogin';
import { CandidateLogin } from './components/CandidateLogin';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'onboard' | 'admin-login' | 'candidate-login' | 'admin-panel'>('landing');

  const handleGetStarted = () => {
    setCurrentPage('onboard');
  };

  const handlePageChange = (page: 'landing' | 'onboard' | 'admin-login' | 'candidate-login' | 'admin-panel') => {
    setCurrentPage(page);
  };

  const handleBackToHome = () => {
    setCurrentPage('landing');
  };

  const handleAdminLogin = () => {
    setCurrentPage('admin-panel');
  };

  const handleAdminLogout = () => {
    setCurrentPage('landing');
  };

  return (
    <div className="min-h-screen">
      {currentPage !== 'admin-panel' && (
        <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      )}
      
      {currentPage === 'landing' && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}
      
      {currentPage === 'onboard' && (
        <StudentOnboard onBack={handleBackToHome} />
      )}

      {currentPage === 'admin-login' && (
        <AdminLogin onBack={handleBackToHome} onLogin={handleAdminLogin} />
      )}

      {currentPage === 'candidate-login' && (
        <CandidateLogin onBack={handleBackToHome} />
      )}

      {currentPage === 'admin-panel' && (
        <AdminPanel onLogout={handleAdminLogout} />
      )}
    </div>
  );
}