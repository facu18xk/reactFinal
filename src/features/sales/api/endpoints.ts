
const BASE_URL = 'https://minierp.rbnetto.dev/api';

export const getEndpoint = (endpoint: string) => {
    return `${BASE_URL}${endpoint}`;
}

export const endpoints = {
    customers: getEndpoint('/sales/customers/'),
    invoices: getEndpoint('/sales/invoices/'),
    orderItems: getEndpoint('/sales/order-items/'),
    orders: getEndpoint('/sales/orders/'),
}


