import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { BUSINESS_INFO } from '../data/products';
import { US_STATES } from '../utils/shippingCalculator';
import { normalizeUSPhone, validateEmail } from '../utils/contactValidation';
import LocalizedContent from '../utils/localizeContent';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Lock,
  ArrowRight,
  Truck,
  Store,
  Sparkles,
  Printer,
  ShoppingBag
} from 'lucide-react';

export default function CheckoutPage({ navigate }) {
  const {
    cartItems,
    orderMetrics,
    fulfillmentType,
    setFulfillmentType,
    selectedState,
    setSelectedState,
    paymentMethod,
    setPaymentMethod,
    clearCart,
    showToast,
    lang
  } = useCart();
  const getDisplayName = (item) => lang === 'gu'
    ? item.gujaratiName || item.name
    : lang === 'hi'
      ? item.hindiName || item.name
      : item.name;

  // Multi-step form state: 1 = Details, 2 = Address/Fulfillment, 3 = Payment & Confirmation
  const [step, setStep] = useState(1);

  // Customer input state
  const [customer, setCustomer] = useState({
    email: '',
    fullName: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    zipCode: '',
    deliveryNotes: ''
  });
  const [contactErrors, setContactErrors] = useState({});

  // Card input state (for card payment choice)
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardZip: ''
  });

  // Order confirmation state
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generated Zelle Reference Code
  const [zelleCode] = useState(() => `FF-2026-${Math.floor(1000 + Math.random() * 9000)}`);

  const handleInputChange = (field, value) => {
    setCustomer(prev => ({ ...prev, [field]: value }));
    setContactErrors(prev => {
      if (!prev[field]) return prev;
      const nextErrors = { ...prev };
      delete nextErrors[field];
      return nextErrors;
    });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      const normalizedEmail = customer.email.trim();
      const normalizedPhone = normalizeUSPhone(customer.phone);
      const nextErrors = {};

      if (!validateEmail(normalizedEmail)) {
        nextErrors.email = 'Enter a valid email address, such as name@example.com.';
      }
      if (!customer.fullName.trim()) {
        nextErrors.fullName = 'Enter your full name.';
      }
      if (!normalizedPhone) {
        nextErrors.phone = 'Enter a valid US phone number with area code, such as (423) 664-3353.';
      }

      setContactErrors(nextErrors);
      if (Object.keys(nextErrors).length > 0) {
        showToast('Please correct the highlighted contact details.', 'error');
        return;
      }
      setCustomer(prev => ({
        ...prev,
        email: normalizedEmail,
        fullName: prev.fullName.trim(),
        phone: normalizedPhone
      }));
      setStep(2);
    } else if (step === 2) {
      if (fulfillmentType === 'shipping') {
        if (!customer.address || !customer.city || !customer.zipCode) {
          showToast('Please enter your full delivery address and ZIP code', 'error');
          return;
        }
      }
      setStep(3);
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (paymentMethod === 'card') {
      if (!cardData.cardNumber || !cardData.cardExpiry || !cardData.cardCvc) {
        showToast('Please enter your card details', 'error');
        return;
      }
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `${zelleCode}-${customer.fullName.trim().split(' ').pop().toUpperCase() || 'ORDER'}`;
      
      const newOrder = {
        orderId,
        date: new Date().toISOString(),
        customer: { ...customer },
        fulfillmentType,
        selectedState,
        paymentMethod,
        items: [...cartItems],
        metrics: { ...orderMetrics },
        status: 'Order Placed (Queue for Daily Milling)',
        zelleCode: paymentMethod === 'zelle' ? zelleCode : null
      };

      // Save order to localStorage
      try {
        const pastOrders = JSON.parse(localStorage.getItem('the_fresh_flours_orders') || '[]');
        pastOrders.unshift(newOrder);
        localStorage.setItem('the_fresh_flours_orders', JSON.stringify(pastOrders));
      } catch (err) {
        console.error('Failed to save order to localStorage', err);
      }

      setConfirmedOrder(newOrder);
      clearCart();
      setIsSubmitting(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Confetti fallback
      }
    }, 900);
  };

  // If no items and not confirmed order, redirect or show message
  if (cartItems.length === 0 && !confirmedOrder) {
    return (
      <LocalizedContent>
      <div style={{ paddingTop: '60px', paddingBottom: '90px', backgroundColor: 'var(--bg-body)' }}>
        <div className="app-container" style={{ maxWidth: '600px', textAlign: 'center' }}>
          <ShoppingBag size={48} color="var(--primary)" style={{ margin: '0 auto 16px auto' }} />
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '10px' }}>
            No Items in Checkout
          </h1>
          <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Please add freshly stoneground flours or whole grains to your basket first.
          </p>
          <button type="button" onClick={() => navigate('/shop')} className="btn btn-primary">
            Explore Fresh Flours
          </button>
        </div>
      </div>
      </LocalizedContent>
    );
  }

  // =========================================================================
  // ORDER CONFIRMED VIEW
  // =========================================================================
  if (confirmedOrder) {
    return (
      <LocalizedContent>
      <div style={{ paddingTop: '40px', paddingBottom: '80px', backgroundColor: 'var(--bg-body)' }}>
        <div className="app-container" style={{ maxWidth: '780px' }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '40px',
            border: '2px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-xl)'
          }}>
            {/* Header Success */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-forest-50)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                border: '2px solid var(--primary)'
              }}>
                <CheckCircle2 size={36} />
              </div>
              <span style={{ fontSize: '0.84rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-wheat-600)' }}>
                Thank you, {confirmedOrder.customer.fullName}!
              </span>
              <h1 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', fontWeight: 800, margin: '6px 0 8px 0' }}>
                Your Order is Confirmed
              </h1>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', margin: 0 }}>
                Order Reference: <b style={{ color: 'var(--primary)', fontSize: '1.15rem' }}>{confirmedOrder.orderId}</b>
              </p>
            </div>

            {/* Zelle Instructions if Zelle selected */}
            {confirmedOrder.paymentMethod === 'zelle' && (
              <div style={{
                backgroundColor: 'var(--color-forest-50)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                border: '2px solid var(--primary)',
                marginBottom: '28px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <Sparkles size={20} color="var(--primary)" />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
                    Action Required: Send Zelle Payment
                  </h3>
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-forest-900)', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                  Open your mobile bank app, select Zelle, and transfer the exact total of{' '}
                  <b>${confirmedOrder.metrics.grandTotal.toFixed(2)}</b>.
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '12px',
                  backgroundColor: '#FFFFFF',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                      Send Zelle To
                    </span>
                    <p style={{ margin: '2px 0 0 0', fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
                      {BUSINESS_INFO.zelleNumber}
                    </p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                      Recipient Name
                    </span>
                    <p style={{ margin: '2px 0 0 0', fontSize: '1.15rem', fontWeight: 700 }}>
                      {BUSINESS_INFO.zelleRecipient}
                    </p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                      Write in Memo / Note
                    </span>
                    <p style={{ margin: '2px 0 0 0', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-wheat-600)' }}>
                      {confirmedOrder.zelleCode}
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--color-forest-700)', margin: '14px 0 0 0' }}>
                  * Shipped orders enter our morning stone-milling queue as soon as your Zelle payment is confirmed.
                </p>
              </div>
            )}

            {/* Store Pickup Notice if Pickup selected */}
            {confirmedOrder.fulfillmentType === 'pickup' && (
              <div style={{
                backgroundColor: '#ECFDF5',
                borderRadius: 'var(--radius-lg)',
                padding: '20px 24px',
                border: '1.5px solid #A7F3D0',
                marginBottom: '28px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Store size={20} color="#059669" />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#065F46', margin: 0 }}>
                    Ready for Store Pickup
                  </h3>
                </div>
                <p style={{ fontSize: '0.92rem', color: '#065F46', margin: 0, lineHeight: 1.5 }}>
                  Your fresh bags will be freshly stoneground and ready for collection at our Tennessee location. 
                  Call us at <b>{BUSINESS_INFO.phone}</b> if you have any questions before arriving.
                </p>
              </div>
            )}

            {/* Order Summary Receipt Box */}
            <div style={{
              backgroundColor: 'var(--color-cream-50)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              border: '1px solid var(--border-subtle)',
              marginBottom: '28px'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                Itemized Order Breakdown
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                {confirmedOrder.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
                    <span>
                      <b>{item.quantity} ×</b> {getDisplayName(item)} ({item.size})
                    </span>
                    <span style={{ fontWeight: 600 }}>
                      ${((item.price || 0) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Items Subtotal</span>
                  <span>${confirmedOrder.metrics.subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Total Weight & Packing</span>
                  <span>{confirmedOrder.metrics.totalWeightLb} lb ({confirmedOrder.metrics.totalBoxes} boxes)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Delivery ({confirmedOrder.fulfillmentType === 'pickup' ? 'Store Pickup' : confirmedOrder.selectedState})</span>
                  <span>{confirmedOrder.fulfillmentType === 'pickup' ? 'FREE ($0.00)' : `$${confirmedOrder.metrics.shippingCost.toFixed(2)}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Estimated Grocery Tax</span>
                  <span>${confirmedOrder.metrics.estimatedTax.toFixed(2)}</span>
                </div>
                {confirmedOrder.metrics.cardProcessingFee > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                    <span>3% Card Processing Surcharge</span>
                    <span>${confirmedOrder.metrics.cardProcessingFee.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: '2px solid var(--border-medium)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
                  <span>Total Paid / Payable</span>
                  <span>${confirmedOrder.metrics.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => window.print()}
                className="btn btn-secondary"
                style={{ gap: '8px' }}
              >
                <Printer size={16} />
                <span>Print Invoice</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/account')}
                className="btn btn-primary"
                style={{ gap: '8px' }}
              >
                <span>Track My Orders</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      </LocalizedContent>
    );
  }

  // =========================================================================
  // MULTI-STEP CHECKOUT FORM VIEW
  // =========================================================================
  return (
    <LocalizedContent>
    <div style={{ paddingTop: '36px', paddingBottom: '70px', backgroundColor: 'var(--bg-body)' }}>
      <div className="app-container">
        {/* Step Progression Indicators */}
        <div className="checkout-step-progress" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '36px'
        }}>
          <div className="checkout-step-item" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 700,
            fontSize: '0.92rem',
            color: step >= 1 ? 'var(--primary)' : 'var(--text-muted)'
          }}>
            <span style={{
              width: '28px',
              height: '28px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: step >= 1 ? 'var(--primary)' : 'var(--color-cream-200)',
              color: step >= 1 ? '#FFFFFF' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem'
            }}>
              1
            </span>
            <span className="checkout-step-label">Customer Details</span>
          </div>

          <div className="checkout-step-connector" style={{ width: '40px', height: '2px', backgroundColor: step >= 2 ? 'var(--primary)' : 'var(--border-subtle)' }} />

          <div className="checkout-step-item" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 700,
            fontSize: '0.92rem',
            color: step >= 2 ? 'var(--primary)' : 'var(--text-muted)'
          }}>
            <span style={{
              width: '28px',
              height: '28px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: step >= 2 ? 'var(--primary)' : 'var(--color-cream-200)',
              color: step >= 2 ? '#FFFFFF' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem'
            }}>
              2
            </span>
            <span className="checkout-step-label">Fulfillment & Address</span>
          </div>

          <div className="checkout-step-connector" style={{ width: '40px', height: '2px', backgroundColor: step >= 3 ? 'var(--primary)' : 'var(--border-subtle)' }} />

          <div className="checkout-step-item" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 700,
            fontSize: '0.92rem',
            color: step >= 3 ? 'var(--primary)' : 'var(--text-muted)'
          }}>
            <span style={{
              width: '28px',
              height: '28px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: step >= 3 ? 'var(--primary)' : 'var(--color-cream-200)',
              color: step >= 3 ? '#FFFFFF' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem'
            }}>
              3
            </span>
            <span className="checkout-step-label">Payment & Review</span>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '32px',
          alignItems: 'start'
        }}>
          {/* Main Form Step Area */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '32px',
            border: '1.5px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {/* STEP 1: Customer Details */}
            {step === 1 && (
              <form noValidate onSubmit={handleNextStep} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
                  1. Contact Information
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                  We will send your order receipt and daily stone-milling status to this email and phone.
                </p>

                <div>
                  <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
                    Email Address *
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    required
                    value={customer.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={() => setContactErrors(prev => ({
                      ...prev,
                      email: validateEmail(customer.email) ? undefined : 'Enter a valid email address, such as name@example.com.'
                    }))}
                    aria-invalid={Boolean(contactErrors.email)}
                    aria-describedby={contactErrors.email ? 'checkout-email-error' : undefined}
                    autoComplete="email"
                    maxLength={254}
                    placeholder="e.g. pratik@example.com"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1.5px solid var(--border-subtle)',
                      backgroundColor: 'var(--color-cream-50)',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                  {contactErrors.email && (
                    <span id="checkout-email-error" role="alert" style={{ display: 'block', marginTop: '6px', color: '#B42318', fontSize: '0.82rem' }}>
                      {contactErrors.email}
                    </span>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
                    Full Name *
                  </label>
                  <input
                    id="checkout-full-name"
                    type="text"
                    required
                    value={customer.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    onBlur={() => setContactErrors(prev => ({
                      ...prev,
                      fullName: customer.fullName.trim() ? undefined : 'Enter your full name.'
                    }))}
                    aria-invalid={Boolean(contactErrors.fullName)}
                    aria-describedby={contactErrors.fullName ? 'checkout-name-error' : undefined}
                    autoComplete="name"
                    maxLength={100}
                    placeholder="e.g. Pratik Patel"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1.5px solid var(--border-subtle)',
                      backgroundColor: 'var(--color-cream-50)',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                  {contactErrors.fullName && (
                    <span id="checkout-name-error" role="alert" style={{ display: 'block', marginTop: '6px', color: '#B42318', fontSize: '0.82rem' }}>
                      {contactErrors.fullName}
                    </span>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
                    Mobile Phone Number *
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    required
                    inputMode="tel"
                    value={customer.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    onBlur={() => setContactErrors(prev => ({
                      ...prev,
                      phone: normalizeUSPhone(customer.phone) ? undefined : 'Enter a valid US phone number with area code, such as (423) 664-3353.'
                    }))}
                    aria-invalid={Boolean(contactErrors.phone)}
                    aria-describedby={contactErrors.phone ? 'checkout-phone-error' : 'checkout-phone-help'}
                    autoComplete="tel"
                    maxLength={25}
                    placeholder="e.g. 423-664-3353"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1.5px solid var(--border-subtle)',
                      backgroundColor: 'var(--color-cream-50)',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                  {contactErrors.phone && (
                    <span id="checkout-phone-error" role="alert" style={{ display: 'block', marginTop: '6px', color: '#B42318', fontSize: '0.82rem' }}>
                      {contactErrors.phone}
                    </span>
                  )}
                  <span id="checkout-phone-help" style={{ display: 'block', marginTop: '6px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Needed for carrier box delivery notifications or store pickup verification.
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '13px', fontSize: '1rem', marginTop: '10px' }}
                >
                  <span>Continue to Fulfillment</span>
                  <ArrowRight size={17} />
                </button>
              </form>
            )}

            {/* STEP 2: Fulfillment & Address */}
            {step === 2 && (
              <form onSubmit={handleNextStep} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
                    2. Choose Delivery Method
                  </h2>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{ fontSize: '0.84rem', color: 'var(--primary)', fontWeight: 700 }}
                  >
                    Edit Contact
                  </button>
                </div>

                {/* Fulfillment Toggle */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px'
                }}>
                  <div
                    onClick={() => setFulfillmentType('shipping')}
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      border: `2px solid ${fulfillmentType === 'shipping' ? 'var(--primary)' : 'var(--border-subtle)'}`,
                      backgroundColor: fulfillmentType === 'shipping' ? 'var(--color-forest-50)' : '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Truck size={18} color={fulfillmentType === 'shipping' ? 'var(--primary)' : 'var(--text-muted)'} />
                      <b style={{ fontSize: '0.95rem', color: fulfillmentType === 'shipping' ? 'var(--primary)' : 'inherit' }}>
                        Carrier Box Delivery
                      </b>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Packed in 40 lb heavy boxes & shipped to your address
                    </span>
                  </div>

                  <div
                    onClick={() => setFulfillmentType('pickup')}
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      border: `2px solid ${fulfillmentType === 'pickup' ? 'var(--primary)' : 'var(--border-subtle)'}`,
                      backgroundColor: fulfillmentType === 'pickup' ? '#ECFDF5' : '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Store size={18} color={fulfillmentType === 'pickup' ? '#059669' : 'var(--text-muted)'} />
                      <b style={{ fontSize: '0.95rem', color: fulfillmentType === 'pickup' ? '#059669' : 'inherit' }}>
                        Free Store Pickup ($0)
                      </b>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Pick up directly at our Tennessee mill
                    </span>
                  </div>
                </div>

                {/* Shipping Address Inputs if Shipping selected */}
                {fulfillmentType === 'shipping' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
                        Street Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={customer.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="e.g. 124 Main Street"
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1.5px solid var(--border-subtle)',
                          backgroundColor: 'var(--color-cream-50)',
                          fontSize: '0.95rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
                        Apartment, Suite, Unit (optional)
                      </label>
                      <input
                        type="text"
                        value={customer.apartment}
                        onChange={(e) => handleInputChange('apartment', e.target.value)}
                        placeholder="e.g. Apt 4B"
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1.5px solid var(--border-subtle)',
                          backgroundColor: 'var(--color-cream-50)',
                          fontSize: '0.95rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={customer.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="e.g. Atlanta"
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1.5px solid var(--border-subtle)',
                            backgroundColor: 'var(--color-cream-50)',
                            fontSize: '0.95rem',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
                          State *
                        </label>
                        <select
                          value={selectedState}
                          onChange={(e) => setSelectedState(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1.5px solid var(--border-subtle)',
                            backgroundColor: 'var(--color-cream-50)',
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            outline: 'none'
                          }}
                        >
                          {US_STATES.map((s) => (
                            <option key={s.code} value={s.code}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          required
                          value={customer.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          placeholder="e.g. 30301"
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1.5px solid var(--border-subtle)',
                            backgroundColor: 'var(--color-cream-50)',
                            fontSize: '0.95rem',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    padding: '20px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-cream-50)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <b style={{ display: 'block', marginBottom: '6px', color: 'var(--text-primary)' }}>
                      Store Pickup Address:
                    </b>
                    <p style={{ margin: '0 0 4px 0', fontSize: '0.95rem' }}>
                      {BUSINESS_INFO.address}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Hours: {BUSINESS_INFO.hours} • Phone: {BUSINESS_INFO.phone}
                    </p>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn btn-secondary"
                    style={{ flex: 1, padding: '12px' }}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ flex: 2, padding: '12px' }}
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight size={17} />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Payment Choice & Final Review */}
            {step === 3 && (
              <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
                    3. Select Payment Method
                  </h2>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    style={{ fontSize: '0.84rem', color: 'var(--primary)', fontWeight: 700 }}
                  >
                    Edit Delivery
                  </button>
                </div>

                {/* Payment Option 1: Zelle (0% Fee - Recommended) */}
                <div
                  onClick={() => setPaymentMethod('zelle')}
                  style={{
                    padding: '18px 20px',
                    borderRadius: 'var(--radius-md)',
                    border: `2px solid ${paymentMethod === 'zelle' ? 'var(--primary)' : 'var(--border-subtle)'}`,
                    backgroundColor: paymentMethod === 'zelle' ? 'var(--color-forest-50)' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="radio"
                        checked={paymentMethod === 'zelle'}
                        onChange={() => setPaymentMethod('zelle')}
                        style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
                      />
                      <b style={{ fontSize: '1rem', color: paymentMethod === 'zelle' ? 'var(--primary)' : 'inherit' }}>
                        Zelle (0% Fee — Recommended)
                      </b>
                    </div>
                    <span className="badge badge-green" style={{ fontSize: '0.72rem' }}>
                      Zero Surcharge
                    </span>
                  </div>
                  <p style={{ margin: '4px 0 0 24px', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    Pay via your bank app to <b>{BUSINESS_INFO.zelleNumber} ({BUSINESS_INFO.zelleRecipient})</b> using memo code{' '}
                    <b>{zelleCode}</b>. Your order is confirmed immediately.
                  </p>
                </div>

                {/* Payment Option 2: Card (3% Card Processing Fee) */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  style={{
                    padding: '18px 20px',
                    borderRadius: 'var(--radius-md)',
                    border: `2px solid ${paymentMethod === 'card' ? 'var(--primary)' : 'var(--border-subtle)'}`,
                    backgroundColor: paymentMethod === 'card' ? 'var(--color-cream-50)' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="radio"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
                      />
                      <b style={{ fontSize: '1rem', color: paymentMethod === 'card' ? 'var(--primary)' : 'inherit' }}>
                        Credit or Debit Card (+3% Fee)
                      </b>
                    </div>
                    <span className="badge" style={{ backgroundColor: '#F3F4F6', color: '#4B5563', fontSize: '0.72rem' }}>
                      3% Merchant Fee
                    </span>
                  </div>
                  <p style={{ margin: '4px 0 0 24px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                    Standard bank card surcharge of 3% is added to the subtotal, shipping, and tax.
                  </p>

                  {/* Card Inputs if selected */}
                  {paymentMethod === 'card' && (
                    <div style={{ marginTop: '12px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <input
                        type="text"
                        placeholder="Card Number (4242 •••• •••• 4242)"
                        value={cardData.cardNumber}
                        onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-subtle)',
                          backgroundColor: '#FFFFFF',
                          fontSize: '0.92rem'
                        }}
                      />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                        <input
                          type="text"
                          placeholder="MM / YY"
                          value={cardData.cardExpiry}
                          onChange={(e) => setCardData({ ...cardData, cardExpiry: e.target.value })}
                          style={{
                            padding: '10px 12px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border-subtle)',
                            backgroundColor: '#FFFFFF',
                            fontSize: '0.92rem'
                          }}
                        />
                        <input
                          type="text"
                          placeholder="CVC"
                          value={cardData.cardCvc}
                          onChange={(e) => setCardData({ ...cardData, cardCvc: e.target.value })}
                          style={{
                            padding: '10px 12px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border-subtle)',
                            backgroundColor: '#FFFFFF',
                            fontSize: '0.92rem'
                          }}
                        />
                        <input
                          type="text"
                          placeholder="ZIP"
                          value={cardData.cardZip}
                          onChange={(e) => setCardData({ ...cardData, cardZip: e.target.value })}
                          style={{
                            padding: '10px 12px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border-subtle)',
                            backgroundColor: '#FFFFFF',
                            fontSize: '0.92rem'
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Payment Option 3: Pay on Pickup (Store Pickup Only) */}
                {fulfillmentType === 'pickup' && (
                  <div
                    onClick={() => setPaymentMethod('pickup')}
                    style={{
                      padding: '18px 20px',
                      borderRadius: 'var(--radius-md)',
                      border: `2px solid ${paymentMethod === 'pickup' ? 'var(--primary)' : 'var(--border-subtle)'}`,
                      backgroundColor: paymentMethod === 'pickup' ? '#ECFDF5' : '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="radio"
                        checked={paymentMethod === 'pickup'}
                        onChange={() => setPaymentMethod('pickup')}
                        style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
                      />
                      <b style={{ fontSize: '1rem', color: paymentMethod === 'pickup' ? '#059669' : 'inherit' }}>
                        Pay at Store on Pickup (0% Fee)
                      </b>
                    </div>
                    <p style={{ margin: '4px 0 0 24px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                      Pay via cash or card when picking up your freshly ground flour at our Tennessee mill.
                    </p>
                  </div>
                )}

                {/* Final Place Order Button */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="btn btn-secondary"
                    style={{ flex: 1, padding: '13px' }}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                    style={{ flex: 2, padding: '13px', fontSize: '1.05rem', gap: '8px' }}
                  >
                    <Lock size={16} />
                    <span>
                      {isSubmitting ? 'Confirming Order...' : `Confirm & Place Order • $${orderMetrics.grandTotal.toFixed(2)}`}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Dynamic Order Summary Sidebar */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '26px',
            border: '1.5px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
              Order Items ({cartItems.length})
            </h3>

            {/* Quick List */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              maxHeight: '260px',
              overflowY: 'auto',
              paddingRight: '4px'
            }}>
              {cartItems.map((item) => (
                <div key={item.cartItemId} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={item.image}
                    alt={getDisplayName(item)}
                    style={{ width: '44px', height: '44px', objectFit: 'contain', borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--color-cream-50)', border: '1px solid var(--border-subtle)', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '0.88rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {getDisplayName(item)}
                    </p>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {item.quantity} × {item.size}
                    </span>
                  </div>
                  <b style={{ fontSize: '0.94rem', color: 'var(--primary)' }}>
                    ${((item.price || 0) * item.quantity).toFixed(2)}
                  </b>
                </div>
              ))}
            </div>

            {/* Packaging and Totals */}
            <div style={{
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '0.88rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Total Weight</span>
                <span>{orderMetrics.totalWeightLb} lb ({orderMetrics.totalBoxes} {orderMetrics.totalBoxes === 1 ? 'box' : 'boxes'})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Delivery</span>
                <span>{fulfillmentType === 'pickup' ? 'FREE ($0.00)' : `$${orderMetrics.shippingCost.toFixed(2)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Grocery Tax</span>
                <span>${orderMetrics.estimatedTax.toFixed(2)}</span>
              </div>
              {orderMetrics.cardProcessingFee > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>3% Card Processing Surcharge</span>
                  <span>${orderMetrics.cardProcessingFee.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px dashed var(--border-medium)', paddingTop: '10px', fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary)' }}>
                <span>Final Total</span>
                <span>${orderMetrics.grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </LocalizedContent>
  );
}
