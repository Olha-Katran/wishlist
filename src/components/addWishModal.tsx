import React, { useState, useEffect } from 'react';
import BaseModal from './baseModal';

interface AddWishModalProps {
    isOpen: boolean;
    onConfirm: (data: { title: string; description: string; price: number; image?: string }) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const AddWishModal: React.FC<AddWishModalProps> = ({ isOpen, onConfirm, onCancel, isLoading = false }) => {
    const [formData, setFormData] = useState({ title: '', description: '', price: 0, image: '' });

    useEffect(() => {
        if (isOpen) setFormData({ title: '', description: '', price: 0, image: '' });
    }, [isOpen]);

    return (
        <BaseModal
            isOpen={isOpen}
            title="Add Wish"
            onCancel={onCancel}
            onConfirm={() => onConfirm(formData)}
            confirmText="Add"
        >
            <div className="flex flex-col gap-3">
                <input
                    type="text"
                    required
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-fuchsia-500"
                />
                <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-fuchsia-500"
                />
                <input
                    required
                    type="number"
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-fuchsia-500"
                />
                <input
                    required
                    type="text"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-fuchsia-500"
                />
            </div>
        </BaseModal>
    );
};

export default AddWishModal;