export const formatCurrency = (amount, currency = 'USDC') => {
    const num = parseFloat(amount);
    if (isNaN(num)) return `0.00 ${currency}`;
    return `${num.toFixed(2)} ${currency}`;
  };
  
  export const formatAddress = (address, startLength = 6, endLength = 4) => {
    if (!address) return '';
    if (address.length <= startLength + endLength) return address;
    return `${address.substr(0, startLength)}...${address.substr(-endLength)}`;
  };
  
  export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
  
    // Less than 1 minute
    if (diff < 60000) return 'Just now';
    
    // Less than 1 hour
    if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    
    // Less than 1 day
    if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    
    // Format as date
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };
  
  export const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
    }
    return phone;
  };