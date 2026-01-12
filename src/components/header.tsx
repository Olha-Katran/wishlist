import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-left shadow-md p-4 text-shadow-xs ">
            <h1 className="text-2xl font-bold text-amber-400 font-bold">
                <span className="text-fuchsia-500">
                    Wish
                </span>
                list
            </h1>
        </header>
    );
};

export default Header;