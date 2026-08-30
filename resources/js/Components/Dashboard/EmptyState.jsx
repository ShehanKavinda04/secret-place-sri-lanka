import React from 'react';
import { FileSearch } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmptyState({ title, message, actionButton = null }) {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50/50"
        >
            <div className="h-16 w-16 rounded-full bg-royalMaroon-100 flex items-center justify-center mb-4">
                <FileSearch className="h-8 w-8 text-royalMaroon-900" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 font-sansDisplay">{title}</h3>
            <p className="mt-1 text-sm text-gray-500 max-w-sm">{message}</p>
            {actionButton && (
                <div className="mt-6">
                    {actionButton}
                </div>
            )}
        </motion.div>
    );
}
