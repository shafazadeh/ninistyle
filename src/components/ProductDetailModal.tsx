import React, { useState } from 'react';
import { X, Sparkles, ShoppingBag, ShieldCheck, Check, Star } from 'lucide-react';
import { Product } from '../data/products';
import { formatPrice, toPersianDigits } from '../utils/formatters';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onTryOn: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onTryOn,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0].name);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span>{product.categoryLabel}</span>
            <span>·</span>
            <span>{product.genderLabel}</span>
            <span>·</span>
            <span>{product.ageRangeLabel}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Product Image & Try-On Promo */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Direct Try-On Highlight */}
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>می‌خواهید تن فرزندتان ببینید؟</span>
                </div>
                <div className="text-[11px] text-amber-700">
                  عکس کودک را بارگذاری کنید و خروجی هوش مصنوعی را ببینید.
                </div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onTryOn(product);
                }}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors shrink-0 cursor-pointer"
              >
                پرو آنلاین
              </button>
            </div>
          </div>

          {/* Right: Info & Purchase Controls */}
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-stone-900 leading-snug">
                {product.title}
              </h2>

              <div className="flex items-center gap-3 mt-2">
                <span className="text-xl font-extrabold text-stone-900 tabular-nums">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through tabular-nums">
                    {toPersianDigits(product.originalPrice.toLocaleString('fa-IR'))}
                  </span>
                )}
                <div className="flex items-center gap-1 text-xs text-amber-600 mr-auto font-medium">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span className="tabular-nums">{toPersianDigits(product.rating)}</span>
                  <span className="text-stone-400">({toPersianDigits(product.reviewCount)} نظر)</span>
                </div>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-stone-600">
              {product.description}
            </p>

            {/* Fabric Detail */}
            <div className="p-3 bg-stone-50 rounded-lg text-xs text-stone-700 border border-stone-200/80">
              <span className="font-semibold text-stone-900">جنس و بافت: </span>
              {product.fabric}
            </div>

            {/* Color Swatches */}
            <div>
              <label className="text-xs font-bold text-stone-900 block mb-2">
                رنگ‌بندی: <span className="text-stone-600 font-normal">{selectedColor}</span>
              </label>
              <div className="flex items-center gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                      selectedColor === c.name
                        ? 'border-amber-600 ring-2 ring-amber-600/20 scale-110'
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor === c.name && (
                      <Check className="w-3.5 h-3.5 text-white mix-blend-difference" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <label className="text-xs font-bold text-stone-900 block mb-2">
                انتخاب سایز بر اساس سن کودک:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border text-right transition-colors cursor-pointer ${
                      selectedSize === size
                        ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200 hover:border-stone-400 text-stone-700 bg-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-stone-200 flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-4 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-900 hover:bg-stone-800 text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>به سبد خرید اضافه شد</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>افزودن به سبد خرید</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  onClose();
                  onTryOn(product);
                }}
                className="py-3 px-4 font-bold text-xs bg-amber-600 hover:bg-amber-700 text-white rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>پرو آنلاین</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>ضمانت اصالت و سلامت فیزیکی با ارسال ضدعفونی شده</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
