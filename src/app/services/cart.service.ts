import { Injectable } from '@angular/core';
import { Cart } from '../models/cart.interface';
import { Product } from '../models/product.interface';
import { timeStamp } from './utility-functions';

@Injectable({ providedIn: 'root' })
export class CartService {

	private TAX: number = .13;

	cart: Cart;

	constructor() {
    if (null == JSON.parse(localStorage['cart'] || null)) {
			this.cart = {
				lastUpdated: timeStamp(),
				products: [],
				subTotal: 0.00,
				total: 0.00,
				taxPrice: 0.00
			};
      localStorage['cart'] = JSON.stringify(this.cart); 
    } else {
			this.cart = JSON.parse(localStorage['cart']);
		}
	}

	addProduct(product: Product): void {
		this.cart.products.push(product);
		this.cart.subTotal = this.cart.subTotal + product.price;
		this.update();
	}

	removeProduct(id: string): void {
		const product = this.cart.products.find(p => p.id == id);
		this.cart.products = this.cart.products.filter(p => p.id != id);
		this.cart.subTotal = this.cart.subTotal - product.price;
		this.update();
	}

	update(): void {
		this.cart.taxPrice = this.cart.subTotal * this.TAX;
		this.cart.total = this.cart.subTotal + (this.cart.subTotal * this.TAX);
		this.cart.lastUpdated = timeStamp();
	}

	clear(): void {
		this.cart.lastUpdated = timeStamp();
		this.cart.products = [];
		this.cart.subTotal = 0.00;
		this.cart.taxPrice = 0.00;
		this.cart.total = 0.00;
	}
	
	save(): void {
		localStorage['cart'] = JSON.stringify(this.cart);
	}

}