import React, { Fragment } from 'react';
import { useAppState } from '../Context/AppStateContext';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, BellIcon, TreePine, Map, User, ShieldCheck } from 'lucide-react';
import { Link } from '@inertiajs/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const Header = () => {
  const { role, setRole, currency, setCurrency } = useAppState();

  const roles = [
    { id: 'customer', label: 'Traveler', icon: <Map className="w-4 h-4 mr-2" /> },
    { id: 'seller', label: 'Local Host', icon: <User className="w-4 h-4 mr-2" /> },
    { id: 'admin', label: 'Trust & Safety Officer', icon: <ShieldCheck className="w-4 h-4 mr-2" /> },
  ];

  const currencies = ['LKR', 'USD', 'EUR', 'GBP'];

  return (
    <header className="bg-ceylon-950/80 backdrop-blur-md border-b border-ceylon-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <Link href="/" className="flex items-center space-x-3">
              <div className="bg-emerald-accent/20 p-2 rounded-xl">
                <TreePine className="h-8 w-8 text-emerald-accent" />
              </div>
              <div>
                <span className="font-sansDisplay text-2xl font-bold text-white tracking-tight">
                  Secret Places
                </span>
                <span className="block text-xs text-amber-badge font-semibold uppercase tracking-widest mt-0.5">
                  Sri Lanka
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            
            {/* Currency Dropdown */}
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-ceylon-800 shadow-sm px-4 py-2 bg-ceylon-900 text-sm font-medium text-gray-200 hover:bg-ceylon-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-ceylon-950 focus:ring-emerald-accent">
                  {currency}
                  <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-ceylon-900 ring-1 ring-black ring-opacity-5 focus:outline-none border border-ceylon-800">
                  <div className="py-1">
                    {currencies.map((c) => (
                      <Menu.Item key={c}>
                        {({ active }) => (
                          <button
                            onClick={() => setCurrency(c)}
                            className={classNames(
                              active ? 'bg-ceylon-800 text-white' : 'text-gray-300',
                              'block px-4 py-2 text-sm w-full text-left'
                            )}
                          >
                            {c}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Role Switcher */}
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex items-center justify-center w-full rounded-md border border-ceylon-800 shadow-sm px-4 py-2 bg-ceylon-900 text-sm font-medium text-emerald-accent hover:bg-ceylon-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-ceylon-950 focus:ring-emerald-accent">
                  {roles.find(r => r.id === role)?.icon}
                  {roles.find(r => r.id === role)?.label}
                  <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-ceylon-900 ring-1 ring-black ring-opacity-5 focus:outline-none border border-ceylon-800">
                  <div className="py-1">
                    {roles.map((r) => (
                      <Menu.Item key={r.id}>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              setRole(r.id);
                              // In a real app, this would also redirect to the respective dashboard
                              if (r.id === 'admin') window.location.href = '/admin-dashboard';
                              if (r.id === 'seller') window.location.href = '/seller-dashboard';
                              if (r.id === 'customer') window.location.href = '/customer-dashboard';
                            }}
                            className={classNames(
                              active ? 'bg-ceylon-800 text-white' : 'text-gray-300',
                              'px-4 py-2 text-sm w-full text-left flex items-center'
                            )}
                          >
                            {r.icon}
                            {r.label}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Notifications */}
            <button className="p-2 rounded-full text-gray-400 hover:text-white bg-ceylon-900 border border-ceylon-800 hover:bg-ceylon-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-ceylon-950 focus:ring-emerald-accent">
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Persona Avatar */}
            <div className="h-10 w-10 rounded-full bg-ceylon-800 border-2 border-emerald-accent/50 overflow-hidden">
              <img 
                src={
                  role === 'customer' ? 'https://ui-avatars.com/api/?name=Traveler&background=1e293b&color=10b981' :
                  role === 'seller' ? 'https://ui-avatars.com/api/?name=Local+Host&background=1e293b&color=f59e0b' :
                  'https://ui-avatars.com/api/?name=Admin&background=1e293b&color=f43f5e'
                } 
                alt="Avatar" 
                className="h-full w-full object-cover"
              />
            </div>
            
            {/* CTA */}
            {role === 'customer' && (
              <button className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-ceylon-950 bg-emerald-accent hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-ceylon-950 focus:ring-emerald-accent transition-colors">
                List a Secret Spot
              </button>
            )}

          </div>
        </div>
      </div>
    </header>
  );
};
