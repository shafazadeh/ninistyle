import React from 'react';
import { Phone, Mail, MapPin, Instagram, Sparkles } from 'lucide-react';

interface FooterProps {
	onOpenTryOn: () => void;
	onOpenSizeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTryOn, onOpenSizeGuide }) => {
	return (
		<footer className='bg-stone-900 text-stone-300 pt-12 pb-8 border-t border-stone-800'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
					{/* Col 1: Brand Info */}
					<div className='space-y-3'>
						<div className='flex items-center gap-2 text-white text-lg font-bold'>
							<span className='w-7 h-7 rounded-full bg-amber-500 text-stone-900 flex items-center justify-center text-sm font-black'>
								ن
							</span>
							<span>نی‌نی‌استایل</span>
						</div>
						<p className='text-xs text-stone-400 leading-relaxed'>
							فروشگاه تخصصی پوشاک کودکان ۲ تا ۹ سال. تولید شده با مرغوب‌ترین الیاف کتان ارگانیک و
							طراحی متناسب با راحتی و شادابی کودکان، همراه با فناوری پرو هوشمند آنلاین.
						</p>
					</div>

					{/* Col 2: Quick Links */}
					<div className='space-y-2.5'>
						<h4 className='text-xs font-bold text-white uppercase tracking-wider'>دسترسی سریع</h4>
						<ul className='space-y-2 text-xs text-stone-400'>
							<li>
								<button
									onClick={onOpenTryOn}
									className='hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer'
								>
									<Sparkles className='w-3.5 h-3.5 text-amber-500' />
									<span>اتاق پرو آنلاین هوشمند</span>
								</button>
							</li>
							<li>
								<button
									onClick={onOpenSizeGuide}
									className='hover:text-amber-400 transition-colors cursor-pointer'
								>
									جدول و راهنمای سایزبندی ۲ تا ۹ سال
								</button>
							</li>
							<li>
								<span className='text-stone-400'>رویه ارسال سفارش و پست پیشتاز</span>
							</li>
							<li>
								<span className='text-stone-400'>شرایط تعویض و بازگشت کالا</span>
							</li>
						</ul>
					</div>

					{/* Col 3: Kids Categories */}
					<div className='space-y-2.5'>
						<h4 className='text-xs font-bold text-white uppercase tracking-wider'>
							دسته‌بندی‌های محبوب
						</h4>
						<ul className='space-y-2 text-xs text-stone-400'>
							<li>هودی و دورس پنبه‌ای دخترانه و پسرانه</li>
							<li>پیراهن و سارافون مجلسی بهاره</li>
							<li>کت و کاپشن ضدآب پاییزه</li>
							<li>ست‌های راحتی و خونگی کودک</li>
						</ul>
					</div>

					{/* Col 4: Contact & Support */}
					<div className='space-y-2.5'>
						<h4 className='text-xs font-bold text-white uppercase tracking-wider'>
							پشتیبانی و ارتباط
						</h4>
						<div className='space-y-2 text-xs text-stone-400'>
							<div className='flex items-center gap-2'>
								<Phone className='w-4 h-4 text-amber-500 shrink-0' />
								<span className='tabular-nums'>پشتیبانی: ۰۲۱-۸۸۹۹۰۰۱۱</span>
							</div>
							<div className='flex items-center gap-2'>
								<Mail className='w-4 h-4 text-amber-500 shrink-0' />
								<span>support@ninistyle-kids.ir</span>
							</div>
							<div className='flex items-center gap-2'>
								<MapPin className='w-4 h-4 text-amber-500 shrink-0' />
								<span>تهران، خیابان بهار جنوبی، پلاک ۱۲۴</span>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Bar: Quiet Copyright */}
				<div className='pt-6 border-t border-stone-800 text-center text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-3'>
					<div>تمامی حقوق مادی و معنوی متعلق به فروشگاه آنلاین لباس کودک نی‌نی‌استایل است.</div>
					<div className='text-[11px] text-stone-400'>
						طراحی شده با عشق برای لبخند فرزندان ۲ تا ۹ ساله ایران ❤️
					</div>
				</div>
			</div>
		</footer>
	);
};
