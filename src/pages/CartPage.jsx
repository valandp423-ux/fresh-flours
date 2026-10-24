import React from 'react';
import { useCart } from '../context/CartContext';
import { US_STATES } from '../utils/shippingCalculator';
import { Plus, Minus, Trash2, ShoppingBag, Truck, Store, ArrowRight, Package, AlertCircle } from 'lucide-react';
import LocalizedContent, { translateText } from '../utils/localizeContent';

export default function CartPage({ navigate }) {
  const {
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

  const boxFillPercent = Math.min(100, Math.round((orderMetrics.currentBoxWeight / orderMetrics.boxCapacityLb) * 100));
  const getDisplayName = (item) => lang === 'gu'
    ? item.gujaratiName || item.name
    : lang === 'hi'
      ? item.hindiName || item.name
      : item.name;

  if (cartItems.length === 0) {
    return (
      <LocalizedContent>
      <div style={{ paddingTop: '60px', paddingBottom: '90px', backgroundColor: 'var(--bg-body)' }}>
        <div className="app-container" style={{ maxWidth: '640px', textAlign: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-cream-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto'
          }}>
            <ShoppingBag size={40} color="var(--primary)" />
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '10px' }}>
            Your Basket is Empty
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '28px' }}>
            Nothing has been added to your basket yet. Explore our stoneground pearl millet, sorghum, 
            chapati, bhakhari, and whole grain varieties.
          </p>

          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="btn btn-primary"
            style={{ padding: '14px 28px', fontSize: '1.05rem' }}
          >
            <span>Explore Fresh Flours</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      </LocalizedContent>
    );
  }

  return (
    <LocalizedContent>
    <div style={{ paddingTop: '36px', paddingBottom: '70px', backgroundColor: 'var(--bg-body)' }}>
      <div className="app-container">
        {/* Header Breadcrumbs */}
        <div style={{ marginBottom: '32px' }}>
          <span style={{ fontSize: '0.84rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-wheat-600)' }}>
            Review Your Items
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.8rem)', fontWeight: 800, margin: '6px 0 0 0' }}>
            Your Shopping Basket
          </h1>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '32px',
          alignItems: 'start'
        }}>
          {/* Left Column: Items List & Box Gauge */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Box Gauge Card */}
            {fulfillmentType === 'shipping' && (
              <div style={{
                backgroundColor: 'var(--color-forest-50)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px 24px',
                border: '1.5px solid rgba(26, 57, 43, 0.18)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Package size={20} color="var(--primary)" />
                    <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.05rem' }}>
                      {translateText(`Box ${orderMetrics.totalBoxes || 1} Packing: ${orderMetrics.currentBoxWeight} lb of ${orderMetrics.boxCapacityLb} lb`, lang)}
                    </span>
                  </div>
                  <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.94rem' }}>
                    {boxFillPercent}% Full
                  </span>
                </div>

                <div style={{
                  width: '100%',
                  height: '9px',
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

                <p style={{ margin: '8px 0 0 0', fontSize: '0.86rem', color: 'var(--color-forest-700)', lineHeight: 1.45 }}>
                  {orderMetrics.remainingInCurrentBox > 0
                    ? `You have ${orderMetrics.remainingInCurrentBox} lb of free space remaining in this box. Fill it with more flour without incurring any additional box shipping charge!`
                    : 'This box is completely packed to maximum 40 lb capacity. Any additional items will begin a fresh box.'}
                </p>
              </div>
            )}

            {/* Warning if has pickup-only items */}
            {orderMetrics.hasPickupOnlyItems && fulfillmentType === 'shipping' && (
              <div style={{
                backgroundColor: '#FEF3C7',
                borderRadius: 'var(--radius-md)',
                padding: '14px 18px',
                border: '1.5px solid #FCD34D',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <AlertCircle size={22} color="#92400E" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: '#92400E', fontWeight: 600 }}>
                  Your basket contains items marked "Pickup Only" (such as Mamra or Snacks). They cannot be packed safely inside heavy grain boxes. Please switch fulfillment to <b>Store Pickup</b> below.
                </span>
              </div>
            )}

            {/* Cart Items Table */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '1.5px solid var(--border-subtle)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                padding: '16px 20px',
                backgroundColor: 'var(--color-cream-50)',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: 700,
                fontSize: '0.88rem',
                color: 'var(--text-muted)'
              }}>
                <span>Product</span>
                <span>Subtotal</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', divideY: '1px solid var(--border-subtle)' }}>
                {cartItems.map((item) => (
                  <div
                    key={item.cartItemId}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '18px 20px',
                      borderBottom: '1px solid var(--border-subtle)'
                    }}
                  >
                    <img
                      src={item.image}
                      alt={getDisplayName(item)}
                      style={{
                        width: '70px',
                        height: '70px',
                        objectFit: 'contain',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--color-cream-50)',
                        border: '1px solid var(--border-subtle)',
                        flexShrink: 0
                      }}
                    />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 2px 0' }}>
                        {getDisplayName(item)}
                      </h4>
                      {lang === 'en' && item.gujaratiName && (
                        <span style={{ fontSize: '0.82rem', color: 'var(--color-wheat-600)', fontWeight: 600 }}>
                          {item.gujaratiName} •{' '}
                        </span>
                      )}
                      <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                        Pack: <b>{item.size}</b> (${item.price.toFixed(2)} ea)
                      </span>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        marginTop: '10px'
                      }}>
                        {/* Stepper */}
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          backgroundColor: 'var(--color-cream-50)',
                          border: '1.5px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-sm)',
                          overflow: 'hidden'
                        }}>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            style={{ padding: '5px 10px', color: 'var(--text-primary)' }}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span style={{ padding: '0 12px', fontSize: '0.94rem', fontWeight: 800, minWidth: '32px', textAlign: 'center' }}>
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            style={{ padding: '5px 10px', color: 'var(--text-primary)' }}
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartItemId)}
                          style={{
                            color: 'var(--text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.82rem',
                            fontWeight: 600
                          }}
                        >
                          <Trash2 size={15} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>
                        ${((item.price || 0) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping Button */}
            <div>
              <button
                type="button"
                onClick={() => navigate('/shop')}
                className="btn btn-secondary"
                style={{ padding: '10px 18px', fontSize: '0.92rem' }}
              >
                ← Continue Shopping
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout Action */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '28px',
            border: '1.5px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>
              Order Summary
            </h2>

            {/* Fulfillment Switcher */}
            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '8px' }}>
                Fulfillment Method:
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                backgroundColor: 'var(--color-cream-50)',
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
                    padding: '9px',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.86rem',
                    fontWeight: fulfillmentType === 'shipping' ? 700 : 500,
                    backgroundColor: fulfillmentType === 'shipping' ? 'var(--primary)' : 'transparent',
                    color: fulfillmentType === 'shipping' ? '#FFFFFF' : 'var(--text-secondary)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Truck size={16} />
                  <span>Ship To Door</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfillmentType('pickup')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '9px',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.86rem',
                    fontWeight: fulfillmentType === 'pickup' ? 700 : 500,
                    backgroundColor: fulfillmentType === 'pickup' ? 'var(--primary)' : 'transparent',
                    color: fulfillmentType === 'pickup' ? '#FFFFFF' : 'var(--text-secondary)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Store size={16} />
                  <span>Store Pickup ($0)</span>
                </button>
              </div>
            </div>

            {/* Destination State Selector if Shipping */}
            {fulfillmentType === 'shipping' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                  Delivery State (Carrier Zone):
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid var(--border-subtle)',
                    backgroundColor: 'var(--color-cream-50)',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    outline: 'none'
                  }}
                >
                  {US_STATES.map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.name} (${state.costPerBox.toFixed(2)}/box)
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Breakdown Calculations */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              paddingTop: '12px',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '0.92rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Items Subtotal</span>
                <span style={{ fontWeight: 600 }}>${orderMetrics.subtotal.toFixed(2)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>
                  Total Weight
                </span>
                <span style={{ fontWeight: 600 }}>
                  {translateText(`${orderMetrics.totalWeightLb} lb (${orderMetrics.totalBoxes} ${orderMetrics.totalBoxes === 1 ? 'box' : 'boxes'})`, lang)}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Delivery Fee</span>
                <span style={{ fontWeight: 700, color: fulfillmentType === 'pickup' ? '#059669' : 'var(--text-primary)' }}>
                  {fulfillmentType === 'pickup' ? 'FREE ($0.00)' : `$${orderMetrics.shippingCost.toFixed(2)}`}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Estimated Grocery Tax</span>
                <span style={{ fontWeight: 600 }}>${orderMetrics.estimatedTax.toFixed(2)}</span>
              </div>
            </div>

            {/* Grand Total */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              paddingTop: '12px',
              borderTop: '2px dashed var(--border-medium)'
            }}>
              <div>
                <span style={{ fontSize: '1.15rem', fontWeight: 800 }}>Total (Pre-Payment Fee)</span>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Zelle = 0% fee • Card = 3% fee
                </p>
              </div>

              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)' }}>
                ${(orderMetrics.subtotal + orderMetrics.shippingCost + orderMetrics.estimatedTax).toFixed(2)}
              </span>
            </div>

            {/* Checkout CTA */}
            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '1.05rem',
                gap: '10px'
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            {/* Trust note */}
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>
              Payment choices (Zelle, Card, or Store Pickup) selected on the next screen.
            </p>
          </div>
        </div>
      </div>
    </div>
    </LocalizedContent>
  );
}
