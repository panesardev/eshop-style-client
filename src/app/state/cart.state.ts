import { BehaviorSubject } from "rxjs";
import { Cart } from "../models/cart.interface";
import { timeStamp } from '../utils/utilities';

let initial: Cart = {
	lastUpdated: timeStamp(),
	products: [],
	subTotal: 0,
	total: 0
};

const subject = new BehaviorSubject<Cart>(initial);
export const cart$ = subject.asObservable();

export function currentState() { 
	return subject.getValue();
}

export function setState(cart: Cart) {
	subject.next(cart);
}
