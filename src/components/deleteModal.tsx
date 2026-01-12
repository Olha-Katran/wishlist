import React from 'react';
import BaseModal from './baseModal';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    title: string;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ isOpen, title, onConfirm, onCancel, isLoading }) => {
    return (
        <BaseModal
            isOpen={isOpen}
            title="Delete Item"
            onCancel={onCancel}
            onConfirm={onConfirm}
            confirmText="Delete"
            confirmClassName="bg-red-600 hover:bg-red-700"
            isLoading={isLoading}
        >
            <p className="text-gray-600">
                Are you sure you want to delete <strong>{title}</strong>? This action cannot be undone.
            </p>
        </BaseModal>
    );
};

export default DeleteConfirmModal;