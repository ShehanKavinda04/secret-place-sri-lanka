import React, { useState, useEffect } from 'react';
import SellerLayout from '@/Layouts/SellerLayout';
import { Head } from '@inertiajs/react';
import { Search, Filter, CalendarDays, LayoutList, CheckCircle, Clock, Users, ArrowRight, Zap, BellRing } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { reservationService } from '@/Services/reservationService';
import ReservationDrawer from './Components/ReservationDrawer';

// Custom Toast Component for new incoming bookings
const Toast = ({ notification, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-4 right-4 z-50 bg-[#1B4D3E] text-white p-4 rounded-lg shadow-2xl flex items-start max-w-sm border-l-4 border-[#D97706]"
        >
            <div className="flex-shrink-0 pt-0.5">
                <BellRing className="h-5 w-5 text-[#D97706] animate-bounce" />
            </div>
            <div className="ml-3 w-0 flex-1">
                <p className="text-sm font-bold">New Booking Received!</p>
                <p className="mt-1 text-sm opacity-90">{notification.guest_name} booked {notification.property_name}</p>
                <p className="mt-1 text-xs opacity-75">{new Date(notification.check_in_date).toLocaleDateString()} - {new Date(notification.check_out_date).toLocaleDateString()}</p>
            </div>
            <button onClick={onClose} className="ml-4 flex-shrink-0 text-white/50 hover:text-white">
                <span className="sr-only">Close</span>
                &times;
            </button>
        </motion.div>
    );
};

export default function Bookings() {
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState('table'); // 'table' | 'timeline'
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    // KPI Counters
    const today = new Date().toISOString().split('T')[0];
    const stats = {
        checkInsToday: reservations.filter(r => r.check_in_date === today).length,
        checkOutsToday: reservations.filter(r => r.check_out_date === today).length,
        activeGuests: reservations.filter(r => r.booking_status === 'checked_in').length,
        pendingApprovals: reservations.filter(r => r.booking_status === 'pending').length,
    };

    useEffect(() => {
        const loadReservations = async () => {
            setIsLoading(true);
            try {
                const data = await reservationService.fetchReservations('host-123');
                setReservations(data);
            } catch (error) {
                console.error("Failed to fetch reservations", error);
            } finally {
                setIsLoading(false);
            }
        };
        
        loadReservations();

        // Subscribe to real-time changes
        const unsubscribe = reservationService.subscribeToReservations((newReservations) => {
            // Check if there's a new booking to trigger notification
            setReservations(prev => {
                if (prev.length > 0 && newReservations.length > prev.length) {
                    const latest = newReservations[0];
                    triggerNotification(latest);
                }
                return newReservations;
            });
        });

        return () => unsubscribe();
    }, []);

    const triggerNotification = (reservation) => {
        // Play subtle sound
        const audio = new Audio('/sounds/notification.mp3');
        audio.play().catch(e => console.log('Audio play prevented by browser policy'));
        
        const id = Date.now();
        setNotifications(prev => [...prev, { id, ...reservation }]);
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            await reservationService.updateReservation({ id, booking_status: newStatus });
            if (selectedReservation?.id === id) {
                setSelectedReservation({ ...selectedReservation, booking_status: newStatus });
            }
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const openDrawer = (reservation) => {
        setSelectedReservation(reservation);
        setIsDrawerOpen(true);
    };

    // Filter Logic
    const filteredReservations = reservations.filter(r => {
        if (statusFilter !== 'all' && r.booking_status !== statusFilter) return false;
        if (searchQuery) {
            const lowerQ = searchQuery.toLowerCase();
            return (
                r.guest_name.toLowerCase().includes(lowerQ) ||
                r.id.toLowerCase().includes(lowerQ) ||
                r.guest_phone.includes(lowerQ)
            );
        }
        return true;
    });

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
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    return (
        <SellerLayout header="Reservations">
            <Head title="Reservations & Bookings" />
            
            {/* Notification Toast Container */}
            <div className="fixed top-0 right-0 z-50 pointer-events-none p-4">
                <AnimatePresence>
                    {notifications.map(n => (
                        <div key={n.id} className="pointer-events-auto">
                            <Toast notification={n} onClose={() => removeNotification(n.id)} />
                        </div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Header & Stats */}
                <div className="md:flex md:items-center md:justify-between mb-6">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-[#1B4D3E] sm:text-3xl sm:truncate">Reservations</h2>
                        <p className="mt-1 text-sm text-slate-500">Manage incoming bookings, check-ins, and guest communication.</p>
                    </div>
                    <div className="mt-4 flex md:mt-0 md:ml-4">
                        <button 
                            onClick={() => reservationService.simulateIncomingBooking()}
                            className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B4D3E]"
                        >
                            <Zap className="-ml-1 mr-2 h-4 w-4 text-amber-500" />
                            Simulate Incoming Booking
                        </button>
                    </div>
                </div>

                {/* KPI Bar */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Today's Check-Ins", value: stats.checkInsToday, icon: ArrowRight, color: 'text-[#D97706]' },
                        { label: "Today's Check-Outs", value: stats.checkOutsToday, icon: ArrowRight, color: 'text-slate-600', flip: true },
                        { label: "Active Guests", value: stats.activeGuests, icon: Users, color: 'text-blue-600' },
                        { label: "Pending Approvals", value: stats.pendingApprovals, icon: Clock, color: 'text-amber-600' },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white overflow-hidden shadow rounded-lg p-5 flex items-center">
                            <div className={`p-3 rounded-full bg-slate-50 ${stat.color} mr-4`}>
                                <stat.icon className={`h-6 w-6 ${stat.flip ? 'rotate-180' : ''}`} />
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-slate-500 truncate">{stat.label}</dt>
                                <dd className={`mt-1 text-2xl font-bold text-slate-900`}>{stat.value}</dd>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="bg-white p-4 rounded-t-lg border-b border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                    <div className="flex flex-1 w-full sm:w-auto items-center space-x-4">
                        <div className="relative rounded-md shadow-sm max-w-sm flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                className="focus:ring-[#1B4D3E] focus:border-[#1B4D3E] block w-full pl-10 sm:text-sm border-slate-300 rounded-md text-slate-900 placeholder-slate-400 bg-white"
                                placeholder="Search by name, ID, or phone..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Filter className="h-4 w-4 text-slate-400" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-[#1B4D3E] focus:border-[#1B4D3E] sm:text-sm rounded-md text-slate-900 bg-white"
                            >
                                <option value="all">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="checked_in">Checked In</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 bg-slate-100 rounded-md p-1">
                        <button 
                            onClick={() => setViewMode('table')}
                            className={`p-1.5 rounded-md flex items-center space-x-1 ${viewMode === 'table' ? 'bg-white shadow text-[#1B4D3E]' : 'text-slate-500'}`}
                        >
                            <LayoutList className="w-4 h-4" />
                            <span className="text-xs font-medium px-1">Table</span>
                        </button>
                        <button 
                            onClick={() => setViewMode('timeline')}
                            className={`p-1.5 rounded-md flex items-center space-x-1 ${viewMode === 'timeline' ? 'bg-white shadow text-[#1B4D3E]' : 'text-slate-500'}`}
                        >
                            <CalendarDays className="w-4 h-4" />
                            <span className="text-xs font-medium px-1">Timeline</span>
                        </button>
                    </div>
                </div>

                {/* Data View */}
                <div className="bg-white shadow rounded-b-lg border border-slate-200">
                    {isLoading ? (
                        <div className="p-12 text-center text-slate-500">Loading reservations...</div>
                    ) : filteredReservations.length === 0 ? (
                        <div className="p-12 text-center text-slate-500">No reservations found matching your filters.</div>
                    ) : viewMode === 'table' ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Booking ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Guest</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Property</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Dates</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                        <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {filteredReservations.map((reservation) => (
                                        <tr key={reservation.id} className="hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => openDrawer(reservation)}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{reservation.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-slate-900 flex items-center">
                                                    {reservation.guest_name}
                                                    <span className="ml-2 text-[10px] bg-slate-100 text-slate-600 px-1 py-0.5 rounded uppercase">{reservation.guest_country}</span>
                                                </div>
                                                <div className="text-sm text-slate-500">{reservation.guests_count} Person(s)</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{reservation.property_name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-slate-900">{new Date(reservation.check_in_date).toLocaleDateString()}</div>
                                                <div className="text-xs text-slate-400">to {new Date(reservation.check_out_date).toLocaleDateString()}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-[#D97706] font-medium">Rs. {reservation.total_price_lkr.toLocaleString()}</div>
                                                <div className={`text-xs ${reservation.payment_status === 'paid' ? 'text-emerald-500' : 'text-amber-500'}`}>{reservation.payment_status}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <StatusBadge status={reservation.booking_status} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={(e) => { e.stopPropagation(); openDrawer(reservation); }} className="text-[#1B4D3E] hover:text-[#113127]">Manage</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-slate-900 mb-4">Timeline View (By Check-in Date)</h3>
                            <div className="space-y-8">
                                {/* Group by check-in date for timeline simulation */}
                                {Object.entries(filteredReservations.reduce((acc, r) => {
                                    (acc[r.check_in_date] = acc[r.check_in_date] || []).push(r);
                                    return acc;
                                }, {})).sort().map(([date, resArray]) => (
                                    <div key={date} className="relative pl-8 border-l-2 border-[#1B4D3E]">
                                        <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[#D97706] border-4 border-white"></div>
                                        <h4 className="font-bold text-slate-900 mb-4">{new Date(date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                            {resArray.map(r => (
                                                <div key={r.id} onClick={() => openDrawer(r)} className="bg-[#F8FAFC] border border-slate-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className="text-xs font-bold text-slate-500">{r.id}</span>
                                                        <StatusBadge status={r.booking_status} />
                                                    </div>
                                                    <h5 className="font-bold text-[#1B4D3E]">{r.guest_name}</h5>
                                                    <p className="text-sm text-slate-600 mb-3">{r.property_name}</p>
                                                    <div className="flex justify-between items-end">
                                                        <div>
                                                            <p className="text-xs text-slate-400">Checkout</p>
                                                            <p className="text-sm font-medium">{new Date(r.check_out_date).toLocaleDateString()}</p>
                                                        </div>
                                                        <p className="text-sm font-bold text-[#D97706]">Rs. {r.total_price_lkr.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ReservationDrawer 
                isOpen={isDrawerOpen} 
                onClose={() => setIsDrawerOpen(false)} 
                reservation={selectedReservation}
                onUpdateStatus={handleUpdateStatus}
            />
        </SellerLayout>
    );
}
