import React from 'react';
import BoxEstimatorWidget from '../components/BoxEstimatorWidget';
import { useCart } from '../context/CartContext';

export default function DeliveryCostPage() {
  const { setIsCartOpen } = useCart();

  return (
    <div style={{
      flex: 1,
      padding: '32px 16px 56px',
      backgroundColor: 'var(--bg-body)'
    }}>
      <BoxEstimatorWidget
        onBasketClick={() => {
          setIsCartOpen(true);
        }}
      />
    </div>
  );
}
