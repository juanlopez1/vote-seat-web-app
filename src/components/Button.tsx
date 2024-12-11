import type { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = PropsWithChildren & {
    className?: ButtonHTMLAttributes<HTMLButtonElement>['className'];
    disabled?: boolean;
    to?: string;
    onClick?: () => void;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    style?: 'primary' | 'outline';
};

const Button: FC<ButtonProps> = ({
    children,
    className,
    disabled = false,
    onClick,
    style = 'primary',
    to,
    type = 'button',
}) =>
    to ? (
        <Link to={to} className="button--link" onClick={onClick}>
            <button type={type} className={`button button--${style} ${className}`}>
                {children}
            </button>
        </Link>
    ) : (
        <button type={type} className={`button button--${style} ${className}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );

export default Button;
