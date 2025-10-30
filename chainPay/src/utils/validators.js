export const isValidAddress = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };
  
  export const isValidAmount = (amount) => {
    const num = parseFloat(amount);
    return !isNaN(num) && num > 0;
  };
  
  export const isValidPhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 15;
  };
  
  export const validateTransaction = (recipient, amount, balance) => {
    const errors = [];
  
    if (!isValidAddress(recipient)) {
      errors.push('Invalid recipient address');
    }
  
    if (!isValidAmount(amount)) {
      errors.push('Invalid amount');
    }
  
    if (parseFloat(amount) > parseFloat(balance)) {
      errors.push('Insufficient balance');
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    };
  };