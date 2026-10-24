import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, ShoppingBag, Sparkles, Info } from 'lucide-react';
import LocalizedContent from '../utils/localizeContent';

export default function ProductDetailModal() {
  const {
    selectedProductForModal,
    setSelectedProductForModal,
    addToCart,
    lang
  } = useCart();

  const product = selectedProductForModal;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProductForModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedProductForModal]);

  if (!product) return null;

  const effectiveSize = selectedSize || product.size;
  const displayName = lang === 'gu'
    ? product.gujaratiName || product.name
    : lang === 'hi'
      ? product.hindiName || product.name
      : product.name;

  const currentSizeObj = product.availableSizes?.find(s => s.size === effectiveSize) || {
    size: product.size,
    price: product.price,
    weightLb: product.weightLb
  };

  const currentPrice = currentSizeObj.price;

  const handleAdd = () => {
    if (product.isOutOfStock || product.isComingSoon) return;
    addToCart(product, quantity, effectiveSize);
    setSelectedProductForModal(null);
  };

  return (
    <LocalizedContent>
      <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(18, 40, 30, 0.65)',
      backdropFilter: 'blur(8px)',
      padding: '20px',
      animation: 'fadeIn 0.25s ease'
    }}>
      {/* Click backdrop to close */}
      <div 
        style={{ position: 'absolute', inset: 0 }} 
        onClick={() => setSelectedProductForModal(null)} 
        aria-hidden="true" 
      />

      {/* Modal Dialog */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '860px',
          maxHeight: '90vh',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          overflowY: 'auto',
          zIndex: 10,
          border: '1.5px solid var(--border-subtle)',
          animation: 'slideDown 0.3s ease'
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-product-title"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setSelectedProductForModal(null)}
          className="btn-icon"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: 'var(--color-cream-100)',
            zIndex: 12,
            border: '1px solid var(--border-subtle)'
          }}
          aria-label="Close details"
        >
          <X size={20} />
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '30px',
          padding: '30px'
        }}>
          {/* Image Column */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-cream-50)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            border: '1px solid var(--border-subtle)',
            position: 'relative'
          }}>
            <img
              src={product.image}
              alt={displayName}
              style={{
                width: '100%',
                maxHeight: '340px',
                objectFit: 'contain'
              }}
            />

            {/* Badges */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginTop: '16px',
              justifyContent: 'center'
            }}>
              {product.milledDaily && (
                <span className="badge badge-green">
                  <Sparkles size={12} color="var(--primary)" />
                  Milled Daily in USA
                </span>
              )}
              {product.stoneground && (
                <span className="badge badge-gold">
                  100% Stoneground
                </span>
              )}
              {product.isPickupOnly && (
                <span className="badge badge-pickup">
                  Pickup Only
                </span>
              )}
            </div>
          </div>

          {/* Product Details Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Header Titles */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-wheat-600)', textTransform: 'uppercase' }}>
                  {product.categoryName}
                </span>
              </div>

              <h2 id="modal-product-title" style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>
                {displayName}
              </h2>
            </div>

            {/* Price Row */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              {!product.isComingSoon ? (
                <>
                  <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>
                    ${currentPrice.toFixed(2)}
                  </span>
                  <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                    per {selectedSize}
                  </span>
                </>
              ) : (
                <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-wheat-600)' }}>
                  Coming Soon
                </span>
              )}
            </div>

            {/* Size Selector */}
            {product.availableSizes && product.availableSizes.length > 0 && (
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '8px' }}>
                  Choose Pack Size:
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {product.availableSizes.map((s) => (
                    <button
                      key={s.size}
                      type="button"
                      onClick={() => setSelectedSize(s.size)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.92rem',
                        fontWeight: effectiveSize === s.size ? 700 : 500,
                        backgroundColor: effectiveSize === s.size ? 'var(--primary)' : 'var(--color-cream-100)',
                        color: effectiveSize === s.size ? '#FFFFFF' : 'var(--text-primary)',
                        border: effectiveSize === s.size ? '1.5px solid var(--primary)' : '1.5px solid var(--border-subtle)',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {s.size} — ${s.price.toFixed(2)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              {product.description}
            </p>

            {/* Highlights List */}
            {product.highlights && (
              <div style={{
                backgroundColor: 'var(--color-cream-50)',
                padding: '14px 18px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)'
              }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  Mill Quality Standards
                </span>
                <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {product.highlights.map((h, i) => (
                    <li key={i} style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Culinary Recommendation */}
            {product.culinaryUses && (
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <b style={{ color: 'var(--text-primary)' }}>Best For: </b>
                {product.culinaryUses}
              </div>
            )}

            {/* Pickup Note */}
            {product.isPickupOnly && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: '#FEF3C7',
                border: '1px solid #FCD34D'
              }}>
                <Info size={16} color="#92400E" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem', color: '#92400E', fontWeight: 600 }}>
                  This fragile item is available for store pickup only (not shipped in heavy grain boxes).
                </span>
              </div>
            )}

            {/* Action Buttons: Quantity Stepper & Add to Cart */}
            {!product.isComingSoon && !product.isOutOfStock && (
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '12px',
                marginTop: '10px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-subtle)'
              }}>
                {/* Quantity Stepper */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'var(--color-cream-100)',
                  border: '1.5px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden'
                }}>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ padding: '10px 14px', color: 'var(--text-primary)' }}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span style={{
                    padding: '0 14px',
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    minWidth: '40px',
                    textAlign: 'center'
                  }}>
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ padding: '10px 14px', color: 'var(--text-primary)' }}
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Add Button */}
                <button
                  type="button"
                  onClick={handleAdd}
                  className="btn btn-primary"
                  style={{
                    flex: 1,
                    padding: '13px 24px',
                    fontSize: '1rem',
                    gap: '10px'
                  }}
                >
                  <ShoppingBag size={18} />
                  <span>Add {quantity} to Basket • ${(currentPrice * quantity).toFixed(2)}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </LocalizedContent>
  );
}
