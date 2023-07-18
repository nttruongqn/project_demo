import * as React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface IShoppingCartProvider {
    children: React.ReactNode;
}

export interface CartItem {
    id: string,
    name: string,
    imageUrl: string,
    isSale: boolean,
    sale: number,
    price: number,
    quantity: number,
    number: number,
}

export interface IShoppingCartContext {
    getItemQuantity: (id: string) => number
    increaseCartQuantity: (id: string) => void
    decreaseCartQuantity: (id: string) => void
    removeFromCart: (id: string) => void
    setCartQuantity: (id: string, name: string, price: number, imageUrl: string, isSale: boolean, sale: number, quantity: number, number: number) => void
    cartQuantity: number,
    totalPrice: number,
    totalDefault: number,
    totalSale: number,
    cartItems: CartItem[],
}


export const ShoppingCartContext = React.createContext({} as IShoppingCartContext)

export function ShoppingCartProvider({ children }: IShoppingCartProvider) {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', [])
    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    const totalPrice = cartItems.reduce((total, item) => {
        return total + ((item.price - (item.price * (item.sale / 100))) * item.quantity)
    }, 0)

    const totalDefault = cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity)
    }, 0)

    const totalSale = cartItems.reduce((total, item) => {
        return total + ((item.price * (item.sale / 100) * item.quantity))
    }, 0)


    function getItemQuantity(id: string) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function setCartQuantity(id: string, name: string, price: number, imageUrl: string, isSale: boolean, sale: number, quantity: number, number: number) {
        setCartItems(items => {
            if (items.find(item => item.id === id) == null) {
                return [...items, { id, name, price, imageUrl, isSale, sale, quantity, number }]
            } else {
                return items.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity }
                    }
                    else {
                        return item
                    }
                })
            }
        })
    }

    function increaseCartQuantity(id: string) {
        setCartItems(items => {
            return items.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity + 1 }
                }
                else {
                    return item
                }
            })
        })
    }

    function decreaseCartQuantity(id: string) {
        setCartItems(items => {
            if (items.find(item => item.id === id)?.quantity === 1) {
                return items.filter(item => item.id !== id)
            } else {
                return items.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    }
                    else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id: string) {
        setCartItems(items => {
            return items.filter(item => item.id !== id)
        })
    }

    return <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems, cartQuantity, setCartQuantity, totalPrice, totalDefault, totalSale }}>{children}</ShoppingCartContext.Provider>
}
