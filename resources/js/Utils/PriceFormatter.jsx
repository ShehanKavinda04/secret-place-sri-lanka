import React from 'react';

// Hardcoded exchange rate: 1 USD = 300 LKR
export const EXCHANGE_RATE = 300;

export const parsePriceToNumber = (price) => {
    if (typeof price === 'number') return price;
    if (!price) return 0;
    
    // Find the first sequence that starts with a digit and contains digits, commas, or dots
    const match = price.toString().match(/[0-9][0-9,.]*/);
    if (!match) return 0;
    
    // Remove commas
    const cleaned = match[0].replace(/,/g, '');
    
    return parseFloat(cleaned) || 0;
};

export const formatLKR = (amount) => {
    return `Rs. ${amount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
};

export const formatUSD = (amountLKR) => {
    const usdAmount = amountLKR / EXCHANGE_RATE;
    return `$${usdAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
};

export default function PriceDisplay({ amount, className = '', stacked = false }) {
    const numericAmount = parsePriceToNumber(amount);
    
    if (stacked) {
        return (
            <div className={`flex flex-col ${className}`}>
                <span>{formatLKR(numericAmount)}</span>
                <span className="text-[0.8em] text-slate-500 font-medium tracking-tight">({formatUSD(numericAmount)})</span>
            </div>
        );
    }
    
    return (
        <span className={className}>
            {formatLKR(numericAmount)} <span className="text-[0.85em] text-slate-500 font-medium ml-1 whitespace-nowrap">({formatUSD(numericAmount)})</span>
        </span>
    );
}
