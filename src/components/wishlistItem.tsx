import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import Button from './button';
import { MdDelete, MdModeEdit,  } from "react-icons/md";
import  DeleteConfirmModal from './deleteModal';
import { useWishes } from '../context/WishesContext';
import  EditModal from './editModal';

type Props = {
    id: number;
    image: string;
    title: string;
    description: string;
    price: number;
}

type UpdateWishPayload = {
  title?: string;
  description?: string;
  price?: number;
  image?: string;
}

const WishlistItem: React.FC<Props> = ({ 
    id, 
    image,
    title, 
    description, 
    price,
 }) => {
    const { deleteWish, updateWish } = useWishes();
    const navigate = useNavigate();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

     const handleConfirmDelete = async () => {
        if (!deleteWish) return;
        try {
            await deleteWish(id);
        } catch (err) {
            console.error(err);
        } finally {
            setIsDeleteModalOpen(false);
        }
    };

    const handleUpdate = async (data: UpdateWishPayload) => {
        if (!updateWish) return;
        try {
            await updateWish(id, data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsUpdateModalOpen(false);
        }
    }

    const handleViewDetails = () => {
        navigate(`/wish/${id}`);
    }


    return (
        <div className="p-4 rounded-lg shadow-sm text-left">
            <div className="relative">
                <img src={image} alt={title} className="w-full object-cover mb-4 rounded" />
                <div className="absolute bottom-2 right-1 space-x-2 gap">
                    <Button 
                        icon={<MdDelete/>}
                        variant="action" 
                        onClick={() => setIsDeleteModalOpen(true)}
                    />
                    <Button 
                        icon={<MdModeEdit />}
                        variant="action" 
                        className="mt-1"
                        onClick={() => setIsUpdateModalOpen(true)} 
                    /> 
                </div>
            </div>
            <h3 className="text-lg font-bold overflow-hidden text-ellipsis line-clamp-1">{title}</h3>
            <p className="text-gray-600 overflow-hidden text-ellipsis line-clamp-2 min-h-[40px]">{description}</p>
            <p className="font-bold mt-2 text-fuchsia-500">${price}</p>

            <div className="mt-4 flex space-x-1">
                <Button 
                    text="View details"
                    variant="text" 
                    onClick={handleViewDetails} 
                />
            </div>

        <DeleteConfirmModal
            isOpen={isDeleteModalOpen}
            title={title}
            onConfirm={handleConfirmDelete}
            onCancel={() => setIsDeleteModalOpen(false)}
         />

        <EditModal 
            isOpen={isUpdateModalOpen}
            initialData={{ title, description, price, image }}
            onConfirm={handleUpdate}
            onCancel={() => setIsUpdateModalOpen(false)}
         />

        </div>
    );
};

export default WishlistItem;