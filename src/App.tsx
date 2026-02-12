/**
 * Main App Component - Nile International Hospital
 * Simplified to focus on hospital website functionality
 */
import { useState, useCallback, useEffect } from 'react';
import HoverReceiver from "./visual-edits/VisualEditsMessenger";

// Page Components
import { LandingPage } from './pages/LandingPage';
import { DepartmentsPage } from './pages/DepartmentsPage';
import WelcomeModal from './components/WelcomeModal';

// Simplified AppState for now
enum PageState {
  LANDING = 'LANDING',
  DEPARTMENTS = 'DEPARTMENTS',
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageState>(PageState.LANDING);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);

  // Auto-open Welcome Modal
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWelcomeModalOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Navigation handlers
  const handleViewAllDepartments = useCallback(() => {
    setCurrentPage(PageState.DEPARTMENTS);
  }, []);

  const handleBackToHome = useCallback(() => {
    setCurrentPage(PageState.LANDING);
  }, []);

  // Render
  return (
    <>
      <HoverReceiver />
      <WelcomeModal isOpen={isWelcomeModalOpen} onClose={() => setIsWelcomeModalOpen(false)} />
      {currentPage === PageState.LANDING ? (
        <LandingPage
          onGetStarted={() => setIsWelcomeModalOpen(true)}
          onViewAllDepartments={handleViewAllDepartments}
        />
      ) : (
        <DepartmentsPage
          onBack={handleBackToHome}
          onOpenWelcome={() => setIsWelcomeModalOpen(true)}
        />
      )}
    </>
  );
}
