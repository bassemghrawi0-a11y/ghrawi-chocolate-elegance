import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLang } from "@/hooks/use-lang";
import { useCartStore } from "@/stores/cart-store";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

/* ── Cart Item Row ── */

const CartItemRow = ({
  item,
  t,
  onUpdateQty,
  onRemove,
}: {
  item: ReturnType<typeof useCartStore.getState>["items"][number];
  t: (en: string, ar: string) => string;
  onUpdateQty: (productId: string, sizeId: string | null, qty: number) => void;
  onRemove: (productId: string, sizeId: string | null) => void;
}) => (
  <div className="flex items-center gap-4 py-5 border-b border-border/50">
    {/* Image */}
    <div className="w-20 h-20 flex-shrink-0 overflow-hidden bg-light-fill">
      {item.image_url ? (
        <img
          src={item.image_url}
          alt={t(item.name_en, item.name_ar)}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="font-body text-[9px] text-text-hint">—</span>
        </div>
      )}
    </div>

    {/* Info */}
    <div className="flex-1 min-w-0">
      <p className="font-display text-base font-normal text-foreground truncate">
        {t(item.name_en, item.name_ar)}
      </p>
      {item.size_name && (
        <p className="font-body text-[11px] font-light text-text-hint mt-0.5">
          {item.size_name}
        </p>
      )}
    </div>

    {/* Quantity */}
    <div className="flex items-center gap-0">
      <button
        onClick={() => onUpdateQty(item.productId, item.size_id, item.quantity - 1)}
        disabled={item.quantity <= 1}
        className="w-7 h-7 flex items-center justify-center border border-border/50 font-body text-xs text-foreground disabled:opacity-30 hover:bg-foreground hover:text-background transition-colors duration-200"
      >
        −
      </button>
      <span className="w-7 h-7 flex items-center justify-center border-y border-border/50 font-body text-xs text-foreground">
        {item.quantity}
      </span>
      <button
        onClick={() => onUpdateQty(item.productId, item.size_id, item.quantity + 1)}
        className="w-7 h-7 flex items-center justify-center border border-border/50 font-body text-xs text-foreground hover:bg-foreground hover:text-background transition-colors duration-200"
      >
        +
      </button>
    </div>

    {/* Line price */}
    <span className="font-body text-[13px] font-normal text-foreground w-16 text-right">
      ${(item.price * item.quantity).toFixed(2)}
    </span>

    {/* Remove */}
    <button
      onClick={() => onRemove(item.productId, item.size_id)}
      className="font-body text-[11px] font-light text-text-hint hover:text-accent transition-colors duration-200 ml-1"
      aria-label="Remove"
    >
      ✕
    </button>
  </div>
);

/* ── Order Summary ── */

