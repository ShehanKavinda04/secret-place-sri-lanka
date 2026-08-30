import React, { createContext, useContext, useState, useEffect } from 'react';

const AppStateContext = createContext();

// Mock exchange rates from LKR
const EXCHANGE_RATES = {
  LKR: 1,
  USD: 0.0033, // 1 LKR = 0.0033 USD (example rate)
  EUR: 0.0030,
  GBP: 0.0026,
};

const CURRENCY_SYMBOLS = {
  LKR: 'Rs',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

export const AppStateProvider = ({ children }) => {
  const [role, setRole] = useState('customer');
  const [currency, setCurrency] = useState('LKR');
  const [theme, setTheme] = useState('dark');

  // Sync theme with document root
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const convertPrice = (priceLKR) => {
    const rate = EXCHANGE_RATES[currency];
    const converted = priceLKR * rate;
    
    // Formatting logic
    if (currency === 'LKR') {
      return `${CURRENCY_SYMBOLS[currency]} ${converted.toLocaleString('en-LK')}`;
    } else {
      return `${CURRENCY_SYMBOLS[currency]}${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  };

  return (
    <AppStateContext.Provider
      value={{
        role,
        setRole,
        currency,
        setCurrency,
        theme,
        setTheme,
        convertPrice,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
