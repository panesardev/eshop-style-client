export interface Product {
	id?: string;
	name: string;
	pictureName: string;
	price: number;
	quantity: number;
	stars: number;
	reviews: Array<{
		name: string,
		timeStamp: string,
		content: string,
	}>;
	description: string;
}
