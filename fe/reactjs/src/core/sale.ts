export const sale = (sale: number, price:number): number => {
    return (price) - (price * sale / 100);
};
