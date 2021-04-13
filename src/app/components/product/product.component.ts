import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;

  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  addProduct(): void {
    this.cartService.addProduct(this.product);
    this.toastr.success('Added to cart!', '', {
      timeOut: 750
    });
  }

}
