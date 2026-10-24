import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/products';
import { useCart } from '../context/CartContext';
import { Phone, MapPin, Clock, Send, CheckCircle2, Sparkles } from 'lucide-react';
import LocalizedContent from '../utils/localizeContent';

export default function ContactPage({ navigate }) {
  const { showToast } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiryType: 'general', // 'general' | 'pallet' | 'pickup'
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill out all required fields', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been sent to our milling team. We will call or email you promptly!', 'success');
  };

  return (
    <LocalizedContent>
    <div style={{ paddingTop: '36px', paddingBottom: '70px', backgroundColor: 'var(--bg-body)' }}>
      <div className="app-container" style={{ maxWidth: '960px' }}>
        {/* Header Breadcrumbs */}
        <div style={{ marginBottom: '32px' }}>
          <span style={{ fontSize: '0.84rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-wheat-600)' }}>
            We'd Love to Hear From You
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 800, margin: '6px 0 8px 0' }}>
            Contact The Fresh Flours Mill
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
            Have a question about grain coarseness, box shipping, or store pickup? Call us directly or send a message below.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '36px'
        }}>
          {/* Left Column: Direct Info Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Phone Card */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              border: '1.5px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-forest-50)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px'
              }}>
                <Phone size={22} color="var(--primary)" />
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-wheat-600)' }}>
                Call Us Directly
              </span>
              <p style={{ margin: '4px 0 6px 0', fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} style={{ color: 'inherit' }}>
                  {BUSINESS_INFO.phone}
                </a>
              </p>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0 }}>
                We would rather speak with you personally than have you guess about flour textures or order weights.
              </p>
            </div>

            {/* Store Pickup & Location Card */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              border: '1.5px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: '#ECFDF5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px'
              }}>
                <MapPin size={22} color="#059669" />
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-wheat-600)' }}>
                Mill Location & Pickup
              </span>
              <p style={{ margin: '4px 0 6px 0', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {BUSINESS_INFO.address}
              </p>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: '0 0 10px 0' }}>
                Store pickup is 100% free. Choose "Pickup in Store" at checkout.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <Clock size={15} color="var(--primary)" />
                <span>Hours: {BUSINESS_INFO.hours}</span>
              </div>
            </div>

            {/* Zelle Information */}
            <div style={{
              backgroundColor: 'var(--color-wheat-100)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              border: '1.5px solid rgba(196, 147, 62, 0.35)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Sparkles size={18} color="var(--color-wheat-600)" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: 'var(--color-earth-900)' }}>
                  Paying by Zelle
                </h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-earth-800)', lineHeight: 1.5, margin: 0 }}>
                Zelle orders carry 0% processing fee. Send to <b>{BUSINESS_INFO.zelleNumber}</b> (Registered Name: <b>{BUSINESS_INFO.zelleRecipient}</b>).
              </p>
            </div>
          </div>

          {/* Right Column: Contact & Pallet Inquiry Form */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '32px',
            border: '1.5px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '6px' }}>
              Send Our Team a Message
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Fill in your details below and we will get back to you within 24 hours.
            </p>

            {submitted ? (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                backgroundColor: 'var(--color-forest-50)',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid rgba(26, 57, 43, 0.2)'
              }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                  color: '#FFFFFF'
                }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--primary)' }}>
                  Message Received
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Thank you, {formData.name}. We have received your inquiry regarding our {formData.inquiryType} and will be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Patel"
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1.5px solid var(--border-subtle)',
                      backgroundColor: 'var(--color-cream-50)',
                      fontSize: '0.94rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 423-555-0199"
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1.5px solid var(--border-subtle)',
                        backgroundColor: 'var(--color-cream-50)',
                        fontSize: '0.94rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. ramesh@example.com"
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1.5px solid var(--border-subtle)',
                        backgroundColor: 'var(--color-cream-50)',
                        fontSize: '0.94rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
                    Inquiry Type
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1.5px solid var(--border-subtle)',
                      backgroundColor: 'var(--color-cream-50)',
                      fontSize: '0.94rem',
                      fontWeight: 600,
                      outline: 'none'
                    }}
                  >
                    <option value="general">General Flour & Order Question</option>
                    <option value="pallet">Wholesale / Pallet / Temple Order</option>
                    <option value="pickup">Store Pickup Coordination</option>
                    <option value="custom">Custom Coarseness / Grain Request</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the flours or grains you need, preferred pack sizes, or destination..."
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1.5px solid var(--border-subtle)',
                      backgroundColor: 'var(--color-cream-50)',
                      fontSize: '0.94rem',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '13px', fontSize: '1rem', marginTop: '6px' }}
                >
                  <Send size={16} />
                  <span>Send Message to Mill</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
    </LocalizedContent>
  );
}
