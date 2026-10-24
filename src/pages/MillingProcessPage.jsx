import React from 'react';
import LocalizedContent from '../utils/localizeContent';

const MILLING_STEPS = [
  {
    title: '1. Start with whole grain',
    description: 'We mill whole grains into flour in small, fresh batches rather than keeping piles of pre-ground flour in storage.'
  },
  {
    title: '2. Stone-mill to order',
    description: 'Our stone mill grinds the grain slowly into the traditional texture used for each flour.'
  },
  {
    title: '3. Pack it fresh',
    description: 'Freshly milled flour is packed for your order, ready for delivery or free store pickup.'
  }
];

export default function MillingProcessPage({ navigate }) {
  return (
    <LocalizedContent>
      <div style={{ flex: 1, padding: '36px 0 70px', backgroundColor: 'var(--bg-body)' }}>
        <div className="app-container" style={{ maxWidth: '960px' }}>
          <div style={{ marginBottom: '30px' }}>
            <span style={{
              fontSize: '0.84rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--color-wheat-600)'
            }}>
              How We Mill
            </span>
            <h1 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 800, margin: '6px 0 10px' }}>
              Our Milling Process
            </h1>
            <p style={{ maxWidth: '720px', fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
              From whole grain to freshly milled flour, here is how we prepare your order at The Fresh Flours.
            </p>
          </div>

          <img
            src="/fresh_flour_mill_hero.jpg"
            alt="Stone mill used to prepare fresh flour"
            style={{
              display: 'block',
              width: '100%',
              maxHeight: '440px',
              objectFit: 'cover',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '28px'
            }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {MILLING_STEPS.map((step) => (
              <article key={step.title} style={{
                padding: '22px',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)'
              }}>
                <h2 style={{ fontSize: '1.1rem', margin: '0 0 10px', fontWeight: 800 }}>
                  {step.title}
                </h2>
                <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  {step.description}
                </p>
              </article>
            ))}
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            marginTop: '28px'
          }}>
            <button type="button" className="btn btn-primary" onClick={() => navigate('/shop')}>
              Shop Fresh Flours
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/about')}
            >
              Our Story
            </button>
          </div>
        </div>
      </div>
    </LocalizedContent>
  );
}
