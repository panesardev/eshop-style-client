import { Product } from './product.interface';

export interface Collection {
	readonly id?: string;
	products: Product[];
	name: string;
}