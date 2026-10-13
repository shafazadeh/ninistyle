import React from 'react';
import { ShoppingBag, Sparkles, Ruler, Heart } from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenTryOn: () => void;
  onOpenSizeGuide: () => void;
  onSelectCategory: (category: string) => void;
  activeCategory: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenTryOn,
  onOpenSizeGuide,
  onSelectCategory,
  activeCategory,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('all');
            }}
            className="text-2xl font-black tracking-tight text-stone-900 flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <span className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-base shadow-sm font-bold">
              ن
            </span>
            <span>نی‌نی‌استایل</span>
          </a>
        </div>

        {/* Zone 2: 4-5 Clean Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => onSelectCategory('all')}
            className={`transition-colors hover:text-stone-900 ${
              activeCategory === 'all' ? 'text-amber-700 font-semibold' : ''
            }`}
          >
            همه لباس‌ها
          </button>
          <button
            onClick={() => onSelectCategory('girls')}
            className={`transition-colors hover:text-stone-900 ${
              activeCategory === 'girls' ? 'text-amber-700 font-semibold' : ''
            }`}
          >
            دخترانه (۲ تا ۹ سال)
          </button>
          <button
            onClick={() => onSelectCategory('boys')}
            className={`transition-colors hover:text-stone-900 ${
              activeCategory === 'boys' ? 'text-amber-700 font-semibold' : ''
            }`}
          >
            پسرانه (۲ تا ۹ سال)
          </button>
          <button
            onClick={() => onSelectCategory('hoodie')}
            className={`transition-colors hover:text-stone-900 ${
              activeCategory === 'hoodie' ? 'text-amber-700 font-semibold' : ''
            }`}
          >
            هودی و کاپشن
          </button>
          <button
            onClick={onOpenSizeGuide}
            className="flex items-center gap-1.5 transition-colors hover:text-stone-900 text-stone-600"
          >
            <Ruler className="w-4 h-4 text-stone-400" />
            <span>راهنمای سایز</span>
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3">
          {/* Virtual Try-On Trigger Button */}
          <button
            onClick={onOpenTryOn}
            className="flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
            <span>پرو آنلاین با عکس کودک</span>
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            aria-label="سبد خرید"
            className="relative p-2.5 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {toPersianDigits(cartCount)}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
