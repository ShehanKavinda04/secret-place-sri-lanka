import { Ticket, Train, Bus, Clock } from 'lucide-react';

const scheduleData = [
    { id: 1, type: 'train', route: 'Colombo Fort → Anuradhapura', dep: '05:45 AM', arr: '09:30 AM', name: 'Yal Devi (Express)', price: 'Rs. 1,200', link: 'https://seatreservation.railway.gov.lk/cra/' },
    { id: 2, type: 'train', route: 'Kandy → Anuradhapura', dep: '07:00 AM', arr: '12:15 PM', name: 'Rajarata Rejini', price: 'Rs. 800', link: 'https://seatreservation.railway.gov.lk/cra/' },
    { id: 3, type: 'bus', route: 'Colombo (Pettah) → Anuradhapura', dep: 'Every 30 Mins', arr: '~ 4.5 Hours', name: 'Route 15 - Super Luxury AC', price: 'Rs. 1,500', link: 'https://sltb.eseat.lk/' },
    { id: 4, type: 'bus', route: 'Mihintale Feeder (Local)', dep: 'Every 20 Mins', arr: '~ 30 Mins', name: 'CTB Local Route', price: 'Rs. 100', link: null },
];

export default function PublicTransportTable() {
    return (
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                            <th className="px-6 py-4">Transport</th>
                            <th className="px-6 py-4">Route & Service</th>
                            <th className="px-6 py-4">Departure</th>
                            <th className="px-6 py-4">Arrival</th>
                            <th className="px-6 py-4 text-right">E-Ticket</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {scheduleData.map(item => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-xl ${item.type === 'train' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
                                            {item.type === 'train' ? <Train className="w-5 h-5" /> : <Bus className="w-5 h-5" />}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-800 text-sm">{item.route}</div>
                                    <div className="text-xs text-slate-500 mt-1">{item.name}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-sm text-slate-700">
                                        <Clock className="w-4 h-4 text-slate-400" /> {item.dep}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm font-medium text-slate-700">{item.arr}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {item.link ? (
                                        <a href={item.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 hover:bg-teal-100 hover:text-teal-800 font-bold px-4 py-2 rounded-lg text-xs transition-colors border border-teal-100">
                                            <Ticket className="w-4 h-4" /> Book ({item.price})
                                        </a>
                                    ) : (
                                        <span className="inline-flex items-center gap-2 bg-slate-100 text-slate-500 font-bold px-4 py-2 rounded-lg text-xs border border-slate-200 cursor-not-allowed">
                                            Pay Onboard
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
