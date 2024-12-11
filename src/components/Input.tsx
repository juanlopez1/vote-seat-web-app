import type { FC, InputHTMLAttributes } from 'react';
import { RiErrorWarningLine } from '@remixicon/react';

type InputProps = {
    error?: string;
    name: string;
    label?: string;
    type?: InputHTMLAttributes<HTMLInputElement>['type'];
    onChange?: InputHTMLAttributes<HTMLInputElement>['onChange'];
    onBlur?: InputHTMLAttributes<HTMLInputElement>['onBlur'];
    value?: InputHTMLAttributes<HTMLInputElement>['value'];
    placeholder?: string;
};

const Input: FC<InputProps> = ({
    error,
    label,
    name,
    onBlur,
    onChange,
    placeholder = 'Escriba aquí',
    type = 'text',
    value,
}) => (
    <div className="input-container">
        {label && (
            <label htmlFor="seats" className="input-label">
                {label}
            </label>
        )}
        <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
        />
        {error && (
            <span className="error-message">
                <RiErrorWarningLine size={14} />
                {error}
            </span>
        )}
    </div>
);

export default Input;
