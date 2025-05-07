import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from './components/layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import TextToImagePage from './pages/TextToImagePage';
import TextToVideoPage from './pages/TextToVideoPage';
import BillingPage from './pages/BillingPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/text-to-image" element={<TextToImagePage />} />
          <Route path="/text-to-video" element={<TextToVideoPage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;