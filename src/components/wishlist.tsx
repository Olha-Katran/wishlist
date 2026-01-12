import React from 'react';
import { useWishes } from '../context/WishesContext';
import WishlistItem from './wishlistItem';

const Wishlist: React.FC = () => {
    const { wishes: items, setWishes: setItems, loading } = useWishes();

    if (loading) {
        return <div className="p-8 max-w-4xl mx-auto">Loading...</div>;
    }

    if (items.length === 0) {  
        return (
            <div className="p-8 max-w-4xl mx-auto">
                <p className="text-gray-500">No items yet. Add your first wishlist item!</p>
            </div>
        );
    }
    
    return (
        <ul className="space-y-4 grid grid-cols-3 gap-4">
            {items.map((item) => (
                <li key={item.id}>
                    <WishlistItem 
                        id={item.id}
                        image={item.image} 
                        title={item.title} 
                        description={item.description} 
                        price={item.price}
                    />
                </li>
            ))}
        </ul>
    );
};

export default Wishlist;