import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateOrderMetrics } from '../utils/shippingCalculator';

const CartContext = createContext();

export function CartProvider({ children }) {
  // 1. Language state
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('fresh_flours_lang') || 'en';
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem('fresh_flours_lang', newLang);
  };

  // 2. Cart Items state with localStorage persistence
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('the_fresh_flours_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('the_fresh_flours_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cartItems]);

  // 3. UI states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [selectedRecipeForModal, setSelectedRecipeForModal] = useState(null);
  const [toast, setToast] = useState(null);

  // 4. Fulfillment & Payment selections
  const [fulfillmentType, setFulfillmentType] = useState('shipping'); // 'shipping' | 'pickup'
  const [selectedState, setSelectedState] = useState('TN');
  const [paymentMethod, setPaymentMethod] = useState('zelle'); // 'zelle' | 'card' | 'pickup'

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Add item to cart
  const addToCart = (product, qty = 1, sizeOverride = null) => {
    if (product.isOutOfStock || product.isComingSoon) {
      showToast(`${product.name} is currently not available`, 'error');
      return;
    }

    const chosenSize = sizeOverride || product.size;
    const chosenPrice = sizeOverride 
      ? (product.availableSizes?.find(s => s.size === sizeOverride)?.price ?? product.price)
      : product.price;
    const chosenWeight = sizeOverride
      ? (product.availableSizes?.find(s => s.size === sizeOverride)?.weightLb ?? product.weightLb)
      : product.weightLb;

    const cartItemId = `${product.id}-${chosenSize}`;

    setCartItems(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item => 
          item.cartItemId === cartItemId 
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      } else {
        return [...prev, {
          cartItemId,
          id: product.id,
          slug: product.slug,
          name: product.name,
          gujaratiName: product.gujaratiName,
          hindiName: product.hindiName,
          category: product.category,
          price: chosenPrice,
          size: chosenSize,
          weightLb: chosenWeight,
          image: product.image,
          isPickupOnly: product.isPickupOnly,
          quantity: qty
        }];
      }
    });

    showToast(`Added ${qty} × ${product.name} (${chosenSize}) to basket`, 'success');
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
    ));
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
    showToast('Item removed from basket', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate order metrics
  const orderMetrics = calculateOrderMetrics(cartItems, fulfillmentType, selectedState, paymentMethod);

  // Total item count
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      lang,
      setLang,
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalItemCount,
      orderMetrics,
      isCartOpen,
      setIsCartOpen,
      isSearchOpen,
      setIsSearchOpen,
      selectedProductForModal,
      setSelectedProductForModal,
      selectedRecipeForModal,
      setSelectedRecipeForModal,
      toast,
      showToast,
      fulfillmentType,
      setFulfillmentType,
      selectedState,
      setSelectedState,
      paymentMethod,
      setPaymentMethod
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
