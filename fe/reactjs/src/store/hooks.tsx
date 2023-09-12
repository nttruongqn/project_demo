import { useContext } from "react"
import { AuthContext } from "./AuthProvider"
import { ShoppingCartContext } from "./ShoppingCartProvider";
import { FormPaymentContext } from "./FormPaymentProvider";
import { ButtonCategoryContext } from "./ButtonCategoryProvider";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth error');
      }
      return context;
}
export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error('useShoppingCart error');
  }
  return context;
}

export const useFormPaymentContext = () => {
  const context = useContext(FormPaymentContext);
  if (!context) {
    throw new Error('useFormPaymentContext error');
  }
  return context;
}

export const useButtonCategory = () => {
  const context = useContext(ButtonCategoryContext);
  if (!context) {
    throw new Error('useButtonCategoryContext error');
  }
  return context;
}