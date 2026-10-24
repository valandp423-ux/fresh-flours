import React from 'react';
import { BUSINESS_INFO } from '../data/products';
import { Phone, MapPin, Clock } from 'lucide-react';
import LocalizedContent from '../utils/localizeContent';

const CURRENT_YEAR = 2026;

export default function Footer({ navigate }) {
  const handleNav = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LocalizedContent>
    <footer style={{
      backgroundColor: 'var(--color-earth-900)',
      color: 'var(--color-cream-100)',
      borderTop: '3px solid var(--primary)',
      paddingTop: '60px',
      paddingBottom: '30px',
      marginTop: '60px'
    }}>
      <div className="app-container">
        {/* Top Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Brand Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.4rem', fontWeight: 800, margin: '0 0 6px 0' }}>
                The Fresh Flours
              </h3>
              <p style={{ color: 'var(--color-earth-400)', fontSize: '0.92rem', lineHeight: 1.5, margin: 0 }}>
                {BUSINESS_INFO.tagline}
              </p>
              <p style={{ color: 'var(--color-earth-400)', fontSize: '0.85rem', lineHeight: 1.5, marginTop: '4px' }}>
                {BUSINESS_INFO.subtagline}
              </p>
            </div>

            {/* Direct Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
              <a 
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textDecoration: 'none'
                }}
              >
                <Phone size={18} color="var(--accent-gold)" />
                <span>{BUSINESS_INFO.phone}</span>
              </a>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-earth-400)', fontSize: '0.86rem' }}>
                <Clock size={16} color="var(--accent-gold)" />
                <span>{BUSINESS_INFO.hours}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-earth-400)', fontSize: '0.86rem' }}>
                <MapPin size={16} color="var(--accent-gold)" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.02em' }}>
              Popular Flours
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { name: 'Bajri Flour', path: '/shop?category=flours' },
                { name: 'Juwar Flour', path: '/shop?category=flours' },
                { name: 'Chapati Flour', path: '/shop?category=flours' },
                { name: 'Bhakhari Flour', path: '/shop?category=flours' },
                { name: 'Handvo Flour', path: '/shop?category=flours' },
                { name: 'Besan & Ladu Besan', path: '/shop?category=flours' },
                { name: 'Dhokla Flour', path: '/shop?category=flours' },
                { name: 'Whole Grains', path: '/shop?category=grains' }
              ].map((item, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => handleNav(item.path)}
                    style={{
                      color: 'var(--color-earth-200)',
                      fontSize: '0.88rem',
                      textAlign: 'left',
                      transition: 'color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-gold)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-earth-200)'}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service & Information */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.02em' }}>
              Customer Care
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { name: 'Delivery Cost & Box Rules', path: '/shipping' },
                { name: 'Questions & Answers (FAQ)', path: '/help' },
                { name: 'Our Story', path: '/about' },
                { name: 'Milling Process', path: '/milling' },
                { name: 'Traditional Recipes & Guides', path: '/recipes' },
                { name: 'Track Order / Repeat Order', path: '/account' },
                { name: 'Contact & Bulk Inquiries', path: '/contact' }
              ].map((item, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => handleNav(item.path)}
                    style={{
                      color: 'var(--color-earth-200)',
                      fontSize: '0.88rem',
                      textAlign: 'left',
                      transition: 'color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-gold)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-earth-200)'}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Information */}
          <div>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 'var(--radius-md)',
              padding: '18px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase' }}>
                Zelle Payments
              </span>
              <p style={{ margin: '6px 0 0 0', fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 600 }}>
                Send to: <b style={{ color: 'var(--accent-gold)' }}>423-664-3353</b>
              </p>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.82rem', color: 'var(--color-earth-400)' }}>
                Name on Zelle: Pratik Patel (0% fee)
              </p>
            </div>

          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          fontSize: '0.82rem',
          color: 'var(--color-earth-500)'
        }}>
          <div>
            © {CURRENT_YEAR} The Fresh Flours. All rights reserved. Milled daily in the USA.
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
            <button type="button" onClick={() => handleNav('/shipping-policy')} style={{ color: 'inherit' }}>
              Shipping Policy
            </button>
            <button type="button" onClick={() => handleNav('/return-policy')} style={{ color: 'inherit' }}>
              Return Policy
            </button>
            <button type="button" onClick={() => handleNav('/privacy-policy')} style={{ color: 'inherit' }}>
              Privacy Policy
            </button>
            <button type="button" onClick={() => handleNav('/terms')} style={{ color: 'inherit' }}>
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
    </LocalizedContent>
  );
}
