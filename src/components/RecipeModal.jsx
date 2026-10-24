import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { X, Clock, ChefHat, Users, ShoppingBag, Sparkles } from 'lucide-react';
import LocalizedContent from '../utils/localizeContent';

export default function RecipeModal() {
  const {
    selectedRecipeForModal,
    setSelectedRecipeForModal,
    addToCart
  } = useCart();

  const recipe = selectedRecipeForModal;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedRecipeForModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedRecipeForModal]);

  if (!recipe) return null;

  const matchedProduct = PRODUCTS.find(p => p.slug === recipe.flourSlug);

  const handleAddFlour = () => {
    if (matchedProduct) {
      addToCart(matchedProduct, 1);
    }
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
      <div 
        style={{ position: 'absolute', inset: 0 }} 
        onClick={() => setSelectedRecipeForModal(null)} 
        aria-hidden="true" 
      />

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '780px',
        maxHeight: '90vh',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-xl)',
        border: '1.5px solid var(--border-subtle)',
        overflowY: 'auto',
        zIndex: 10,
        animation: 'slideDown 0.3s ease'
      }}>
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setSelectedRecipeForModal(null)}
          className="btn-icon"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            boxShadow: 'var(--shadow-md)',
            zIndex: 12,
            border: '1px solid var(--border-subtle)'
          }}
          aria-label="Close recipe"
        >
          <X size={20} />
        </button>

        {/* Recipe Header Banner */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '240px',
          overflow: 'hidden',
          backgroundColor: 'var(--color-cream-100)'
        }}>
          <img
            src={recipe.image}
            alt={recipe.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(18,40,30,0.85) 0%, rgba(18,40,30,0.2) 60%, transparent 100%)'
          }} />

          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '24px',
            right: '24px',
            color: '#FFFFFF'
          }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-wheat-400)', textTransform: 'uppercase' }}>
              {recipe.gujaratiTitle}
            </span>
            <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#FFFFFF', margin: '4px 0 0 0' }}>
              {recipe.title}
            </h2>
          </div>
        </div>

        {/* Recipe Content */}
        <div style={{ padding: '24px 28px' }}>
          {/* Quick Metrics Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            padding: '12px 18px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-cream-50)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '22px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
              <Clock size={16} color="var(--primary)" />
              <span>Prep: <b>{recipe.prepTime}</b></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
              <ChefHat size={16} color="var(--primary)" />
              <span>Cook: <b>{recipe.cookTime}</b></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
              <Users size={16} color="var(--primary)" />
              <span>Serves: <b>{recipe.servings}</b></span>
            </div>
          </div>

          {/* Featured Flour Callout */}
          {matchedProduct && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 18px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-forest-50)',
              border: '1.5px solid rgba(26, 57, 43, 0.2)',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={matchedProduct.image}
                  alt={matchedProduct.name}
                  style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: 'var(--radius-xs)', backgroundColor: '#FFFFFF', border: '1px solid var(--border-subtle)' }}
                />
                <div>
                  <span style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-wheat-600)' }}>
                    Recommended Flour
                  </span>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: '0.98rem', color: 'var(--text-primary)' }}>
                    {matchedProduct.name} ({matchedProduct.size}) — ${matchedProduct.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddFlour}
                className="btn btn-primary"
                style={{ padding: '8px 16px', fontSize: '0.88rem' }}
              >
                <ShoppingBag size={15} />
                <span>Add to Basket</span>
              </button>
            </div>
          )}

          {/* Description */}
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '22px' }}>
            {recipe.description}
          </p>

          {/* Ingredients & Method */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '24px' }}>
            {/* Ingredients */}
            <div style={{
              backgroundColor: 'var(--color-cream-50)',
              padding: '18px 20px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '12px' }}>
                Ingredients
              </h3>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.45 }}>
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Miller's Tip */}
            <div style={{
              backgroundColor: 'var(--color-wheat-100)',
              padding: '18px 20px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(196, 147, 62, 0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Sparkles size={18} color="var(--color-wheat-600)" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-earth-900)', margin: 0 }}>
                  Miller's Grain Tip
                </h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-earth-800)', lineHeight: 1.5, margin: 0 }}>
                {recipe.millersTip}
              </p>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '14px' }}>
              Step-by-Step Method
            </h3>
            <ol style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {recipe.steps.map((step, idx) => (
                <li key={idx} style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      </div>
    </LocalizedContent>
  );
}
