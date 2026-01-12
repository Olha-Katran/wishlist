import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useWishes } from '../context/WishesContext';
import Button from '../components/button';
import EditModal from '../components/editModal';
import DeleteConfirmModal from '../components/deleteModal';
import { type Wish } from '../types/wish';

const WishPage: React.FC = () => {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>();

    const { getWishById, updateWish, deleteWish, loading } = useWishes();

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [wish, setWish] = useState<Wish | null>(null);

    const wishId = Number(id);

    useEffect(() => {
        if (!id || Number.isNaN(wishId)) return;

        const fetchWish = async () => {
            try {
                const data = await getWishById?.(wishId);
                if (data) {
                    setWish(data);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchWish();
    }, [id, wishId, getWishById]);

    if (loading || !wish) {
        return <div className="p-8 max-w-4xl mx-auto">Loading...</div>;
    };

    const {title, description, price, image} = wish;
    return (
        <div className="max-w-4xl mx-auto p-6 text-left">
            <button
                onClick={() => navigate(-1)}
                className="text-sm text-gray-500 hover:text-gray-700 mb-4"
            >
                ← Back
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img
                        src={image}
                        alt={title}
                        className="w-full rounded-xl object-cover shadow-sm"
                    />
                </div>

                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold mb-2">{title}</h1>
                    <p className="text-gray-600 mb-4">{description}</p>

                    <p className="text-2xl font-semibold text-fuchsia-500 mb-6">
                        ${price}
                    </p>

                    <div className="flex gap-3 mt-auto">
                        <Button
                            text="Edit"
                            variant="add"
                            onClick={() => setIsEditOpen(true)}
                        />
                        <Button
                            text="Delete"
                            variant="text"
                            onClick={() => setIsDeleteOpen(true)}
                            className="text-red-600 border-red-500 hover:text-red-700 hover:border-red-600"
                        />
                    </div>
                </div>
            </div>

            <EditModal
                isOpen={isEditOpen}
                initialData={{ title, description, price, image}}
                onCancel={() => setIsEditOpen(false)}
                onConfirm={async (data) => {
                    await updateWish?.(wishId!, data);
                    setIsEditOpen(false);
                }}
            />

            <DeleteConfirmModal
                isOpen={isDeleteOpen}
                title={title}
                onCancel={() => setIsDeleteOpen(false)}
                onConfirm={async () => {
                    await deleteWish?.(wishId!);
                    navigate('/');
                }}
            />
        </div>
    );
};
export default WishPage;