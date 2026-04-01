import { useState, useCallback } from "react";
import { useLang } from "@/hooks/use-lang";
import { useCartStore } from "@/stores/cart-store";

interface AddToCartButtonProps {
  productId: string;
  name_en: string;
  name_ar: string;
  image_url: string | null;
  price: number;
}

const AddToCartButton = ({ productId, name_en, name_ar, image_url, price }: AddToCartButtonProps) => {
  const { t } = useLang();
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (added) return;

      addItem({
        productId,
        name_en,
        name_ar,
        image_url,
        size_id: null,
        size_name: null,
        price,
        quantity: 1,
      });

      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    },
    [added, addItem, productId, name_en, name_ar, image_url, price]
  );

  return (
    <button
      onClick={handleClick}
      className="w-full mt-3 py-2.5 font-body text-[11px] font-normal tracking-[0.18em] uppercase border border-border/50 text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
    >
      {added ? t("Added ✓", "أُضيف ✓") : t("Add to Cart", "أضف للسلة")}
    </button>
  );
};

export default AddToCartButton;
