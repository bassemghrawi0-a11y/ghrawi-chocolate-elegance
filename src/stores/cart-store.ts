import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  name_en: string;
  name_ar: string;
  image_url: string | null;
  size_id: string | null;
  size_name: string | null;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  discountCode: string | null;
  discountPercent: number;
  discountAmount: number;

  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size_id: string | null) => void;
  updateQuantity: (productId: string, size_id: string | null, qty: number) => void;
  clearCart: () => void;
  applyDiscount: (code: string, percent: number, amount: number) => void;
  removeDiscount: () => void;

  /** Computed */
  getSubtotal: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

const matchItem = (a: CartItem, productId: string, size_id: string | null) =>
  a.productId === productId && a.size_id === size_id;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      discountCode: null,
      discountPercent: 0,
      discountAmount: 0,

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) =>
            matchItem(i, item.productId, item.size_id)
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                matchItem(i, item.productId, item.size_id)
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),

      removeItem: (productId, size_id) =>
        set((state) => ({
          items: state.items.filter((i) => !matchItem(i, productId, size_id)),
        })),

      updateQuantity: (productId, size_id, qty) =>
        set((state) => {
          if (qty <= 0) {
            return { items: state.items.filter((i) => !matchItem(i, productId, size_id)) };
          }
          return {
            items: state.items.map((i) =>
              matchItem(i, productId, size_id) ? { ...i, quantity: qty } : i
            ),
          };
        }),

      clearCart: () =>
        set({ items: [], discountCode: null, discountPercent: 0, discountAmount: 0 }),

      applyDiscount: (code, percent, amount) =>
        set({ discountCode: code, discountPercent: percent, discountAmount: amount }),

      removeDiscount: () =>
        set({ discountCode: null, discountPercent: 0, discountAmount: 0 }),

      getSubtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      getTotal: () => {
        const s = get().getSubtotal();
        const { discountPercent, discountAmount } = get();
        return Math.max(0, s - s * (discountPercent / 100) - discountAmount);
      },

      getItemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "bgc-cart" }
  )
);
