import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import LocalizedContent from '../utils/localizeContent';

export default function ToastNotification() {
  const { toast } = useCart();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <LocalizedContent>
      <div 
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: '#FFFFFF',
          color: 'var(--text-primary)',
          padding: '14px 20px',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-xl)',
          border: `1.5px solid ${isSuccess ? '#A7F3D0' : isError ? '#FECACA' : 'var(--border-subtle)'}`,
          maxWidth: '420px',
          animation: 'slideDown 0.3s ease',
        }}
        role="status"
        aria-live="polite"
      >
        {isSuccess && <CheckCircle2 size={22} color="var(--primary)" style={{ flexShrink: 0 }} />}
        {isError && <AlertCircle size={22} color="#DC2626" style={{ flexShrink: 0 }} />}
        {!isSuccess && !isError && <Info size={22} color="var(--accent-gold)" style={{ flexShrink: 0 }} />}
        
        <p style={{ margin: 0, fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          {toast.message}
        </p>
      </div>
    </LocalizedContent>
  );
}
