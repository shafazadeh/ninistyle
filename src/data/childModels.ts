export interface ChildModel {
	id: string;
	name: string;
	age: string;
	height: string;
	gender: 'boy' | 'girl';
	avatar: string;
	description: string;
}

export const SAMPLE_CHILD_MODELS: ChildModel[] = [
	{
		id: 'model-arad',
		name: 'آراد',
		age: '۵ ساله',
		height: '۱۱۰ سانتی‌متر',
		gender: 'boy',
		avatar: '/images/model_kid_sample_1790607418879.jpg',
		description: 'کودک خردسال ۵ ساله - مناسب سایز ۴۵',
	},
	{
		id: 'model-elena',
		name: 'الینا',
		age: '۴ ساله',
		height: '۱۰۲ سانتی‌متر',
		gender: 'girl',
		avatar: '/images/hero_kids_fashion_1790607375922.jpg',
		description: 'دختربچه ۴ ساله - مناسب سایز ۴۰ تا ۴۵',
	},
	{
		id: 'model-samyar',
		name: 'سامیار',
		age: '۷ ساله',
		height: '۱۲۲ سانتی‌متر',
		gender: 'boy',
		avatar: '/images/hero_kids_fashion_1790607375922.jpg',
		description: 'پسر ۷ ساله - مناسب سایز ۵۰',
	},
];

export const SIZING_GUIDE = [
	{
		size: 'سایز ۳۵',
		age: '۲ تا ۳ سال',
		height: '۸۸ تا ۹۸ سانتی‌متر',
		weight: '۱۲ تا ۱۵ کیلوگرم',
		chest: '۵۴ سانتی‌متر',
	},
	{
		size: 'سایز ۴۰',
		age: '۳ تا ۴ سال',
		height: '۹۸ تا ۱۰۸ سانتی‌متر',
		weight: '۱۵ تا ۱۸ کیلوگرم',
		chest: '۵۸ سانتی‌متر',
	},
	{
		size: 'سایز ۴۵',
		age: '۴ تا ۵ سال',
		height: '۱۰۸ تا ۱۱۶ سانتی‌متر',
		weight: '۱۸ تا ۲۲ کیلوگرم',
		chest: '۶۲ سانتی‌متر',
	},
	{
		size: 'سایز ۵۰',
		age: '۶ تا ۷ سال',
		height: '۱۱۶ تا ۱۲۵ سانتی‌متر',
		weight: '۲۲ تا ۲۶ کیلوگرم',
		chest: '۶۶ سانتی‌متر',
	},
	{
		size: 'سایز ۵۵',
		age: '۸ تا ۹ سال',
		height: '۱۲۵ تا ۱۳۵ سانتی‌متر',
		weight: '۲۶ تا ۳۲ کیلوگرم',
		chest: '۷۰ سانتی‌متر',
	},
];
