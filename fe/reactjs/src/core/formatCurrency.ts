export const formatCurrency = (value: any) => {
    return value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
};

export const formatCurrencyReplace = (value: any) => {
    return value.toLocaleString('vi', { style: 'currency', currency: 'VND' }).replace('₫', 'đ');
};

