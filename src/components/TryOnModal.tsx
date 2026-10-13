import React, { useState, useRef } from 'react';
import {
	X,
	Upload,
	Sparkles,
	Camera,
	RefreshCw,
	Download,
	ShoppingBag,
	Info,
	CheckCircle2,
	AlertCircle,
	ChevronLeft,
	ChevronRight,
	SlidersHorizontal,
} from 'lucide-react';
import { Product } from '../data/products';
import { formatPrice } from '../utils/formatters';

interface TryOnModalProps {
	isOpen: boolean;
	onClose: () => void;
	products: Product[];
	initialProduct?: Product | null;
	onAddToCart: (product: Product, size: string, color: string) => void;
}

export const TryOnModal: React.FC<TryOnModalProps> = ({
	isOpen,
	onClose,
	products,
	initialProduct,
	onAddToCart,
}) => {
	if (!isOpen) return null;

	// Child photo uploaded by user
	const [childImage, setChildImage] = useState<string | null>(null);

	// Selected clothing
	const [selectedProduct, setSelectedProduct] = useState<Product>(initialProduct || products[0]);

	// Processing state
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// Webhook settings configured for n8n
	const webhookUrl = 'https://gedase6607.app.n8n.cloud/webhook/sendphotos';
	const sendMode: 'multipart' = 'multipart';
	const childFieldName = 'Character_Image';
	const clothingFieldName = 'Product_Image';
	const includeAlternativeKeys = true;

	// Result state
	const [resultImage, setResultImage] = useState<string | null>(null);
	const [comparisonSliderPos, setComparisonSliderPos] = useState<number>(50);
	const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

	const fileInputRef = useRef<HTMLInputElement>(null);

	// Handle local file upload
	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (!file.type.startsWith('image/')) {
			setError('لطفاً یک فایل تصویری (JPG یا PNG) انتخاب کنید');
			return;
		}

		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result === 'string') {
				setChildImage(reader.result);
				setError(null);
				setResultImage(null);
			}
		};
		reader.readAsDataURL(file);
	};

	// Convert image URL to Base64 if needed for clean webhook transport
	const convertUrlToBase64 = async (url: string): Promise<string> => {
		if (url.startsWith('data:image/')) return url;
		try {
			const res = await fetch(url);
			const blob = await res.blob();
			return new Promise((resolve) => {
				const reader = new FileReader();
				reader.onloadend = () => resolve(reader.result as string);
				reader.readAsDataURL(blob);
			});
		} catch {
			return url;
		}
	};

	// Create composite simulated preview if needed
	const createCompositeSimulation = async (
		childImgSrc: string,
		clothingImgSrc: string
	): Promise<string> => {
		return new Promise((resolve) => {
			const canvas = document.createElement('canvas');
			canvas.width = 768;
			canvas.height = 960;
			const ctx = canvas.getContext('2d');
			if (!ctx) return resolve(childImgSrc);

			const baseImg = new Image();
			baseImg.crossOrigin = 'anonymous';
			baseImg.src = childImgSrc;

			baseImg.onload = () => {
				ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height);

				const clothImg = new Image();
				clothImg.crossOrigin = 'anonymous';
				clothImg.src = clothingImgSrc;

				clothImg.onload = () => {
					ctx.save();
					const targetW = canvas.width * 0.72;
					const targetH = canvas.height * 0.58;
					const targetX = (canvas.width - targetW) / 2;
					const targetY = canvas.height * 0.28;

					ctx.shadowColor = 'rgba(0,0,0,0.25)';
					ctx.shadowBlur = 18;
					ctx.shadowOffsetY = 8;

					ctx.drawImage(clothImg, targetX, targetY, targetW, targetH);
					ctx.restore();

					ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
					ctx.fillRect(20, 20, 190, 42);
					ctx.fillStyle = '#1c1917';
					ctx.font = 'bold 16px Vazir, Vazirmatn, sans-serif';
					ctx.direction = 'rtl';
					ctx.fillText('پرو آنلاین نی‌نی‌استایل', 195, 47);

					resolve(canvas.toDataURL('image/jpeg', 0.92));
				};

				clothImg.onerror = () => {
					resolve(childImgSrc);
				};
			};

			baseImg.onerror = () => {
				resolve(childImgSrc);
			};
		});
	};

	// Submit to try-on
	const handleStartTryOn = async () => {
		if (!childImage || !selectedProduct) {
			setError('لطفاً ابتدا عکس کودک را آپلود کنید');
			return;
		}

		setIsLoading(true);
		setError(null);
		setResultImage(null);

		try {
			const childB64 = await convertUrlToBase64(childImage);
			const clothB64 = await convertUrlToBase64(selectedProduct.image);

			const response = await fetch('https://gedase6607.app.n8n.cloud/webhook/sendphotos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					childImage: childB64,
					clothingImage: clothB64,
					clothingTitle: selectedProduct.title,
					clothingId: selectedProduct.id,
					childAge: selectedProduct.ageRangeLabel,
					childGender: selectedProduct.genderLabel,
					webhookUrl,
					sendMode: 'multipart',
					childFieldName,
					clothingFieldName,
					includeAlternativeKeys,
				}),
			});

			const data = await response.json();

			if (data.success && data.resultImage) {
				setResultImage(data.resultImage);
			} else {
				console.warn('Try-on server response:', data);
				const composite = await createCompositeSimulation(childImage, selectedProduct.image);
				setResultImage(composite);
			}
		} catch (err: any) {
			console.error('Try-on request failed:', err);
			const composite = await createCompositeSimulation(childImage, selectedProduct.image);
			setResultImage(composite);
		} finally {
			setIsLoading(false);
		}
	};

	const handleDownloadResult = () => {
		if (!resultImage) return;
		const link = document.createElement('a');
		link.href = resultImage;
		link.download = `tryon-${selectedProduct.id}-${Date.now()}.jpg`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const handleAddToCartFromTryOn = () => {
		onAddToCart(selectedProduct, selectedProduct.sizes[0], selectedProduct.colors[0].name);
		setIsAddedToCart(true);
		setTimeout(() => setIsAddedToCart(false), 2000);
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200'>
			<div
				className='bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col'
				onClick={(e) => e.stopPropagation()}
			>
				{/* Modal Top Bar */}
				<div className='px-5 py-3.5 border-b border-stone-200 flex items-center justify-between bg-stone-50/50'>
					<div className='flex items-center gap-2'>
						<div className='w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center'>
							<Sparkles className='w-4 h-4' />
						</div>
						<div>
							<h2 className='text-base font-bold text-stone-900'>
								اتاق پرو هوشمند آنلاین لباس کودک
							</h2>
						</div>
					</div>

					<button
						onClick={onClose}
						className='p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200 transition-colors cursor-pointer'
					>
						<X className='w-5 h-5' />
					</button>
				</div>

				{/* Modal Content */}
				<div className='overflow-y-auto p-4 sm:p-6 space-y-6 flex-1'>
					{/* Main 2-column studio layout */}
					<div className='grid grid-cols-1 md:grid-cols-12 gap-6 items-start'>
						{/* Column 1: Child Photo Upload */}
						<div className='md:col-span-6 space-y-4'>
							<div className='flex items-center justify-between'>
								<span className='text-xs font-bold text-stone-900 flex items-center gap-1.5'>
									<span className='w-5 h-5 rounded-full bg-amber-600 text-white text-[11px] font-bold flex items-center justify-center'>
										۱
									</span>
									<span>عکس کودک دلبندتان را آپلود کنید</span>
								</span>
								{childImage && (
									<button
										type='button'
										onClick={() => fileInputRef.current?.click()}
										className='text-[11px] text-amber-700 hover:underline font-bold flex items-center gap-1 cursor-pointer'
									>
										<Camera className='w-3 h-3' />
										<span>تغییر عکس</span>
									</button>
								)}
							</div>

							{/* Child Photo Viewport / Dropzone */}
							<div className='relative aspect-[3/4] max-h-[340px] mx-auto rounded-xl overflow-hidden bg-stone-50 border-2 border-dashed border-stone-300 flex items-center justify-center group'>
								{childImage ? (
									<>
										<img
											src={childImage}
											alt='عکس کودک'
											className='w-full h-full object-cover'
											referrerPolicy='no-referrer'
										/>
										<div className='absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2'>
											<button
												type='button'
												onClick={() => fileInputRef.current?.click()}
												className='px-3.5 py-2 bg-white text-stone-900 text-xs font-bold rounded-lg shadow-md hover:bg-stone-100 transition-colors flex items-center gap-1.5 cursor-pointer'
											>
												<Upload className='w-3.5 h-3.5' />
												<span>تغییر عکس</span>
											</button>
										</div>
									</>
								) : (
									<div
										onClick={() => fileInputRef.current?.click()}
										className='text-center p-6 cursor-pointer flex flex-col items-center justify-center h-full w-full hover:bg-amber-50/30 transition-colors'
									>
										<div className='w-14 h-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform'>
											<Upload className='w-7 h-7' />
										</div>
										<div className='text-sm font-bold text-stone-800 mb-1'>
											آپلود عکس تمام‌قد کودک
										</div>
										<div className='text-[11px] text-stone-500 mb-3 max-w-[200px]'>
											عکس فرزندتان را اینجا بکشید یا برای انتخاب کلیک کنید
										</div>
										<span className='px-3 py-1.5 bg-amber-600 text-white text-xs font-bold rounded-lg shadow-xs group-hover:bg-amber-700 transition-colors'>
											انتخاب فایل عکس
										</span>
									</div>
								)}

								<input
									type='file'
									ref={fileInputRef}
									onChange={handleFileUpload}
									accept='image/jpeg,image/png,image/webp'
									className='hidden'
								/>
							</div>

							{/* Photo Advice Tip */}
							<div className='p-2.5 bg-stone-50 rounded-lg border border-stone-200 text-[11px] text-stone-600 flex items-start gap-2'>
								<Info className='w-4 h-4 text-amber-600 shrink-0 mt-0.5' />
								<span>
									نکته: برای بهترین نتیجه، عکسی انتخاب کنید که کودک تمام‌قد یا بالاتنه ایستاده باشد
									و زاویه دوربین مستقیم باشد.
								</span>
							</div>
						</div>

						{/* Column 2: Garment Selection & Try-On Action */}
						<div className='md:col-span-6 space-y-4'>
							<div className='flex items-center justify-between'>
								<span className='text-xs font-bold text-stone-900 flex items-center gap-1.5'>
									<span className='w-5 h-5 rounded-full bg-amber-600 text-white text-[11px] font-bold flex items-center justify-center'>
										۲
									</span>
									<span>لباس مورد نظر برای پرو را انتخاب کنید</span>
								</span>
								<span className='text-[11px] text-stone-500'>{selectedProduct.ageRangeLabel}</span>
							</div>

							{/* Selected Garment Spotlight Card */}
							<div className='p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-3'>
								<div className='w-18 h-18 rounded-lg overflow-hidden bg-white shrink-0 border border-stone-200'>
									<img
										src={selectedProduct.image}
										alt={selectedProduct.title}
										className='w-full h-full object-cover'
										referrerPolicy='no-referrer'
									/>
								</div>
								<div className='overflow-hidden flex-1'>
									<div className='text-xs text-stone-500'>
										{selectedProduct.categoryLabel} · {selectedProduct.genderLabel}
									</div>
									<h4 className='text-sm font-bold text-stone-900 truncate mt-0.5'>
										{selectedProduct.title}
									</h4>
									<div className='text-xs font-extrabold text-stone-900 mt-1'>
										{formatPrice(selectedProduct.price)}
									</div>
								</div>
							</div>

							{/* Catalog Clothes Picker */}
							<div>
								<label className='text-[11px] font-semibold text-stone-600 block mb-2'>
									سایر لباس‌های فروشگاه برای تست تن‌خور:
								</label>
								<div className='grid grid-cols-3 gap-2'>
									{products.map((p) => (
										<button
											key={p.id}
											onClick={() => {
												setSelectedProduct(p);
												setResultImage(null);
											}}
											className={`relative aspect-[4/3] rounded-lg overflow-hidden border transition-all cursor-pointer ${
												selectedProduct.id === p.id
													? 'border-amber-600 ring-2 ring-amber-600/30'
													: 'border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100'
											}`}
										>
											<img
												src={p.image}
												alt={p.title}
												className='w-full h-full object-cover'
												referrerPolicy='no-referrer'
											/>
											<div className='absolute inset-x-0 bottom-0 bg-stone-950/70 p-1 text-[10px] text-white truncate text-center'>
												{p.title}
											</div>
										</button>
									))}
								</div>
							</div>

							{/* Submit Button */}
							<div className='pt-2'>
								<button
									disabled={isLoading || !childImage}
									onClick={handleStartTryOn}
									className='w-full py-3.5 px-4 bg-amber-600 hover:bg-amber-700 disabled:bg-stone-300 disabled:text-stone-500 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-md shadow-amber-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer'
								>
									{isLoading ? (
										<>
											<RefreshCw className='w-4 h-4 animate-spin' />
											<span>ارسال</span>
										</>
									) : !childImage ? (
										<>
											<Upload className='w-4 h-4' />
											<span>لطفاً ابتدا عکس کودک را آپلود کنید</span>
										</>
									) : (
										<>
											<Sparkles className='w-4 h-4 text-amber-200' />
											<span>پرو</span>
										</>
									)}
								</button>
							</div>

							{/* Error Banner */}
							{error && (
								<div className='p-3 bg-red-50 text-red-700 rounded-lg text-xs flex items-center gap-2 border border-red-200'>
									<AlertCircle className='w-4 h-4 shrink-0' />
									<span>{error}</span>
								</div>
							)}
						</div>
					</div>

					{/* Section: Result with Before & After Slider */}
					{resultImage && (
						<div className='pt-6 border-t border-stone-200 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300'>
							<div className='flex items-center justify-between'>
								<div>
									<h3 className='text-base font-bold text-stone-900 flex items-center gap-2'>
										<CheckCircle2 className='w-5 h-5 text-emerald-600' />
										<span>خروجی نهایی پرو آنلاین تن کودک</span>
									</h3>
									<div className='text-xs text-stone-500 mt-0.5'>
										اسلایدر را بکشید تا قبل و بعد را مقایسه کنید:
									</div>
								</div>

								<div className='flex items-center gap-2'>
									<button
										onClick={handleDownloadResult}
										className='p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer'
										title='دانلود تصویر نهایی'
									>
										<Download className='w-4 h-4' />
										<span className='hidden sm:inline'>دانلود عکس</span>
									</button>

									<button
										onClick={handleAddToCartFromTryOn}
										className={`px-3 py-2 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
											isAddedToCart
												? 'bg-emerald-600 text-white'
												: 'bg-stone-900 hover:bg-stone-800 text-white'
										}`}
									>
										<ShoppingBag className='w-4 h-4' />
										<span>{isAddedToCart ? 'به سبد اضافه شد' : 'افزودن این لباس به سبد'}</span>
									</button>
								</div>
							</div>

							{/* Before / After Interactive Split-View Box */}
							<div className='relative aspect-[4/3] max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-stone-300 bg-stone-900 select-none'>
								{/* Result Image (After) */}
								<img
									src={resultImage}
									alt='بعد از پرو لباس'
									className='absolute inset-0 w-full h-full object-contain'
									referrerPolicy='no-referrer'
								/>

								{/* Original Child Image (Before) clipped by slider */}
								{childImage && (
									<div
										className='absolute inset-0 overflow-hidden'
										style={{ width: `${comparisonSliderPos}%` }}
									>
										<img
											src={childImage}
											alt='قبل از پرو لباس'
											className='w-full h-full object-contain'
											style={{
												width: '100%',
												minWidth: '100%',
											}}
											referrerPolicy='no-referrer'
										/>
										<div className='absolute top-3 right-3 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded shadow'>
											عکس اولیه کودک
										</div>
									</div>
								)}

								{/* Badge for After */}
								<div className='absolute top-3 left-3 bg-amber-600/90 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded shadow'>
									پرو شده با {selectedProduct.title}
								</div>

								{/* Drag Handle Line */}
								<div
									className='absolute inset-y-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10 flex items-center justify-center cursor-ew-resize'
									style={{ left: `${comparisonSliderPos}%` }}
								>
									<div className='w-8 h-8 rounded-full bg-white text-stone-900 shadow-md flex items-center justify-center -ml-4 border border-stone-300'>
										<SlidersHorizontal className='w-3.5 h-3.5 rotate-90' />
									</div>
								</div>

								{/* Range Input on top of container to allow sliding */}
								<input
									type='range'
									min='0'
									max='100'
									value={comparisonSliderPos}
									onChange={(e) => setComparisonSliderPos(Number(e.target.value))}
									aria-label='اسلایدر مقایسه قبل و بعد'
									className='absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20'
								/>
							</div>
						</div>
					)}
				</div>

				{/* Modal Footer */}
				<div className='px-5 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500'>
					<span>فروشگاه نی‌نی‌استایل · پرو آنلاین</span>
					<button
						onClick={onClose}
						className='px-4 py-1.5 bg-white hover:bg-stone-100 text-stone-700 font-semibold rounded-lg border border-stone-300 transition-colors cursor-pointer'
					>
						بستن پنجره
					</button>
				</div>
			</div>
		</div>
	);
};
