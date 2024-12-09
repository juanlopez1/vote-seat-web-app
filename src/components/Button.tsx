import type { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = PropsWithChildren & {
    to?: string;
    onClick?: () => void;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    style?: 'primary' | 'outline';
};

const Button: FC<ButtonProps> = ({ children, onClick, style = 'primary', to, type = 'button' }) =>
    to ? (
        <Link to={to} className="button--link" onClick={onClick}>
            <button type={type} className={`button button--${style}`}>
                {children}
            </button>
        </Link>
    ) : (
        <button type={type} className={`button button--${style}`} onClick={onClick}>
            {children}
        </button>
    );

export default Button;
