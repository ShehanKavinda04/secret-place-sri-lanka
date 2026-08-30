import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LogOut } from 'lucide-react';

export default function Sidebar({ items, theme = 'admin' }) {
    const { url } = usePage();

    const getThemeClasses = () => {
        if (theme === 'seller') {
            return {
                bg: 'bg-white border-r border-gray-200',
                text: 'text-gray-700',
                activeText: 'text-royalGold-600 font-medium',
                activeBg: 'bg-royalGold-50',
                hover: 'hover:bg-gray-50 hover:text-royalGold-600',
                brandText: 'text-royalGold-600',
                icon: 'text-gray-400',
                activeIcon: 'text-royalGold-500',
            };
        }
        if (theme === 'customer') {
            return {
                bg: 'bg-white border-r border-gray-200',
                text: 'text-gray-700',
                activeText: 'text-royalTeal-600 font-medium',
                activeBg: 'bg-royalTeal-50',
                hover: 'hover:bg-gray-50 hover:text-royalTeal-600',
                brandText: 'text-royalTeal-600',
                icon: 'text-gray-400',
                activeIcon: 'text-royalTeal-500',
            };
        }
        // Admin default
        return {
            bg: 'bg-royalMaroon-950',
            text: 'text-royalMaroon-100',
            activeText: 'text-white font-medium',
            activeBg: 'bg-royalMaroon-900',
            hover: 'hover:bg-royalMaroon-900 hover:text-white',
            brandText: 'text-royalGold-400',
            icon: 'text-royalMaroon-300',
            activeIcon: 'text-royalGold-500',
        };
    };

    const classes = getThemeClasses();

    return (
        <div className={`w-64 flex-shrink-0 flex flex-col h-[calc(100vh-64px)] ${classes.bg} overflow-y-auto`}>
            <div className="flex-1 py-6 space-y-1">
                {items.map((item) => {
                    let isActive = false;
                    try {
                        const path = new URL(item.href).pathname;
                        isActive = url === path || (path !== '/' && url.startsWith(path + '/'));
                    } catch(e) {
                        isActive = url === item.href || url.startsWith(item.href + '/');
                    }
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`group flex items-center px-6 py-3 text-sm transition-colors ${
                                isActive ? `${classes.activeBg} ${classes.activeText}` : `${classes.text} ${classes.hover}`
                            }`}
                        >
                            <Icon 
                                className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${
                                    isActive ? classes.activeIcon : `${classes.icon} group-hover:${classes.activeIcon}`
                                }`} 
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </div>
            
            <div className="p-4 border-t border-royalMaroon-900/30">
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className={`group flex w-full items-center px-4 py-2 text-sm transition-colors rounded-md ${classes.text} ${classes.hover}`}
                >
                    <LogOut className={`mr-3 h-5 w-5 flex-shrink-0 ${classes.icon} group-hover:text-red-400`} />
                    Sign Out
                </Link>
            </div>
        </div>
    );
}
