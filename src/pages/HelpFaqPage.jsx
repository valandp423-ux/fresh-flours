import React, { useState } from 'react';
import { FAQS } from '../data/faqs';
import { BUSINESS_INFO } from '../data/products';
import { useCart } from '../context/CartContext';
import { Search, ChevronDown, ChevronUp, Phone, ArrowRight, Sparkles } from 'lucide-react';
import LocalizedContent from '../utils/localizeContent';

export default function HelpFaqPage({ navigate }) {
  const { lang } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState(FAQS[0]?.id || null);

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const filteredFaqs = FAQS.filter(f => {
    const q = searchQuery.toLowerCase();
    return (
      f.question.toLowerCase().includes(q) ||
      f.answer.toLowerCase().includes(q) ||
      (f.gujaratiQuestion && f.gujaratiQuestion.includes(q)) ||
      (f.hindiQuestion && f.hindiQuestion.includes(q))
    );
  });

  return (
    <LocalizedContent>
    <div style={{ paddingTop: '36px', paddingBottom: '70px', backgroundColor: 'var(--bg-body)' }}>
      <div className="app-container" style={{ maxWidth: '820px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <span style={{ fontSize: '0.84rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-wheat-600)' }}>
            Customer Support & Answers
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 800, margin: '6px 0 8px 0' }}>
            Questions People Ask Us
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
            If your question is not answered here, please call us directly. We would rather answer it personally than have you guess.
          </p>
        </div>

        {/* Search Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: '#FFFFFF',
          padding: '12px 18px',
          borderRadius: 'var(--radius-md)',
          border: '1.5px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '32px'
        }}>
          <Search size={20} color="var(--primary)" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type your question (e.g. shipping, freshness, Zelle, card fee)..."
            style={{
              flex: 1,
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: '0.98rem',
              color: 'var(--text-primary)',
              outline: 'none'
            }}
          />
        </div>

        {/* FAQ Accordions List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '40px' }}>
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            const questionTitle = lang === 'gu' && faq.gujaratiQuestion
              ? faq.gujaratiQuestion
              : lang === 'hi' && faq.hindiQuestion
              ? faq.hindiQuestion
              : faq.question;

            return (
              <div
                key={faq.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  border: `1.5px solid ${isOpen ? 'var(--primary)' : 'var(--border-subtle)'}`,
                  overflow: 'hidden',
                  transition: 'border-color 0.2s ease',
                  boxShadow: isOpen ? 'var(--shadow-md)' : 'var(--shadow-sm)'
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  style={{
                    width: '100%',
                    padding: '18px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    gap: '12px',
                    cursor: 'pointer',
                    backgroundColor: isOpen ? 'var(--color-cream-50)' : 'transparent'
                  }}
                  aria-expanded={isOpen}
                >
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {questionTitle}
                  </span>
                  {isOpen ? (
                    <ChevronUp size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                  ) : (
                    <ChevronDown size={20} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                  )}
                </button>

                {isOpen && (
                  <div style={{
                    padding: '18px 22px 22px 22px',
                    borderTop: '1px solid var(--border-subtle)',
                    fontSize: '0.98rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    backgroundColor: '#FFFFFF'
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Paying by Zelle Callout (Authentic Verified Feature) */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          border: '3px solid var(--primary)',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '32px'
        }}>
          <div style={{
            backgroundColor: 'var(--primary)',
            color: '#FFFFFF',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Sparkles size={20} color="var(--color-wheat-400)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
              Paying by Zelle (0% Processing Fee)
            </h2>
          </div>

          <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Open your bank app, select Zelle, and send the exact order total to the phone number below. 
              In the note/memo, write the short code from your order email or order confirmation page 
              (it looks like <b>FF-2026-XXXX</b>), so we know the funds are yours. Shipped orders are packed once your payment arrives.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              backgroundColor: 'var(--color-cream-50)',
              padding: '18px 22px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Send Zelle To Phone
                </span>
                <p style={{ margin: '4px 0 0 0', fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>
                  <a href={`tel:${BUSINESS_INFO.phoneRaw}`} style={{ color: 'inherit' }}>
                    {BUSINESS_INFO.zelleNumber}
                  </a>
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Registered Name on Zelle
                </span>
                <p style={{ margin: '4px 0 0 0', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {BUSINESS_INFO.zelleRecipient}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Still Not Sure? Call Us Card */}
        <div style={{
          backgroundColor: 'var(--color-wheat-100)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px 28px',
          border: '2px solid var(--color-wheat-400)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '36px'
        }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-earth-900)', margin: '0 0 4px 0' }}>
              Still have questions? Call us directly.
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-earth-800)', margin: 0 }}>
              We are an authentic family flour mill and happy to guide you on flour coarseness, recipes, or shipping.
            </p>
          </div>

          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="btn btn-primary"
            style={{ padding: '12px 22px', fontSize: '1rem', gap: '8px' }}
          >
            <Phone size={17} />
            <span>{BUSINESS_INFO.phone}</span>
          </a>
        </div>

        {/* Quick Nav Footer */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="btn btn-primary"
            style={{ padding: '12px 24px' }}
          >
            <span>Explore The Flours</span>
            <ArrowRight size={16} />
          </button>

          <button
            type="button"
            onClick={() => navigate('/shipping')}
            className="btn btn-secondary"
            style={{ padding: '12px 24px' }}
          >
            <span>View Delivery Costs</span>
          </button>
        </div>
      </div>
    </div>
    </LocalizedContent>
  );
}
