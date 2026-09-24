import { useCallback, useEffect, useMemo, useState } from "react";
const CART_KEY = "alca-cart-v1";
export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};
export type CartResult = ReturnType<typeof useCart>;
export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(CART_KEY) || "[]");
      if (!Array.isArray(stored)) return [];
      return stored.filter((x): x is CartItem =>
        typeof x?.id === "string" && typeof x.name === "string" &&
        Number.isFinite(x.price) && Number.isSafeInteger(x.quantity) &&
        x.price >= 0 && x.quantity > 0);
    } catch {
      return [];
    }
  });
  const [previous, setPrevious] = useState<CartItem[] | null>(null);
  useEffect(() => {
    try { window.localStorage.setItem(CART_KEY, JSON.stringify(items)); }
    catch { /* Cart still works for this tab when storage is unavailable. */ }
  }, [items]);
  const addToCart = useCallback(
    (name: string, price: number) =>
      setItems((old) => {
        const id = `${name}-${price}`;
        const found = old.find((x) => x.id === id);
        return found
          ? old.map((x) =>
              x.id === id ? { ...x, quantity: x.quantity + 1 } : x,
            )
          : [...old, { id, name, price, quantity: 1 }];
      }),
    [],
  );
  const changeQuantity = useCallback(
    (id: string, delta: number) =>
      setItems((old) =>
        old.flatMap((x) =>
          x.id === id && x.quantity + delta <= 0
            ? []
            : x.id === id
              ? [{ ...x, quantity: x.quantity + delta }]
              : [x],
        ),
      ),
    [],
  );
  const removeItem = useCallback(
    (id: string) => setItems((old) => old.filter((x) => x.id !== id)),
    [],
  );
  const clearCart = useCallback(() => {
    setPrevious(items);
    setItems([]);
  }, [items]);
  const undoClear = useCallback(() => {
    if (previous) setItems(previous);
    setPrevious(null);
  }, [previous]);
  return useMemo(
    () => ({
      items,
      count: items.reduce((a, x) => a + x.quantity, 0),
      total: items.reduce((a, x) => a + x.price * x.quantity, 0),
      addToCart,
      changeQuantity,
      removeItem,
      clearCart,
      undoClear,
    }),
    [items, addToCart, changeQuantity, removeItem, clearCart, undoClear],
  );
}
