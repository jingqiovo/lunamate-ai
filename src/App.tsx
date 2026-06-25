import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './hooks/useApp';
import { BottomNav } from './components/BottomNav';
import {
  Onboarding,
  Home,
  CharacterDetail,
  Chat,
  Relationship,
  Membership,
  Settings,
} from './pages';

function AppContent() {
  const { preferences } = useApp();

  return (
    <div className="min-h-screen bg-bg-primary">
      <Routes>
        <Route
          path="/"
          element={
            preferences.hasCompletedOnboarding ? (
              <Navigate to="/home" replace />
            ) : (
              <Onboarding />
            )
          }
        />

        <Route path="/home" element={<Home />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/relationship" element={<Relationship />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/chat-list" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