const OrderSummary = ({
  t,
  subtotal,
  total,
  discountCode,
  discountPercent,
  discountAmount,
  isEmpty,
}: {
  t: (en: string, ar: string) => string;
  subtotal: number;
  total: number;
  discountCode: string | null;
  discountPercent: number;
  discountAmount: number;
  isEmpty: boolean;
}) => {
  const navigate = useNavigate();
  const applyDiscount = useCartStore((s) => s.applyDiscount);
  const removeDiscount = useCartStore((s) => s.removeDiscount);
  const [promoInput, setPromoInput] = useState("");
  const [promoStatus, setPromoStatus] = useState<"idle" | "success" | "error">("idle");
  const [promoMsg, setPromoMsg] = useState("");
  const [checking, setChecking] = useState(false);

  const discountTotal = subtotal * (discountPercent / 100) + discountAmount;

  const handleApply = async () => {
    if (!promoInput.trim()) return;
    setChecking(true);
    setPromoStatus("idle");

    const { data, error } = await supabase
      .from("discount_codes")
      .select("*")
      .ilike("code", promoInput.trim())
      .eq("is_active", true)
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      setPromoStatus("error");
      setPromoMsg(t("Invalid or expired code", "الكود غير صحيح أو منتهي الصلاحية"));
      setChecking(false);
      return;
    }

    // Check expiry
    if (data.expires_at && new Date(data.expires_at) <= new Date()) {
      setPromoStatus("error");
      setPromoMsg(t("Invalid or expired code", "الكود غير صحيح أو منتهي الصلاحية"));
      setChecking(false);
      return;
    }

    // Check max uses
    if (data.max_uses !== null && data.used_count >= data.max_uses) {
      setPromoStatus("error");
      setPromoMsg(t("Invalid or expired code", "الكود غير صحيح أو منتهي الصلاحية"));
      setChecking(false);
      return;
    }

    applyDiscount(data.code, Number(data.discount_percent), Number(data.discount_amount));
    setPromoStatus("success");
    setPromoMsg(t("Code applied ✓", "تم تطبيق الكود ✓"));
    setChecking(false);
  };

  // Check auth for CTA
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  useState(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data.session);
    });
  });

  return (
    <div className="md:sticky md:top-[100px] bg-bg-warm border border-border/50 p-7">
      <p className="font-body text-[11px] font-medium tracking-[0.2em] uppercase text-foreground mb-6">
        {t("Order Summary", "ملخص الطلب")}
      </p>

      {/* Lines */}
      <div className="space-y-3 font-body text-[13px]">
        <div className="flex justify-between text-foreground">
          <span>{t("Subtotal", "المجموع الفرعي")}</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-foreground">
          <span>{t("Delivery", "التوصيل")}</span>
          <span>{t("Free", "مجاني")}</span>
        </div>
        {discountCode && discountTotal > 0 && (
          <div className="flex justify-between text-accent-soft">
            <span className="flex items-center gap-1.5">
              {t("Discount", "الخصم")}
              <button
                onClick={() => {
                  removeDiscount();
                  setPromoInput("");
                  setPromoStatus("idle");
                  setPromoMsg("");
                }}
                className="text-[10px] text-text-hint hover:text-accent transition-colors"
              >
                ✕
              </button>
            </span>
            <span>- ${discountTotal.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-border/50 my-5" />

      {/* Total */}
      <div className="flex items-baseline justify-between">
        <span className="font-body text-[13px] font-normal text-foreground">
          {t("Total", "الإجمالي")}
        </span>
        <span className="font-display text-2xl font-light text-foreground">
          ${total.toFixed(2)}
        </span>
      </div>

      {/* Promo code */}
      {!discountCode && (
        <div className="mt-6">
          <div className="flex gap-0">
            <input
              type="text"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleApply()}
              placeholder={t("Promo code", "كود الخصم")}
              className="flex-1 px-3 py-2.5 bg-transparent border border-border/50 font-body text-[12px] text-foreground placeholder:text-text-hint focus:outline-none focus:border-foreground/30 transition-colors"
            />
            <button
              onClick={handleApply}
              disabled={checking || !promoInput.trim()}
              className="px-4 py-2.5 bg-foreground text-background font-body text-[11px] font-medium tracking-[0.15em] uppercase disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              {t("Apply", "تطبيق")}
            </button>
          </div>
          {promoMsg && (
            <p
              className={`mt-2 font-body text-[12px] font-light ${
                promoStatus === "success" ? "text-accent-soft" : "text-destructive"
              }`}
            >
              {promoMsg}
            </p>
          )}
        </div>
      )}

      {/* CTA */}
      <button
        onClick={() => {
          if (isEmpty) return;
          if (!isLoggedIn) {
            navigate("/auth?returnUrl=/checkout");
            return;
          }
          navigate("/checkout");
        }}
        disabled={isEmpty}
        className={`w-full mt-6 py-3.5 font-body text-[11px] font-medium tracking-[0.22em] uppercase transition-all duration-300 ${
          isEmpty
            ? "bg-foreground text-background opacity-40 cursor-not-allowed"
            : "bg-foreground text-background hover:opacity-90"
        }`}
      >
        {isEmpty
          ? t("Proceed to Checkout", "إتمام الطلب")
          : isLoggedIn === false
            ? t("Sign in to Checkout", "سجل دخولك للمتابعة")
            : t("Proceed to Checkout", "إتمام الطلب")}
      </button>
    </div>
  );
};

/* ── Cart Page ── */

const Cart = () => {
  const { t } = useLang();
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const total = useCartStore((s) => s.getTotal());
  const discountCode = useCartStore((s) => s.discountCode);
  const discountPercent = useCartStore((s) => s.discountPercent);
  const discountAmount = useCartStore((s) => s.discountAmount);

  const isEmpty = items.length === 0;

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-section-x-mobile md:px-section-x py-section-y">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-10 md:gap-12 items-start"
        >
          {/* LEFT — Items */}
          <div>
            <h1 className="font-display text-[32px] font-light text-foreground mb-8">
              {t("Your Cart", "سلتك")}
            </h1>

            {isEmpty ? (
              <div className="text-center py-20">
                <p className="font-body text-sm font-light text-text-hint mb-4">
                  {t("Your cart is empty", "سلتك فارغة")}
                </p>
                <Link
                  to="/products"
                  className="inline-block font-body text-[11px] font-medium tracking-[0.18em] uppercase text-accent hover:text-foreground transition-colors duration-300"
                >
                  {t("Browse Collections", "تصفح المجموعات")} →
                </Link>
              </div>
            ) : (
              <div>
                {items.map((item) => (
                  <CartItemRow
                    key={`${item.productId}-${item.size_id || "base"}`}
                    item={item}
                    t={t}
                    onUpdateQty={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Summary */}
          <OrderSummary
            t={t}
            subtotal={subtotal}
            total={total}
            discountCode={discountCode}
            discountPercent={discountPercent}
            discountAmount={discountAmount}
            isEmpty={isEmpty}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;
