import React from 'react';
import { BUSINESS_INFO } from '../data/products';
import { Sparkles, Award, ShieldCheck, Heart, Truck, Store, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import LocalizedContent from '../utils/localizeContent';

export default function AboutPage({ navigate }) {
  return (
    <LocalizedContent>
    <div style={{ paddingTop: '36px', paddingBottom: '70px', backgroundColor: 'var(--bg-body)' }}>
      <div className="app-container" style={{ maxWidth: '960px' }}>
        {/* Header Breadcrumbs */}
        <div style={{ marginBottom: '32px' }}>
          <span style={{ fontSize: '0.84rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-wheat-600)' }}>
            The Stoneground Craft
          </span>
          <h1 style={{ fontSize: 'clamp(2.1rem, 4vw, 3.2rem)', fontWeight: 800, margin: '6px 0 10px 0' }}>
            The Story of The Fresh Flours
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-earth-700)', margin: 0, lineHeight: 1.6, maxWidth: '720px' }}>
            Bringing the authentic aroma, sweetness, and nutrition of a traditional Indian flour mill directly to homes across the USA.
          </p>
        </div>

        {/* Hero Craft Image */}
        <div style={{
          position: 'relative',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          aspectRatio: '16 / 9',
          boxShadow: 'var(--shadow-xl)',
          border: '2px solid var(--border-subtle)',
          marginBottom: '50px'
        }}>
          <img
            src="/fresh_flour_mill_hero.jpg"
            alt="Artisan stoneground flour milling in our workshop"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '24px',
            right: '24px',
            backgroundColor: 'rgba(18, 40, 30, 0.85)',
            backdropFilter: 'blur(8px)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 22px',
            color: '#FFFFFF'
          }}>
            <p style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>
              "When you smell freshly stoneground wheat or pearl millet, you realize that supermarket flour hasn't been real flour for decades."
            </p>
          </div>
        </div>

        {/* Story Section 1: The Missing Taste in America */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '40px',
          alignItems: 'center',
          marginBottom: '60px'
        }}>
          <div>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-wheat-600)' }}>
              How It Began
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '8px 0 14px 0' }}>
              Why Do Rotlis Taste Better Back Home?
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '14px' }}>
              For decades, Indian families living in the United States have accepted a quiet compromise: dry, rubbery chapatis 
              and tasteless rotlas made from store-bought flour imported in shipping containers or manufactured by industrial roller mills.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
              Back home in Gujarat, Maharashtra, Punjab, and South India, mothers and grandmothers never kept bags of flour in 
              the cupboard for six months. Grain was taken to the neighborhood <i>chakki</i> every week and ground fresh. 
              The natural sweetness of the wheat germ and the earthy fragrance of freshly cracked millet transformed everyday meals. 
              <b>The Fresh Flours was founded to bring that exact freshness to the USA.</b>
            </p>
          </div>

          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            border: '1.5px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <Sparkles size={20} color="var(--primary)" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                The Live Germ Secret
              </h3>
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 14px 0' }}>
              Wheat and millet grains consist of three parts: the protective outer bran, the nutrient-dense germ (rich in vitamin E, 
              B-complex, and aromatic essential fatty acids), and the starchy endosperm.
            </p>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Industrial roller mills deliberately strip the germ away because natural grain oils spoil when stored at room temperature 
              for months. Our slow, stone-milled process keeps the germ completely intact, giving you genuine nourishment and deep natural aroma.
            </p>
          </div>
        </div>

        {/* 4 Pillars of The Fresh Flours */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, textAlign: 'center', marginBottom: '32px' }}>
            Our Four Mill Standards
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '20px'
          }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              border: '1.5px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-forest-50)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px'
              }}>
                <Sparkles size={20} color="var(--primary)" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px' }}>
                1. Milled Daily on Order
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                We don't maintain stockpiles of pre-ground flour sitting in heat. When your order is placed, 
                our stone mill runs in the morning and your box is sealed the same day.
              </p>
            </div>

            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              border: '1.5px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-wheat-100)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px'
              }}>
                <ShieldCheck size={20} color="var(--color-wheat-600)" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px' }}>
                2. 100% Pure, Zero Chemicals
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                Zero potassium bromate, zero benzoyl peroxide bleaching, zero anti-caking powders, and zero cheap fillers. 
                Pure, honest whole grains.
              </p>
            </div>

            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              border: '1.5px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: '#ECFDF5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px'
              }}>
                <Award size={20} color="#059669" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px' }}>
                3. Precise Heritage Grinds
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                Flour is not one-size-fits-all. Bhakhari needs coarse crumbly grit; Ladu Besan needs danedaar texture; 
                Dhokla and Handvo need coarse dal-rice blends. We respect each culinary tradition.
              </p>
            </div>

            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              border: '1.5px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: '#FEF3C7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px'
              }}>
                <Truck size={20} color="#92400E" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px' }}>
                4. Honest Grain Logistics
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                Grain is heavy and costs real money to transport. We charge only carrier box rates (40 lb box capacity) 
                and never mark up individual bags to subsidize false "free shipping."
              </p>
            </div>
          </div>
        </div>

        {/* Miller's Direct Touch Card */}
        <div className="about-contact-card" style={{
          backgroundColor: 'var(--color-cream-100)',
          borderRadius: 'var(--radius-xl)',
          padding: '36px',
          border: '2px solid var(--border-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px'
        }}>
          <div style={{ maxWidth: '580px' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
              Talk to Our Miller Directly
            </h3>
            <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Need advice on which flour works best for your family? Want a pallet shipment for your temple or community event? 
              Call Pratik Patel and our milling team directly. We are always here to help.
            </p>
          </div>

          <div className="about-contact-actions" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="btn btn-primary"
              style={{ padding: '12px 24px', fontSize: '1rem', gap: '8px' }}
            >
              <Phone size={17} />
              <span>{BUSINESS_INFO.phone}</span>
            </a>

            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="btn btn-secondary"
              style={{ padding: '12px 24px' }}
            >
              <span>Explore The Shop</span>
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => navigate('/milling')}
              className="btn btn-secondary"
              style={{ padding: '12px 24px' }}
            >
              Milling Process
            </button>
          </div>
        </div>
      </div>
    </div>
    </LocalizedContent>
  );
}
