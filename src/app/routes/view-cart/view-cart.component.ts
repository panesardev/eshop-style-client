import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss']
})
export class ViewCartComponent implements OnInit {

  cart: Cart;

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.cart;
  }

}
