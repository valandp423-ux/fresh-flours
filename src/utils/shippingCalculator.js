export const BOX_CAPACITY_LB = 40;

// State shipping zones with realistic ground freight estimates per 40 lb box from Tennessee mill
export const US_STATES = [
  { code: 'AL', name: 'Alabama', zone: 'Zone 1 (Southeast)', costPerBox: 14.50 },
  { code: 'AZ', name: 'Arizona', zone: 'Zone 7 (West)', costPerBox: 24.50 },
  { code: 'AR', name: 'Arkansas', zone: 'Zone 2 (Mid-South)', costPerBox: 15.50 },
  { code: 'CA', name: 'California', zone: 'Zone 8 (Pacific)', costPerBox: 26.50 },
  { code: 'CO', name: 'Colorado', zone: 'Zone 6 (Mountain)', costPerBox: 22.00 },
  { code: 'CT', name: 'Connecticut', zone: 'Zone 5 (Northeast)', costPerBox: 19.50 },
  { code: 'DE', name: 'Delaware', zone: 'Zone 4 (Mid-Atlantic)', costPerBox: 17.50 },
  { code: 'FL', name: 'Florida', zone: 'Zone 2 (Southeast)', costPerBox: 16.00 },
  { code: 'GA', name: 'Georgia', zone: 'Zone 1 (Southeast)', costPerBox: 13.50 },
  { code: 'IL', name: 'Illinois', zone: 'Zone 3 (Midwest)', costPerBox: 16.50 },
  { code: 'IN', name: 'Indiana', zone: 'Zone 2 (Midwest)', costPerBox: 15.00 },
  { code: 'KY', name: 'Kentucky', zone: 'Zone 1 (Adjacent)', costPerBox: 12.50 },
  { code: 'MD', name: 'Maryland', zone: 'Zone 4 (Mid-Atlantic)', costPerBox: 17.50 },
  { code: 'MA', name: 'Massachusetts', zone: 'Zone 5 (Northeast)', costPerBox: 20.00 },
  { code: 'MI', name: 'Michigan', zone: 'Zone 3 (Midwest)', costPerBox: 17.00 },
  { code: 'NC', name: 'North Carolina', zone: 'Zone 1 (Southeast)', costPerBox: 13.50 },
  { code: 'NJ', name: 'New Jersey', zone: 'Zone 5 (Northeast)', costPerBox: 19.00 },
  { code: 'NY', name: 'New York', zone: 'Zone 5 (Northeast)', costPerBox: 20.00 },
  { code: 'OH', name: 'Ohio', zone: 'Zone 2 (Midwest)', costPerBox: 15.00 },
  { code: 'PA', name: 'Pennsylvania', zone: 'Zone 4 (Mid-Atlantic)', costPerBox: 17.50 },
  { code: 'SC', name: 'South Carolina', zone: 'Zone 1 (Southeast)', costPerBox: 13.50 },
  { code: 'TN', name: 'Tennessee (Local Mill)', zone: 'Zone 1 (Local)', costPerBox: 11.50 },
  { code: 'TX', name: 'Texas', zone: 'Zone 4 (South)', costPerBox: 18.50 },
  { code: 'VA', name: 'Virginia', zone: 'Zone 2 (Mid-Atlantic)', costPerBox: 15.50 },
  { code: 'WA', name: 'Washington', zone: 'Zone 8 (Pacific NW)', costPerBox: 27.50 },
  // Default fallback for other states
  { code: 'OTHER', name: 'Other US States', zone: 'Standard US Ground', costPerBox: 19.00 }
];

export function calculateOrderMetrics(cartItems, fulfillmentType = 'shipping', selectedState = 'TN', paymentMethod = 'zelle') {
  // 1. Calculate items subtotal and total weight in lbs
  let subtotal = 0;
  let totalWeightLb = 0;
  let hasPickupOnlyItems = false;

  cartItems.forEach(item => {
    const itemTotal = (item.price || 0) * item.quantity;
    subtotal += itemTotal;
    
    // Calculate total weight
    const weightPerUnit = item.weightLb || 4; // default 4 lb
    totalWeightLb += weightPerUnit * item.quantity;

    if (item.isPickupOnly) {
      hasPickupOnlyItems = true;
    }
  });

  // Round weight to 1 decimal place
  totalWeightLb = Math.round(totalWeightLb * 10) / 10;

  // 2. Boxes calculation
  // 1 box holds up to 40 lb
  const totalBoxes = totalWeightLb > 0 ? Math.ceil(totalWeightLb / BOX_CAPACITY_LB) : 0;
  const currentBoxWeight = totalWeightLb % BOX_CAPACITY_LB === 0 && totalWeightLb > 0 
    ? BOX_CAPACITY_LB 
    : (totalWeightLb % BOX_CAPACITY_LB);
  const remainingInCurrentBox = totalWeightLb > 0 ? Math.max(0, Math.round((BOX_CAPACITY_LB - currentBoxWeight) * 10) / 10) : BOX_CAPACITY_LB;

  // 3. Shipping cost
  let shippingCost = 0;
  if (fulfillmentType === 'pickup') {
    shippingCost = 0;
  } else if (totalBoxes > 0) {
    const stateObj = US_STATES.find(s => s.code === selectedState) || US_STATES.find(s => s.code === 'OTHER');
    const baseCostPerBox = stateObj ? stateObj.costPerBox : 19.00;
    
    // First box full price, subsequent boxes slight carrier consolidation
    shippingCost = totalBoxes * baseCostPerBox;
  }

  // 4. Estimated food sales tax (approx 2% average grocery tax or 0% depending on state)
  const taxRate = selectedState === 'TN' ? 0.04 : 0.015; // low grocery rate
  const estimatedTax = subtotal > 0 ? Math.round((subtotal * taxRate) * 100) / 100 : 0;

  // 5. Pre-fee total
  const preFeeTotal = subtotal + shippingCost + estimatedTax;

  // 6. Payment processing fee (Card = 3%, Zelle = 0%, Pickup = 0%)
  let cardProcessingFee = 0;
  if (paymentMethod === 'card') {
    cardProcessingFee = Math.round((preFeeTotal * 0.03) * 100) / 100;
  }

  // 7. Final Grand Total
  const grandTotal = Math.round((preFeeTotal + cardProcessingFee) * 100) / 100;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    totalWeightLb,
    totalBoxes,
    currentBoxWeight: Math.round(currentBoxWeight * 10) / 10,
    remainingInCurrentBox,
    shippingCost: Math.round(shippingCost * 100) / 100,
    estimatedTax,
    cardProcessingFee,
    grandTotal,
    hasPickupOnlyItems,
    boxCapacityLb: BOX_CAPACITY_LB
  };
}
