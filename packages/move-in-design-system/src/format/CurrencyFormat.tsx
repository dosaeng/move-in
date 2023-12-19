import { koreanCurrencyFormat } from '@move-in/core';
import React from 'react';

export const ProductDepositFormat: React.FC<{ value: number }> = ({ value }) => {
  return <>{koreanCurrencyFormat(value)}</>;
};

export const ProductMonthlyRentFormat: React.FC<{ value: number }> = ({ value }) => {
  return <>{`월 ${value / 10000}`}</>;
};
