import React from 'react';
import { useCart } from '../context/CartContext';
import { TRANSLATIONS } from '../data/translations';
import { Plus, Minus, Eye, ShoppingBag, Sparkles } from 'lucide-react';
import LocalizedContent from '../utils/localizeContent';

export default function ProductCard({ product }) {
  const {
    addToCart,
    updateQuantity,
    cartItems,
    setSelectedProductForModal,
    lang
  } = useCart();

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const displayName = lang === 'gu'
    ? product.gujaratiName || product.name
    : lang === 'hi'
      ? product.hindiName || product.name
      : product.name;
  const selectedSize = product.size;

  // Find if already in cart
  const cartItemId = `${product.id}-${selectedSize}`;
  const existingCartItem = cartItems.find(item => item.cartItemId === cartItemId);
  const qtyInCart = existingCartItem ? existingCartItem.quantity : 0;

  const isOutOfStock = product.isOutOfStock;
  const isComingSoon = product.isComingSoon;
  const isPickupOnly = product.isPickupOnly;

  const handleAdd = (e) => {
    e.stopPropagation();
    if (isOutOfStock || isComingSoon) return;
    addToCart(product, 1, selectedSize);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    setSelectedProductForModal(product);
  };

  return (
    <LocalizedContent>
    <article
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-md)',
        backgroundColor: '#FFFFFF',
        border: '1.5px solid var(--border-subtle)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
        transition: 'all 0.25s ease',
        position: 'relative'
      }}
      className="product-card"
    >
      {/* Product Image Stage */}
      <div 
        onClick={handleQuickView}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          backgroundColor: 'var(--color-cream-50)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          overflow: 'hidden'
        }}
      >
        <img
          src={product.image}
          alt={displayName}
          loading="lazy"
          style={{
            width: '90%',
            height: '90%',
            objectFit: 'contain',
            transition: 'transform 0.35s ease'
          }}
          className="product-img"
        />

        {/* Badges Overlay */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          zIndex: 2
        }}>
          {product.milledDaily && !isComingSoon && (
            <span className="badge badge-green" style={{ fontSize: '0.68rem', backgroundColor: '#FFFFFF', boxShadow: 'var(--shadow-sm)' }}>
              <Sparkles size={11} color="var(--primary)" />
              Milled Daily
            </span>
          )}
          {isPickupOnly && (
            <span className="badge badge-pickup" style={{ fontSize: '0.68rem' }}>
              Pickup Only
            </span>
          )}
          {isComingSoon && (
            <span className="badge badge-gold" style={{ fontSize: '0.68rem' }}>
              Coming Soon
            </span>
          )}
          {isOutOfStock && !isComingSoon && (
            <span className="badge" style={{ backgroundColor: '#F3F4F6', color: '#6B7280', border: '1px solid #D1D5DB', fontSize: '0.68rem' }}>
              Out of stock
            </span>
          )}
        </div>

        {/* Quick View Button Hover Trigger */}
        <button
          type="button"
          onClick={handleQuickView}
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '7px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            boxShadow: 'var(--shadow-md)',
            opacity: 0,
            transform: 'translateY(8px)',
            transition: 'all 0.2s ease',
            zIndex: 3
          }}
          className="quick-view-btn"
          aria-label={`Quick preview for ${displayName}`}
        >
          <Eye size={14} />
          <span>Quick View</span>
        </button>
      </div>

      {/* Card Content */}
      <div style={{
        padding: '16px 18px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }}>
        {/* Category & Indic Name */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '4px'
        }}>
          <span style={{
            fontSize: '0.74rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--text-muted)'
          }}>
            {product.categoryName}
          </span>
          {lang === 'en' && product.gujaratiName && (
            <span style={{
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--color-wheat-600)'
            }}>
              {product.gujaratiName}
            </span>
          )}
        </div>

        {/* Product Title */}
        <h3 
          onClick={handleQuickView}
          style={{
            fontSize: '1.15rem',
            fontWeight: 800,
            margin: '0 0 6px 0',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            lineHeight: 1.3
          }}
        >
          {displayName}
        </h3>

        {/* Short Culinary note */}
        <p style={{
          fontSize: '0.86rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.45,
          margin: '0 0 14px 0',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: '2.5rem'
        }}>
          {product.description}
        </p>

        {/* Pricing and Size Selector */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '12px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between'
        }}>
          <div>
            {!isComingSoon ? (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)' }}>
                  ${(product.price || 0).toFixed(2)}
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  / {selectedSize}
                </span>
              </div>
            ) : (
              <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-wheat-600)' }}>
                Arriving Soon
              </span>
            )}
          </div>

          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Pack: <b>{selectedSize}</b>
          </span>
        </div>

        {/* Add to Basket Action */}
        <div style={{ marginTop: '12px' }}>
          {isComingSoon ? (
            <button
              type="button"
              disabled
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-cream-200)',
                color: 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'not-allowed'
              }}
            >
              Coming Soon
            </button>
          ) : isOutOfStock ? (
            <button
              type="button"
              disabled
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-cream-100)',
                color: 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'not-allowed'
              }}
            >
              Out of stock
            </button>
          ) : qtyInCart > 0 ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'var(--color-forest-50)',
              border: '1.5px solid var(--primary)',
              borderRadius: 'var(--radius-sm)',
              padding: '4px 6px'
            }}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  updateQuantity(cartItemId, qtyInCart - 1);
                }}
                className="btn-icon"
                style={{ width: '34px', height: '34px', color: 'var(--primary)' }}
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>

              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--primary)' }}>
                  {qtyInCart} in basket
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  updateQuantity(cartItemId, qtyInCart + 1);
                }}
                className="btn-icon"
                style={{ width: '34px', height: '34px', color: 'var(--primary)' }}
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.92rem',
                gap: '8px'
              }}
            >
              <ShoppingBag size={16} />
              <span>{t.addToBasket}</span>
            </button>
          )}
        </div>
      </div>

      <style>{`
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-card-hover) !important;
          border-color: var(--primary) !important;
        }
        .product-card:hover .product-img {
          transform: scale(1.05);
        }
        .product-card:hover .quick-view-btn {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </article>
    </LocalizedContent>
  );
}
