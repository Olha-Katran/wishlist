import SubHeader from '../components/subHeader';
import Wishlist from '../components/wishlist';

export default function Dashboard() {

    return (
        <>
            <SubHeader />
            <div className="p-8 max-w-4xl mx-auto">
            <Wishlist />
        </div>
        </>
    );
}