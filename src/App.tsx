import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { TryOnModal } from './components/TryOnModal';
import { SizeCalculatorModal } from './components/SizeCalculatorModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { PRODUCTS, Product } from './data/products';
import { CartItem } from './types';
import { Sparkles, SlidersHorizontal, Ruler, Heart, CheckCircle2 } from 'lucide-react';
import { toPersianDigits } from './utils/formatters';

export default function App() {
	// State
	const [products] = useState<Product[]>(PRODUCTS);
	const [selectedCategory, setSelectedCategory] = useState<string>('all');
	const [selectedAge, setSelectedAge] = useState<string>('all');
	const [selectedGender, setSelectedGender] = useState<string>('all');

	// Modals & Drawers
	const [isTryOnOpen, setIsTryOnOpen] = useState<boolean>(false);
	const [tryOnInitialProduct, setTryOnInitialProduct] = useState<Product | null>(null);
	const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
	const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
	const [detailProduct, setDetailProduct] = useState<Product | null>(null);

	// Cart & Wishlist
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [toastMessage, setToastMessage] = useState<string | null>(null);

	const showToast = (msg: string) => {
		setToastMessage(msg);
		setTimeout(() => setToastMessage(null), 3000);
	};

	// Add to cart handler
	const handleAddToCart = (product: Product, size: string, color: string) => {
		setCartItems((prev) => {
			const existingIndex = prev.findIndex(
				(item) =>
					item.product.id === product.id &&
					item.selectedSize === size &&
					item.selectedColor === color
			);
			if (existingIndex > -1) {
				const next = [...prev];
				next[existingIndex].quantity += 1;
				return next;
			}
			return [
				...prev,
				{
					product,
					selectedSize: size,
					selectedColor: color,
					quantity: 1,
				},
			];
		});
		showToast(`«${product.title}» به سبد خرید اضافه شد.`);
	};

	const handleUpdateQuantity = (index: number, newQty: number) => {
		if (newQty <= 0) {
			handleRemoveItem(index);
			return;
		}
		setCartItems((prev) => {
			const next = [...prev];
			next[index].quantity = newQty;
			return next;
		});
	};

	const handleRemoveItem = (index: number) => {
		setCartItems((prev) => prev.filter((_, i) => i !== index));
	};

	const handleClearCart = () => {
		setCartItems([]);
	};

	// Direct try-on for a specific product
	const handleLaunchTryOnWithProduct = (product: Product) => {
		setTryOnInitialProduct(product);
		setIsTryOnOpen(true);
	};

	// Filtering products
	const filteredProducts = useMemo(() => {
		return products.filter((p) => {
			// Category filter
			if (selectedCategory !== 'all') {
				if (selectedCategory === 'girls' && p.gender !== 'girls' && p.gender !== 'unisex')
					return false;
				if (selectedCategory === 'boys' && p.gender !== 'boys' && p.gender !== 'unisex')
					return false;
				if (selectedCategory === 'hoodie' && p.category !== 'hoodie' && p.category !== 'jacket')
					return false;
				if (
					['hoodie', 'dress', 'jacket', 'set', 'shirt'].includes(selectedCategory) &&
					p.category !== selectedCategory
				) {
					return false;
				}
			}

			// Age filter
			if (selectedAge !== 'all' && p.ageRange !== selectedAge && p.ageRange !== 'all') {
				return false;
			}

			// Gender filter
			if (selectedGender !== 'all' && p.gender !== selectedGender && p.gender !== 'unisex') {
				return false;
			}

			return true;
		});
	}, [products, selectedCategory, selectedAge, selectedGender]);

	const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

	return (
		<div className='min-h-screen flex flex-col bg-[#FAF8F5] text-stone-800'>
			{/* Header */}
			<Header
				cartCount={totalCartCount}
				wishlistCount={0}
				onOpenCart={() => setIsCartOpen(true)}
				onOpenTryOn={() => {
					setTryOnInitialProduct(null);
					setIsTryOnOpen(true);
				}}
				onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
				onSelectCategory={(cat) => setSelectedCategory(cat)}
				activeCategory={selectedCategory}
			/>

			{/* Main Hero */}
			<Hero
				onStartTryOn={() => {
					setTryOnInitialProduct(null);
					setIsTryOnOpen(true);
				}}
				onExploreCollection={() => {
					document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
				}}
			/>

			{/* How Virtual Try-on Works Section */}
			<section className='py-12 bg-white border-b border-stone-200'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center max-w-2xl mx-auto mb-10'>
						<div className='text-xs font-bold text-amber-700 uppercase tracking-wider mb-2'>
							تجربه خرید نوین برای والدین هوشمند
						</div>
						<h2 className='text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight'>
							پرو آنلاین تن‌خور لباس کودک در ۳ مرحله ساده
						</h2>
						<p className='text-sm text-stone-500 mt-2'>
							بدون نیاز به پرو حضوری و اتلاف وقت، لباس مناسب کودک خود را بیابید.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						<div className='p-6 bg-stone-50 rounded-2xl border border-stone-200 text-center space-y-3 relative'>
							<div className='w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-lg mx-auto shadow-sm'>
								۱
							</div>
							<h3 className='text-base font-bold text-stone-900'>آپلود عکس فرزند دلبندتان</h3>
							<p className='text-xs text-stone-600 leading-relaxed'>
								عکس تمام‌قد یا بالاتنه کودک ۲ تا ۹ سال خود را با تلفن همراه بگیرید و بارگذاری
								نمایید.
							</p>
						</div>

						<div className='p-6 bg-stone-50 rounded-2xl border border-stone-200 text-center space-y-3 relative'>
							<div className='w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-lg mx-auto shadow-sm'>
								۲
							</div>
							<h3 className='text-base font-bold text-stone-900'>انتخاب لباس از کالکشن فروشگاه</h3>
							<p className='text-xs text-stone-600 leading-relaxed'>
								هر یک از هودی‌ها، کاپشن‌ها، پیراهن‌ها یا ست‌های فروشگاه را با یک کلیک برای پرو مشخص
								کنید.
							</p>
						</div>

						<div className='p-6 bg-stone-50 rounded-2xl border border-stone-200 text-center space-y-3 relative'>
							<div className='w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-lg mx-auto shadow-sm'>
								۳
							</div>
							<h3 className='text-base font-bold text-stone-900'>
								مشاهده تن‌خور و مقایسه اسلایدری
							</h3>
							<p className='text-xs text-stone-600 leading-relaxed'>
								لباس را تن کودک شما می‌کند و خروجی را با اسلایدر قبل و بعد تحویل می‌گیرید!
							</p>
						</div>
					</div>

					{/* Direct Launch Banner */}
					<div className='mt-8 p-4 bg-gradient-to-r from-amber-50 to-stone-50 rounded-xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4'>
						<div className='flex items-center gap-3'>
							<Sparkles className='w-6 h-6 text-amber-600 shrink-0' />
							<div className='text-xs sm:text-sm text-stone-800'>
								<span className='font-bold'>می‌خواهید همین حالا امتحان کنید؟</span> عکس فرزندتان را
								ندارید؟ می‌توانید از کودکان نمونه آراد یا الینا استفاده کنید!
							</div>
						</div>
						<button
							onClick={() => {
								setTryOnInitialProduct(null);
								setIsTryOnOpen(true);
							}}
							className='px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm shrink-0 cursor-pointer'
						>
							شروع تست پرو هوشمند
						</button>
					</div>
				</div>
			</section>

			{/* Catalog & Filter Section */}
			<section id='catalog' className='py-12 flex-1'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
					{/* Section Header & Interactive Filter Bar */}
					<div className='flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200'>
						<div>
							<div className='text-xs font-bold text-stone-500 uppercase tracking-wider mb-1'>
								کالکشن ویژه کودکان ۲ تا ۹ سال
							</div>
							<h2 className='text-2xl sm:text-3xl font-black text-stone-900 tracking-tight'>
								لباس‌های باکیفیت و تنفس‌پذیر کودک
							</h2>
						</div>

						{/* Quick Sizing Guide Button */}
						<button
							onClick={() => setIsSizeGuideOpen(true)}
							className='inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3.5 py-2 rounded-lg transition-colors cursor-pointer self-start md:self-auto'
						>
							<Ruler className='w-4 h-4 text-amber-600' />
							<span>محاسبه‌گر سایز کودک (۲ تا ۹ سال)</span>
						</button>
					</div>

					{/* Interactive Filter Controls (Segmented clean buttons) */}
					<div className='flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-stone-200 shadow-xs'>
						{/* Age Filter Tabs */}
						<div className='flex items-center gap-1.5 flex-wrap'>
							<span className='text-xs font-bold text-stone-600 ml-2'>رده سنی:</span>
							{[
								{ id: 'all', label: 'همه سنین' },
								{ id: '2-3', label: '۲ تا ۳ سال' },
								{ id: '4-5', label: '۴ تا ۵ سال' },
								{ id: '6-7', label: '۶ تا ۷ سال' },
								{ id: '8-9', label: '۸ تا ۹ سال' },
							].map((tab) => (
								<button
									key={tab.id}
									onClick={() => setSelectedAge(tab.id)}
									className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
										selectedAge === tab.id
											? 'bg-amber-600 text-white shadow-xs'
											: 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
									}`}
								>
									{tab.label}
								</button>
							))}
						</div>

						{/* Gender Filter Tabs */}
						<div className='flex items-center gap-1.5 flex-wrap'>
							<span className='text-xs font-bold text-stone-600 ml-2'>جنسیت:</span>
							{[
								{ id: 'all', label: 'همه' },
								{ id: 'girls', label: 'دخترانه' },
								{ id: 'boys', label: 'پسرانه' },
								{ id: 'unisex', label: 'اسپرت' },
							].map((tab) => (
								<button
									key={tab.id}
									onClick={() => setSelectedGender(tab.id)}
									className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
										selectedGender === tab.id
											? 'bg-stone-900 text-white shadow-xs'
											: 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
									}`}
								>
									{tab.label}
								</button>
							))}
						</div>
					</div>

					{/* Product Grid */}
					{filteredProducts.length === 0 ? (
						<div className='py-16 text-center bg-white rounded-2xl border border-stone-200 space-y-3'>
							<div className='text-base font-bold text-stone-700'>
								لباسی با فیلترهای انتخابی یافت نشد
							</div>
							<p className='text-xs text-stone-400'>لطفاً فیلتر سن یا جنسیت را تغییر دهید.</p>
							<button
								onClick={() => {
									setSelectedAge('all');
									setSelectedGender('all');
									setSelectedCategory('all');
								}}
								className='px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-lg cursor-pointer'
							>
								نمایش همه لباس‌ها
							</button>
						</div>
					) : (
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
							{filteredProducts.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
									onOpenDetails={(p) => setDetailProduct(p)}
									onTryOn={(p) => handleLaunchTryOnWithProduct(p)}
									onAddToCart={handleAddToCart}
								/>
							))}
						</div>
					)}
				</div>
			</section>

			{/* Footer */}
			<Footer
				onOpenTryOn={() => {
					setTryOnInitialProduct(null);
					setIsTryOnOpen(true);
				}}
				onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
			/>

			{/* Product Detail Modal */}
			<ProductDetailModal
				product={detailProduct}
				onClose={() => setDetailProduct(null)}
				onTryOn={(p) => handleLaunchTryOnWithProduct(p)}
				onAddToCart={handleAddToCart}
			/>

			{/* Online Virtual Try-On Modal */}
			<TryOnModal
				isOpen={isTryOnOpen}
				onClose={() => setIsTryOnOpen(false)}
				products={products}
				initialProduct={tryOnInitialProduct}
				onAddToCart={handleAddToCart}
			/>

			{/* Smart Size Calculator Modal */}
			<SizeCalculatorModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />

			{/* Shopping Cart Drawer */}
			<CartDrawer
				isOpen={isCartOpen}
				onClose={() => setIsCartOpen(false)}
				items={cartItems}
				onUpdateQuantity={handleUpdateQuantity}
				onRemoveItem={handleRemoveItem}
				onClearCart={handleClearCart}
			/>

			{/* Toast Notification */}
			{toastMessage && (
				<div className='fixed bottom-5 left-5 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200'>
					<CheckCircle2 className='w-4 h-4 text-emerald-400 shrink-0' />
					<span>{toastMessage}</span>
				</div>
			)}
		</div>
	);
}
