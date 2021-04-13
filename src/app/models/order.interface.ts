import { Product } from './product.interface';

export interface Order {
	id?: string;
	email: string;
	orderPlaceTime: string;
	products: Product[];
	address: string;
	totalPrice: number;
}