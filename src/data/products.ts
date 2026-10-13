export interface Product {
  id: string;
  title: string;
  category: 'hoodie' | 'dress' | 'jacket' | 'set' | 'shirt';
  categoryLabel: string;
  gender: 'girls' | 'boys' | 'unisex';
  genderLabel: string;
  ageRange: '2-3' | '4-5' | '6-7' | '8-9' | 'all';
  ageRangeLabel: string;
  price: number;
  originalPrice?: number;
  image: string;
  gallery?: string[];
  fabric: string;
  description: string;
  features: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  tag?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'hoodie-bear-oat',
    title: 'هودی دورس پنبه‌ای خرسی نرمین',
    category: 'hoodie',
    categoryLabel: 'هودی و دورس',
    gender: 'unisex',
    genderLabel: 'اسپرت (دخترانه و پسرانه)',
    ageRange: '4-5',
    ageRangeLabel: '۳ تا ۷ سال',
    price: 495000,
    originalPrice: 580000,
    image: '/src/assets/images/product_hoodie_bear_1790607388250.jpg',
    fabric: '۱۰۰٪ پنبه دورس ۳ نخ خارخورده ضدحساسیت',
    description: 'هودی زمستانه گرم و فوق‌العاده نرم با گلدوزی ظریف طرح خرس دوست‌داشتنی. مناسب برای فصل پاییز و زمستان، بدون پرزدهی با رنگ ثابت تضمینی.',
    features: [
      'پارچه لطیف و کاملاً ضد حساسیت برای پوست حساس کودکان',
      'کش‌باف پنبه‌ای نرم در مچ و پایین لباس',
      'کلاه دو لایه استاندارد برای محافظت در برابر باد',
      'قابلیت شستشو در ماشین لباسشویی بدون رنگ‌دهی'
    ],
    sizes: ['سایز ۴۰ (۲-۳ سال)', 'سایز ۴۵ (۴-۵ سال)', 'سایز ۵۰ (۶-۷ سال)'],
    colors: [
      { name: 'کرم جو دوسر', hex: '#E6DCB8' },
      { name: 'سبز سدری', hex: '#A3B18A' },
      { name: 'شکلاتی روشن', hex: '#C4A482' }
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 38,
    tag: 'پرفروش‌ترین فصل'
  },
  {
    id: 'dress-floral-vintage',
    title: 'پیراهن کتان ارگانیک شکوفه بهاری',
    category: 'dress',
    categoryLabel: 'پیراهن و دامن',
    gender: 'girls',
    genderLabel: 'دخترانه',
    ageRange: '4-5',
    ageRangeLabel: '۳ تا ۸ سال',
    price: 540000,
    originalPrice: 620000,
    image: '/src/assets/images/product_floral_dress_1790607398575.jpg',
    fabric: 'کتان ۱۰۰٪ پنبه طبیعی با دکمه‌های چوبی دکوری',
    description: 'پیراهن دخترانه شیک با طرح شکوفه‌های آبرنگی پاستلی در تم گلبهی و زیتونی. تن‌خوری رویایی برای مهمانی‌ها، جشن تولد و عکس‌های آتلیه‌ای خاطره‌انگیز.',
    features: [
      'آستر تمام‌نخ جهت لطافت حداکثری و جلوگیری از تعریق',
      'دکمه‌های چوب نارگیل طبیعی در پشت پیراهن',
      'برش کلوش با چین‌های لطیف در دامن',
      'دوخت فوق‌العاده مقاوم و تمیز صنعتی'
    ],
    sizes: ['سایز ۴۰ (۳-۴ سال)', 'سایز ۴۵ (۵-۶ سال)', 'سایز ۵۰ (۷-۸ سال)'],
    colors: [
      { name: 'گلبهی پاستلی', hex: '#E8B4B8' },
      { name: 'کرم وانیلی', hex: '#FDFBF7' }
    ],
    inStock: true,
    rating: 5.0,
    reviewCount: 42,
    tag: 'کالکشن بهاره'
  },
  {
    id: 'jacket-denim-sky',
    title: 'کت جین نرم سنگ‌شور شده استایل کژوال',
    category: 'jacket',
    categoryLabel: 'کاپشن و کت',
    gender: 'unisex',
    genderLabel: 'اسپرت (دخترانه و پسرانه)',
    ageRange: '6-7',
    ageRangeLabel: '۳ تا ۹ سال',
    price: 680000,
    originalPrice: 790000,
    image: '/src/assets/images/product_denim_jacket_1790607408320.jpg',
    fabric: 'جین بدون کش سنگ‌شور شده بسیار لطیف مخصوص کودک',
    description: 'کت تک جین فوق‌العاده خوش‌استایل با دکمه‌های فشاری آسان‌بازشو مناسب کودک. بدون هرگونه زبری یا خشکی پارچه.',
    features: [
      'فرآیند شستشوی آنزیمی جهت نرمی بی‌نظیر پارچه جین',
      'جیب‌های جلویی واقعی با دکمه‌های استیل ضد زنگ',
      'قابلیت ست شدن آسان با هودی، تیشرت و شلوار کتان',
      'ایده‌آل برای چهارفصل سال'
    ],
    sizes: ['سایز ۴۰ (۳-۴ سال)', 'سایز ۴۵ (۵-۶ سال)', 'سایز ۵۰ (۷-۸ سال)', 'سایز ۵۵ (۸-۹ سال)'],
    colors: [
      { name: 'آبی یخی سنگشور', hex: '#9BB8CD' },
      { name: 'آبی کلاسیک', hex: '#4682B4' }
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 29,
    tag: 'محبوب والدین'
  },
  {
    id: 'set-cozy-cloud',
    title: 'ست بلوز و شلوار دورس راحتی ابر و ستاره',
    category: 'set',
    categoryLabel: 'تیشرت و شلوار',
    gender: 'unisex',
    genderLabel: 'اسپرت (یونیسکس)',
    ageRange: '2-3',
    ageRangeLabel: '۲ تا ۵ سال',
    price: 430000,
    image: '/src/assets/images/product_hoodie_bear_1790607388250.jpg',
    fabric: 'نخ پنبه سوپر ملانژ با کش‌سانی طبیعی',
    description: 'ست راحتی خانگی و بیرونی دو تکه شامل بلوز آستین‌بلند و شلوار اسلش با کمر کشی نرم که روی شکم کودک فشاری وارد نمی‌کند.',
    features: [
      'کمر کشباف پهن ضدحساسیت بدون ایجاد رد روی شکم',
      'دمپای کش‌دار شلوار برای ایستایی بی‌نقص روی کفش',
      'چاپ ارگانیک پایه آب بدون مواد شیمیایی مضر'
    ],
    sizes: ['سایز ۳۵ (۲-۳ سال)', 'سایز ۴۰ (۳-۴ سال)', 'سایز ۴۵ (۴-۵ سال)'],
    colors: [
      { name: 'سبز پسته ای', hex: '#C2D8B9' },
      { name: 'طوسی ملانژ', hex: '#D1D5DB' }
    ],
    inStock: true,
    rating: 4.7,
    reviewCount: 19
  },
  {
    id: 'jacket-puffer-mustard',
    title: 'کاپشن بارانی ضدآب پفکی گرم زرد خردلی',
    category: 'jacket',
    categoryLabel: 'کاپشن و کت',
    gender: 'unisex',
    genderLabel: 'اسپرت',
    ageRange: '6-7',
    ageRangeLabel: '۴ تا ۹ سال',
    price: 890000,
    originalPrice: 990000,
    image: '/src/assets/images/product_denim_jacket_1790607408320.jpg',
    fabric: 'رویه شمعی ضدآب تنفسی + الیاف میکروفایبر ۲۰۰ گرمی',
    description: 'کاپشن سبک اما فوق‌العاده گرم برای روزهای بارانی و برفی. داخل کاپشن با آستر پلار نرم پوشانده شده تا فرزندتان نهایت راحتی را تجربه کند.',
    features: [
      'رویه ضد نفوذ آب و بادگیر صد درصدی',
      'زیپ باکیفیت SBS همراه با محافظ چانه کودک',
      'نوارهای شب‌رنگ در پشت برای امنیت کودک در تاریکی'
    ],
    sizes: ['سایز ۴۵ (۴-۵ سال)', 'سایز ۵۰ (۶-۷ سال)', 'سایز ۵۵ (۸-۹ سال)'],
    colors: [
      { name: 'زرد خردلی', hex: '#E5A93C' },
      { name: 'سرمه‌ای تیره', hex: '#1E293B' }
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 31,
    tag: 'ضدآب و بادگیر'
  },
  {
    id: 'dress-corduroy-berry',
    title: 'سارافون مخمل کبریتی پاییزی تمشکی',
    category: 'dress',
    categoryLabel: 'پیراهن و دامن',
    gender: 'girls',
    genderLabel: 'دخترانه',
    ageRange: '4-5',
    ageRangeLabel: '۳ تا ۷ سال',
    price: 490000,
    image: '/src/assets/images/product_floral_dress_1790607398575.jpg',
    fabric: 'مخمل کبریتی ۱۰۰٪ نخ ریزبافت لطیف',
    description: 'سارافون دکمه‌دار جذاب قابل ست شدن با بافت و بلوزهای یقه‌اسکی زیر سارافونی. دارای دو جیب پاکتی جلویی فانتزی.',
    features: [
      'پارچه مخمل بادوام بدون سایش زانو',
      'بندهای قابل تنظیم دو مرحله‌ای روی شانه',
      'رنگ تمشکی مجلسی بسیار شاداب'
    ],
    sizes: ['سایز ۴۰ (۳-۴ سال)', 'سایز ۴۵ (۵-۶ سال)', 'سایز ۵۰ (۶-۷ سال)'],
    colors: [
      { name: 'تمشکی دودی', hex: '#873E54' },
      { name: 'شتری کلاسیک', hex: '#C19A6B' }
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 22
  }
];
