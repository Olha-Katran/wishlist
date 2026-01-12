import React, { type ReactNode } from 'react';

interface BaseModalProps {
    isOpen: boolean;
    title: string;
    children: ReactNode;
    onCancel: () => void;
    onConfirm: () => void;
    confirmText: string;
    confirmClassName?: string;
    isLoading?: boolean;
}

const BaseModal: React.FC<BaseModalProps> = ({
    isOpen,
    title,
    children,
    onCancel,
    onConfirm,
    confirmText,
    confirmClassName = 'bg-fuchsia-500 hover:bg-fuchsia-600',
    isLoading = false,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
                <div className="mb-6">{children}</div>
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onCancel}
                        disabled={isLoading}
                        className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`px-4 py-2 rounded text-white disabled:opacity-50 ${confirmClassName}`}
                    >
                        {isLoading ? 'Processing...' : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BaseModal;