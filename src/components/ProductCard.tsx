import React from 'react';
import { Sparkles, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../data/products';
import { formatPrice, toPersianDigits } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onTryOn: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onTryOn,
  onAddToCart,
}) => {
  const [added, setAdded] = React.useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, product.sizes[0], product.colors[0].name);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleQuickTryOn = (e: React.MouseEvent) => {
    e.stopPropagation();
    onTryOn(product);
  };

  return (
    <div
      onClick={() => onOpenDetails(product)}
      className="group bg-white rounded-xl border border-stone-200 overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Quiet Clean Text Tag (Anti-pill) */}
        {product.tag && (
          <div className="absolute top-3 right-3 text-[11px] font-semibold text-stone-700 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded shadow-xs">
            {product.tag}
          </div>
        )}

        {/* Quick Try-On Overlay Button */}
        <button
          onClick={handleQuickTryOn}
          className="absolute bottom-3 right-3 left-3 bg-white/95 hover:bg-amber-600 hover:text-white text-stone-900 text-xs font-bold py-2 px-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-1.5 opacity-95 group-hover:opacity-100"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500 group-hover:text-amber-200" />
          <span>پرو آنلاین روی عکس کودک</span>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Metadata: Category & Age Range with clean typographic separator */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.ageRangeLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.genderLabel}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-base font-bold text-stone-900 line-clamp-1 group-hover:text-amber-700 transition-colors">
            {product.title}
          </h3>

          <p className="text-xs text-stone-500 line-clamp-1 mt-1">
            {product.fabric}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-[11px] text-stone-400 line-through tabular-nums">
                {toPersianDigits(product.originalPrice.toLocaleString('fa-IR'))}
              </span>
            )}
            <span className="text-sm sm:text-base font-extrabold text-stone-900 tabular-nums">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            aria-label="افزودن به سبد خرید"
            className={`p-2 rounded-lg font-medium text-xs flex items-center gap-1 transition-colors cursor-pointer ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">افزوده شد</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">خرید</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
