import React, { useState } from 'react';
import { RECIPES } from '../data/recipes';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { Clock, ChefHat, Users, ShoppingBag, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import LocalizedContent from '../utils/localizeContent';

export default function RecipesPage({ navigate }) {
  const { setSelectedRecipeForModal, addToCart } = useCart();
  const [filterType, setFilterType] = useState('all');

  const filteredRecipes = RECIPES;

  return (
    <LocalizedContent>
    <div style={{ paddingTop: '36px', paddingBottom: '70px', backgroundColor: 'var(--bg-body)' }}>
      <div className="app-container" style={{ maxWidth: '1060px' }}>
        {/* Header Breadcrumbs */}
        <div style={{ marginBottom: '32px' }}>
          <span style={{ fontSize: '0.84rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-wheat-600)' }}>
            Traditional Indian Kitchen Guides
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 800, margin: '6px 0 8px 0' }}>
            Recipes & Heritage Flour Guides
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6, maxWidth: '680px' }}>
            Discover how stoneground fresh flours bring authentic sweetness, fragrance, and softness to your rotlis, 
            kathiyawadi rotlas, crispy bhakharis, and savory fermented snacks.
          </p>
        </div>

        {/* Hero Culinary Spread Banner */}
        <div style={{
          position: 'relative',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          aspectRatio: '21 / 9',
          boxShadow: 'var(--shadow-xl)',
          border: '2px solid var(--border-subtle)',
          marginBottom: '40px',
          backgroundColor: 'var(--color-cream-100)'
        }}>
          <img
            src="/fresh_rotli_roti_spread.jpg"
            alt="Warm rotlis, bajri rotlas with ghee and jaggery spread"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(18,40,30,0.85) 0%, rgba(18,40,30,0.2) 60%, transparent 100%)'
          }} />

          <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '28px',
            right: '28px',
            color: '#FFFFFF'
          }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-wheat-400)' }}>
              From Our Mill to Your Hearth
            </span>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, color: '#FFFFFF', margin: '4px 0 0 0' }}>
              Puffed Softness, Crispy Crumb, and Fragrant Stone Mill Flavors
            </h2>
          </div>
        </div>

        {/* Recipes Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '28px'
        }}>
          {filteredRecipes.map((recipe) => {
            const matchedProduct = PRODUCTS.find(p => p.slug === recipe.flourSlug);

            return (
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
                  backgroundColor: 'var(--color-cream-50)'
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
                    backgroundColor: 'rgba(255, 255, 255, 0.94)',
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

                <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
                    {recipe.title}
                  </h3>

                  <p style={{
                    margin: '0 0 16px 0',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {recipe.description}
                  </p>

                  {/* Metrics */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                    marginBottom: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={14} color="var(--primary)" />
                      <span>{recipe.prepTime}</span>
                    </div>
                    <span>•</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <ChefHat size={14} color="var(--primary)" />
                      <span>{recipe.cookTime}</span>
                    </div>
                    <span>•</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Users size={14} color="var(--primary)" />
                      <span>{recipe.servings}</span>
                    </div>
                  </div>

                  {/* Flour Pairing Box */}
                  <div style={{
                    marginTop: 'auto',
                    paddingTop: '14px',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px'
                  }}>
                    <span style={{ fontSize: '0.84rem', color: 'var(--primary)', fontWeight: 700 }}>
                      Milled: {recipe.flourUsed}
                    </span>

                    {matchedProduct && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(matchedProduct, 1);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--color-forest-50)',
                          color: 'var(--primary)',
                          border: '1px solid rgba(26, 57, 43, 0.2)',
                          fontSize: '0.8rem',
                          fontWeight: 700
                        }}
                      >
                        <ShoppingBag size={14} />
                        <span>Add Flour</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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
    </div>
    </LocalizedContent>
  );
}
