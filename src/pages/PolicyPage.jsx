import React from 'react';
import { ShieldCheck, Truck, RefreshCw, FileText } from 'lucide-react';
import LocalizedContent from '../utils/localizeContent';

export default function PolicyPage({ policyType = 'shipping', navigate }) {
  const policies = {
    shipping: {
      title: 'Shipping & Delivery Policy',
      subtitle: 'Transparent grain freight, 40 lb box capacity, and carrier dispatch rules.',
      icon: Truck,
      content: [
        {
          heading: '1. Why Grain Delivery is Never "Free"',
          text: 'Grain and stoneground flours are heavy agricultural commodities. Companies offering "free shipping" artificially inflate their bag prices by 30% to 50% to absorb shipping fees. At The Fresh Flours, we sell our stoneground flour at genuine, affordable prices, and charge you only what the shipping carrier charges to transport your box.'
        },
        {
          heading: '2. The 40 lb Box Standard',
          text: 'To protect the flour bags from bursting or tearing during transit, we pack up to 40 lb of grain into reinforced, inspected corrugated boxes. If your order exceeds 40 lb, it will be split into multiple boxes, and each box incurs its own shipping charge.'
        },
        {
          heading: '3. Store Pickup in Tennessee',
          text: 'Free store pickup is available for all customers who choose "Pickup in Store" at checkout. There is zero delivery charge ($0.00) for store collection. Certain items (such as Puffed Mamra and delicate Khakharas) are pickup-only and cannot be shipped in heavy parcel boxes.'
        },
        {
          heading: '4. Daily Stone-Milling & Dispatch Times',
          text: 'All grain is freshly stoneground upon receiving customer orders. Standard orders are milled and packaged within 24–48 hours and dispatched via ground freight carrier. You will receive an email notification when your box is sealed.'
        }
      ]
    },
    returns: {
      title: 'Return & Refund Policy',
      subtitle: 'Food safety standards and damaged transit guarantees.',
      icon: RefreshCw,
      content: [
        {
          heading: '1. Food Safety & Custom Milled Commodities',
          text: 'Because our flours are custom stoneground to order from whole grains and contain zero preservatives or chemical stabilizers, we cannot accept returns on food products once they have left our facility, in strict compliance with federal food safety regulations.'
        },
        {
          heading: '2. Damaged in Transit Guarantee',
          text: 'If your delivery box arrives damaged, torn, or broken by the carrier, please contact us within 48 hours of delivery at +1 (423) 664-3353 or email info@thefreshflours.com with photos of the damaged packaging. We will promptly dispatch a replacement or issue a refund.'
        },
        {
          heading: '3. Cancellations & Address Corrections',
          text: 'Orders may be cancelled or modified only prior to the morning milling and box packing run. Once a box has been sealed with a carrier label, the order cannot be intercepted.'
        }
      ]
    },
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'How we protect and respect your customer information.',
      icon: ShieldCheck,
      content: [
        {
          heading: '1. Information We Collect',
          text: 'We collect only the essential information needed to fulfill your flour order: your name, delivery address, phone number, and email address for order notifications.'
        },
        {
          heading: '2. Zero Data Selling or Third-Party Marketing',
          text: 'We will never sell, lease, or share your personal contact details with third-party marketers or data brokers. Your email and phone number are used strictly for order tracking and optional fresh milling batch updates.'
        },
        {
          heading: '3. Payment Data Security',
          text: 'We do not store your credit card details on our servers. For Zelle payments, transfers occur directly through your banking institution.'
        }
      ]
    },
    terms: {
      title: 'Terms of Service',
      subtitle: 'Guidelines and agreement for ordering from The Fresh Flours.',
      icon: FileText,
      content: [
        {
          heading: '1. Order Acceptance & Stone-Milling',
          text: 'Placement of an order signifies an agreement to purchase stoneground flours subject to availability of fresh grain harvests. All orders are milled daily in the USA.'
        },
        {
          heading: '2. Payment Methods & Processing Surcharges',
          text: 'We accept payments via Zelle (0% fee), Credit/Debit Card (subject to a transparent 3% processing fee), or Cash/Card at Store Pickup. When paying by Zelle, the customer agrees to input their assigned Order Reference Code in the bank transfer memo.'
        },
        {
          heading: '3. Product Shelf Life & Storage',
          text: 'Because our flours contain natural wheat germ and no chemical preservatives, customers are advised to store flours in dry, airtight containers in a cool pantry or refrigerator, and consume within 6 to 8 weeks for optimal freshness.'
        }
      ]
    }
  };

  const currentPolicy = policies[policyType] || policies.shipping;
  const Icon = currentPolicy.icon;

  return (
    <LocalizedContent>
    <div style={{ paddingTop: '36px', paddingBottom: '70px', backgroundColor: 'var(--bg-body)' }}>
      <div className="app-container" style={{ maxWidth: '820px' }}>
        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-forest-50)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '14px',
            color: 'var(--primary)'
          }}>
            <Icon size={24} />
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 3.6vw, 2.8rem)', fontWeight: 800, margin: '0 0 8px 0' }}>
            {currentPolicy.title}
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
            {currentPolicy.subtitle}
          </p>
        </div>

        {/* Content Blocks */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          padding: '36px',
          border: '1.5px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
          marginBottom: '36px'
        }}>
          {currentPolicy.content.map((section, idx) => (
            <div key={idx}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                {section.heading}
              </h2>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
                {section.text}
              </p>
            </div>
          ))}
        </div>

        {/* Policy Switcher Quick Links */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '20px',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--color-cream-100)',
          border: '1px solid var(--border-subtle)',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Other Policies:
          </span>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button
              type="button"
              onClick={() => navigate('/shipping-policy')}
              style={{
                fontSize: '0.84rem',
                fontWeight: 600,
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: policyType === 'shipping' ? 'var(--primary)' : '#FFFFFF',
                color: policyType === 'shipping' ? '#FFFFFF' : 'var(--text-primary)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              Shipping Policy
            </button>

            <button
              type="button"
              onClick={() => navigate('/return-policy')}
              style={{
                fontSize: '0.84rem',
                fontWeight: 600,
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: policyType === 'returns' ? 'var(--primary)' : '#FFFFFF',
                color: policyType === 'returns' ? '#FFFFFF' : 'var(--text-primary)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              Return Policy
            </button>

            <button
              type="button"
              onClick={() => navigate('/privacy-policy')}
              style={{
                fontSize: '0.84rem',
                fontWeight: 600,
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: policyType === 'privacy' ? 'var(--primary)' : '#FFFFFF',
                color: policyType === 'privacy' ? '#FFFFFF' : 'var(--text-primary)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              Privacy Policy
            </button>

            <button
              type="button"
              onClick={() => navigate('/terms')}
              style={{
                fontSize: '0.84rem',
                fontWeight: 600,
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: policyType === 'terms' ? 'var(--primary)' : '#FFFFFF',
                color: policyType === 'terms' ? '#FFFFFF' : 'var(--text-primary)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </div>
    </LocalizedContent>
  );
}
