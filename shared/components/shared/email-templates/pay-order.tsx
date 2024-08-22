import * as React from 'react';

interface PayOrderProps {
    orderId: number;
    totalAmount: number;
    paymentUrl: string;
}

export const PayOrder: React.FC<PayOrderProps> = ({
    orderId,
    totalAmount,
    paymentUrl
}) => (
    <div>
        <h1>Заказ #{orderId}</h1>

        <p>Оплатите заказ на сумму {totalAmount} ₽. Перейдите по  <a href={paymentUrl}>ссылке</a> для оплаты заказа</p>
    </div>
);
