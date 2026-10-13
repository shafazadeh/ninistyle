import React from 'react';
import { Sparkles, ShieldCheck, Truck, RefreshCw, Feather } from 'lucide-react';

interface HeroProps {
	onStartTryOn: () => void;
	onExploreCollection: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartTryOn, onExploreCollection }) => {
	return (
		<section className='relative overflow-hidden bg-stone-100 border-b border-stone-200'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center'>
					{/* Right Text Column (Persian RTL) */}
					<div className='lg:col-span-6 space-y-6'>
						<div className='inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-amber-800 bg-amber-100/80 px-3.5 py-1 rounded-full border border-amber-200'>
							<Sparkles className='w-3.5 h-3.5 text-amber-600' />
							<span>فناوری نوین پرو آنلاین لباس با عکس فرزند</span>
						</div>

						<h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.3] text-balance'>
							قبل از خرید لباس، تن‌خور آن را تنِ کودکتان ببینید!
						</h1>

						<p className='text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl'>
							دیگر نگران سایز و تناسب لباس با ظاهر فرزندتان نباشید. عکس کودک دلبندتان را آپلود کنید
							تا هوش مصنوعی لباس منتخب را تن او نشان دهد! ویژه سنین ۲ تا ۹ سال.
						</p>

						{/* CTAs */}
						<div className='flex flex-wrap items-center gap-3 pt-2'>
							<button
								onClick={onStartTryOn}
								className='flex items-center gap-2.5 px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-md shadow-amber-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
							>
								<Sparkles className='w-5 h-5 text-amber-200' />
								<span>ورود به اتاق پرو آنلاین</span>
							</button>

							<button
								onClick={onExploreCollection}
								className='flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-800 font-semibold rounded-xl border border-stone-300 shadow-sm transition-colors cursor-pointer'
							>
								<span>مشاهده کالکشن لباس‌ها</span>
							</button>
						</div>

						{/* Feature Bullets */}
						<div className='grid grid-cols-2 gap-4 pt-4 border-t border-stone-200/80'>
							<div className='flex items-center gap-2.5 text-xs sm:text-sm text-stone-600 font-medium'>
								<Feather className='w-4 h-4 text-amber-600 shrink-0' />
								<span>۱۰۰٪ نخ پنبه ارگانیک ضدحساسیت</span>
							</div>
							<div className='flex items-center gap-2.5 text-xs sm:text-sm text-stone-600 font-medium'>
								<Truck className='w-4 h-4 text-amber-600 shrink-0' />
								<span>ارسال سریع سراسر کشور</span>
							</div>
							<div className='flex items-center gap-2.5 text-xs sm:text-sm text-stone-600 font-medium'>
								<RefreshCw className='w-4 h-4 text-amber-600 shrink-0' />
								<span>۷ روز ضمانت بازگشت و تعویض سایز</span>
							</div>
							<div className='flex items-center gap-2.5 text-xs sm:text-sm text-stone-600 font-medium'>
								<ShieldCheck className='w-4 h-4 text-amber-600 shrink-0' />
								<span>ضمانت ثبات رنگ و شستشو</span>
							</div>
						</div>
					</div>

					{/* Left Media Column */}
					<div className='lg:col-span-6 relative'>
						<div className='relative rounded-2xl overflow-hidden shadow-xl border border-stone-200 aspect-[16/10] bg-stone-200 group'>
							<img
								src='/src/assets/images/hero_kids_fashion_1790607375922.jpg'
								alt='لباس شیک کودکان ۲ تا ۹ سال'
								className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out'
								referrerPolicy='no-referrer'
							/>
							<div className='absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none' />

							{/* Floating Try-On Card on Hero */}
							<div className='absolute bottom-4 right-4 left-4 p-3.5 bg-white/95 backdrop-blur-md rounded-xl border border-stone-200/70 shadow-lg flex items-center justify-between'>
								<div className='flex items-center gap-3'>
									<div className='w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-700'>
										<Sparkles className='w-5 h-5' />
									</div>
									<div>
										<div className='text-xs font-bold text-stone-900'>پرو سریع با یک کلیک</div>
									</div>
								</div>
								<button
									onClick={onStartTryOn}
									className='px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer'
								>
									تست کنید
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
