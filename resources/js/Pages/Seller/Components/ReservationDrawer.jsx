import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Phone, MapPin, CreditCard, FileText, CheckCircle, Clock, Ban, Printer, MessageCircle, Info } from 'lucide-react';
import { reservationService } from '@/Services/reservationService';

export default function ReservationDrawer({ isOpen, onClose, reservation, onUpdateStatus }) {
    if (!reservation) return null;

    const handlePrint = () => {
        window.print();
    };

    const handleWhatsApp = () => {
        const text = `Hi ${reservation.guest_name}, this is your host from ${reservation.property_name}. We're excited to welcome you on ${reservation.check_in_date}! Let us know if you need any directions.`;
        const url = `https://wa.me/${reservation.guest_phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    const StatusBadge = ({ status }) => {
        const styles = {
            confirmed: 'bg-emerald-100 text-emerald-800',
            pending: 'bg-amber-100 text-amber-800',
            checked_in: 'bg-blue-100 text-blue-800',
            completed: 'bg-slate-100 text-slate-800',
            cancelled: 'bg-rose-100 text-rose-800',
        };
        const labels = {
            confirmed: 'Confirmed',
            pending: 'Pending',
            checked_in: 'Checked In',
            completed: 'Completed',
            cancelled: 'Cancelled'
        };
        return (
            <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    const ActionButtons = () => {
        if (reservation.booking_status === 'pending') {
            return (
                <div className="flex space-x-3 mt-6">
                    <button onClick={() => onUpdateStatus(reservation.id, 'confirmed')} className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-md font-medium hover:bg-emerald-700 transition">Confirm Booking</button>
                    <button onClick={() => onUpdateStatus(reservation.id, 'cancelled')} className="flex-1 bg-white border border-rose-600 text-rose-600 px-4 py-2 rounded-md font-medium hover:bg-rose-50 transition">Reject</button>
                </div>
            );
        }
        if (reservation.booking_status === 'confirmed') {
            return (
                <div className="flex space-x-3 mt-6">
                    <button onClick={() => onUpdateStatus(reservation.id, 'checked_in')} className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition">Mark Checked-In</button>
                    <button onClick={() => onUpdateStatus(reservation.id, 'cancelled')} className="flex-1 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-md font-medium hover:bg-slate-50 transition">Cancel Booking</button>
                </div>
            );
        }
        if (reservation.booking_status === 'checked_in') {
            return (
                <div className="flex space-x-3 mt-6">
                    <button onClick={() => onUpdateStatus(reservation.id, 'completed')} className="flex-1 bg-slate-800 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-900 transition">Complete Stay</button>
                </div>
            );
        }
        return null;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl z-50 flex flex-col overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center sticky top-0 z-10">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">Booking {reservation.id}</h2>
                                <p className="text-xs text-slate-500">Placed on {new Date(reservation.created_at).toLocaleDateString()}</p>
                            </div>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 transition text-slate-500">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6 print-content">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-[#1B4D3E]">{reservation.property_name}</h3>
                                    <StatusBadge status={reservation.booking_status} />
                                </div>
                            </div>

                            {/* Guest Details */}
                            <section className="mb-6 bg-[#F8FAFC] p-4 rounded-lg border border-slate-100">
                                <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Guest Information</h4>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center text-slate-700">
                                        <User className="w-4 h-4 mr-3 text-slate-400" />
                                        <span className="font-medium">{reservation.guest_name}</span>
                                        <span className="ml-2 px-1.5 py-0.5 bg-slate-200 text-xs rounded text-slate-600">{reservation.guest_country}</span>
                                    </div>
                                    <div className="flex items-center text-slate-700">
                                        <Phone className="w-4 h-4 mr-3 text-slate-400" />
                                        {reservation.guest_phone}
                                    </div>
                                    <div className="flex items-center text-slate-700">
                                        <FileText className="w-4 h-4 mr-3 text-slate-400" />
                                        {reservation.guest_email}
                                    </div>
                                    
                                    <button onClick={handleWhatsApp} className="mt-3 flex items-center justify-center w-full py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-md font-medium text-sm transition shadow-sm">
                                        <MessageCircle className="w-4 h-4 mr-2" /> Message on WhatsApp
                                    </button>
                                </div>
                            </section>

                            {/* Stay Details */}
                            <section className="mb-6">
                                <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Stay Details</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="border border-slate-200 rounded p-3 text-center">
                                        <p className="text-xs text-slate-500 uppercase">Check-in</p>
                                        <p className="font-bold text-slate-900 mt-1">{new Date(reservation.check_in_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
                                    </div>
                                    <div className="border border-slate-200 rounded p-3 text-center">
                                        <p className="text-xs text-slate-500 uppercase">Check-out</p>
                                        <p className="font-bold text-slate-900 mt-1">{new Date(reservation.check_out_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center justify-between text-sm text-slate-700">
                                    <span className="flex items-center"><User className="w-4 h-4 mr-2 text-slate-400"/> Guests</span>
                                    <span className="font-semibold">{reservation.guests_count} Person(s)</span>
                                </div>
                            </section>

                            {/* Payment Summary */}
                            <section className="mb-6 border-t border-slate-200 pt-6">
                                <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Payment Summary</h4>
                                <div className="space-y-2 text-sm text-slate-700 mb-4">
                                    <div className="flex justify-between">
                                        <span>Total Amount</span>
                                        <span className="font-bold text-[#D97706]">Rs. {reservation.total_price_lkr.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Payment Method</span>
                                        <span className="capitalize">{reservation.payment_method.replace('_', ' ')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Status</span>
                                        <span className={`capitalize font-medium ${reservation.payment_status === 'paid' ? 'text-emerald-600' : 'text-amber-600'}`}>{reservation.payment_status}</span>
                                    </div>
                                </div>
                            </section>

                            {reservation.special_requests && (
                                <section className="mb-6 bg-amber-50 p-4 rounded-lg border border-amber-100">
                                    <h4 className="text-sm font-bold text-amber-900 mb-1 flex items-center">
                                        <Info className="w-4 h-4 mr-2" /> Special Requests
                                    </h4>
                                    <p className="text-sm text-amber-800 italic">{reservation.special_requests}</p>
                                </section>
                            )}
                        </div>

                        {/* Footer Actions */}
                        <div className="p-6 border-t border-slate-200 bg-white sticky bottom-0">
                            <ActionButtons />
                            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-center">
                                <button onClick={handlePrint} className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition">
                                    <Printer className="w-4 h-4 mr-2" /> Print Invoice
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
