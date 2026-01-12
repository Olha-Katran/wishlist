import React from 'react';

type Props = {
    className?: string;
    onClick: () => void;
    text?: string;
    variant: "add" | "action" | "text";
    icon?: React.ReactNode;
}

const variantStyles =  {
    add: "bg-fuchsia-500 text-white hover:bg-fuchsia-600",
    action: "bg-white/50 text-gray-500 rounded-full hover:bg-white/70 hover:scale-110 transition-all duration-200 p-2",
    text: "text-fuchsia-500  hover:text-fuchsia-600 border border-fuchsia-500 hover:border-fuchsia-600",
};

const Button: React.FC<Props> = ({ onClick, text, variant, className, icon }) => {
    return (
        <button
            className={`flex items-center justify-center cursor-pointer px-2 py-2 rounded transition ${variantStyles[variant]} ${className || ''}`}
            onClick={onClick}
        >
            {icon ? icon : <span>{text}</span>}
        </button>
    );
};

export default Button;