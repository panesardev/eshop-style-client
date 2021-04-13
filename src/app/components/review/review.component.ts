import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  @Input() cart: Cart;

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
  }

}
