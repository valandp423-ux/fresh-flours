import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Search, Package, Clock, CheckCircle2, RefreshCw, Printer } from 'lucide-react';
import LocalizedContent from '../utils/localizeContent';

export default function AccountOrderLookupPage({ navigate }) {
  const { addToCart, showToast } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('the_fresh_flours_orders');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  });
  const [selectedOrder, setSelectedOrder] = useState(() => {
    try {
      const saved = localStorage.getItem('the_fresh_flours_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.length > 0 ? parsed[0] : null;
      }
      return null;
    } catch {
      return null;
    }
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim().toLowerCase();
    const found = orders.find(o => 
      o.orderId.toLowerCase().includes(query) ||
      o.customer?.email?.toLowerCase().includes(query) ||
      o.customer?.phone?.includes(query) ||
      (o.zelleCode && o.zelleCode.toLowerCase().includes(query))
    );

    if (found) {
      setSelectedOrder(found);
      showToast(`Found order #${found.orderId}`, 'success');
    } else {
      showToast(`No order found matching "${searchQuery}"`, 'error');
    }
  };

  const handleReorder = (order) => {
    if (!order.items || order.items.length === 0) return;
    order.items.forEach(item => {
      addToCart(item, item.quantity, item.size);
    });
    showToast(`Items from order #${order.orderId} added to your basket!`, 'success');
    navigate('/cart');
  };

  return (
    <LocalizedContent>
    <div style={{ paddingTop: '36px', paddingBottom: '70px', backgroundColor: 'var(--bg-body)' }}>
      <div className="app-container" style={{ maxWidth: '960px' }}>
        {/* Header Breadcrumbs */}
        <div style={{ marginBottom: '32px' }}>
          <span style={{ fontSize: '0.84rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-wheat-600)' }}>
            Customer Orders & Reordering
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 800, margin: '6px 0 8px 0' }}>
            Track Your Fresh Flour Order
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
            Check the stone-milling and delivery status of your order, repeat a favorite past flour order in one tap, 
            or look up your Zelle confirmation code.
          </p>
        </div>

        {/* Lookup Search Bar */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          padding: '24px',
          border: '1.5px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '32px'
        }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flex: '1 1 300px',
              backgroundColor: 'var(--color-cream-50)',
              padding: '11px 16px',
              borderRadius: 'var(--radius-sm)',
              border: '1.5px solid var(--border-subtle)'
            }}>
              <Search size={18} color="var(--primary)" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Order ID (e.g. FF-2026-...) or email..."
                style={{
                  width: '100%',
                  border: 'none',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  fontSize: '0.94rem'
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '11px 22px' }}
            >
              Track Order
            </button>
          </form>
        </div>

        {/* Orders Layout */}
        {orders.length === 0 && !selectedOrder ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px solid var(--border-subtle)'
          }}>
            <Package size={44} color="var(--text-muted)" style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '6px' }}>
              No past orders found on this device
            </h3>
            <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto 20px auto' }}>
              When you place an order, it will automatically appear here with stone-milling status and one-tap reordering.
            </p>
            <button type="button" onClick={() => navigate('/shop')} className="btn btn-primary">
              Order Fresh Flours Now
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '30px'
          }}>
            {/* Left: Orders List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                Recent Orders ({orders.length})
              </h2>

              {orders.map((ord) => {
                const isSelected = selectedOrder?.orderId === ord.orderId;
                return (
                  <div
                    key={ord.orderId}
                    onClick={() => setSelectedOrder(ord)}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 'var(--radius-md)',
                      padding: '18px 20px',
                      border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border-subtle)'}`,
                      cursor: 'pointer',
                      boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                      <b style={{ fontSize: '1rem', color: isSelected ? 'var(--primary)' : 'var(--text-primary)' }}>
                        #{ord.orderId}
                      </b>
                      <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary)' }}>
                        ${ord.metrics?.grandTotal?.toFixed(2)}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      <span>{new Date(ord.date).toLocaleDateString()}</span>
                      <span>{ord.items?.length} items ({ord.metrics?.totalWeightLb} lb)</span>
                    </div>

                    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="badge badge-green" style={{ fontSize: '0.72rem' }}>
                        {ord.status || 'Stone-Milled Today'}
                      </span>
                      {ord.paymentMethod === 'zelle' && (
                        <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>
                          Zelle Memo: {ord.zelleCode}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Selected Order Detail View */}
            {selectedOrder && (
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                padding: '30px',
                border: '1.5px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-wheat-600)' }}>
                      Order Status Details
                    </span>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '2px 0 0 0' }}>
                      #{selectedOrder.orderId}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleReorder(selectedOrder)}
                    className="btn btn-primary"
                    style={{ padding: '8px 16px', fontSize: '0.88rem', gap: '6px' }}
                  >
                    <RefreshCw size={14} />
                    <span>Reorder All</span>
                  </button>
                </div>

                {/* Milestone Stepper */}
                <div style={{
                  backgroundColor: 'var(--color-cream-50)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 20px',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <CheckCircle2 size={18} color="var(--primary)" />
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        Order Confirmed ({new Date(selectedOrder.date).toLocaleDateString()})
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <CheckCircle2 size={18} color="var(--primary)" />
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary)' }}>
                        Morning Stone-Milling Scheduled
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)' }}>
                      <Clock size={18} />
                      <span style={{ fontSize: '0.88rem' }}>
                        {selectedOrder.fulfillmentType === 'pickup' ? 'Ready for Store Pickup' : 'Packed in Inspected 40 lb Box & Carrier Dispatched'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Information */}
                <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div>
                    <b style={{ color: 'var(--text-primary)' }}>Customer: </b>
                    <span>{selectedOrder.customer?.fullName} ({selectedOrder.customer?.phone})</span>
                  </div>
                  <div>
                    <b style={{ color: 'var(--text-primary)' }}>Fulfillment: </b>
                    <span>{selectedOrder.fulfillmentType === 'pickup' ? 'Free Store Pickup (Tennessee)' : `Ship to: ${selectedOrder.customer?.address || ''}, ${selectedOrder.customer?.city || ''}, ${selectedOrder.selectedState}`}</span>
                  </div>
                  <div>
                    <b style={{ color: 'var(--text-primary)' }}>Payment: </b>
                    <span>{selectedOrder.paymentMethod === 'zelle' ? `Zelle (Send to 423-664-3353, Memo: ${selectedOrder.zelleCode})` : selectedOrder.paymentMethod === 'card' ? 'Credit / Debit Card' : 'Pay at Store Pickup'}</span>
                  </div>
                </div>

                {/* Items */}
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '12px' }}>
                    Flours & Grains Included
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedOrder.items?.map((item, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                        <span>
                          <b>{item.quantity} ×</b> {item.name} ({item.size})
                        </span>
                        <b>${((item.price || 0) * item.quantity).toFixed(2)}</b>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Print button */}
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn btn-secondary"
                  style={{ alignSelf: 'flex-start', padding: '8px 16px', fontSize: '0.86rem', gap: '6px' }}
                >
                  <Printer size={15} />
                  <span>Print Order Invoice</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </LocalizedContent>
  );
}
