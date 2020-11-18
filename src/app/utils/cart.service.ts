import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../models/cart.interface';
import { Product } from '../models/product.interface';
import { timeStamp } from './utilities';

@Injectable({ providedIn: 'root' })
export class CartService {

  private initialCart: Cart = {
    lastUpdated: timeStamp(),
    products: [],
    subTotal: 0,
    total: 0
  };
  private cart = new BehaviorSubject<Cart>(this.initialCart);

  public cart$ = this.cart.asObservable();

  constructor() { }

  get currentState(): Cart {
    return this.cart.getValue();
  }

  addProduct(product: Product): void {
    this.currentState.products.push(product);
    this.updateState();
  }

  removeProduct(id: string): void {
    this.currentState.products = this.currentState.products
      .filter(product => product.id !== id);
    this.updateState();
  }

  clear(): void {
    this.initialCart.lastUpdated = timeStamp();
    this.cart.next(this.initialCart);
  }

  updateState(): void {
    this.currentState.lastUpdated = timeStamp();
    this.cart.next(this.currentState);
    this.saveState();
  }

  saveState(): void {
    localStorage['cart'] = JSON.stringify(this.currentState);
  }

}
