'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
    onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
    return (
        <AddressSuggestions
            token="45ff4374ccc667f158e7df70c662cbb825493107"
            onChange={(data) => onChange?.(data?.value)}
        />
    );
};