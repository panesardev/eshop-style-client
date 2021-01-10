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

  constructor() { 
    localStorage.cart = JSON.stringify(this.initialCart);
  }

  private get currentState(): Cart {
    return this.cart.value;
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
    this.currentState.lastUpdated = timeStamp();
    this.currentState.products = [];
    this.currentState.subTotal = 0;
    this.currentState.total = 0;
    this.updateState();    
    localStorage.cart = null;
  }

  private updateState(): void {
    this.currentState.lastUpdated = timeStamp();
    this.cart.next(this.currentState);
  }

  saveState(): void {
    localStorage.cart = JSON.stringify(this.currentState);
  }

}
