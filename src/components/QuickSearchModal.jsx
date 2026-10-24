import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Search, X, ArrowRight } from 'lucide-react';
import LocalizedContent from '../utils/localizeContent';

export default function QuickSearchModal() {
  const { isSearchOpen, setIsSearchOpen, setSelectedProductForModal, lang } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  // Handle escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = searchTerm.trim() === ''
    ? PRODUCTS.slice(0, 6)
    : PRODUCTS.filter(p => {
        const query = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.categoryName.toLowerCase().includes(query) ||
          (p.gujaratiName && p.gujaratiName.includes(query)) ||
          (p.hindiName && p.hindiName.includes(query))
        );
      });

  const handleSelectProduct = (product) => {
    setIsSearchOpen(false);
    setSelectedProductForModal(product);
  };

  const popularTags = ['Bajri', 'Juwar', 'Chapati', 'Bhakhari', 'Besan', 'Handvo', 'Whole Grain', 'Mamra'];

  return (
    <LocalizedContent>
      <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1200,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      backgroundColor: 'rgba(18, 40, 30, 0.65)',
      backdropFilter: 'blur(6px)',
      padding: '40px 16px 20px',
      animation: 'fadeIn 0.2s ease'
    }}>
      {/* Backdrop click to close */}
      <div 
        style={{ position: 'absolute', inset: 0 }} 
        onClick={() => setIsSearchOpen(false)} 
        aria-hidden="true" 
      />

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '680px',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-xl)',
        border: '1.5px solid var(--border-subtle)',
        overflow: 'hidden',
        zIndex: 10,
        animation: 'slideDown 0.25s ease'
      }}>
        {/* Search Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--color-cream-50)'
        }}>
          <Search size={22} color="var(--primary)" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search freshly milled flours, grains, or recipes..."
            style={{
              flex: 1,
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: '1.05rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              outline: 'none'
            }}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              style={{ color: 'var(--text-muted)', padding: '4px' }}
            >
              <X size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="btn-icon"
            style={{ width: '32px', height: '32px', backgroundColor: '#FFFFFF', border: '1px solid var(--border-subtle)' }}
            aria-label="Close search"
          >
            <X size={16} />
          </button>
        </div>

        {/* Popular Tags */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '10px 20px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--border-subtle)',
          overflowX: 'auto'
        }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
            Popular:
          </span>
          {popularTags.map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => setSearchTerm(tag)}
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-cream-100)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                whiteSpace: 'nowrap'
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div style={{
          maxHeight: '380px',
          overflowY: 'auto',
          padding: '12px'
        }}>
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--text-muted)' }}>
              <p style={{ margin: 0, fontWeight: 600 }}>No flours or grains matching "{searchTerm}"</p>
              <p style={{ fontSize: '0.85rem', marginTop: '6px' }}>Try searching for Bajri, Juwar, Chapati, Bhakhari, or Besan.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {filteredProducts.map(product => {
                const displayName = lang === 'gu'
                  ? product.gujaratiName || product.name
                  : lang === 'hi'
                    ? product.hindiName || product.name
                    : product.name;
                return (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-cream-100)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                >
                  <img
                    src={product.image}
                    alt={displayName}
                    style={{
                      width: '44px',
                      height: '44px',
                      objectFit: 'contain',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'var(--color-cream-50)',
                      border: '1px solid var(--border-subtle)',
                      flexShrink: 0
                    }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--text-primary)' }}>
                        {displayName}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {product.categoryName} • {product.size}
                    </span>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    {!product.isComingSoon ? (
                      <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.05rem' }}>
                        ${product.price.toFixed(2)}
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-wheat-600)' }}>
                        Soon
                      </span>
                    )}
                  </div>

                  <ArrowRight size={16} color="var(--text-muted)" />
                </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      </div>
    </LocalizedContent>
  );
}
