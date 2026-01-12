import React, { useEffect, useState } from 'react';
import Button from './button';
import { useWishes } from '../context/WishesContext';
import AddWishModal from '../components/addWishModal';

const SubHeader: React.FC = () => {
    const { fetchWishes, addWish } = useWishes();

    const [dateSort, setDateSort] = useState<"newest" | "oldest">('newest');
    const [priceSort, setPriceSort] = useState<"high" | "low">('high');
    const [isAddOpen, setIsAddOpen] = useState(false);

    useEffect(() => {
        const sortBy: "createdAt" | "price" = priceSort ? "price" : "createdAt";
        const order: "asc" | "desc" = priceSort 
            ? (priceSort === "high" ? "desc" : "asc") 
            : (dateSort === "newest" ? "desc" : "asc");

        fetchWishes?.({ sortBy, order });
    }, [dateSort, priceSort]);

    return (
        <div className="flex justify-between items-center p-6 w-full border-b border-gray-200">
            <div className="flex gap-6 items-center">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Sort by Date</label>
                    <select 
                        value={dateSort}   
                        onChange={(e) => setDateSort(e.target.value as "newest" | "oldest")} 
                        className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                    >
                        <option value="newest">Newest to Oldest</option>
                        <option value="oldest">Oldest to Newest</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Sort by Price</label>
                    <select 
                        value={priceSort} 
                        onChange={(e) => setPriceSort(e.target.value as "high" | "low")} 
                        className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                    >
                        <option value="high">High to Low</option>
                        <option value="low">Low to High</option>
                    </select>
                </div>
            </div>

            <div>
                <Button 
                    text="Add Wish" 
                    variant="add"
                    onClick={() => setIsAddOpen(true)}
                />
            </div>

            <AddWishModal
                isOpen={isAddOpen}
                onCancel={() => setIsAddOpen(false)}
                onConfirm={async (data) => {
                    await addWish?.(data);
                    setIsAddOpen(false);
                }}
            />
        </div>
    )
};

export default SubHeader;