import { useState } from "react";
import { useLang } from "@/hooks/use-lang";
import { useCart } from "@/hooks/use-cart";

interface ProductSizeOption {
  id: string;
  size_name: string;
  size_name_ar?: string | null;
  price: number;
}

interface AddToCartButtonProps {
  productId: string;
  productSizes?: ProductSizeOption[];
}

const AddToCartButton = ({ productId, productSizes = [] }: AddToCartButtonProps) => {
  const { t, isAr } = useLang();
  const { addItem } = useCart();
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const hasSizes = productSizes.length > 0;

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (added) return;
    if (hasSizes && !selectedSizeId) return;

    await addItem(productId, selectedSizeId);

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="mt-3">
      {hasSizes && (
        <div className="mb-2.5 flex flex-wrap gap-1.5">
          {productSizes.map((size) => {
            const isSelected = selectedSizeId === size.id;
            return (
              <button
                key={size.id}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedSizeId(size.id);
                }}
                className={`px-2.5 py-1 rounded-full border border-border/50 text-[10px] font-body transition-colors duration-200 ${
                  isSelected
                    ? "bg-accent text-white border-accent"
                    : "text-foreground hover:bg-muted/60"
                }`}
                style={{ borderWidth: "0.5px", borderColor: "var(--border)" }}
              >
                {(isAr && size.size_name_ar ? size.size_name_ar : size.size_name)} · ${size.price}
              </button>
            );
          })}
        </div>
      )}

      <button
        type="button"
        onClick={handleAdd}
        disabled={hasSizes && !selectedSizeId}
        className="w-full py-2.5 font-body text-[11px] font-normal tracking-[0.18em] uppercase text-foreground hover:bg-foreground hover:text-background disabled:opacity-45 disabled:hover:bg-transparent disabled:hover:text-foreground transition-colors duration-300"
        style={{ borderWidth: "0.5px", borderStyle: "solid", borderColor: "var(--border)" }}
      >
        {added ? t("Added ✓", "تمت الإضافة ✓") : t("Add to Cart", "أضف للسلة")}
      </button>
    </div>
  );
};

export default AddToCartButton;
