import React, { useState } from 'react';
import { Search, Filter, Printer, FileText, MessageCircle, MoreVertical, CheckCircle, Clock, XCircle, MapPin, User, Calendar as CalendarIcon, Phone, Mail } from 'lucide-react';

export default function ReservationEngine() {
    const [filter, setFilter] = useState('All');
    const [selectedGuest, setSelectedGuest] = useState(null);

    const reservations = [
        { id: 'RES-001', guest: 'Michael Thomsen', email: 'michael.t@example.com', phone: '+44 7700 900077', checkIn: 'Oct 24', checkOut: 'Oct 27', room: 'Deluxe Eco Cabin', status: 'Checked-In', amount: 'LKR 45,000', payment: 'Paid', requests: 'Vegan breakfast, Airport pickup' },
        { id: 'RES-002', guest: 'Sarah Jenkins', email: 'sarah.j@example.com', phone: '+1 555-0198', checkIn: 'Oct 26', checkOut: 'Oct 29', room: 'Family Treehouse', status: 'Approved', amount: 'LKR 66,000', payment: 'Paid', requests: 'Extra cot for baby' },
        { id: 'RES-003', guest: 'Kasun Perera', email: 'kasun.p@example.lk', phone: '+94 77 123 4567', checkIn: 'Nov 02', checkOut: 'Nov 04', room: 'Deluxe Eco Cabin', status: 'Pending Payment', amount: 'LKR 30,000', payment: 'Pending', requests: 'None' },
        { id: 'RES-004', guest: 'Emma Watson', email: 'emma.w@example.com', phone: '+61 411 000 000', checkIn: 'Oct 20', checkOut: 'Oct 22', room: 'Family Treehouse', status: 'Checked-Out', amount: 'LKR 44,000', payment: 'Paid', requests: 'Late check-out requested' },
        { id: 'RES-005', guest: 'David Chen', email: 'david.c@example.sg', phone: '+65 9123 4567', checkIn: 'Nov 15', checkOut: 'Nov 18', room: 'Secret Guided Trek', status: 'Cancelled', amount: 'LKR 15,000', payment: 'Refunded', requests: 'Allergic to peanuts' },
    ];

    const filteredReservations = filter === 'All' ? reservations : reservations.filter(r => r.status === filter);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Checked-In': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Approved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Pending Payment': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'Checked-Out': return 'bg-gray-100 text-gray-700 border-gray-200';
            case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 font-sansDisplay">Reservation Desk</h2>
                    <p className="text-sm text-gray-500">Manage bookings, communicate with guests, and process check-ins.</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Side: Table */}
                <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                            {['All', 'Approved', 'Pending Payment', 'Checked-In', 'Checked-Out', 'Cancelled'].map(f => (
                                <button 
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors
                                        ${filter === f ? 'bg-[#1B4D3E] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                                    `}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search guest or ID..." 
                                className="w-full sm:w-48 pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-[#1B4D3E] focus:border-[#1B4D3E]"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Guest & ID</th>
                                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Dates</th>
                                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Room</th>
                                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredReservations.map((res) => (
                                    <tr 
                                        key={res.id} 
                                        onClick={() => setSelectedGuest(res)}
                                        className={`hover:bg-gray-50 cursor-pointer transition-colors ${selectedGuest?.id === res.id ? 'bg-[#1B4D3E]/5 border-l-2 border-l-[#1B4D3E]' : ''}`}
                                    >
                                        <td className="px-4 py-4">
                                            <div className="font-semibold text-gray-900">{res.guest}</div>
                                            <div className="text-xs text-gray-500">{res.id}</div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm text-gray-700">{res.checkIn} &rarr; {res.checkOut}</div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm text-gray-700">{res.room}</div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getStatusColor(res.status)}`}>
                                                {res.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-right">
                                            <button className="p-1.5 text-gray-400 hover:text-[#1B4D3E] rounded-lg hover:bg-[#1B4D3E]/10">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredReservations.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-8 text-center text-sm text-gray-500">
                                            No reservations found matching this filter.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Side: Guest Details Panel */}
                {selectedGuest ? (
                    <div className="w-full lg:w-96 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col animate-slideInRight">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                                    <User className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 font-sansDisplay text-lg leading-none">{selectedGuest.guest}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{selectedGuest.id}</p>
                                </div>
                            </div>
                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase border ${getStatusColor(selectedGuest.status)}`}>
                                {selectedGuest.status}
                            </span>
                        </div>

                        <div className="space-y-4 flex-1">
                            {/* Contact Details */}
                            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-700">
                                    <Mail className="w-4 h-4 text-gray-400" />
                                    {selectedGuest.email}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-700">
                                    <Phone className="w-4 h-4 text-gray-400" />
                                    {selectedGuest.phone}
                                </div>
                            </div>

                            {/* Booking Details */}
                            <div className="border border-gray-100 rounded-xl p-4">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Stay Details</h4>
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                        <CalendarIcon className="w-4 h-4 text-[#1B4D3E]" />
                                        {selectedGuest.checkIn} - {selectedGuest.checkOut}
                                    </div>
                                    <div className="text-xs font-medium text-gray-500">3 Nights</div>
                                </div>
                                <div className="text-sm font-medium text-gray-700 mb-1">{selectedGuest.room}</div>
                                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                                    <div className="text-sm text-gray-500">Total Amount</div>
                                    <div className="text-sm font-bold text-gray-900">{selectedGuest.amount}</div>
                                </div>
                            </div>

                            {/* Special Requests */}
                            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                                <h4 className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-2">Special Requests</h4>
                                <p className="text-sm text-orange-900">{selectedGuest.requests}</p>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50 transition-colors">
                                <MessageCircle className="w-4 h-4" /> Message
                            </button>
                            <button className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50 transition-colors">
                                <Printer className="w-4 h-4" /> Voucher
                            </button>
                            <button className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50 transition-colors">
                                <FileText className="w-4 h-4" /> Invoice
                            </button>
                            {selectedGuest.status === 'Approved' && (
                                <button className="flex items-center justify-center gap-2 py-2 px-3 bg-[#1B4D3E] text-white rounded-xl text-xs font-semibold hover:bg-[#143d31] transition-colors">
                                    <CheckCircle className="w-4 h-4" /> Check In
                                </button>
                            )}
                            {selectedGuest.status === 'Checked-In' && (
                                <button className="flex items-center justify-center gap-2 py-2 px-3 bg-gray-800 text-white rounded-xl text-xs font-semibold hover:bg-gray-900 transition-colors">
                                    <MapPin className="w-4 h-4" /> Check Out
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="hidden lg:flex w-96 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 flex-col items-center justify-center text-center p-8">
                        <User className="w-12 h-12 text-gray-300 mb-4" />
                        <h3 className="text-gray-900 font-semibold mb-1">No Guest Selected</h3>
                        <p className="text-sm text-gray-500">Select a reservation from the table to view guest details and actions.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
