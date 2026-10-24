import React, { useState } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Search, X } from 'lucide-react';
import LocalizedContent from '../utils/localizeContent';

export default function ShopPage({ navigate }) {
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    return (cat && ['flours', 'grains', 'snacks', 'mamra'].includes(cat)) ? cat : 'all';
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFulfillment, setFilterFulfillment] = useState('all'); // 'all' | 'shippable' | 'pickup'
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-asc' | 'price-desc' | 'name'

  // Filter and sort products
  const filteredProducts = PRODUCTS.filter((product) => {
    // 1. Category filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }

    // 2. Fulfillment filter
    if (filterFulfillment === 'shippable' && product.isPickupOnly) {
      return false;
    }
    if (filterFulfillment === 'pickup' && !product.isPickupOnly) {
      return false;
    }

    // 3. Search query
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchGuj = product.gujaratiName && product.gujaratiName.includes(q);
      const matchHi = product.hindiName && product.hindiName.includes(q);
      if (!matchName && !matchDesc && !matchGuj && !matchHi) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0);
    if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0; // featured default
  });

  return (
    <LocalizedContent>
    <div style={{ paddingTop: '36px', paddingBottom: '70px', backgroundColor: 'var(--bg-body)' }}>
      <div className="app-container">
        {/* Header Breadcrumbs & Title */}
        <div style={{ marginBottom: '28px' }}>
          <span style={{ fontSize: '0.84rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-wheat-600)' }}>
            Stoneground Milled Daily in USA
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 800, margin: '6px 0 8px 0' }}>
            Shop Fresh Flours & Grains
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', margin: 0, maxWidth: '640px' }}>
            Choose from authentic single-grain flours, traditional coarse bhakhari and ladu besan, 
            or cleaned 20 lb bags of whole grain. Every order is milled fresh to order.
          </p>
        </div>

        {/* Category Pills Navigation */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '28px',
          paddingBottom: '8px',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = cat.id === 'all' 
              ? PRODUCTS.length 
              : PRODUCTS.filter(p => p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.94rem',
                  fontWeight: isSelected ? 700 : 600,
                  backgroundColor: isSelected ? 'var(--primary)' : 'var(--color-cream-100)',
                  color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                  border: isSelected ? '1.5px solid var(--primary)' : '1.5px solid var(--border-subtle)',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{cat.label}</span>
                <span style={{
                  fontSize: '0.75rem',
                  padding: '2px 7px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.25)' : 'var(--color-cream-200)',
                  color: isSelected ? '#FFFFFF' : 'var(--text-muted)'
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search, Filter & Sort Controls Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          marginBottom: '32px',
          backgroundColor: '#FFFFFF',
          padding: '14px 18px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {/* Search Input */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flex: '1 1 260px',
            backgroundColor: 'var(--color-cream-50)',
            padding: '8px 14px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)'
          }}>
            <Search size={18} color="var(--primary)" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by flour name, Gujarati or English..."
              style={{
                width: '100%',
                border: 'none',
                backgroundColor: 'transparent',
                outline: 'none',
                fontSize: '0.92rem',
                color: 'var(--text-primary)'
              }}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                style={{ color: 'var(--text-muted)' }}
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Fulfillment Filter Toggle */}
          <div className="shop-filter-control" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Fulfillment:
            </span>
            <select
              className="shop-filter-select"
              value={filterFulfillment}
              onChange={(e) => setFilterFulfillment(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--color-cream-50)',
                fontSize: '0.88rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            >
              <option value="all">All Delivery Types</option>
              <option value="shippable">Shippable Nationwide</option>
              <option value="pickup">Store Pickup Only</option>
            </select>
          </div>

          {/* Sort By Selector */}
          <div className="shop-filter-control" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Sort:
            </span>
            <select
              className="shop-filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--color-cream-50)',
                fontSize: '0.88rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            >
              <option value="featured">Featured / Mill Queue</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Product Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Results Counter & Active Filters Reset */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          fontSize: '0.9rem',
          color: 'var(--text-muted)'
        }}>
          <span>Showing <b>{filteredProducts.length}</b> products</span>

          {(selectedCategory !== 'all' || searchTerm || filterFulfillment !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
                setFilterFulfillment('all');
              }}
              style={{
                color: 'var(--primary)',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <X size={14} />
              <span>Reset all filters</span>
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px solid var(--border-subtle)'
          }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px' }}>
              No products found
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '380px', margin: '0 auto 20px auto' }}>
              We couldn't find any products matching your current filters or search query.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
                setFilterFulfillment('all');
              }}
              className="btn btn-primary"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 270px), 1fr))',
            gap: '24px'
          }}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={navigate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
    </LocalizedContent>
  );
}
