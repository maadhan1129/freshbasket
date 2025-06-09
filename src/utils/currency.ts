export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
};

// Helper function to format price with ₹ symbol
export const formatPrice = (amount: number): string => {
  return `₹${formatCurrency(amount).replace('₹', '')}`;
};
