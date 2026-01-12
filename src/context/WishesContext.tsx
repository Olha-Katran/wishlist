import { createContext, type ReactNode, useEffect, useState, useContext } from "react";
import { type Wish } from "../types/wish";
import { useApi } from "../hooks/useApi";

interface WishesContextValue {
    wishes: Wish[];
    loading: boolean;
    setWishes: React.Dispatch<React.SetStateAction<Wish[]>>;
    fetchWishes?: (options?: FetchWishesOptions ) => Promise<void>;
    deleteWish?: (id: number) => Promise<void>;
    updateWish?: (id: number, data: Partial<Wish>) => Promise<void>;
    getWishById?: (id: number) => Promise<Wish>;
    addWish?: (data: Partial<Wish>) => Promise<Wish>;
}

interface FetchWishesOptions {
    sortBy?: 'createdAt' | 'price';
    order?: 'asc' | 'desc';
}

const WishesContext = createContext<WishesContextValue | undefined>(undefined);

interface WishesProviderProps {
    children: ReactNode;
}

export const WishesProvider = ({ children }: WishesProviderProps) => {
    const [wishes, setWishes] = useState<Wish[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const { request } = useApi();

    const fetchWishes = async (options?: FetchWishesOptions) => {
        setLoading(true);
        try {
            let query = '';
            if (options?.sortBy && options?.order) {
                query = `?_sort=${options.sortBy}&_order=${options.order}`;
            }
            const data = await request<Wish[]>('wishes' + query);
            setWishes(data);
        } catch (err) {
            console.error('Failed to fetch wishes:', err);
        } finally {
            setLoading(false);
        }
    };

    const deleteWish = async (id: number) => {
        try {
            await request<void>(`wishes/${id}`, { method: 'DELETE' });
            setWishes((prevWishes) => prevWishes.filter((wish) => wish.id !== id));
        } catch (err) {
            console.error('Failed to delete wish:', err);
            throw err;
        }   
    };

    const updateWish = async (id: number, data: Partial<Wish>) => {
        try {
            const updatedWish = await request<Wish>(`wishes/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
            });
            setWishes(prevWishes =>
                prevWishes.map(wish => (wish.id === id ? updatedWish : wish))
            );
        } catch (err) {
            console.error('Failed to update wish:', err);
            throw err;
        }
    };

    const addWish = async (data: Partial<Wish>) => {
        try {
            const newWish = await request<Wish>('wishes', {
                method: 'POST',
                body: JSON.stringify(data),
            });
            setWishes(prev => [...prev, newWish]);
            return newWish;
        } catch (err) {
            console.error('Failed to add wish:', err);
            throw err;
        }
    };

    const getWishById = async (id: number): Promise<Wish> => {
        try {
            const wish = await request<Wish>(`wishes/${id}`);
            return wish;
        } catch (err) {
            console.error('Failed to get wish by id:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchWishes();
    }, []);

    return (
        <WishesContext.Provider value={{ wishes, setWishes, loading, fetchWishes, addWish, deleteWish, updateWish, getWishById }}>
            {children}
        </WishesContext.Provider>
    )
};

export default WishesContext;

export const useWishes = () => {
    const context = useContext(WishesContext);

    if (!context) {
        throw new Error('useWishes must be used within a WishesProvider');
    }

    return context;
}