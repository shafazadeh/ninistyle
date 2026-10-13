import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { formatPrice, toPersianDigits } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingFee = subtotal >= 500000 || items.length === 0 ? 0 : 45000;
  const totalPrice = subtotal + shippingFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('لطفاً همه اطلاعات تماس و آدرس را وارد فرمایید');
      return;
    }
    setIsOrderPlaced(true);
    setTimeout(() => {
      onClearCart();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 left-0 max-w-full flex pl-0 md:pl-10">
        <div
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-700" />
              <h2 className="text-base font-bold text-stone-900">
                سبد خرید شما ({toPersianDigits(items.length)} کالا)
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {isOrderPlaced ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-stone-900">
                  سفارش شما با موفقیت ثبت شد!
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed max-w-xs mx-auto">
                  کد پیگیری سفارش:{' '}
                  <span className="font-mono font-bold text-amber-800">
                    KID-{Math.floor(100000 + Math.random() * 900000)}
                  </span>
                  <br />
                  همکاران ما در بخش بسته‌بندی نی‌نی‌استایل به زودی با شما تماس خواهند گرفت.
                </p>
                <button
                  onClick={() => {
                    setIsOrderPlaced(false);
                    setIsCheckingOut(false);
                    onClose();
                  }}
                  className="mt-4 px-6 py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl"
                >
                  بازگشت به فروشگاه
                </button>
              </div>
            ) : isCheckingOut ? (
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-900 pb-2 border-b border-stone-200">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="p-1 hover:bg-stone-100 rounded text-stone-500"
                  >
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
                  <span>اطلاعات تحویل و پرداخت</span>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-1">
                    نام و نام خانوادگی والد:
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="مثال: سارا محمدی"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-1">
                    شماره تماس (جهت هماهنگی ارسال):
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-amber-600 tabular-nums text-left"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-1">
                    آدرس دقیق پستی:
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="استان، شهر، خیابان، پلاک، واحد"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1.5">
                  <div className="flex justify-between text-stone-600">
                    <span>مبلغ اقلام:</span>
                    <span className="tabular-nums">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>هزینه ارسال:</span>
                    <span>{shippingFee === 0 ? 'رایگان' : formatPrice(shippingFee)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-stone-900 pt-1.5 border-t border-stone-200">
                    <span>مبلغ نهایی قابل پرداخت:</span>
                    <span className="text-amber-800 tabular-nums">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  تأیید نهایی و ثبت سفارش
                </button>
              </form>
            ) : items.length === 0 ? (
              <div className="py-16 text-center space-y-2">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
                <div className="text-sm font-bold text-stone-700">
                  سبد خرید شما هنوز خالی است
                </div>
                <div className="text-xs text-stone-400">
                  لباس‌های دلخواهتان را پرو کنید و به سبد بیفزایید.
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${idx}`}
                    className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex gap-3 items-center"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-16 h-16 rounded-lg object-cover bg-white shrink-0 border border-stone-200"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 overflow-hidden">
                      <h4 className="text-xs font-bold text-stone-900 truncate">
                        {item.product.title}
                      </h4>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {item.selectedSize} · رنگ {item.selectedColor}
                      </div>
                      <div className="text-xs font-bold text-stone-900 mt-1 tabular-nums">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-1"
                        title="حذف از سبد"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-1.5 bg-white border border-stone-300 rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-100 rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-1 tabular-nums">
                          {toPersianDigits(item.quantity)}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-100 rounded"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Summary & Checkout CTA */}
          {!isOrderPlaced && items.length > 0 && !isCheckingOut && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>مجموع خرید:</span>
                  <span className="tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>هزینه ارسال:</span>
                  <span>{shippingFee === 0 ? 'رایگان' : formatPrice(shippingFee)}</span>
                </div>
                {shippingFee > 0 && (
                  <div className="text-[11px] text-amber-700">
                    با خرید بالای ۵۰۰ هزار تومان، ارسال رایگان خواهد شد.
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm text-stone-900 pt-2 border-t border-stone-200">
                  <span>مبلغ قابل پرداخت:</span>
                  <span className="text-amber-800 tabular-nums">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
              >
                تکمیل خرید و ثبت سفارش
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>ضمانت ۷ روز بازگشت وجه و تعویض سایز رایگان</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
