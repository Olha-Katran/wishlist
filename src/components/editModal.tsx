import React, { useState, useEffect } from 'react';
import BaseModal from './baseModal';

interface EditModalProps {
    isOpen: boolean;
    initialData: { title: string; description: string; price: number; image?: string };
    onConfirm: (data: { title: string; description: string; price: number; imageUrl?: string }) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, initialData, onConfirm, onCancel }) => {
    const [formData, setFormData] = useState(initialData);

    useEffect(() => setFormData(initialData), [initialData]);

    return (
        <BaseModal
            isOpen={isOpen}
            title="Edit Item"
            onCancel={onCancel}
            onConfirm={() => onConfirm(formData)}
            confirmText="Save"
        >
            <div className="flex flex-col gap-3">
                <input
                    required
                    type="text"
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
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-fuchsia-500"
                />
            </div>
        </BaseModal>
    );
};

export default EditModal;