import React from 'react';
import { useCart } from '../context/CartContext';
import { TRANSLATIONS } from '../data/translations';
import { BUSINESS_INFO } from '../data/products';
import { Phone } from 'lucide-react';

export default function AnnouncementBar() {
  const { lang, setLang } = useCart();
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <div style={{
      backgroundColor: 'var(--color-forest-900)',
      color: '#FFFFFF',
      fontSize: '0.85rem',
      fontWeight: 500,
      borderBottom: '1px solid rgba(255,255,255,0.08)'
    }}>
      <div className="app-container" style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '6px',
        paddingBottom: '6px',
        gap: '8px'
      }}>
        {/* Language Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button 
            type="button"
            onClick={() => setLang('en')}
            style={{
              padding: '3px 9px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: lang === 'en' ? 700 : 500,
              backgroundColor: lang === 'en' ? '#FFFFFF' : 'transparent',
              color: lang === 'en' ? 'var(--color-forest-900)' : 'rgba(255,255,255,0.75)',
              border: lang === 'en' ? '1px solid #FFFFFF' : '1px solid rgba(255,255,255,0.25)',
              transition: 'all 0.15s ease'
            }}
          >
            English
          </button>
          <button 
            type="button"
            onClick={() => setLang('gu')}
            style={{
              padding: '3px 9px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: lang === 'gu' ? 700 : 500,
              backgroundColor: lang === 'gu' ? '#FFFFFF' : 'transparent',
              color: lang === 'gu' ? 'var(--color-forest-900)' : 'rgba(255,255,255,0.75)',
              border: lang === 'gu' ? '1px solid #FFFFFF' : '1px solid rgba(255,255,255,0.25)',
              transition: 'all 0.15s ease'
            }}
          >
            ગુજરાતી
          </button>
          <button 
            type="button"
            onClick={() => setLang('hi')}
            style={{
              padding: '3px 9px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: lang === 'hi' ? 700 : 500,
              backgroundColor: lang === 'hi' ? '#FFFFFF' : 'transparent',
              color: lang === 'hi' ? 'var(--color-forest-900)' : 'rgba(255,255,255,0.75)',
              border: lang === 'hi' ? '1px solid #FFFFFF' : '1px solid rgba(255,255,255,0.25)',
              transition: 'all 0.15s ease'
            }}
          >
            हिन्दी
          </button>
        </div>

        {/* Contact direct link */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <a 
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            <Phone size={13} color="var(--color-wheat-400)" />
            <span>{t.callUs}: <b>{BUSINESS_INFO.phone}</b></span>
          </a>
        </div>
      </div>

    </div>
  );
}
