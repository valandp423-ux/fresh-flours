import React from 'react';
import { useCart } from '../context/CartContext';
import { TRANSLATIONS } from '../data/translations';
import { US_STATES } from '../utils/shippingCalculator';
import { X, Plus, Minus, Trash2, ShoppingBag, Truck, Store, ArrowRight, Package, AlertCircle } from 'lucide-react';
import LocalizedContent, { translateText } from '../utils/localizeContent';

export default function CartDrawer({ navigate }) {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    updateQuantity,
    removeFromCart,
    orderMetrics,
    fulfillmentType,
    setFulfillmentType,
    selectedState,
    setSelectedState,
    lang
  } = useCart();

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleViewCart = () => {
    setIsCartOpen(false);
    navigate('/cart');
  };

  const boxFillPercent = Math.min(100, Math.round((orderMetrics.currentBoxWeight / orderMetrics.boxCapacityLb) * 100));
  const getDisplayName = (item) => lang === 'gu'
    ? item.gujaratiName || item.name
    : lang === 'hi'
      ? item.hindiName || item.name
      : item.name;

  return (
    <LocalizedContent>
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(18, 40, 30, 0.45)',
      backdropFilter: 'blur(4px)',
      animation: 'fadeIn 0.2s ease'
    }}>
      {/* Backdrop click to close */}
      <div 
        style={{ position: 'absolute', inset: 0 }} 
        onClick={() => setIsCartOpen(false)} 
        aria-hidden="true" 
      />

      {/* Drawer Panel */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '480px',
        height: '100%',
        backgroundColor: '#FFFFFF',
        boxShadow: 'var(--shadow-xl)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10,
        overflow: 'hidden',
        animation: 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {/* Drawer Header */}
        <div style={{
          padding: '18px 22px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--color-cream-50)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={22} color="var(--primary)" />
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                {t.basket}
              </h2>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="btn-icon"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-subtle)' }}
            aria-label="Close basket"
          >
            <X size={18} />
          </button>
        </div>

        {/* Box Packing Gauge Banner */}
        {cartItems.length > 0 && fulfillmentType === 'shipping' && (
          <div style={{
            padding: '14px 22px',
            backgroundColor: 'var(--color-forest-50)',
            borderBottom: '1px solid rgba(26, 57, 43, 0.12)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Package size={16} color="var(--primary)" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>
                  {translateText(`Box ${orderMetrics.totalBoxes || 1} Packing: ${orderMetrics.currentBoxWeight} lb of ${orderMetrics.boxCapacityLb} lb`, lang)}
                </span>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)' }}>
                {boxFillPercent}%
              </span>
            </div>

            {/* Progress Bar */}
            <div style={{
              width: '100%',
              height: '7px',
              backgroundColor: 'rgba(26, 57, 43, 0.15)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${boxFillPercent}%`,
                backgroundColor: 'var(--primary)',
                borderRadius: 'var(--radius-full)',
                transition: 'width 0.3s ease'
              }} />
            </div>

            <p style={{ margin: '6px 0 0 0', fontSize: '0.78rem', color: 'var(--color-forest-700)' }}>
              {orderMetrics.remainingInCurrentBox > 0
                ? `You can fit ${orderMetrics.remainingInCurrentBox} lb more in this box with no extra box fee.`
                : 'Current box is full. Additional items begin a new 40 lb box.'}
            </p>
          </div>
        )}

        {/* Pickup Only Warning if applicable */}
        {orderMetrics.hasPickupOnlyItems && fulfillmentType === 'shipping' && (
          <div style={{
            padding: '10px 20px',
            backgroundColor: '#FEF3C7',
            borderBottom: '1px solid #FCD34D',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={18} color="#92400E" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.82rem', color: '#92400E', fontWeight: 600 }}>
              Your basket has items marked "Pickup Only" (Mamra/Snacks). Switch to Store Pickup at checkout to complete this order.
            </span>
          </div>
        )}

        {/* Items List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 22px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {cartItems.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              height: '100%',
              gap: '14px',
              padding: '40px 20px'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-cream-200)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ShoppingBag size={32} color="var(--color-forest-800)" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Your basket is empty</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', maxWidth: '280px' }}>
                Discover freshly stoneground Indian flours and whole grains milled daily upon order.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/shop');
                }}
                className="btn btn-primary"
                style={{ marginTop: '8px' }}
              >
                Explore Fresh Flours
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.cartItemId}
                style={{
                  display: 'flex',
                  gap: '14px',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-cream-50)',
                  border: '1px solid var(--border-subtle)',
                  position: 'relative'
                }}
              >
                {/* Product Thumbnail */}
                <div style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img
                    src={item.image}
                    alt={getDisplayName(item)}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                        {getDisplayName(item)}
                      </h4>
                      {lang === 'en' && item.gujaratiName && (
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-wheat-600)', fontWeight: 600 }}>
                          {item.gujaratiName}
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary)' }}>
                      ${((item.price || 0) * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {translateText(`Size: ${item.size}`, lang)}
                    </span>
                    {item.isPickupOnly && (
                      <span className="badge badge-pickup" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                        Pickup Only
                      </span>
                    )}
                  </div>

                  {/* Quantity Stepper and Delete */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '10px'
                  }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      backgroundColor: '#FFFFFF',
                      border: '1.5px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden'
                    }}>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        style={{ padding: '4px 8px', color: 'var(--text-primary)' }}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span style={{
                        padding: '0 10px',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        minWidth: '28px',
                        textAlign: 'center'
                      }}>
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        style={{ padding: '4px 8px', color: 'var(--text-primary)' }}
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.cartItemId)}
                      style={{
                        color: 'var(--text-muted)',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.8rem'
                      }}
                      title="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Fulfillment & Subtotals */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '18px 22px',
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--color-cream-50)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {/* Fulfillment Switch: Shipping vs Store Pickup */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '6px',
              backgroundColor: '#FFFFFF',
              padding: '4px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)'
            }}>
              <button
                type="button"
                onClick={() => setFulfillmentType('shipping')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '7px 10px',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.82rem',
                  fontWeight: fulfillmentType === 'shipping' ? 700 : 500,
                  backgroundColor: fulfillmentType === 'shipping' ? 'var(--primary)' : 'transparent',
                  color: fulfillmentType === 'shipping' ? '#FFFFFF' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease'
                }}
              >
                <Truck size={14} />
                <span>Ship to Door</span>
              </button>

              <button
                type="button"
                onClick={() => setFulfillmentType('pickup')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '7px 10px',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.82rem',
                  fontWeight: fulfillmentType === 'pickup' ? 700 : 500,
                  backgroundColor: fulfillmentType === 'pickup' ? 'var(--primary)' : 'transparent',
                  color: fulfillmentType === 'pickup' ? '#FFFFFF' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease'
                }}
              >
                <Store size={14} />
                <span>Store Pickup ($0)</span>
              </button>
            </div>

            {/* State selector for shipping preview */}
            {fulfillmentType === 'shipping' && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Deliver to State:</span>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: '#FFFFFF',
                    fontSize: '0.84rem',
                    fontWeight: 600
                  }}
                >
                  {US_STATES.map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.name} ({state.zone})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Financial Summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Items Subtotal</span>
                <span style={{ fontWeight: 600 }}>${orderMetrics.subtotal.toFixed(2)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>
                  {translateText(`Total Weight (${orderMetrics.totalWeightLb} lb)`, lang)}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                  {translateText(`${orderMetrics.totalBoxes} ${orderMetrics.totalBoxes === 1 ? 'box' : 'boxes'} (max ${orderMetrics.boxCapacityLb} lb/box)`, lang)}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Delivery Cost</span>
                <span style={{ fontWeight: 600, color: fulfillmentType === 'pickup' ? '#059669' : 'inherit' }}>
                  {fulfillmentType === 'pickup' ? 'FREE ($0.00)' : `$${orderMetrics.shippingCost.toFixed(2)}`}
                </span>
              </div>
            </div>

            {/* Total Line */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              paddingTop: '8px',
              borderTop: '1px dashed var(--border-medium)'
            }}>
              <div>
                <span style={{ fontSize: '1.05rem', fontWeight: 800 }}>Estimated Total</span>
                <p style={{ margin: 0, fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  {orderMetrics.cardProcessingFee > 0 ? '+3% if paying card' : '0% fee by Zelle or In-Store'}
                </p>
              </div>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary)' }}>
                ${(orderMetrics.subtotal + orderMetrics.shippingCost).toFixed(2)}
              </span>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <button
                type="button"
                onClick={handleViewCart}
                className="btn btn-secondary"
                style={{ flex: 1, padding: '10px' }}
              >
                View Cart
              </button>
              <button
                type="button"
                onClick={handleCheckout}
                className="btn btn-primary"
                style={{ flex: 2, padding: '10px', fontSize: '1rem' }}
              >
                <span>Checkout</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </LocalizedContent>
  );
}
