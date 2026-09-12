/**
 * Credit & Debit Card Validation Utility
 * Provides Luhn Algorithm (Mod 10), card provider pattern detection,
 * length checks, expiration date, and CVV validation.
 */

export const CARD_PATTERNS = {
    visa: {
        name: 'Visa',
        lengths: [13, 16, 19],
        prefix: /^4/
    },
    mastercard: {
        name: 'Mastercard',
        lengths: [16],
        prefix: /^(?:5[1-5]|2[2-7])/
    },
    amex: {
        name: 'American Express',
        lengths: [15],
        prefix: /^3[47]/
    },
    discover: {
        name: 'Discover',
        lengths: [16, 19],
        prefix: /^6(?:011|5)/
    },
    lankapay: {
        name: 'LankaPay / JCB',
        lengths: [16, 19],
        prefix: /^(?:35|28|50|60)/
    }
};

/**
 * Standard Luhn (Mod 10) Checksum Algorithm
 */
export function validateLuhn(cardNumber) {
    const cleanNum = String(cardNumber || '').replace(/\D/g, '');
    if (!cleanNum || cleanNum.length < 13 || cleanNum.length > 19) return false;
    
    let sum = 0;
    let shouldDouble = false;
    
    for (let i = cleanNum.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanNum.charAt(i), 10);
        
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    
    return sum % 10 === 0;
}

/**
 * Detect brand prefix
 */
export function getCardBrand(cardNumber) {
    const cleanNum = String(cardNumber || '').replace(/\D/g, '');
    if (!cleanNum) return null;
    if (CARD_PATTERNS.visa.prefix.test(cleanNum)) return 'visa';
    if (CARD_PATTERNS.mastercard.prefix.test(cleanNum)) return 'mastercard';
    if (CARD_PATTERNS.amex.prefix.test(cleanNum)) return 'amex';
    if (CARD_PATTERNS.discover.prefix.test(cleanNum)) return 'discover';
    if (CARD_PATTERNS.lankapay.prefix.test(cleanNum)) return 'lankapay';
    return null;
}

/**
 * Validate Card Number: Length, Brand Prefix, and Luhn Algorithm
 */
export function validateCardNumber(cardNumber) {
    const cleanNum = String(cardNumber || '').replace(/\D/g, '');
    if (!cleanNum) {
        return { isValid: false, error: 'Card number is required.', brand: null };
    }
    
    const brand = getCardBrand(cleanNum);
    
    // Length check
    if (cleanNum.length < 13 || cleanNum.length > 19) {
        return { 
            isValid: false, 
            error: `Card number must be between 13 and 19 digits (entered ${cleanNum.length}).`, 
            brand 
        };
    }
    
    // Provider specific length check if detected
    if (brand && CARD_PATTERNS[brand]) {
        const expectedLengths = CARD_PATTERNS[brand].lengths;
        if (!expectedLengths.includes(cleanNum.length)) {
            return {
                isValid: false,
                error: `${CARD_PATTERNS[brand].name} requires exactly ${expectedLengths.join(' or ')} digits.`,
                brand
            };
        }
    }
    
    // Luhn algorithm check
    if (!validateLuhn(cleanNum)) {
        return { 
            isValid: false, 
            error: 'Invalid card number. Please check the digits and try again (failed checksum).', 
            brand 
        };
    }
    
    return { isValid: true, error: '', brand };
}

/**
 * Validate Expiry Date MM/YY
 */
export function validateExpiryDate(expiry) {
    if (!expiry || !expiry.trim()) {
        return { isValid: false, error: 'Expiry date is required (MM/YY).' };
    }
    const match = expiry.trim().match(/^(\d{2})\/(\d{2})$/);
    if (!match) {
        return { isValid: false, error: 'Format must be MM/YY (e.g. 08/27).' };
    }
    const month = parseInt(match[1], 10);
    const year = parseInt(`20${match[2]}`, 10);
    
    if (month < 1 || month > 12) {
        return { isValid: false, error: 'Invalid month (must be 01 to 12).' };
    }
    
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return { isValid: false, error: 'Card has expired.' };
    }
    
    if (year > currentYear + 20) {
        return { isValid: false, error: 'Invalid expiration year.' };
    }
    
    return { isValid: true, error: '' };
}

/**
 * Validate CVV / CVC
 */
export function validateCvv(cvv, brand) {
    const cleanCvv = String(cvv || '').trim();
    if (!cleanCvv) {
        return { isValid: false, error: 'CVV/CVC is required.' };
    }
    if (!/^\d+$/.test(cleanCvv) || (cleanCvv.length !== 3 && cleanCvv.length !== 4)) {
        return { isValid: false, error: 'CVV must be 3 or 4 digits.' };
    }
    if (brand === 'amex' && cleanCvv.length !== 4) {
        return { isValid: false, error: 'American Express requires 4-digit CVV.' };
    }
    return { isValid: true, error: '' };
}

/**
 * Validate Cardholder Name
 */
export function validateCardHolder(name) {
    if (!name || !name.trim() || name.trim().length < 2) {
        return { isValid: false, error: 'Cardholder name is required (min 2 characters).' };
    }
    return { isValid: true, error: '' };
}
