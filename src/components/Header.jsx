import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { TRANSLATIONS } from '../data/translations';
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';
import LocalizedContent from '../utils/localizeContent';

export default function Header({ currentPath, navigate }) {
  const { lang, totalItemCount, setIsCartOpen, setIsSearchOpen } = useCart();
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { path: '/', label: lang === 'gu' ? 'હોમ' : lang === 'hi' ? 'होम' : 'Home' },
    { path: '/shop', label: t.shop, gu: t.shop },
    { path: '/shipping', label: t.deliveryCost, gu: t.deliveryCost },
    { path: '/recipes', label: t.recipes, gu: t.recipes },
    { path: '/about', label: lang === 'gu' ? 'અમારી વાર્તા' : lang === 'hi' ? 'हमारी कहानी' : 'Our Story' },
    { path: '/milling', label: lang === 'gu' ? 'દળવાની પ્રક્રિયા' : lang === 'hi' ? 'पिसाई प्रक्रिया' : 'Milling Process' },
    { path: '/help', label: t.questionsAnswers, gu: t.questionsAnswers },
    { path: '/contact', label: t.contact, gu: t.contact },
  ];
  const desktopNavLinks = [
    navLinks[0],
    navLinks[1],
    navLinks[3],
    { path: '/about', label: lang === 'gu' ? 'અમારી વાર્તા' : lang === 'hi' ? 'हमारी कहानी' : 'Our Story' },
    { path: '/milling', label: lang === 'gu' ? 'દળવાની પ્રક્રિયા' : lang === 'hi' ? 'पिसाई प्रक्रिया' : 'Milling Process' },
    { path: '/shipping', label: lang === 'gu' ? 'ડિલિવરી' : lang === 'hi' ? 'डिलीवरी' : 'Delivery' },
    { path: '/help', label: lang === 'gu' ? 'પ્રશ્નો' : lang === 'hi' ? 'सवाल' : 'FAQs' },
  ];

  return (
    <LocalizedContent>
    <header className="site-header" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(252, 250, 246, 0.94)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-subtle)',
      transition: 'all 0.2s ease'
    }}>
      <div className="app-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '12px',
        paddingBottom: '12px',
        gap: '16px'
      }}>
        {/* Brand Logo & Slogan */}
        <button 
          type="button"
          className="header-brand"
          onClick={() => handleNav('/')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            gap: '2px',
            textDecoration: 'none'
          }}
        >
          <img 
            className="header-logo"
            src="/freshflours-logo.svg" 
            alt="The Fresh Flours" 
            style={{
              height: '38px',
              width: 'auto',
              maxWidth: '220px',
              objectFit: 'contain'
            }}
          />
          <span className="header-tagline" style={{
            fontSize: '0.78rem',
            fontWeight: 500,
            color: 'var(--text-muted)',
            letterSpacing: '0.01em'
          }}>
            {t.tagline}
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '6px'
        }} className="desktop-nav">
          {desktopNavLinks.map((link, index) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={`${link.path}-${index}`}
                type="button"
                className={`header-nav-link${isActive ? ' is-active' : ''}`}
                onClick={() => handleNav(link.path)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.92rem',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  backgroundColor: 'transparent',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'var(--color-cream-100)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls: Search, Account, Basket, Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Quick Search */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="btn-icon desktop-search-btn"
            style={{
              backgroundColor: 'var(--color-cream-100)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)'
            }}
            title="Search flours and grains"
            aria-label="Search flours and grains"
          >
            <Search size={18} />
            <span className="desktop-search-label">Search flours...</span>
          </button>

          {/* Orders / Account */}
          <button
            type="button"
            onClick={() => handleNav('/account')}
            className="desktop-account-btn btn-icon"
            style={{
              backgroundColor: currentPath === '/account' ? 'var(--color-cream-200)' : 'var(--color-cream-100)',
              color: currentPath === '/account' ? 'var(--primary)' : 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              display: 'none'
            }}
            title="My Orders & Status"
            aria-label="My Orders"
          >
            <User size={18} />
          </button>

          {/* Basket Trigger */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="header-cart-btn"
            aria-label={`Open basket${totalItemCount > 0 ? `, ${totalItemCount} ${totalItemCount === 1 ? 'item' : 'items'}` : ''}`}
            title={lang === 'gu' ? 'ખરીદીની ટોપલી ખોલો' : lang === 'hi' ? 'कार्ट खोलें' : 'Open basket'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'var(--primary)',
              color: '#FFFFFF',
              padding: '9px 18px',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              fontSize: '0.94rem',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
          >
            <ShoppingCart size={21} strokeWidth={1.8} />
            <span className="header-cart-label">{t.basket}</span>
            {totalItemCount > 0 && (
              <span className="header-cart-count" aria-hidden="true">
                {totalItemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-icon mobile-menu-toggle"
            style={{
              backgroundColor: 'var(--color-cream-100)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              display: 'flex'
            }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '2px solid var(--border-subtle)',
          padding: '16px 20px',
          boxShadow: 'var(--shadow-lg)',
          animation: 'slideDown 0.25s ease'
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {navLinks.map((link) => (
              <button
                key={link.path}
                type="button"
                onClick={() => handleNav(link.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '1rem',
                  fontWeight: currentPath === link.path ? 700 : 600,
                  color: currentPath === link.path ? 'var(--primary)' : 'var(--text-primary)',
                  backgroundColor: currentPath === link.path ? 'var(--color-cream-100)' : 'transparent',
                  textAlign: 'left'
                }}
              >
                <span>{link.label}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>→</span>
              </button>
            ))}

            <button
              type="button"
              onClick={() => handleNav('/account')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--primary)',
                backgroundColor: 'var(--color-forest-50)',
                marginTop: '6px'
              }}
            >
              <User size={18} />
              <span>{t.myAccount}</span>
            </button>
          </nav>
        </div>
      )}

      <style>{`
        @media (min-width: 1200px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-account-btn {
            display: inline-flex !important;
          }
          .mobile-menu-toggle {
            display: none !important;
          }
        }
        @media (min-width: 1200px) {
          .desktop-search-btn {
            width: auto;
            padding: 0 14px;
            border-radius: var(--radius-full);
          }
          .desktop-search-label {
            display: inline;
            color: var(--text-muted);
            font-size: 0.75rem;
            font-weight: 500;
            white-space: nowrap;
          }
        }
      `}</style>
    </header>
    </LocalizedContent>
  );
}
