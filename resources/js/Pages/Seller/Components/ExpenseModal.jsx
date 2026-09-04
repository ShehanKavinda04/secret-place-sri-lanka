import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, Calendar, Tag, FileText, Upload, Plus } from 'lucide-react';
import { financialService } from '@/Services/financialService';

export default function ExpenseModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        title: '',
        category: 'Utilities',
        amount: '',
        expense_date: new Date().toISOString().split('T')[0]
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = ['Utilities', 'Maintenance', 'Food & Beverage', 'Staff', 'Marketing', 'Other'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await financialService.addExpense({
                title: formData.title,
                category: formData.category,
                amount: parseFloat(formData.amount),
                expense_date: formData.expense_date
            });
            onClose();
            // Reset form
            setFormData({
                title: '',
                category: 'Utilities',
                amount: '',
                expense_date: new Date().toISOString().split('T')[0]
            });
        } catch (error) {
            console.error("Failed to add expense", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
                    onClick={onClose}
                />
                
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden z-10"
                >
                    <div className="bg-[#1B4D3E] px-6 py-4 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-white flex items-center">
                            <Plus className="w-5 h-5 mr-2" />
                            Log New Expense
                        </h3>
                        <button onClick={onClose} className="text-white/70 hover:text-white transition">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center">
                                    <FileText className="w-4 h-4 mr-1 text-slate-400" /> Title / Description
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full border-slate-300 rounded-md shadow-sm focus:border-[#1B4D3E] focus:ring-[#1B4D3E] sm:text-sm"
                                    placeholder="e.g. Monthly Electricity Bill"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center">
                                        <Tag className="w-4 h-4 mr-1 text-slate-400" /> Category
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full border-slate-300 rounded-md shadow-sm focus:border-[#1B4D3E] focus:ring-[#1B4D3E] sm:text-sm"
                                    >
                                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center">
                                        <Calendar className="w-4 h-4 mr-1 text-slate-400" /> Date
                                    </label>
                                    <input
                                        type="date"
                                        name="expense_date"
                                        required
                                        value={formData.expense_date}
                                        onChange={handleChange}
                                        className="w-full border-slate-300 rounded-md shadow-sm focus:border-[#1B4D3E] focus:ring-[#1B4D3E] sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center">
                                    <DollarSign className="w-4 h-4 mr-1 text-slate-400" /> Amount (LKR)
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-slate-500 sm:text-sm">Rs.</span>
                                    </div>
                                    <input
                                        type="number"
                                        name="amount"
                                        required
                                        min="0"
                                        step="0.01"
                                        value={formData.amount}
                                        onChange={handleChange}
                                        className="w-full pl-10 border-slate-300 rounded-md focus:border-[#1B4D3E] focus:ring-[#1B4D3E] sm:text-sm"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center">
                                    <Upload className="w-4 h-4 mr-1 text-slate-400" /> Receipt (Optional)
                                </label>
                                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-slate-300 px-6 pt-5 pb-6 hover:bg-slate-50 cursor-pointer transition">
                                    <div className="space-y-1 text-center">
                                        <Upload className="mx-auto h-8 w-8 text-slate-400" />
                                        <div className="flex text-sm text-slate-600 justify-center">
                                            <span className="relative cursor-pointer rounded-md bg-transparent font-medium text-[#D97706] hover:text-[#b46205]">
                                                Upload a file
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-500">PNG, JPG, PDF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 focus:outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-[#1B4D3E] border border-transparent rounded-md shadow-sm hover:bg-[#133c30] focus:outline-none disabled:opacity-50"
                            >
                                {isSubmitting ? 'Saving...' : 'Save Expense'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
