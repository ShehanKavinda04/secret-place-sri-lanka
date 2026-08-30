import React, { useState } from 'react';
import { Bell } from 'lucide-react';

export default function NotificationBell({ unreadCount = 0, notifications = [], onOpen = () => {} }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        if (!isOpen && unreadCount > 0) {
            onOpen();
        }
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <button
                onClick={handleToggle}
                className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-royalGold-500 focus:ring-offset-2 transition-colors"
            >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" aria-hidden="true" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">Notifications</p>
                    </div>
                    {notifications.length === 0 ? (
                        <div className="px-4 py-6 text-center text-sm text-gray-500">
                            You have no new notifications.
                        </div>
                    ) : (
                        <div className="max-h-64 overflow-y-auto">
                            {notifications.map((notif) => (
                                <div key={notif.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                                    <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                                    <p className="text-sm text-gray-800">{notif.message}</p>
                                    <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
