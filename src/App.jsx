import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProductDetailModal from './components/ProductDetailModal';
import QuickSearchModal from './components/QuickSearchModal';
import RecipeModal from './components/RecipeModal';
import ToastNotification from './components/ToastNotification';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import DeliveryCostPage from './pages/DeliveryCostPage';
import HelpFaqPage from './pages/HelpFaqPage';
import AboutPage from './pages/AboutPage';
import MillingProcessPage from './pages/MillingProcessPage';
import RecipesPage from './pages/RecipesPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountOrderLookupPage from './pages/AccountOrderLookupPage';
import PolicyPage from './pages/PolicyPage';

import { PRODUCTS } from './data/products';

function AppContent() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname || '/');
  const { setSelectedProductForModal } = useCart();

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path.split('?')[0]);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Handle /product/:slug path
    if (path.startsWith('/product/')) {
      const slug = path.replace('/product/', '').split('?')[0];
      const prod = PRODUCTS.find(p => p.slug === slug || p.id === slug);
      if (prod) {
        setSelectedProductForModal(prod);
      }
    }
  };

  // Render current page based on route
  const renderPage = () => {
    const path = currentPath;

    if (path === '/' || path === '') {
      return <HomePage navigate={navigate} />;
    }
    if (path === '/shop') {
      return <ShopPage navigate={navigate} />;
    }
    if (path.startsWith('/product/')) {
      return <ShopPage navigate={navigate} />;
    }
    if (path === '/shipping') {
      return <DeliveryCostPage navigate={navigate} />;
    }
    if (path === '/help') {
      return <HelpFaqPage navigate={navigate} />;
    }
    if (path === '/about') {
      return <AboutPage navigate={navigate} />;
    }
    if (path === '/milling') {
      return <MillingProcessPage navigate={navigate} />;
    }
    if (path === '/recipes') {
      return <RecipesPage navigate={navigate} />;
    }
    if (path === '/contact') {
      return <ContactPage navigate={navigate} />;
    }
    if (path === '/cart') {
      return <CartPage navigate={navigate} />;
    }
    if (path === '/checkout') {
      return <CheckoutPage navigate={navigate} />;
    }
    if (path === '/account') {
      return <AccountOrderLookupPage navigate={navigate} />;
    }
    if (path === '/shipping-policy') {
      return <PolicyPage policyType="shipping" navigate={navigate} />;
    }
    if (path === '/return-policy') {
      return <PolicyPage policyType="returns" navigate={navigate} />;
    }
    if (path === '/privacy-policy') {
      return <PolicyPage policyType="privacy" navigate={navigate} />;
    }
    if (path === '/terms') {
      return <PolicyPage policyType="terms" navigate={navigate} />;
    }

    // Default fallback to Home
    return <HomePage navigate={navigate} />;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-body)' }}>
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Primary Sticky Header */}
      <Header currentPath={currentPath} navigate={navigate} />

      {/* Main Page Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {renderPage()}
      </main>

      {/* Global Modals & Drawers */}
      <CartDrawer navigate={navigate} />
      <ProductDetailModal />
      <QuickSearchModal navigate={navigate} />
      <RecipeModal />
      <ToastNotification />

      {/* Main Footer */}
      <Footer navigate={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
