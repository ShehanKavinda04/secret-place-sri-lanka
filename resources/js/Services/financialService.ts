import { Transaction, Expense, PayoutRequest, ExpenseCategory } from '../types/financials';

const TRANSACTIONS_KEY = 'secret_places_mock_transactions';
const EXPENSES_KEY = 'secret_places_mock_expenses';
const PAYOUTS_KEY = 'secret_places_mock_payouts';

// Fixed Exchange Rate for Prototype
export const USD_TO_LKR = 310;

const getInitialTransactions = (): Transaction[] => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(TRANSACTIONS_KEY);
        if (stored) return JSON.parse(stored);
    }
    const today = new Date();
    return [
        {
            id: 'TXN-1001',
            host_id: 'host-123',
            reservation_id: 'R-1001',
            guest_name: 'Sarah Jenkins',
            gross_amount: 12500,
            platform_commission: 1250, // 10%
            gateway_fee: 312.5, // 2.5%
            net_amount: 10937.5,
            payment_method: 'card',
            status: 'cleared',
            created_at: new Date(today.getTime() - 86400000 * 2).toISOString(),
        },
        {
            id: 'TXN-1002',
            host_id: 'host-123',
            reservation_id: 'R-1002',
            guest_name: 'Mateo Garcia',
            gross_amount: 59500,
            platform_commission: 5950,
            gateway_fee: 0, // cash
            net_amount: 53550,
            payment_method: 'cash',
            status: 'pending',
            created_at: new Date(today.getTime() - 86400000 * 1).toISOString(),
        },
        {
            id: 'TXN-1003',
            host_id: 'host-123',
            reservation_id: 'R-1003',
            guest_name: 'Yuki Tanaka',
            gross_amount: 25000,
            platform_commission: 2500,
            gateway_fee: 250, // lanka qr 1%
            net_amount: 22250,
            payment_method: 'lanka_qr',
            status: 'cleared',
            created_at: new Date(today.getTime() - 86400000 * 5).toISOString(),
        }
    ];
};

const getInitialExpenses = (): Expense[] => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(EXPENSES_KEY);
        if (stored) return JSON.parse(stored);
    }
    const today = new Date();
    return [
        {
            id: 'EXP-101',
            host_id: 'host-123',
            title: 'Electricity Bill - Aug',
            category: 'Utilities',
            amount: 8500,
            expense_date: new Date(today.getTime() - 86400000 * 4).toISOString(),
            created_at: new Date(today.getTime() - 86400000 * 4).toISOString(),
        },
        {
            id: 'EXP-102',
            host_id: 'host-123',
            title: 'Plumbing Repair',
            category: 'Maintenance',
            amount: 4200,
            expense_date: new Date(today.getTime() - 86400000 * 2).toISOString(),
            created_at: new Date(today.getTime() - 86400000 * 2).toISOString(),
        }
    ];
};

const getInitialPayouts = (): PayoutRequest[] => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(PAYOUTS_KEY);
        if (stored) return JSON.parse(stored);
    }
    const today = new Date();
    return [
        {
            id: 'PO-001',
            host_id: 'host-123',
            amount: 50000,
            bank_details_json: {
                bank_name: 'Commercial Bank',
                account_name: 'Secret Place Eco',
                account_number: '1002345678',
                branch: 'Ella'
            },
            status: 'completed',
            reference_no: 'TRX-998877',
            created_at: new Date(today.getTime() - 86400000 * 14).toISOString(),
        }
    ];
};

let transactions = getInitialTransactions();
let expenses = getInitialExpenses();
let payouts = getInitialPayouts();

const saveToStorage = () => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
        localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
        localStorage.setItem(PAYOUTS_KEY, JSON.stringify(payouts));
    }
};

type Subscribers = {
    transactions: ((t: Transaction[]) => void)[],
    expenses: ((e: Expense[]) => void)[],
    payouts: ((p: PayoutRequest[]) => void)[]
};

const listeners: Subscribers = {
    transactions: [],
    expenses: [],
    payouts: []
};

const notify = () => {
    saveToStorage();
    listeners.transactions.forEach(l => l([...transactions]));
    listeners.expenses.forEach(l => l([...expenses]));
    listeners.payouts.forEach(l => l([...payouts]));
};

export const financialService = {
    async fetchFinancials(hostId: string) {
        await new Promise(resolve => setTimeout(resolve, 600));
        return {
            transactions: transactions.filter(t => t.host_id === hostId),
            expenses: expenses.filter(e => e.host_id === hostId),
            payouts: payouts.filter(p => p.host_id === hostId),
        };
    },

    async addExpense(expenseData: Omit<Expense, 'id' | 'created_at' | 'host_id'>): Promise<Expense> {
        await new Promise(resolve => setTimeout(resolve, 500));
        const newExpense: Expense = {
            ...expenseData,
            id: `EXP-${Math.floor(Math.random() * 900) + 100}`,
            host_id: 'host-123',
            created_at: new Date().toISOString()
        };
        expenses = [newExpense, ...expenses];
        notify();
        return newExpense;
    },

    async requestPayout(amount: number): Promise<PayoutRequest> {
        await new Promise(resolve => setTimeout(resolve, 800));
        const newPayout: PayoutRequest = {
            id: `PO-${Math.floor(Math.random() * 900) + 100}`,
            host_id: 'host-123',
            amount,
            bank_details_json: {
                bank_name: 'Commercial Bank',
                account_name: 'Secret Place Eco',
                account_number: '1002345678',
                branch: 'Ella'
            },
            status: 'processing',
            created_at: new Date().toISOString()
        };
        payouts = [newPayout, ...payouts];
        
        // Optimistically mark some transactions as withdrawn
        let remainingToWithdraw = amount;
        transactions = transactions.map(t => {
            if (t.status === 'cleared' && remainingToWithdraw > 0) {
                if (remainingToWithdraw >= t.net_amount) {
                    remainingToWithdraw -= t.net_amount;
                    return { ...t, status: 'withdrawn' };
                }
            }
            return t;
        });

        notify();
        return newPayout;
    },

    subscribeToFinancials(callback: (data: any) => void): () => void {
        const handler = () => {
            callback({
                transactions: [...transactions],
                expenses: [...expenses],
                payouts: [...payouts],
            });
        };
        
        listeners.transactions.push(handler);
        listeners.expenses.push(handler);
        listeners.payouts.push(handler);
        
        // Initial call
        handler();

        return () => {
            listeners.transactions = listeners.transactions.filter(l => l !== handler);
            listeners.expenses = listeners.expenses.filter(l => l !== handler);
            listeners.payouts = listeners.payouts.filter(l => l !== handler);
        };
    }
};
