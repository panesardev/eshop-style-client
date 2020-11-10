export interface Product {
	id?: string;
	name: string;
	pictureURL: string;
	price: number;
	quantity: number;
	stars?: number;
	gender?: 'm' | 'f';
	reviews?: Array<{
		name: string,
		timeStamp: string,
		content: string,
		stars?: number
	}>;
	description: string;
}
