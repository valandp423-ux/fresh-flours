import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { RECIPES } from '../data/recipes';
import ProductCard from '../components/ProductCard';
import BoxEstimatorWidget from '../components/BoxEstimatorWidget';
import LocalizedContent from '../utils/localizeContent';
import {
  Sparkles,
  ArrowRight,
  Package,
  CheckCircle2,
  Clock,
  Phone,
  Truck,
  Store,
} from 'lucide-react';

export default function HomePage({ navigate }) {
  const { setSelectedRecipeForModal, showToast } = useCart();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const featuredProducts = PRODUCTS.filter(p => 
    ['bajri-flour', 'juwar-flour', 'chapati-flour', 'bhakhari-flour', 'handvo-flour', 'multigrain-flour', 'besan', 'bajri-whole'].includes(p.id)
  );

  const handleCategoryClick = (categoryId) => {
    navigate(`/shop?category=${categoryId}`);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setNewsletterSubmitted(true);
    showToast('Subscribed for fresh milling alerts and seasonal grain batches!', 'success');
  };

  return (
    <LocalizedContent>
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="home-hero" style={{
        position: 'relative',
        backgroundColor: 'var(--color-cream-100)',
        borderBottom: '1px solid var(--border-subtle)',
        overflow: 'hidden',
        paddingTop: '40px',
        paddingBottom: '60px'
      }}>
        {/* Subtle decorative grain background overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '55%',
          height: '100%',
          opacity: 0.04,
          backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none'
        }} />

        <div className="app-container">
          <div className="home-hero-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            alignItems: 'center',
            gap: '40px'
          }}>
            {/* Hero Left Content */}
            <div className="home-hero-copy" style={{ display: 'flex', flexDirection: 'column', gap: '22px', maxWidth: '620px' }}>
              {/* Main Headline */}
              <h1 style={{
                fontSize: 'clamp(2.3rem, 4.8vw, 3.8rem)',
                fontWeight: 800,
                color: 'var(--color-earth-900)',
                lineHeight: 1.15,
                margin: 0,
                letterSpacing: '-0.025em'
              }}>
                Flour As It Was Meant To Taste.<br />
                <em>Milled Fresh Daily</em> in the USA.
              </h1>

              {/* Persuasive Supporting Text */}
              <p style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                color: 'var(--color-earth-700)',
                lineHeight: 1.6,
                margin: 0
              }}>
                Shop Bajri, Juwar, Nagli, whole wheat, rice, and more, freshly milled in the USA. Find flours, whole grains, and traditional snacks for your kitchen.
              </p>

              {/* Hero Call to Action Buttons */}
              <div className="home-hero-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', paddingTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => navigate('/shop')}
                  className="btn btn-primary home-hero-action-button"
                  style={{
                    padding: '14px 28px',
                    fontSize: '1.05rem',
                    gap: '10px',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <span>Shop Fresh Flours</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/shipping')}
                  className="btn btn-secondary home-hero-action-button"
                  style={{
                    padding: '14px 24px',
                    fontSize: '1rem',
                    gap: '8px',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <Package size={18} color="var(--primary)" />
                  <span>Work Out Delivery Cost</span>
                </button>
              </div>

              {/* Quick Trust Badges */}
              <div className="home-hero-trust" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '12px',
                paddingTop: '12px',
                borderTop: '1px solid var(--border-subtle)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Milled On Order
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    0 Preservatives
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    40 lb Inspected Boxes
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Zelle & Card Safe
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual: Stunning Stoneground Flour Cascade Photo */}
            <div className="home-hero-visual" style={{
              position: 'relative',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
              border: '2px solid var(--border-subtle)',
              aspectRatio: '16 / 11',
              backgroundColor: '#FFFFFF'
            }}>
              <img
                src="/freshflours-hero.png"
                alt="Freshly milled flour, whole grains, and a traditional stone mill"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          KEY VALUE STATS BANNER
          ========================================================================= */}
      <section className="home-service-strip" style={{
        backgroundColor: 'var(--primary)',
        color: '#FFFFFF',
        padding: '24px 0'
      }}>
        <div className="app-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Clock size={22} color="var(--color-wheat-400)" />
              </div>
              <div>
                <b style={{ display: 'block', fontSize: '1rem', color: '#FFFFFF' }}>Milled Fresh Daily</b>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-cream-200)' }}>Ground today, packed today</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Truck size={22} color="var(--color-wheat-400)" />
              </div>
              <div>
                <b style={{ display: 'block', fontSize: '1rem', color: '#FFFFFF' }}>Exact Freight Rates</b>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-cream-200)' }}>Up to 40 lb per heavy box</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Store size={22} color="var(--color-wheat-400)" />
              </div>
              <div>
                <b style={{ display: 'block', fontSize: '1rem', color: '#FFFFFF' }}>Free Store Pickup</b>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-cream-200)' }}>Tennessee mill location</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Phone size={22} color="var(--color-wheat-400)" />
              </div>
              <div>
                <b style={{ display: 'block', fontSize: '1rem', color: '#FFFFFF' }}>Call Us Directly</b>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-cream-200)' }}>+1 (423) 664-3353</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SHOP BY CATEGORY SECTION
          ========================================================================= */}
      <section className="section-padding">
        <div className="app-container">
          <div className="section-header">
            <span style={{ fontSize: '0.84rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-wheat-600)' }}>
              Explore Our Milling
            </span>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">
              Pure stoneground flours, triple-cleaned whole grains, and traditional snacks prepared without industrial shortcuts.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: '20px'
          }}>
            {[
              {
                id: 'flours',
                title: 'Fresh Flours',
                subtitle: 'Bajri, Juwar, Chapati, Bhakhari, Besan & more',
                indic: 'તાજા લોટ',
                image: '/products/bajri-flour.jpg',
                count: '14 varieties',
                color: '#EBF4EF'
              },
              {
                id: 'grains',
                title: 'Whole Grains',
                subtitle: 'Triple-cleaned 20 lb bags of Bajri, Juwar & Wheat',
                indic: 'આખા અનાજ',
                image: '/products/bajri-whole.jpg',
                count: '5 whole grains',
                color: '#FAF3E7'
              },
              {
                id: 'snacks',
                title: 'Crispy Snacks',
                subtitle: 'Roasted Khakharas & crispy tea-time snacks',
                indic: 'નાસ્તા (પિકઅપ)',
                image: '/products/methi-khakhara.svg',
                count: 'Store pickup',
                color: '#FBF0EB'
              },
              {
                id: 'mamra',
                title: 'Puffed Mamra',
                subtitle: 'Basmati, Kolhapuri, Bajri & Juwar Dhani',
                indic: 'મમરા (પિકઅપ)',
                image: '/products/basmati-mamra.jpg',
                count: '5 varieties',
                color: '#F4EFE6'
              }
            ].map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid var(--border-subtle)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-card)',
                  transition: 'all 0.25s ease'
                }}
                className="category-card"
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4 / 3',
                  backgroundColor: cat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  <img
                    src={cat.image}
                    alt={cat.title}
                    style={{
                      width: '80%',
                      height: '80%',
                      objectFit: 'contain',
                      transition: 'transform 0.3s ease'
                    }}
                    className="cat-img"
                  />
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)'
                  }}>
                    {cat.count}
                  </span>
                </div>

                <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                      {cat.title}
                    </h3>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-wheat-600)' }}>
                      {cat.indic}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                    {cat.subtitle}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '10px', fontSize: '0.84rem', fontWeight: 700, color: 'var(--primary)' }}>
                    <span>Browse Products</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .category-card:hover {
            transform: translateY(-4px);
            border-color: var(--primary) !important;
            box-shadow: var(--shadow-card-hover) !important;
          }
          .category-card:hover .cat-img {
            transform: scale(1.08);
          }
        `}</style>
      </section>

      {/* =========================================================================
          FEATURED PRODUCTS SECTION
          ========================================================================= */}
      <section style={{
        backgroundColor: 'var(--color-cream-100)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        paddingTop: '70px',
        paddingBottom: '80px'
      }}>
        <div className="app-container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '40px',
            gap: '16px'
          }}>
            <div>
              <span style={{ fontSize: '0.84rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-wheat-600)' }}>
                Fresh Milling Queue
              </span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', fontWeight: 800, margin: '6px 0 0 0' }}>
                Featured Fresh Flours & Grains
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="btn btn-secondary"
              style={{ gap: '8px' }}
            >
              <span>View All 24 Products</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 270px), 1fr))',
            gap: '24px'
          }}>
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={navigate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE DELIVERY ESTIMATOR WIDGET SECTION
          ========================================================================= */}
      <section style={{
        backgroundColor: 'var(--color-cream-100)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        paddingTop: '60px',
        paddingBottom: '70px'
      }}>
        <div className="app-container" style={{ maxWidth: '920px' }}>
          <BoxEstimatorWidget onBasketClick={() => navigate('/cart')} />
        </div>
      </section>

      {/* =========================================================================
          RECIPES & TRADITIONAL CULINARY GUIDES
          ========================================================================= */}
      <section className="section-padding">
        <div className="app-container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '40px',
            gap: '16px'
          }}>
            <div>
              <span style={{ fontSize: '0.84rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-wheat-600)' }}>
                Traditional Heritage Kitchen
              </span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', fontWeight: 800, margin: '6px 0 0 0' }}>
                Cook with Fresh Stoneground Flours
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigate('/recipes')}
              className="btn btn-secondary"
              style={{ gap: '8px' }}
            >
              <span>View All Recipes</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '24px'
          }}>
            {RECIPES.slice(0, 3).map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => setSelectedRecipeForModal(recipe)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid var(--border-subtle)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-card)',
                  transition: 'all 0.25s ease'
                }}
                className="recipe-card"
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 10',
                  overflow: 'hidden',
                  backgroundColor: 'var(--color-cream-100)'
                }}>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.35s ease'
                    }}
                    className="recipe-img"
                  />
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(4px)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    color: 'var(--color-wheat-600)'
                  }}>
                    {recipe.gujaratiTitle}
                  </span>
                </div>

                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
                    {recipe.title}
                  </h3>
                  <p style={{
                    margin: '0 0 16px 0',
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {recipe.description}
                  </p>

                  <div style={{
                    marginTop: 'auto',
                    paddingTop: '14px',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.84rem'
                  }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>
                      Uses: {recipe.flourUsed}
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>
                      {recipe.prepTime}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .recipe-card:hover {
            transform: translateY(-4px);
            border-color: var(--primary) !important;
            box-shadow: var(--shadow-card-hover) !important;
          }
          .recipe-card:hover .recipe-img {
            transform: scale(1.05);
          }
        `}</style>
      </section>

      {/* =========================================================================
          NEWSLETTER / FRESH MILLING BATCH ALERTS
          ========================================================================= */}
      <section className="section-padding">
        <div className="app-container" style={{ maxWidth: '820px' }}>
          <div style={{
            backgroundColor: 'var(--color-forest-900)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '48px 36px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-xl)',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              marginBottom: '16px'
            }}>
              <Sparkles size={14} color="var(--color-wheat-400)" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-wheat-400)' }}>
                Fresh Batch Milling Announcements
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)', fontWeight: 800, color: '#FFFFFF', margin: '0 0 12px 0' }}>
              Know When Your Favorite Grain is Milled
            </h2>

            <p style={{ fontSize: '1rem', color: 'var(--color-cream-200)', lineHeight: 1.6, maxWidth: '580px', margin: '0 auto 26px auto' }}>
              Subscribe to get seasonal whole grain harvest arrivals, winter Bajri batch schedules, and festive flour updates. No spam, ever.
            </p>

            {newsletterSubmitted ? (
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                padding: '16px 24px',
                borderRadius: 'var(--radius-md)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <CheckCircle2 size={20} color="var(--color-wheat-400)" />
                <span style={{ fontWeight: 700, fontSize: '0.98rem' }}>
                  Thank you! You will receive our next fresh milling update.
                </span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                justifyContent: 'center',
                maxWidth: '520px',
                margin: '0 auto'
              }}>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  style={{
                    flex: '1 1 280px',
                    padding: '13px 18px',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid rgba(255, 255, 255, 0.25)',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    color: 'var(--text-primary)',
                    fontSize: '0.96rem',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-gold"
                  style={{
                    padding: '13px 26px',
                    fontSize: '0.96rem',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
    </LocalizedContent>
  );
}
