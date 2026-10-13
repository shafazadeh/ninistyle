import React, { useState } from 'react';
import { X, Ruler, Sparkles, Check } from 'lucide-react';
import { SIZING_GUIDE } from '../data/childModels';
import { toPersianDigits } from '../utils/formatters';

interface SizeCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeCalculatorModal: React.FC<SizeCalculatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [age, setAge] = useState<number>(4);
  const [height, setHeight] = useState<number>(105);
  const [weight, setWeight] = useState<number>(18);
  const [fitPreference, setFitPreference] = useState<'fitted' | 'loose'>('loose');

  // Calculate size based on age and height
  const calculateSize = (): { sizeName: string; note: string } => {
    let size = 'سایز ۴۰';
    let note = 'مناسب سن ۳ تا ۴ سال با تن‌خور نرمال';

    if (height < 95 || age <= 2) {
      size = 'سایز ۳۵';
      note = 'مناسب سن ۲ تا ۳ سال (قد زیر ۹۵ سانتی‌متر)';
    } else if (height < 108 || age <= 4) {
      size = fitPreference === 'loose' && height > 103 ? 'سایز ۴۵' : 'سایز ۴۰';
      note = fitPreference === 'loose' ? 'انتخاب سایز ۴۵ برای آزادی حرکت و رشد کودک' : 'سایز ۴۰ استاندارد';
    } else if (height < 118 || age <= 6) {
      size = fitPreference === 'loose' && height > 114 ? 'سایز ۵۰' : 'سایز ۴۵';
      note = 'مناسب سن ۴ تا ۵ سال';
    } else if (height < 126 || age <= 7) {
      size = fitPreference === 'loose' && height > 122 ? 'سایز ۵۵' : 'سایز ۵۰';
      note = 'مناسب سن ۶ تا ۷ سال';
    } else {
      size = 'سایز ۵۵';
      note = 'مناسب سن ۸ تا ۹ سال (قد بالای ۱۲۵ سانتی‌متر)';
    }

    return { sizeName: size, note };
  };

  const recommendation = calculateSize();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center">
              <Ruler className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">
                راهنمای سایزبندی هوشمند کودکان ۲ تا ۹ سال
              </h2>
              <div className="text-[11px] text-stone-500">
                محاسبه سایز مناسب بر اساس سن، قد و وزن کودک
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Interactive Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-900 block mb-1.5">
                سن کودک:
              </label>
              <select
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-stone-300 bg-white focus:outline-none focus:border-amber-600 cursor-pointer"
              >
                {[2, 3, 4, 5, 6, 7, 8, 9].map((a) => (
                  <option key={a} value={a}>
                    {toPersianDigits(a)} سال
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-900 block mb-1.5">
                قد تقریبی کودک (سانتی‌متر):
              </label>
              <input
                type="number"
                min="80"
                max="140"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-stone-300 bg-white focus:outline-none focus:border-amber-600 tabular-nums"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-900 block mb-1.5">
                وزن تقریبی کودک (کیلوگرم):
              </label>
              <input
                type="number"
                min="10"
                max="40"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-stone-300 bg-white focus:outline-none focus:border-amber-600 tabular-nums"
              />
            </div>
          </div>

          {/* Fit Preference */}
          <div>
            <label className="text-xs font-bold text-stone-900 block mb-1.5">
              ترجیح استایل تن‌خور:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFitPreference('loose')}
                className={`p-3 rounded-xl border text-right transition-colors cursor-pointer ${
                  fitPreference === 'loose'
                    ? 'border-amber-600 bg-amber-50/60 ring-1 ring-amber-600/30'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="text-xs font-bold text-stone-900">
                  آزاد و راحت (پیشنهادی والدین)
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  فضای مناسب برای رشد ۶ ماه آینده کودک
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFitPreference('fitted')}
                className={`p-3 rounded-xl border text-right transition-colors cursor-pointer ${
                  fitPreference === 'fitted'
                    ? 'border-amber-600 bg-amber-50/60 ring-1 ring-amber-600/30'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="text-xs font-bold text-stone-900">
                  دقیق و فیت بدن
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  تن‌خور کاملاً چسبان مناسب همین فصل
                </div>
              </button>
            </div>
          </div>

          {/* Calculated Output Box */}
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm">
                <Sparkles className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <div className="text-xs text-amber-800">سایز پیشنهادی برای فرزند شما:</div>
                <div className="text-lg font-black text-amber-950">
                  {recommendation.sizeName}
                </div>
                <div className="text-[11px] text-amber-700 mt-0.5">
                  {recommendation.note}
                </div>
              </div>
            </div>
            <div className="text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>ضمانت تعویض</span>
            </div>
          </div>

          {/* Comprehensive Sizing Table */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 mb-2">
              جدول استاندارد سایز پوشاک کودک (۲ تا ۹ سال):
            </h4>
            <div className="border border-stone-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-right">
                <thead className="bg-stone-100 border-b border-stone-200 text-stone-700 font-bold">
                  <tr>
                    <th className="p-2.5">سایز</th>
                    <th className="p-2.5">رده سنی</th>
                    <th className="p-2.5">قد کودک</th>
                    <th className="p-2.5">وزن</th>
                    <th className="p-2.5">دور سینه</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-600 tabular-nums">
                  {SIZING_GUIDE.map((row) => (
                    <tr
                      key={row.size}
                      className={
                        recommendation.sizeName === row.size
                          ? 'bg-amber-100/50 font-bold text-stone-900'
                          : 'hover:bg-stone-50'
                      }
                    >
                      <td className="p-2.5">{row.size}</td>
                      <td className="p-2.5">{row.age}</td>
                      <td className="p-2.5">{row.height}</td>
                      <td className="p-2.5">{row.weight}</td>
                      <td className="p-2.5">{row.chest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <div className="px-6 py-3 border-t border-stone-200 bg-stone-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            متوجه شدم
          </button>
        </div>
      </div>
    </div>
  );
};
