import React from 'react';
import Modal from '../Modal';
import SecondaryButton from '../SecondaryButton';
import PrimaryButton from '../PrimaryButton';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmModal({
    show,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    isDanger = false,
    processing = false,
}) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="sm">
            <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                    <div className={`flex-shrink-0 p-2 rounded-full ${isDanger ? 'bg-red-100 text-red-600' : 'bg-royalGold-100 text-royalGold-600'}`}>
                        <AlertTriangle className="h-6 w-6" />
                    </div>
                    <h2 className="text-lg font-medium text-gray-900 font-sansDisplay">
                        {title}
                    </h2>
                </div>

                <p className="text-sm text-gray-500 mb-6">
                    {message}
                </p>

                <div className="flex justify-end space-x-3">
                    <SecondaryButton onClick={onClose} disabled={processing}>
                        {cancelText}
                    </SecondaryButton>
                    <button
                        onClick={onConfirm}
                        disabled={processing}
                        className={`inline-flex items-center px-4 py-2 bg-white border rounded-md font-semibold text-xs uppercase tracking-widest shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 ${
                            isDanger 
                                ? 'border-red-600 bg-red-600 text-white hover:bg-red-500' 
                                : 'border-royalMaroon-900 bg-royalMaroon-900 text-white hover:bg-royalMaroon-800'
                        }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
