import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { US_STATES, BOX_CAPACITY_LB } from '../utils/shippingCalculator';
import LocalizedContent, { translateText } from '../utils/localizeContent';

export default function BoxEstimatorWidget({ onBasketClick }) {
  const { cartItems, lang } = useCart();
  const [zipCode, setZipCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [estimate, setEstimate] = useState(null);
  const [error, setError] = useState('');

  const basketWeight = Math.round(cartItems.reduce(
    (total, item) => total + (item.weightLb || 4) * item.quantity,
    0
  ) * 100) / 100;
  const boxesNeeded = basketWeight > 0 ? Math.ceil(basketWeight / BOX_CAPACITY_LB) : 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEstimate(null);
    setError('');

    const normalizedZip = zipCode.trim();
    if (!/^\d{5}$/.test(normalizedZip)) {
      setError('Enter a valid 5-digit U.S. ZIP code.');
      return;
    }
    if (basketWeight <= 0) {
      setError('Add items to your basket to estimate delivery.');
      return;
    }

    setIsLoading(true);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(`https://api.zippopotam.us/us/${normalizedZip}`, {
        signal: controller.signal
      });
      if (!response.ok) {
        throw new Error(response.status === 404 ? 'ZIP code not found. Check the number and try again.' : 'ZIP lookup is unavailable right now. Please try again.');
      }

      const location = await response.json();
      const stateCode = location.places?.[0]?.['state abbreviation'];
      if (!stateCode) {
        throw new Error('We could not identify a state for that ZIP code. Check the number and try again.');
      }

      const state = US_STATES.find((entry) => entry.code === stateCode) ||
        US_STATES.find((entry) => entry.code === 'OTHER');
      if (!state) {
        throw new Error('We could not calculate delivery for that ZIP code. Please try again.');
      }

      setEstimate({
        stateName: location.places[0]['state'],
        zipCode: normalizedZip,
        basketWeight,
        boxes: boxesNeeded,
        deliveryCost: boxesNeeded * state.costPerBox
      });
    } catch (lookupError) {
      console.error('Delivery ZIP lookup failed:', lookupError);
      setError(lookupError.name === 'AbortError'
        ? 'ZIP lookup is unavailable right now. Please try again.'
        : lookupError.message || 'ZIP lookup is unavailable right now. Please try again.');
    } finally {
      window.clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  return (
    <LocalizedContent>
      <section style={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        color: 'var(--text-primary)'
      }}>
        <div>
          <h2 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.2rem)', fontWeight: 800, margin: '0 0 18px 0' }}>
            What delivery costs
          </h2>
          <p style={{
            margin: 0,
            padding: '18px',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-earth-700)',
            borderRadius: 'var(--radius-md)',
            lineHeight: 1.65
          }}>
            Delivery isn&apos;t free, because grain is heavy. Enter your ZIP code to see an estimate based on your basket weight.
          </p>
        </div>

        <div style={{
          padding: '20px',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)'
        }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.94rem' }}>Your basket weighs</span>
          <p style={{ margin: '4px 0 14px', fontSize: '1.55rem', fontWeight: 800 }}>
            {translateText(`${basketWeight.toFixed(2)} lb`, lang)}
          </p>
          <button
            type="button"
            onClick={onBasketClick}
            style={{
              padding: 0,
              color: 'var(--primary)',
              background: 'none',
              textDecoration: 'underline',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Your basket
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            padding: '20px',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <label htmlFor="delivery-zip" style={{ display: 'block', fontWeight: 700, marginBottom: '10px' }}>
            Your ZIP code
          </label>
          <input
            id="delivery-zip"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            aria-required="true"
            value={zipCode}
            onChange={(event) => {
              setZipCode(event.target.value.replace(/\D/g, '').slice(0, 5));
              setEstimate(null);
              setError('');
            }}
            placeholder="30301"
            aria-describedby={error ? 'delivery-zip-error' : undefined}
            style={{
              width: '100%',
              padding: '14px',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '1.1rem',
              marginBottom: '14px'
            }}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '16px 20px', fontSize: '1rem', justifyContent: 'center' }}
          >
            {isLoading ? 'Finding your delivery estimate...' : 'Work out my delivery cost'}
          </button>
          {error && (
            <p id="delivery-zip-error" role="alert" style={{ margin: '12px 0 0', color: '#B42318', lineHeight: 1.5 }}>
              {error}
            </p>
          )}
          {estimate && estimate.basketWeight === basketWeight && (
            <div role="status" aria-live="polite" style={{
              marginTop: '16px',
              paddingTop: '14px',
              borderTop: '1px solid var(--border-subtle)'
            }}>
              <p style={{ margin: '0 0 5px', color: 'var(--text-muted)' }}>
                {translateText(`Estimated delivery to ${estimate.stateName} ${estimate.zipCode}`, lang)}
              </p>
              <p style={{ margin: 0, fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary)' }}>
                ${estimate.deliveryCost.toFixed(2)}
              </p>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                {translateText(`${estimate.boxes} ${estimate.boxes === 1 ? 'box' : 'boxes'} · up to 40 lb per box`, lang)}
              </span>
            </div>
          )}
        </form>

        <div style={{
          padding: '18px',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          lineHeight: 1.7
        }}>
          <p style={{ margin: '0 0 12px' }}>
            One box holds up to 40 lb. A heavier order is split into more boxes, and each box has its own delivery charge.
          </p>
          <p style={{ margin: 0 }}>
            Picking up at our store is free. Choose “Pickup in Store” at checkout.
          </p>
          <p style={{ margin: '12px 0 0', color: 'var(--text-muted)', fontSize: '0.84rem' }}>
            Rates shown are estimates based on the ZIP-code destination and current state rate. Final delivery cost is confirmed at checkout.
          </p>
        </div>
      </section>
    </LocalizedContent>
  );
}
