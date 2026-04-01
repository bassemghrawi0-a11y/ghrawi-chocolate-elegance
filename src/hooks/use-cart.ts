import {
  createElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/integrations/supabase/client";

const GUEST_CART_KEY = "bgc-guest-cart";

export interface CartItem {
  id: string;
  quantity: number;
  size_id: string | null;
  product_id: string;
  name_en: string;
  name_ar: string | null;
  image_url: string | null;
  price: number;
  size_name: string | null;
  size_name_ar: string | null;
  size_price: number | null;
  effective_price: number;
}

interface GuestCartRow {
  id: string;
  quantity: number;
  size_id: string | null;
  product_id: string;
  name_en: string;
  name_ar: string | null;
  image_url: string | null;
  price: number;
  size_name: string | null;
  size_name_ar: string | null;
  size_price: number | null;
}

interface SessionUser {
  id: string;
}

const makeGuestItemId = (productId: string, sizeId: string | null) =>
  `guest-${productId}-${sizeId ?? "base"}`;

const readGuestCart = (): GuestCartRow[] => {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(GUEST_CART_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as GuestCartRow[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeGuestCart = (items: GuestCartRow[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
};

const clearGuestCartStorage = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(GUEST_CART_KEY);
};

const mapGuestItem = (item: GuestCartRow): CartItem => {
  const effectivePrice = item.size_price ?? item.price;
  return {
    ...item,
    effective_price: effectivePrice,
  };
};

const mapDbRowToCartItem = (row: any): CartItem => {
  const product = Array.isArray(row.products) ? row.products[0] : row.products;
  const size = Array.isArray(row.product_sizes) ? row.product_sizes[0] : row.product_sizes;
  const basePrice = Number(product?.price ?? 0);
  const sizePrice = size?.price === null || size?.price === undefined ? null : Number(size.price);
  const effectivePrice = sizePrice ?? basePrice;

  return {
    id: row.id,
    quantity: Number(row.quantity ?? 0),
    size_id: row.size_id ?? null,
    product_id: product?.id ?? "",
    name_en: product?.name_en ?? "",
    name_ar: product?.name_ar ?? null,
    image_url: product?.image_url ?? null,
    price: basePrice,
    size_name: size?.size_name ?? null,
    size_name_ar: size?.size_name_ar ?? null,
    size_price: sizePrice,
    effective_price: effectivePrice,
  };
};

const loadRemoteCart = async (userId: string): Promise<CartItem[]> => {
  const { data, error } = await supabase
    .from("cart_items")
    .select(
      `
      id,
      quantity,
      size_id,
      products:product_id (
        id,
        name_en,
        name_ar,
        image_url,
        price
      ),
      product_sizes:size_id (
        size_name,
        size_name_ar,
        price
      )
    `
    )
    .eq("user_id", userId);

  if (error) throw error;
  return (data ?? []).map(mapDbRowToCartItem);
};

interface UseCartValue {
  items: CartItem[];
  loading: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (productId: string, sizeId?: string | null) => Promise<void>;
  removeItem: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, newQty: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refetch: () => Promise<void>;
  isAuthenticated: boolean;
}

const CartContext = createContext<UseCartValue | null>(null);

const useCartState = (): UseCartValue => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<SessionUser | null>(null);
  const previousUserIdRef = useRef<string | null>(null);

  const refetch = useCallback(async () => {
    if (user?.id) {
      const remoteItems = await loadRemoteCart(user.id);
      setItems(remoteItems);
      return;
    }

    const guestItems = readGuestCart().map(mapGuestItem);
    setItems(guestItems);
  }, [user?.id]);

  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      setLoading(true);
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setUser(data.session?.user ? { id: data.session.user.id } : null);
      setLoading(false);
    };

    bootstrap();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { id: session.user.id } : null);
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const syncCart = async () => {
      setLoading(true);

      try {
        const previousUserId = previousUserIdRef.current;
        const currentUserId = user?.id ?? null;

        if (currentUserId && previousUserId !== currentUserId) {
          const guestItems = readGuestCart();
          if (guestItems.length > 0) {
            for (const guestItem of guestItems) {
              const existingQuery = supabase
                .from("cart_items")
                .select("id, quantity")
                .eq("user_id", currentUserId)
                .eq("product_id", guestItem.product_id);

              const { data: existing, error: existingError } = guestItem.size_id
                ? await existingQuery.eq("size_id", guestItem.size_id).maybeSingle()
                : await existingQuery.is("size_id", null).maybeSingle();

              if (existingError) throw existingError;

              if (existing?.id) {
                const { error: updateError } = await supabase
                  .from("cart_items")
                  .update({ quantity: Number(existing.quantity) + Number(guestItem.quantity) })
                  .eq("id", existing.id);
                if (updateError) throw updateError;
              } else {
                const { error: insertError } = await supabase.from("cart_items").insert({
                  user_id: currentUserId,
                  product_id: guestItem.product_id,
                  size_id: guestItem.size_id,
                  quantity: guestItem.quantity,
                });
                if (insertError) throw insertError;
              }
            }
            clearGuestCartStorage();
          }
        }

        await refetch();
      } finally {
        previousUserIdRef.current = user?.id ?? null;
        setLoading(false);
      }
    };

    syncCart();
  }, [refetch, user?.id]);

  const addItem = useCallback(
    async (productId: string, sizeId?: string | null) => {
      const normalizedSizeId = sizeId ?? null;

      if (user?.id) {
        const existingQuery = supabase
          .from("cart_items")
          .select("id, quantity")
          .eq("user_id", user.id)
          .eq("product_id", productId);

        const { data: existing, error: existingError } = normalizedSizeId
          ? await existingQuery.eq("size_id", normalizedSizeId).maybeSingle()
          : await existingQuery.is("size_id", null).maybeSingle();

        if (existingError) throw existingError;

        if (existing?.id) {
          const { error: updateError } = await supabase
            .from("cart_items")
            .update({ quantity: Number(existing.quantity) + 1 })
            .eq("id", existing.id);
          if (updateError) throw updateError;
        } else {
          const { error: insertError } = await supabase.from("cart_items").insert({
            user_id: user.id,
            product_id: productId,
            size_id: normalizedSizeId,
            quantity: 1,
          });
          if (insertError) throw insertError;
        }

        await refetch();
        return;
      }

      const guestItems = readGuestCart();
      const existingIndex = guestItems.findIndex(
        (item) => item.product_id === productId && item.size_id === normalizedSizeId
      );

      if (existingIndex >= 0) {
        guestItems[existingIndex] = {
          ...guestItems[existingIndex],
          quantity: guestItems[existingIndex].quantity + 1,
        };
      } else {
        const { data: product, error: productError } = await supabase
          .from("products")
          .select("id, name_en, name_ar, image_url, price")
          .eq("id", productId)
          .maybeSingle();
        if (productError) throw productError;
        if (!product) return;

        let sizeMeta: { size_name: string; size_name_ar: string; price: number } | null = null;
        if (normalizedSizeId) {
          const { data: size, error: sizeError } = await supabase
            .from("product_sizes")
            .select("size_name, size_name_ar, price")
            .eq("id", normalizedSizeId)
            .maybeSingle();
          if (sizeError) throw sizeError;
          sizeMeta = size;
        }

        guestItems.push({
          id: makeGuestItemId(productId, normalizedSizeId),
          product_id: product.id,
          quantity: 1,
          size_id: normalizedSizeId,
          name_en: product.name_en,
          name_ar: product.name_ar,
          image_url: product.image_url,
          price: Number(product.price),
          size_name: sizeMeta?.size_name ?? null,
          size_name_ar: sizeMeta?.size_name_ar ?? null,
          size_price: sizeMeta?.price ? Number(sizeMeta.price) : null,
        });
      }

      writeGuestCart(guestItems);
      setItems(guestItems.map(mapGuestItem));
    },
    [refetch, user?.id]
  );

  const removeItem = useCallback(
    async (cartItemId: string) => {
      if (user?.id) {
        const { error } = await supabase.from("cart_items").delete().eq("id", cartItemId);
        if (error) throw error;
        await refetch();
        return;
      }

      const guestItems = readGuestCart().filter((item) => item.id !== cartItemId);
      writeGuestCart(guestItems);
      setItems(guestItems.map(mapGuestItem));
    },
    [refetch, user?.id]
  );

  const updateQuantity = useCallback(
    async (cartItemId: string, newQty: number) => {
      if (newQty < 1) {
        await removeItem(cartItemId);
        return;
      }

      if (user?.id) {
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity: newQty })
          .eq("id", cartItemId);
        if (error) throw error;
        await refetch();
        return;
      }

      const guestItems = readGuestCart().map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQty } : item
      );
      writeGuestCart(guestItems);
      setItems(guestItems.map(mapGuestItem));
    },
    [refetch, removeItem, user?.id]
  );

  const clearCart = useCallback(async () => {
    if (user?.id) {
      const { error } = await supabase.from("cart_items").delete().eq("user_id", user.id);
      if (error) throw error;
      await refetch();
      return;
    }

    clearGuestCartStorage();
    setItems([]);
  }, [refetch, user?.id]);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.quantity), 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.effective_price * item.quantity, 0),
    [items]
  );

  return {
    items,
    loading,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    refetch,
    isAuthenticated: !!user?.id,
  };
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const value = useCartState();
  return createElement(CartContext.Provider, { value }, children);
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
