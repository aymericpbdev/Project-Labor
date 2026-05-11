import React from 'react';
import './input.css'; 

export type InputType = 'text' | 'email' | 'password' | 'number' | 'date';

interface LaborInputProps {
    label: string;
    type: InputType;
    placeholder?: string;
    value?: string | number;
    id: string;
    isDisabled?: boolean;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
}

export const LaborInput: React.FC<LaborInputProps> = ({
    label,
    type,
    placeholder,
    value,
    id,
    isDisabled,
    error,
    onChange,
    onBlur,
}) => {
    return (
        <div className="labor-input-container">
            <label className="labor-label" htmlFor={id}>
                {label}
            </label>
            <div className="labor-input-wrapper">   
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    disabled={isDisabled}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`labor-input ${error ? 'error' : ''}`}
                />

            {error && <span className="labor-error-text">{error}</span>}
            </div>
        </div>
    );
};