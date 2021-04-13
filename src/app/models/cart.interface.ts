import { Product } from './product.interface';

export interface Cart {
	products: Product[];
	total: number;
	taxPrice: number;
	subTotal: number;
	lastUpdated: string;
}